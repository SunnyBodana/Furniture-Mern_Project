import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function CancelPayment() {
  const navigate = useNavigate();

  // RESTORE: Original styling using inline styles to match simple, clean design
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f87171, #ef4444)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <FaTimesCircle style={{
          fontSize: '4rem',
          color: '#f87171',
          marginBottom: '1.25rem',
          display: 'block',
          margin: '0 auto 1.25rem'
        }} />
        <h1 style={{
          fontSize: '1.5rem',
          marginBottom: '0.625rem',
          color: '#1f2937',
          fontWeight: '600'
        }}>Payment Cancelled</h1>
        <p style={{
          fontSize: '1rem',
          color: '#374151',
          marginBottom: '1.25rem'
        }}>Your payment was cancelled. No charges were made.</p>
        <button 
          style={{
            backgroundColor: '#f87171',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.625rem 1.25rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ef4444'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f87171'}
          onClick={() => navigate("/cart")}
        >
          Return to Cart
        </button>
      </div>
    </div>
  );
}
