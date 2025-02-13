import React from "react";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import LoginSignUp from "./Pages/Auth/LoginSignUp";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import TopBar from "./Components/TopBar/TopBar";
import Navbar from "./Components/Navbar/Navbar";
import NavMenu from "./Components/NavMenu/NavMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPVerification from "./Pages/Auth/OTPVerification";
import Checkout from "./Pages/Checkout";
import SearchProduct from "./Components/SearchProduct/SearchProduct";
import ContactUs from "./Pages/ContactUs";
import VerifyPayementOrder from "./Pages/VerifyPayementOrder";
import ResetPassword from "./Pages/Auth/ResetPassword";
import UserProfile from "./Pages/UserProfile";
import UserOrderList from "./Pages/UserOrderList";
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import UnprotectedRoute from './Pages/Auth/UnprotectedRoute';
import RealTimeChat from "./Pages/Chats/RealTimeChat";


const Router = () => {
  return (
    <div className="router">
      <TopBar />
      <Navbar />
      <NavMenu />
      <ToastContainer />
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/productdetails/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/searchProduct" element={<SearchProduct />} />



        {/* Unprotected routes (for unauthenticated users) */}
        <Route element={<UnprotectedRoute />}>
          <Route path="/loginSignup" element={<LoginSignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
        </Route>

        {/* Protected routes (for authenticated users) */}
        <Route element={<ProtectedRoute  checkCart={true}/>}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verifyOrder" element={<VerifyPayementOrder />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<RealTimeChat />} />
          <Route path="/order" element={<UserOrderList />} />
          <Route path="/profile" element={<UserProfile />}/>
        </Route>

      </Routes>
      <Footer />
    </div>
  );
};

export default Router;
