import React from 'react';
import { Link } from 'react-router';

// RESTORE: FooterSection with original CSS classes
export default function FooterSection() {
  return (
    <footer className="footer-section">
      <div className="container position-relative">

        {/* RESTORE: Original sofa-img class */}
        <div
          className="sofa-img position-absolute d-none d-lg-block"
          style={{ top: '-12rem', right: 0, zIndex: 10 }}
        >
          <img src="/images/sofa.png" alt="Modern sofa furniture" style={{ maxWidth: '380px' }} />
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div
              className="mb-5 mb-lg-0 position-relative"
              style={{ zIndex: 20, marginTop: '6rem' }}
            >
              <h3 className="d-flex align-items-center mb-4">
                <span className="me-2">
                  <img src="/images/envelope-outline.svg" alt="Newsletter email icon" className="img-fluid" />
                </span>
                <span>Subscribe for Offers & Updates</span>
              </h3>

              {/* RESTORE: Original subscription-form class */}
              <form onSubmit={(e) => e.preventDefault()} className="subscription-form row g-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    <span className="fa fa-paper-plane" />
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

        <div className="row g-5 mb-5">

          <div className="col-lg-4">

            {/* RESTORE: Original footer-logo-wrap class */}
            <div className="footer-logo-wrap mb-4">
              <Link to="/">
                Furni<span>.</span>
              </Link>
            </div>

            <p className="mb-4">
              Furni is your trusted destination for premium furniture.
              We offer stylish, durable, and affordable products designed
              to make your home comfortable and elegant.
            </p>

            {/* RESTORE: Original custom-social class */}
            <ul className="custom-social list-unstyled">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <span className="fa fa-brands fa-facebook-f" />
                </a>
              </li>

              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span className="fa fa-brands fa-twitter" />
                </a>
              </li>

              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <span className="fa fa-brands fa-instagram" />
                </a>
              </li>

              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span className="fa fa-brands fa-linkedin" />
                </a>
              </li>
            </ul>

          </div>

          <div className="col-lg-8">
            <div className="row" style={{ marginTop: '3.5rem' }}>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/">About Us</Link></li>
                  <li className="mb-2"><Link to="/chair">Our Services</Link></li>
                  <li className="mb-2"><a href="#blog">Latest Blog</a></li>
                  <li className="mb-2"><Link to="/contact_us">Contact Support</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/contact_us">Customer Support</Link></li>
                  <li className="mb-2"><Link to="/contact_us">Help Center</Link></li>
                  <li className="mb-2"><Link to="/contact_us">Live Assistance</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/">Careers</Link></li>
                  <li className="mb-2"><Link to="/">Our Team</Link></li>
                  <li className="mb-2"><Link to="/">Management</Link></li>
                  <li className="mb-2"><Link to="/">Privacy Policy</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/sofa">Luxury Sofa</Link></li>
                  <li className="mb-2"><Link to="/table">Wooden Dining Set</Link></li>
                  <li className="mb-2"><Link to="/chair">Office Chair</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
