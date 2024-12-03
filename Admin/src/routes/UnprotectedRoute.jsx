import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
  const { token } = useSelector((state) => state.adminAuth);

  // If the user is authenticated, redirect to home
  if (token) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the component passed to the route
  return <Outlet />;
};

export default UnprotectedRoute;
