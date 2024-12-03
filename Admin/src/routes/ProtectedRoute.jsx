// ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.adminAuth);

  useEffect(()=> {
    if (!token) {
        toast.error("Please Login First!")
    }
  }, [token])
  // If the user is not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the component passed to the route
  return <Outlet />;
};

export default ProtectedRoute;
