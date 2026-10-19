import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/Slices/authSlice";
import { decreaseQuantity, increaseQuantity, removefromCart, clearCart } from "../../store/Slices/cartSlice";

export default function Navbar() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const cart = useSelector((state) => state.cartItem?.cart || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const username = currentUser?.displayName || (currentUser?.uid ? localStorage.getItem(currentUser.uid) : '') || '';
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);
  const [cartIconAnimation, setCartIconAnimation] = useState(false);

  // Helper function to safely convert to number
  const toNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined) return defaultValue;
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Calculate cart totals with safe number conversion
  const cartSubtotal = cart.reduce((total, item) => {
    const price = toNumber(item.price, 0);
    const quantity = toNumber(item.quantity, 1);
    return total + (price * quantity);
  }, 0);

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // Check if click is not on the cart button
        const cartButton = event.target.closest('.cart-button-wrapper');
        if (!cartButton) {
          setIsCartOpen(false);
        }
      }
    }

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when cart is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        // Check if click is not on the user menu button
        const userButton = event.target.closest('.user-button-wrapper');
        if (!userButton) {
          setIsUserMenuOpen(false);
        }
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Animate cart icon when items are added
  useEffect(() => {
    if (cart.length > 0) {
      setCartIconAnimation(true);
      const timer = setTimeout(() => setCartIconAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
        dispatch(clearCart()); // BUG FIX #5: Clear cart on logout to prevent data leaking to next user
        localStorage.removeItem('user'); // BUG FIX #5: Remove key instead of setting to 'guest'
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  }

  function handleCartClick() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsCartOpen(prev => !prev);
  }

  function handleUserMenuClick() {
    setIsUserMenuOpen(prev => !prev);
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

  function handleRemoveItem(productId) {
    dispatch(removefromCart(productId));
  }

  // RESTORE: Original nav-link class function
  function getNavLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <nav 
      className="custom-navbar navbar navbar-expand-md navbar-dark" 
      aria-label="Furni navigation bar"
    >
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand"
        >
          Furni<span>.</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarsFurni" 
          aria-controls="navbarsFurni" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to='/' className={getNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/chair' className={getNavLinkClass}>
                Chair
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/sofa' className={getNavLinkClass}>
                Sofa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/table' className={getNavLinkClass}>
                Tables
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/contact_us' className={getNavLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          
          <ul className="navbar-nav mb-2 mb-md-0 ms-5 d-flex flex-row align-items-center" style={{ gap: '1.5rem' }}>
            <li className="position-relative">
              <div className="user-button-wrapper">
                <button 
                  className={`navbar-icon-btn ${isUserMenuOpen ? 'active' : ''}`}
                  onClick={handleUserMenuClick}
                  aria-label="User menu"
                >
                  <img className="navbar-icon" src="/images/user.svg" alt="User" />
                </button>
              </div>
              
              {isUserMenuOpen && (
                <div className="user-menu-dropdown" ref={userMenuRef}>
                  {currentUser ? (
                    <>
                      <div className="user-menu-header">
                        <div className="user-avatar">
                          <img src="/images/user.svg" alt="User" />
                        </div>
                        <div className="user-info">
                          <p className="user-greeting">Hello,</p>
                          <p className="user-name">{username || currentUser.email?.split('@')[0] || 'User'}</p>
                        </div>
                      </div>
                      <div className="user-menu-items">
                        <button 
                          className="user-menu-item"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/cart');
                          }}
                        >
                          <span>My Cart</span>
                          <span className="user-menu-arrow">→</span>
                        </button>
                        <button 
                          className="user-menu-item"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <span>My Orders</span>
                          <span className="user-menu-arrow">→</span>
                        </button>
                        <div className="user-menu-divider"></div>
                        <button 
                          className="user-menu-item logout-item"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="user-menu-header">
                        <p className="user-menu-title">Account</p>
                        <p className="user-menu-subtitle">Sign in to access your account</p>
                      </div>
                      <div className="user-menu-items">
                        <button 
                          className="user-menu-item primary-item"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/login');
                          }}
                        >
                          <span>Sign In</span>
                        </button>
                        <button 
                          className="user-menu-item secondary-item"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate('/register');
                          }}
                        >
                          <span>Create Account</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
            
            <li className="position-relative">
              <div className="cart-button-wrapper">
                <button 
                  className={`navbar-icon-btn ${cartIconAnimation ? 'cart-icon-bounce' : ''}`}
                  onClick={handleCartClick}
                  aria-label="Shopping cart"
                >
                  <div className="position-relative d-inline-block">
                    <img className="navbar-icon" src="/images/cart.svg" alt="Cart" />
                    {cart.length > 0 && (
                      <span className="cart-badge">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </button>
              </div>
              
              {/* Cart Overlay */}
              {isCartOpen && currentUser && (
                <>
                  <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
                  <div className="cart-dropdown" ref={cartRef}>
                    {/* Cart Header */}
                    <div className="cart-dropdown-header">
                      <h3 className="cart-dropdown-title">
                        Shopping Cart
                        {cart.length > 0 && <span className="cart-item-count">({cart.length})</span>}
                      </h3>
                      <button 
                        className="cart-close-btn"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close cart"
                      >
                        ×
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="cart-dropdown-body">
                      {cart.length === 0 ? (
                        <div className="cart-empty-state">
                          <img 
                            src='/images/emptycart.png' 
                            alt="Empty cart"
                            className="cart-empty-image"
                          />
                          <p className="cart-empty-text">Your cart is empty</p>
                          <p className="cart-empty-subtext">Add items to your cart to see them here</p>
                          <button 
                            className="btn btn-black"
                            onClick={() => {
                              setIsCartOpen(false);
                              navigate('/');
                            }}
                          >
                            Continue Shopping
                          </button>
                        </div>
                      ) : (
                        <div className="cart-dropdown-items">
                          {cart.map((item) => (
                            <div key={item.id} className="cart-dropdown-item">
                              <div className="cart-dropdown-item-image">
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  onError={(e) => {
                                    e.target.src = '/images/product-3.png';
                                  }}
                                />
                              </div>
                              <div className="cart-dropdown-item-details">
                                <h6 className="cart-dropdown-item-title">{item.title}</h6>
                                <p className="cart-dropdown-item-price">${toNumber(item.price, 0).toFixed(2)} each</p>
                                <div className="cart-dropdown-item-quantity">
                                  <button 
                                    className="cart-quantity-btn"
                                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                    aria-label="Decrease quantity"
                                  >
                                    −
                                  </button>
                                  <span className="cart-quantity-value">{toNumber(item.quantity, 1)}</span>
                                  <button 
                                    className="cart-quantity-btn"
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                    aria-label="Increase quantity"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="cart-dropdown-item-actions">
                                <p className="cart-dropdown-item-total">${(toNumber(item.price, 0) * toNumber(item.quantity, 1)).toFixed(2)}</p>
                                <button 
                                  className="cart-remove-btn"
                                  onClick={() => handleRemoveItem(item.id)}
                                  aria-label="Remove item"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cart Footer */}
                    {cart.length > 0 && (
                      <div className="cart-dropdown-footer">
                        <div className="cart-dropdown-subtotal">
                          <span>Subtotal:</span>
                          <strong>${cartSubtotal.toFixed(2)}</strong>
                        </div>
                        <button 
                          className="btn btn-black w-100"
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate('/cart');
                          }}
                        >
                          View Cart & Checkout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
