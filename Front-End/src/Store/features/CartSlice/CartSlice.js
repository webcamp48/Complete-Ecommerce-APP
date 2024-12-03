import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:3002/api/cart';

// Async Action Creators

// fetchCart
export const fetchCart = (userId) => async (dispatch) =>{
    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken") || "";

    try {
        const response = await axios.get(`${API_URL}/fetchCart/${userId}`, {
            headers: { token }
        });
        const fetchData = response.data;
        dispatch(fetchCartSuccess(fetchData));
        toast.success(response.message)
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch cart.";
        dispatch(fetchCartFailed(errorMessage));
        toast.error(errorMessage);
    }
}

// addToCart
export const addToCart = ({ userId, productId, quantity, size,color  }) => async (dispatch) =>{
    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken") || "";

    
    try {
        const response = await axios.post(`${API_URL}/addCart`, {userId, productId, quantity, size,color  }, { headers : {token}});

        const addCartData = response.data;
        dispatch(addToCartSuccess(addCartData));
        toast.success(response.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to add to cart.";
        dispatch(addToCartFailed(errorMessage));
        toast.error(errorMessage);
    }
}

// removeFromCart
export const removeFromCart = ({userId, productId}) => async (dispatch) =>{
    // Retrieve token from localStorage
    const token = localStorage.getItem("authToken") || "";
    try {
        const response = await axios.delete(`${API_URL}/removeCart`, {
            data : {userId, productId},
            headers : {token}
        });
        const removeCartData = response.data;
        dispatch(removeFromCartSuccess(removeCartData));
        toast.success(response.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to remove from cart.";
        dispatch(removeFromCartFailed(errorMessage));
        toast.error(errorMessage);
    }
}



const CartSlice = createSlice({
    name: "cart",
    initialState:{
        cartItems: [],
        status : 'idle',
        error: null
    },
    reducers:{
        fetchCartLoad (state) {
            state.status = 'loading';
        },
        fetchCartSuccess(state, action){
            state.cartItems = action.payload.cart.cartItems;
            state.status = 'succeeded';
        },
        fetchCartFailed(state, action){
            state.status = 'failed';
            state.error = action.payload;
        },
        addToCartSuccess(state, action){
            // state.cartItems.push(action.payload);
            state.cartItems =  action.payload.cart.cartItems;
            state.status = 'succeeded';
        },
        addToCartFailed(state, action){
            state.status = 'failed'
            state.error = action.payload;
        },
        removeFromCartSuccess(state, action){
            state.cartItems =  action.payload.cart.cartItems;
            state.status = 'succeeded';
        },
        removeFromCartFailed(state, action){
            state.status = 'failed'
            state.error = action.payload;
        }
    }
})

export const {
    fetchCartSuccess,
    fetchCartFailed,
    addToCartSuccess,
    addToCartFailed,
    removeFromCartSuccess,
    removeFromCartFailed,
} = CartSlice.actions;

export default CartSlice.reducer;