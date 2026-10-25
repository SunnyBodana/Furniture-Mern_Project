import React from 'react';
import { Link } from 'react-router';

// RESTORE: HelpSection with original CSS classes
export default function HelpSection() {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">

          <div className="col-lg-7 mb-5 mb-lg-0">
            {/* RESTORE: Original imgs-grid class */}
            <div className="imgs-grid">
              <div className="grid grid-cols-27" style={{ position: 'relative' }}>

                <div className="col-span-18 row-span-[27]">
                  <img
                    src="/images/img-grid-1.jpg"
                    alt="Modern living room interior design"
                    className="img-fluid"
                    style={{ borderRadius: '20px' }}
                  />
                </div>

                <div
                  className="col-span-9 col-start-19 row-span-5"
                  style={{ paddingLeft: '1.25rem' }}
                >
                  <img
                    src="/images/img-grid-2.jpg"
                    alt="Luxury bedroom furniture setup"
                    className="img-fluid"
                    style={{ borderRadius: '20px' }}
                  />
                </div>

                <div
                  className="col-span-3 col-start-14 row-span-[22] row-start-6"
                  style={{ paddingTop: '1.25rem' }}
                >
                  <img
                    src="/images/img-grid-3.jpg"
                    alt="Stylish home office furniture design"
                    className="img-fluid"
                    style={{ borderRadius: '20px' }}
                  />
                </div>

              </div>
            </div>
          </div>

          <div className="col-lg-5 ps-lg-5">

            <h2 className="section-title mb-4">
              We Help You Create a Stylish & Comfortable Home
            </h2>

            <p className="mb-4">
              Our expert-designed furniture collections help you transform
              your living space into a modern, elegant, and functional home.
              From sofas to bedroom sets, we provide everything you need.
            </p>

            {/* RESTORE: Original custom-list class */}
            <ul className="custom-list">
              <li>Wide range of modern and classic furniture designs</li>
              <li>High-quality materials for long-lasting durability</li>
              <li>Affordable pricing with exciting offers</li>
              <li>Professional delivery and installation support</li>
            </ul>

            <p className="mb-0">
              <Link to="/chair" className="btn">
                Explore Collection
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
