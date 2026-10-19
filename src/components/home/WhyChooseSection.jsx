import React from 'react';

// RESTORE: WhyChooseSection with original CSS classes
export default function WhyChooseSection() {
  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">

            <h2 className="section-title mb-4">Why Choose Us</h2>

            <p className="mb-5">
              We are committed to providing high-quality furniture that combines comfort,
              durability, and modern design. Our goal is to make your home beautiful and functional.
            </p>

            <div className="row my-5">

              <div className="col-6 col-md-6">
                {/* RESTORE: Original feature class */}
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/truck.svg"
                      alt="Fast and Free Delivery"
                      className="img-fluid"
                    />
                  </div>

                  <h3>Fast &amp; Free Shipping</h3>

                  <p>
                    Get your furniture delivered quickly and safely to your doorstep
                    with our reliable and free delivery service.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/bag.svg"
                      alt="Easy Online Shopping"
                      className="img-fluid"
                    />
                  </div>

                  <h3>Easy to Shop</h3>

                  <p>
                    Browse, compare, and order your favorite furniture easily
                    through our simple and user-friendly website.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/support.svg"
                      alt="Customer Support"
                      className="img-fluid"
                    />
                  </div>

                  <h3>24/7 Support</h3>

                  <p>
                    Our support team is always available to help you with orders,
                    payments, and product-related queries.
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img
                      src="/images/return.svg"
                      alt="Easy Return Policy"
                      className="img-fluid"
                    />
                  </div>

                  <h3>Hassle Free Returns</h3>

                  <p>
                    Not satisfied with your purchase? Enjoy easy and quick returns
                    with our transparent return policy.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-5">
            {/* RESTORE: Original img-wrap class */}
            <div className="img-wrap">
              <img
                src="/images/why-choose-us-img.jpg"
                alt="Modern furniture showroom and home setup"
                className="img-fluid"
                style={{ borderRadius: '20px' }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
