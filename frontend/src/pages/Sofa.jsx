import React, { useEffect, useState } from 'react';
import Navbar from '../components/home/Navbar';
import FooterSection from '../components/home/FooterSection';
import { useNavigate } from 'react-router';
import { addtoCart } from '../store/Slices/cartSlice';
import { useDispatch } from 'react-redux';
import { productAPI } from '../services/api';
import { useToast } from '../contexts/ToastContext';

export default function Sofa() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await productAPI.getAll('sofa');
      setProducts(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  function handleProductClick(productId) {
    navigate(`/sofa/${productId}`);
  }

  function handleAddToCart(product) {
    dispatch(addtoCart({...product, id: product._id || product.id}));
    showToast(`${product.title} added to cart!`, 'success');
  }

  return (
    <div>
      <Navbar />
      <div className="untree_co-section">
        <div className="container">
          {/* Page Header */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-title">Our Sofas Collection</h2>
              <p className="section-subtitle">Luxury and comfort for your living space</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {loading && (
              <div className="col-12 text-center py-5">
                <p className="loading-text">Loading products...</p>
              </div>
            )}
            {error && (
              <div className="col-12 text-center py-5">
                <p className="error-text">{error}</p>
              </div>
            )}
            {!loading && !error && products.length === 0 && (
              <div className="col-12 text-center py-5">
                <p className="empty-text">No sofas available at the moment. Check back soon!</p>
              </div>
            )}
            {!loading && !error && products.map((item) => (
              <div key={item._id || item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <div 
                  className="product-item"
                  onClick={() => handleProductClick(item._id || item.id)}
                >
                  <div className="product-thumbnail">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = '/images/product-3.png';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{item.title}</h3>
                    <strong>${(typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0).toFixed(2)}</strong>
                  </div>
                  <span 
                    className="icon-cross"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart({...item, id: item._id || item.id});
                    }}
                  >
                    <img 
                      src="images/cross.svg" 
                      alt="Add to cart" 
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterSection/>
    </div>
  );
}
