import React from 'react';
import { Link } from 'react-router';

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>
                Premium Furniture <span className="d-block">For Modern Homes</span>
              </h1>

              <p>
                Upgrade your home with stylish, comfortable, and durable furniture.
                Explore our wide range of sofas, chairs, and home décor made for everyday living.
              </p>

              <p className="mb-0">
                <Link to="/chair" className="btn btn-secondary me-2">
                  Buy Chairs
                </Link>

                <Link to="/sofa" className="btn btn-white-outline">
                  View Sofas
                </Link>
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img 
                src="/images/couch.png" 
                className="img-fluid" 
                alt="Luxury sofa for living room"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
