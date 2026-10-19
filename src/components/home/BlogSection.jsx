import React from 'react';

// RESTORE: BlogSection with original CSS classes
export default function BlogSection() {
  return (
    <div className="blog-section" id="blog">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <h2 className="section-title">Recent Blog</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <a href="#blog" className="more">
              View All Posts
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            {/* RESTORE: Original post-entry class */}
            <div className="post-entry">
              <a href="#blog" className="d-block mb-5">
                <div className="post-thumbnail">
                  <img 
                    src="/images/post-1.jpg" 
                    alt="Blog Post" 
                    className="img-fluid" 
                    style={{ borderRadius: '20px' }}
                  />
                </div>
              </a>
              <div className="post-content-entry" style={{ padding: '0 1rem' }}>
                <h3 className="mb-2" style={{ fontSize: '1rem' }}>
                  <a href="#blog">
                    First Time Home Owner Ideas
                  </a>
                </h3>
                <div className="meta" style={{ fontSize: '0.875rem' }}>
                  <span>by <a href="#blog" className="font-weight-bold">Kristin Watson</a></span> <span>on <a href="#blog" className="font-weight-bold">Dec 19, 2021</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            <div className="post-entry">
              <a href="#blog" className="d-block mb-5">
                <div className="post-thumbnail">
                  <img 
                    src="/images/post-2.jpg" 
                    alt="Blog Post" 
                    className="img-fluid" 
                    style={{ borderRadius: '20px' }}
                  />
                </div>
              </a>
              <div className="post-content-entry" style={{ padding: '0 1rem' }}>
                <h3 className="mb-2" style={{ fontSize: '1rem' }}>
                  <a href="#blog">
                    How To Keep Your Furniture Clean
                  </a>
                </h3>
                <div className="meta" style={{ fontSize: '0.875rem' }}>
                  <span>by <a href="#blog" className="font-weight-bold">Robert Fox</a></span> <span>on <a href="#blog" className="font-weight-bold">Dec 15, 2021</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
            <div className="post-entry">
              <a href="#blog" className="d-block mb-5">
                <div className="post-thumbnail">
                  <img 
                    src="/images/post-3.jpg" 
                    alt="Blog Post" 
                    className="img-fluid" 
                    style={{ borderRadius: '20px' }}
                  />
                </div>
              </a>
              <div className="post-content-entry" style={{ padding: '0 1rem' }}>
                <h3 className="mb-2" style={{ fontSize: '1rem' }}>
                  <a href="#blog">
                    Small Space Furniture Apartment Ideas
                  </a>
                </h3>
                <div className="meta" style={{ fontSize: '0.875rem' }}>
                  <span>by <a href="#blog" className="font-weight-bold">Kristin Watson</a></span> <span>on <a href="#blog" className="font-weight-bold">Dec 12, 2021</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
