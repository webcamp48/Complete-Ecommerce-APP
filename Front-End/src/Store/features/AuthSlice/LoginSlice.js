import {  createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// Async function to handle login
export const loginUser = (formData) => async (dispatch) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);

        const { user, token, message } = response.data;
        dispatch(loginUserSuccess({ token, userId: user._id , otpVerified : user.otpVerified}));
        toast.success(message);
        return { type: 'login/loginUserSuccess' };
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        dispatch(loginUserFailure(errorMessage));
        toast.error(errorMessage);
    }
};


// LoginSlice
const LoginSlice = createSlice({
    name : "login",
    initialState : {
        token: localStorage.getItem("authToken") || "",
        userId: localStorage.getItem("userId") || "",
        status : "idle",
        error : null,
        otpVerified: false,
    },
    reducers : {
        loginUserSuccess : (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("authToken", action.payload.token);
            state.userId = action.payload.userId;    //remove
            localStorage.setItem("userId", action.payload.userId);
            state.otpVerified = action.payload.otpVerified;
            console.log("action.payload.otpVerified", action.payload.otpVerified);
            
            state.status = "succeeded";
            state.error = null;
        },
        loginUserFailure : (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            state.token = "";
            state.userId = "";
        },
        logoutUser : (state) => {
            state.token = '';
            state.userId = '';
            state.status = "idle";
            state.error = null;
            state.otpVerified = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
        }
    },

});
// Action creators
export const {loginUserSuccess, loginUserFailure, logoutUser} = LoginSlice.actions;

export default LoginSlice.reducer;