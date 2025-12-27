import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, setShowLogin, children }) => {
  if (!user) {
    setShowLogin(true); // Show login popup
    return <Navigate to="/" replace />; // Redirect to homepage
  }

  return children;
};

export default ProtectedRoute;
