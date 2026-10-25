import React from 'react';
import Navbar from '../components/home/Navbar';
import FooterSection from '../components/home/FooterSection';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removefromCart } from '../store/Slices/cartSlice';
import { loadStripe } from "@stripe/stripe-js";
import { checkoutAPI } from '../services/api';
import { useNavigate } from 'react-router';

export default function Cart() {
  const cartItems = useSelector((state) => state.cartItem.cart);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Helper function to safely convert to number
  const toNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined) return defaultValue;
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? defaultValue : num;
  };
  
  const subtotal = cartItems.reduce((total, item) => {
    const price = toNumber(item.price, 0);
    const quantity = toNumber(item.quantity, 1);
    return total + (price * quantity);
  }, 0);
  const deliveryCharge = 5.00;
  const total = subtotal + deliveryCharge;

  async function handleCheckout() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      return;
    }
    try {
      const cartItemsForCheckout = cartItems.map((item) => ({
        id: item.id || item._id,
        productId: item.id || item._id,
        quantity: item.quantity
      }));
      
      const res = await checkoutAPI.createSession(cartItemsForCheckout);
      const sessionId = res.data.sessionId;
      
      const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey) {
        throw new Error('Stripe publishable key not configured');
      }
      
      const stripe = await loadStripe(stripePublishableKey);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error.response?.data?.error || error.message || 'Failed to proceed to checkout');
    }
  }

  function handleIncreaseQuantity(productId) {
    dispatch(increaseQuantity(productId));
  }

  function handleDecreaseQuantity(productId, currentQuantity) {
    if (currentQuantity === 1) {
      dispatch(removefromCart(productId));
    } else {
      dispatch(decreaseQuantity(productId));
    }
  }

  function handleRemoveItem(e, productId) {
    e.preventDefault();
    dispatch(removefromCart(productId));
  }

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shopping Cart</h1>
                <p className="mb-4">Review your items before checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="empty-cart-container">
                  <img 
                    src="/images/emptycart.png" 
                    alt="Empty cart"
                    className="empty-cart-image"
                  />
                  <h2 className="mt-4 mb-3">Your cart is empty</h2>
                  <p className="mb-4 text-muted">Start adding items to your cart to see them here</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="btn btn-black"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items Section */}
              <div className="col-lg-8 mb-5">
                <div className="cart-items-header mb-4">
                  <h2 className="cart-section-title">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-image">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = '/images/product-3.png';
                          }}
                        />
                      </div>
                      
                      <div className="cart-item-details">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-price">${toNumber(item.price, 0).toFixed(2)} each</p>
                      </div>
                      
                      <div className="cart-item-quantity">
                        <label className="quantity-label">Quantity</label>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            type="button" 
                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          >
                            −
                          </button>
                          <span className="quantity-value">{toNumber(item.quantity, 1)}</span>
                          <button 
                            className="quantity-btn"
                            type="button" 
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="cart-item-total">
                        <p className="item-total-label">Item Total</p>
                        <p className="item-total-price">${(toNumber(item.price, 0) * toNumber(item.quantity, 1)).toFixed(2)}</p>
                      </div>
                      
                      <div className="cart-item-remove">
                        <button 
                          className="remove-btn"
                          onClick={(e) => handleRemoveItem(e, item.id)}
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-actions mt-4">
                  <button 
                    className="btn btn-outline-black me-3"
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </button>
                  <button 
                    className="btn btn-outline-black"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Cart
                  </button>
                </div>
              </div>

              {/* Cart Summary Section */}
              <div className="col-lg-4">
                <div className="cart-summary-card">
                  <h3 className="cart-summary-title">Order Summary</h3>
                  
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>
                  
                  <div className="summary-row">
                    <span>Delivery Charge</span>
                    <strong>${deliveryCharge.toFixed(2)}</strong>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  
                  <button 
                    className="btn btn-black btn-lg w-100 mt-4"
                    onClick={handleCheckout}
                  >
                    Proceed To Checkout
                  </button>
                  
                  <div className="coupon-section mt-4">
                    <label className="coupon-label" htmlFor="coupon">Have a coupon code?</label>
                    <div className="coupon-input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="coupon" 
                        placeholder="Enter code" 
                      />
                      <button className="btn btn-outline-black">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
}
