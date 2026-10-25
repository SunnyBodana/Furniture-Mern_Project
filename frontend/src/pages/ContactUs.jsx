import React, { useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/home/Navbar';
import FooterSection from '../components/home/FooterSection';
import { useToast } from '../contexts/ToastContext';

export default function ContactUs() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  function handleInputChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  // BUG FIX #6: Form had no onSubmit handler — it would do a full page reload.
  // Now handles submission and shows a confirmation toast.
  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    showToast('Message sent! We will get back to you soon.', 'success');
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  }
  return (
    <>
      <Navbar />

      {/* RESTORE: Original hero section for contact page */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">

                <h1>Contact Us</h1>

                <p>
                  Have questions about our products, orders, or services?
                  Our team is here to help you. Feel free to reach out anytime.
                </p>

                <p className="mb-0">
                  <Link to="/chair" className="btn btn-secondary me-2">
                    Shop Furniture
                  </Link>

                  <Link to="/sofa" className="btn btn-white-outline">
                    View Collection
                  </Link>
                </p>

              </div>
            </div>

            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img
                  src="/images/couch.png"
                  className="img-fluid"
                  alt="Customer support and contact section"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESTORE: Original untree_co-section class */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 pb-4">

              <div className="row mb-5">

                <div className="col-lg-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded"
                      style={{
                        width: '50px',
                        height: '50px',
                        lineHeight: '50px',
                        textAlign: 'center',
                        backgroundColor: '#3b5d50',
                        marginRight: '1.25rem',
                        color: '#ffffff',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </div>

                    <div>
                      <p className="mb-0">
                        21 MG Road, Connaught Place, New Delhi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded"
                      style={{
                        width: '50px',
                        height: '50px',
                        lineHeight: '50px',
                        textAlign: 'center',
                        backgroundColor: '#3b5d50',
                        marginRight: '1.25rem',
                        color: '#ffffff',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                      </svg>
                    </div>

                    <div>
                      <p className="mb-0">
                        support@furni.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded"
                      style={{
                        width: '50px',
                        height: '50px',
                        lineHeight: '50px',
                        textAlign: 'center',
                        backgroundColor: '#3b5d50',
                        marginRight: '1.25rem',
                        color: '#ffffff',
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg>
                    </div>

                    <div>
                      <p className="mb-0">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="firstName">
                        First Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="lastName">
                        Last Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="text-black" htmlFor="email">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-5">
                  <label className="text-black" htmlFor="message">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    cols={30}
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Send Message
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
