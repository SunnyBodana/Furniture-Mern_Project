import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { productAPI } from '../../services/api';

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  async function fetchPopularProducts() {
    try {
      setLoading(true);
      const res = await productAPI.getAll();
      const allProducts = res.data.data || [];
      
      // Sort by ratings (highest first) and take top 3
      const sortedProducts = [...allProducts].sort((a, b) => {
        const ratingA = a.ratings?.average || 0;
        const ratingB = b.ratings?.average || 0;
        return ratingB - ratingA;
      });
      
      setProducts(sortedProducts.slice(0, 3));
    } catch (err) {
      console.error('Error fetching popular products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleProductClick(productId, category) {
    const categoryPath = category?.toLowerCase() || 'chair';
    navigate(`/${categoryPath}/${productId}`);
  }

  if (loading) {
    return (
      <div className="untree_co-section" style={{ paddingBottom: '7rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="loading-text">Loading popular products...</p>
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
    <div className="untree_co-section" style={{ paddingBottom: '7rem' }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="section-title">Popular Products</h2>
            <p className="section-subtitle">Our most loved items</p>
          </div>
        </div>
        <div className="row">
          {products.map((item) => (
            <div key={item._id || item.id} className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div 
                className="popular-product d-flex"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(item._id || item.id, item.category)}
              >
                <div className="thumbnail" style={{ marginRight: '0.625rem', flex: '0 0 auto', width: '120px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, width: '98px', height: '98px', backgroundColor: '#dce5e4', borderRadius: '20px' }} />
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = '/images/product-3.png';
                    }}
                  />
                </div>
                <div style={{ paddingTop: '0.75rem' }}>
                  <h3 className="mb-2" style={{ fontSize: '0.875rem', fontWeight: '700' }}>{item.title}</h3>
                  <p className="mb-2" style={{ lineHeight: '1.4', fontSize: '0.875rem', color: '#6a6a6a' }}>
                    {item.description ? (item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description) : 'Premium quality furniture for your home.'}
                  </p>
                  <p className="mb-0">
                    <span 
                      className="more"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(item._id || item.id, item.category);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Read More
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
