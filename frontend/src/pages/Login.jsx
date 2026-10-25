import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";
import { auth } from "../firebase";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid) || "",
        };
        localStorage.setItem("user", userInfo.uid);
        dispatch(setUser(userInfo));
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Provide user-friendly error messages
        let errorMessage = "Login failed. Please try again.";
        if (error.code === "auth/configuration-not-found") {
          errorMessage = "Firebase Authentication is not enabled. Please enable Email/Password authentication in Firebase Console. See FIREBASE_AUTH_SETUP_FIX.md for instructions.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email. Please register first.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password. Please try again.";
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
          <h2>Login</h2>
          
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
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          
          {errorMsg && (
            <p style={{ color: '#dc3545', marginTop: '1rem', fontSize: '0.875rem' }}>{errorMsg}</p>
          )}
          
          <div className="login-footer">
            <span>New here? </span>
            <Link 
              to="/register" 
              className="login-link"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
