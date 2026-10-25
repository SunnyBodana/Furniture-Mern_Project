import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { productAPI } from '../services/api';
import Navbar from '../components/home/Navbar';
import FooterSection from '../components/home/FooterSection';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../store/Slices/cartSlice';
import { useToast } from '../contexts/ToastContext';

export default function OneProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await productAPI.getById(id);
      setProduct(res.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching product", err);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  function handleAddToCart() {
    if (!product) return;
    dispatch(addtoCart({...product, id: product._id || product.id}));
    showToast(`${product.title} added to cart!`, 'success');
  }

  if (loading) {
    // RESTORE: Original styling for loading state
    return (
      <>
        <Navbar />
        <div style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginTop: '3rem', color: '#6a6a6a' }}>Loading product...</p>
        </div>
        <FooterSection />
      </>
    );
  }
  
  if (error || !product) {
    // RESTORE: Original styling for error state
    return (
      <>
        <Navbar />
        <div style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginTop: '3rem', color: '#6a6a6a' }}>{error || 'Product not found 😢'}</p>
          <button 
            onClick={() => navigate('/')} 
            style={{
              marginTop: '1.25rem',
              padding: '0.625rem 1.25rem',
              backgroundColor: '#2f2f2f',
              color: '#ffffff',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1a1a1a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2f2f2f'}
          >
            Go Back Home
          </button>
        </div>
        <FooterSection />
      </>
    );
  }

  const { title, price, description, stock, category, image, ratings, reviews } = product;

  return (
    <>
      <Navbar />
      {/* RESTORE: Original untree_co-section class */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* RESTORE: Original product-card styling */}
              <div className="row mb-5">
                <div className="col-md-6 mb-4 mb-md-0">
                  <img 
                    src={image} 
                    alt={title}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = '/images/product-3.png';
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <h1 className="mb-3">{title}</h1>
                  <p>Category: {category}</p>
                  <p className="h3 mb-3" style={{ color: '#dc3545' }}>
                    ${(typeof price === 'number' ? price : parseFloat(price) || 0).toFixed(2)}
                  </p>
                  <p className="mb-4">{description}</p>
                  <p className="mb-3">Stock left: {stock}</p>
                  <p className="mb-4" style={{ color: '#ffc107' }}>
                    ⭐ {ratings?.average ?? 0} / 5 ({ratings?.count ?? 0} reviews)
                  </p>
                  <button 
                    onClick={handleAddToCart}
                    className="btn btn-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* RESTORE: Original reviews section */}
              <div className="mb-5">
                <h2 className="mb-4">Customer Reviews</h2>
                {reviews?.length > 0 ? (
                  reviews.map((review, idx) => (
                    <div 
                      key={idx} 
                      className={idx > 0 ? "border-top pt-4 pb-4" : "pt-4 pb-4"}
                    >
                      <p className="font-weight-bold mb-1">{review.user}</p>
                      <p className="mb-1" style={{ color: '#ffc107' }}>⭐ {review.rating}</p>
                      <p className="mb-1 font-italic">"{review.comment}"</p>
                      <p className="text-muted small mb-0">{new Date(review.date).toDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
