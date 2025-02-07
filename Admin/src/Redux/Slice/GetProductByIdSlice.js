
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/product/getProductById`;


// Async thunk for fetching product by ID
export const getProductById = createAsyncThunk("getProductById/fetchProductById", async(id)=>{
    try {
        const response = await axios.get(`${API_URL}/`+id);
        console.log(response.data.singleProduct);
        return response.data.singleProduct;
    } catch (error) {
        console.log(error);
        if (!error.response) {
            throw new Error('Network error: Please check your connection.');
        }
    }
})

// Create get ProductById Slice
const getProductByIdSlice = createSlice({
    name: "getProductById",
    initialState : {
        item: null,
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers : (builder) =>{
        builder
        .addCase(getProductById.pending, (state) =>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.item = action.payload;
        })
        .addCase(getProductById.rejected, (state,action)=>{
            state.status = 'failed',
            state.error = action.error.message
        })
    }
});

export default getProductByIdSlice.reducer;
