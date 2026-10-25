import React from 'react';

// RESTORE: TestimonialSection with original CSS classes
export default function TestimonialSection() {
  return (
    <div className="testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto text-center">
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12">

            {/* RESTORE: Original testimonial-slider-wrap class */}
            <div
              className="testimonial-slider-wrap text-center position-relative"
              style={{ paddingTop: '2rem' }}
            >
              <div
                className="d-none d-md-block position-absolute"
                style={{ top: '50%', zIndex: 99, width: '100%' }}
              >
                <span
                  className="cursor-pointer position-absolute"
                  style={{
                    width: '58px',
                    height: '58px',
                    lineHeight: '58px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(59, 93, 80, 0.1)',
                    left: '-10px',
                  }}
                >
                  <span className="fa fa-chevron-left" />
                </span>

                <span
                  className="cursor-pointer position-absolute"
                  style={{
                    width: '58px',
                    height: '58px',
                    lineHeight: '58px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(59, 93, 80, 0.1)',
                    right: 0,
                  }}
                >
                  <span className="fa fa-chevron-right" />
                </span>
              </div>

              <div className="testimonial-slider">
                <div className="item">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 mx-auto">

                      {/* RESTORE: Original testimonial-block class */}
                      <div className="testimonial-block text-center">
                        <blockquote className="mb-5">
                          <p>
                            "I ordered a sofa and dining chairs from this store, and I am extremely satisfied with the quality.
                            The delivery was fast, the packaging was perfect, and the furniture looks amazing in my home.
                            Highly recommended for anyone looking for stylish and affordable furniture."
                          </p>
                        </blockquote>

                        <div className="author-info">
                          <div className="author-pic mb-5">
                            <img
                              src="/images/person-1.png"
                              alt="Rahul Sharma"
                              className="rounded-circle mx-auto"
                              style={{ maxWidth: '80px' }}
                            />
                          </div>

                          <h3
                            className="mb-0"
                            style={{ fontSize: '0.875rem', fontWeight: '700' }}
                          >
                            Rahul Sharma
                          </h3>

                          <span className="d-block mb-3">
                            Verified Customer, Delhi
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
