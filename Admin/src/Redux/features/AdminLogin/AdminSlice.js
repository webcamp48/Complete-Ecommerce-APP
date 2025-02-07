// store/slices/adminAuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


// Action for login
export const adminLogin = (formData, navigate) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/adminLogin`;
    const response = await axios.post(API_URL, formData);
    localStorage.setItem('adminToken', response.data.token);
    dispatch(loginSuccess(response.data));
    toast.success(response.data.message);
    navigate("/");
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};


const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
      admin: null,
      token: localStorage.getItem('adminToken') || null,
      loading: false,
      error: null,
    },
    reducers: {
      loginStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginSuccess: (state, action) => {
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.loading = false;
      },
      loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      logout: (state) => {
          state.admin = null;
          state.token = null;
        localStorage.removeItem('adminToken');
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure, logout } = adminAuthSlice.actions;
  export default adminAuthSlice.reducer;