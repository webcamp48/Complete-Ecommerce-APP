import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCart } from '../../Store/features/CartSlice/CartSlice';

const ProtectedRoute = ({ checkCart = false }) => {
  const { token, userId } = useSelector((state) => state.login);  
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const dispatch = useDispatch();
  const [isCartFetched, setIsCartFetched] = useState(false);



  useEffect(() => {
    if (token) {
      // Fetch cart data if needed
      dispatch(fetchCart(userId))
        .then(() => setIsCartFetched(true))
        .catch(() => setIsCartFetched(true));
    } else {
      setIsCartFetched(true);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!token) {
      toast.error('You need to log in to access this page.');
    } else if (checkCart && isCartFetched && cartItems.length === 0) {
      toast.warning('Your cart is empty. Add items before proceeding to checkout.');
    }
  }, [token, cartItems, checkCart, isCartFetched]);

  
  if (!token) {
    return <Navigate to="/loginSignup" />;
  } else if (checkCart && isCartFetched && cartItems.length === 0) {
    return <Navigate to="/cart" />;
  } else {
    return <Outlet />;
  }
};



export default ProtectedRoute;


