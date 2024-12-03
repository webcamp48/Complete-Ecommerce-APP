import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = `http://localhost:3002/api/product/fetchAllProduct`;

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async ()=>{
    try {
        const response = await axios.get(API_URL);
        console.log(response.data.productsData);
        return response.data.productsData;
    } catch (error) {
        if (!error.response) {
            throw new Error('Network error: Please check your connection.');
        }
    }
})


// Create fetch product Slice
const FetchProductSlice = createSlice({
    name : "products",
    initialState : {
        items : [],
        status : 'idle',
        error : null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});


export default FetchProductSlice.reducer;