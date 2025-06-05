import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  // Try to get token and user from localStorage or sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");

  let user = null;
  try {
    user = JSON.parse(userStr);
  } catch (err) {
    console.error("Error parsing user from storage", err);
  }

  // If not logged in
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If role is required and doesn't match user's role
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to={`/${user.role.toLowerCase()}_profile`} />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
