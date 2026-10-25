import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../../store/Slices/cartSlice';
import { productAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

export default function ProductsonHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const { showToast } = useToast();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      setLoading(true);
      // Fetch products from all categories and take first 8 for featured section
      const res = await productAPI.getAll();
      const allProducts = res.data.data || [];
      // Take first 8 products as featured
      setProducts(allProducts.slice(0, 8));
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleProductClick(productId, category) {
    // Navigate to the correct category page based on product category
    const categoryPath = category?.toLowerCase() || 'chair';
    navigate(`/${categoryPath}/${productId}`);
  }

  function handleAddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    dispatch(addtoCart({...product, id: product._id || product.id}));
    showToast(`${product.title} added to cart!`, 'success');
  }

  if (loading) {
    return (
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="loading-text">Loading featured products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our handpicked selection</p>
          </div>
        </div>
        <div className="row">
          {products.map((item) => (
            <div key={item._id || item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <div 
                className="product-item"
                onClick={() => handleProductClick(item._id || item.id, item.category)}
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
                  onClick={(e) => handleAddToCart(e, {...item, id: item._id || item.id})}
                >
                  <img 
                    src="/images/cross.svg" 
                    alt="Add to cart" 
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
