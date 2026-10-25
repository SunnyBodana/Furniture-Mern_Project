import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";
import { auth } from "../firebase";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing
    if (errorMsg) setErrorMsg("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        // Update displayName in Firebase if username is provided
        if (formData.username.trim()) {
          try {
            await updateProfile(user, {
              displayName: formData.username.trim()
            });
          } catch (updateError) {
            console.error("Error updating profile:", updateError);
            // Continue even if displayName update fails
          }
        }
        
        // Store username in localStorage as fallback
        if (formData.username.trim()) {
          localStorage.setItem(user.uid, formData.username.trim());
        }
        
        const userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || formData.username.trim() || localStorage.getItem(user.uid) || "",
        };
        localStorage.setItem("user", userInfo.uid);
        dispatch(setUser(userInfo));
        navigate('/');
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Provide user-friendly error messages
        let errorMessage = "Registration failed. Please try again.";
        if (error.code === "auth/configuration-not-found") {
          errorMessage = "Firebase Authentication is not enabled. Please enable Email/Password authentication in Firebase Console. See FIREBASE_AUTH_SETUP_FIX.md for instructions.";
        } else if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already registered. Please login instead.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password should be at least 6 characters long.";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.code === "auth/invalid-api-key") {
          errorMessage = "Invalid Firebase API key. Please check your .env file configuration.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        setErrorMsg(errorMessage);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Navbar />
      {/* RESTORE: Original login-wrapper class */}
      <div className="login-wrapper">
        <form 
          className="login-form" 
          onSubmit={handleSubmit}
        >
          <h2>Register</h2>
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          
          {errorMsg && (
            <p style={{ color: '#dc3545', marginTop: '1rem', fontSize: '0.875rem' }}>{errorMsg}</p>
          )}
          
          <div className="login-footer">
            <span>Already have an account? </span>
            <Link 
              to="/login" 
              className="login-link"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
