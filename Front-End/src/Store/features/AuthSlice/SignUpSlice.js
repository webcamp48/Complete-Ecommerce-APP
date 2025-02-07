import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const signupUser = createAsyncThunk("auth/signupUser", async (formData, { rejectWithValue })=> {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData);

        if(response.data.success){
            toast.success(response.data.message);
            return response.data
        }else{
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log("error msg", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
        toast.error(errorMessage);
        return rejectWithValue(error.response.data);
    }
})

// SignUpSlice
const SignUpSlice =  createSlice({
    name: 'signup',
    initialState : {
        loading: false,
        status : "idle",
        error: null,
    },

    extraReducers : (builder)  => {
        builder
        .addCase(signupUser.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(signupUser.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload.message;
        })
    }
});

export default SignUpSlice.reducer;