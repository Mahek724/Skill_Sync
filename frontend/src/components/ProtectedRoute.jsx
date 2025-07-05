import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");

  let user = null;
  try {
    user = JSON.parse(userStr);
  } catch (err) {
    console.error("Error parsing user from storage", err);
  }

  const location = useLocation();
  const currentPath = location.pathname;

  // If not logged in
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // If role is required but doesn't match user's role
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    const userRole = user.role.toLowerCase();

    // Allow access to valid profile or dashboard path
    const validPaths = [`/${userRole}_profile`, `/${userRole}_dashboard`];
    if (!validPaths.includes(currentPath)) {
      return <Navigate to={`/${userRole}_profile`} />;
    }
  }

  return children;
};

export default ProtectedRoute;
