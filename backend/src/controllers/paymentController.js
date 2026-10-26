const mongoose = require('mongoose');
const Stripe = require('stripe');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe checkout session
// @route   POST /api/v1/checkout/session
// @access  Private
exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  const userId = req.user.uid;
  const userEmail = req.user.email;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Cart items are required',
    });
  }

  // Re-fetch products from DB to ensure correct pricing (never trust client)
  const productIds = cartItems
    .map(item => item.id || item.productId)
    .filter(Boolean)
    .map(id => id.toString());

  const hasInvalidId = productIds.some(id => !mongoose.Types.ObjectId.isValid(id));
  if (hasInvalidId) {
    return res.status(400).json({
      success: false,
      error: 'Invalid product ID in cart',
    });
  }

  // Deduplicate product IDs because MongoDB $in returns unique documents only
  const uniqueProductIds = [...new Set(productIds)];
  const products = await Product.find({ _id: { $in: uniqueProductIds } });

  if (products.length !== uniqueProductIds.length) {
    return res.status(400).json({
      success: false,
      error: 'Some products not found',
    });
  }

  // Build line items with verified prices
  const lineItems = cartItems.map(cartItem => {
    const product = products.find(p => 
      p._id.toString() === (cartItem.id || cartItem.productId).toString()
    );
    
    if (!product) {
      throw new Error(`Product ${cartItem.id} not found`);
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: cartItem.quantity || 1,
    };
  });

  // Calculate totals
  const subtotal = products.reduce((sum, product) => {
    const cartItem = cartItems.find(item => 
      (item.id || item.productId).toString() === product._id.toString()
    );
    return sum + (product.price * (cartItem?.quantity || 1));
  }, 0);
  
  const deliveryCharge = 5.00;
  const total = subtotal + deliveryCharge;

  // Create order in DB with pending status
  const order = await Order.create({
    userId,
    userEmail,
    items: cartItems.map(cartItem => {
      const product = products.find(p => 
        p._id.toString() === (cartItem.id || cartItem.productId).toString()
      );
      return {
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity || 1,
        image: product.image,
      };
    }),
    subtotal,
    deliveryCharge,
    total,
    status: 'pending',
    paymentStatus: 'pending',
  });

  // Dynamically determine client URL from request origin or environment variable
  const clientUrl = req.get('origin') 
    || process.env.CLIENT_URL 
    || 'http://localhost:3000';

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/cancel`,
    customer_email: userEmail,
    metadata: {
      orderId: order._id.toString(),
      userId,
    },
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'AU', 'GB', 'DE', 'IN'],
    },
  });

  // Update order with session ID
  order.stripeSessionId = session.id;
  await order.save();

  res.json({
    success: true,
    sessionId: session.id,
    orderId: order._id,
  });
});

// @desc    Handle Stripe webhook
// @route   POST /api/v1/webhooks/stripe
// @access  Public (Stripe calls this)
exports.handleStripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = 'paid';
          order.status = 'paid';
          order.stripePaymentIntentId = session.payment_intent;
          
          // Update shipping address if available
          if (session.shipping_details) {
            order.shippingAddress = {
              name: session.shipping_details.name,
              line1: session.shipping_details.address.line1,
              line2: session.shipping_details.address.line2,
              city: session.shipping_details.address.city,
              state: session.shipping_details.address.state,
              postal_code: session.shipping_details.address.postal_code,
              country: session.shipping_details.address.country,
            };
          }
          
          await order.save();
          console.log(`✅ Order ${orderId} marked as paid`);
        }
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = 'failed';
          await order.save();
          console.log(`❌ Order ${orderId} payment failed`);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});
