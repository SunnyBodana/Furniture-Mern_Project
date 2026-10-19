// components/AdminRoute.jsx
// BUG FIX #3: Admin routes were only checking if user was logged in (via ProtectedRoute),
// but NOT if they were an admin. Any logged-in user could access admin pages.
// This component calls the backend's check-admin endpoint to verify admin status.

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import api from "../services/api";

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = result
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Call backend to verify admin status
    api.get('/auth/check-admin')
      .then(() => {
        setIsAdmin(true);
      })
      .catch(() => {
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Still checking admin status → show nothing (no UI change)
  if (loading) {
    return null;
  }

  // Logged in but not admin → redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
