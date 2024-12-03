import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const UnprotectedRoute = () => {
  const { token,otpVerified } = useSelector((state) => state.login);

  useEffect(() => {
    if (token) {
      toast.info('You are already logged in!');
    }
  }, []);


    // If token exists but OTP verification is required, redirect to OTP verification page
    
    if (token) {
      return <Navigate to="/" />;
    }
    // if (token) {
    //   return <Navigate to="/otp-verification" />;
    // }

    return <Outlet />;
};

export default UnprotectedRoute;
