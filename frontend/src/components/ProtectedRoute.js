import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
  }

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to={`/${user.role.toLowerCase()}_profile`} />;
  }

  return children;
};

export default ProtectedRoute;
