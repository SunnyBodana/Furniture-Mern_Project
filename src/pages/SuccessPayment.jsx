import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../store/Slices/cartSlice";

export default function SuccessPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("cart");
    dispatch(clearCart());
  }, [dispatch]);

  // RESTORE: Original styling using inline styles to match simple, clean design
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #22c55e, #16a34a)',
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
        <FaCheckCircle style={{
          fontSize: '4rem',
          color: '#22c55e',
          marginBottom: '1.25rem',
          display: 'block',
          margin: '0 auto 1.25rem'
        }} />
        <h1 style={{
          fontSize: '1.5rem',
          marginBottom: '0.625rem',
          color: '#1f2937',
          fontWeight: '600'
        }}>Payment Successful</h1>
        <p style={{
          fontSize: '1rem',
          color: '#374151',
          marginBottom: '1.25rem'
        }}>Thank you for your order!</p>
        <button 
          style={{
            backgroundColor: '#22c55e',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.625rem 1.25rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
