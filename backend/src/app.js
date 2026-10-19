const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

// Import middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// CORS configuration
// Allow localhost on any port for development
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any localhost port in development
    if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// BUG FIX #7: Stripe webhook MUST receive the raw request body (a Buffer) for
// signature verification. The global express.json() parses ALL bodies first,
// which means the webhook route's express.raw() would receive an already-parsed
// object — causing stripe.webhooks.constructEvent() to fail silently.
// Fix: Apply raw body parser specifically for the webhook path BEFORE express.json().
app.use('/api/v1/checkout/webhooks/stripe', express.raw({ type: 'application/json' }));

// Body parsing middleware (JSON) — applied AFTER the webhook raw parser
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/checkout', paymentRoutes);
app.use('/api/v1/auth', authRoutes);

// Legacy endpoint (for backward compatibility during migration)
// This endpoint accepts the old format but uses new auth
const requireAuth = require('./middlewares/requireAuth');
app.post('/create-checkout-session', requireAuth, async (req, res) => {
  // Transform old format to new format
  const { cartItems: oldCartItems, customerEmail } = req.body;
  
  // Old format had full item objects, new format expects IDs
  // For backward compatibility, we'll try to extract IDs or use the items as-is
  const cartItems = oldCartItems?.map(item => ({
    id: item.id || item._id,
    productId: item.id || item._id,
    quantity: item.quantity || 1,
  })) || [];
  
  // Call the new controller with transformed data
  req.body.cartItems = cartItems;
  const paymentController = require('./controllers/paymentController');
  return paymentController.createCheckoutSession(req, res, () => {});
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
