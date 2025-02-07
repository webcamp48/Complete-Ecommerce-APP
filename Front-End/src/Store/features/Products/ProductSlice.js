import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Fetch all products
export const fetchAllProducts = () => async (dispatch)=>{
    dispatch(fetchAllProductsLoad());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/fetchAllProduct`);

        const allProduct = response.data.productsData;
        dispatch(fetchAllProductsSuccess(allProduct));
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.message || "Failed to fetch products";
        dispatch(fetchAllProductsFailure(errorMessage))
        toast.error(errorMessage);
    }
}


// fetch New Collectins
export const fetchNewCollectins = () => async (dispatch) =>{
    dispatch(fetchNewCollectionsLoad())
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/newCollectionProducts`);

        const newCollection = response.data.latestProduct;
        dispatch(fetchNewCollectionsSuccess(newCollection));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Failed to fetch New Collection products";
        dispatch(fetchNewCollectionsFailure(errorMessage));
        toast.error(errorMessage);
    }
}

// fetch Related Product according category
export const fetchRelatedProducts = (category) => async (dispatch) =>{
    dispatch(fetchRelatedProductsLoad());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/relatedProducts/${category}`);

        
        const relatedData = response.data.relatedProduct;
        dispatch(fetchRelatedProductsSuccess(relatedData));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Failed to Fetch Related Products";
        dispatch(fetchRelatedProductsFailure(errorMessage));
    }
}


// fetch search Product
export const searchProducts = (searchQuery) => async (dispatch) => {
    dispatch(searchProductsLoad());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/searchproducts/?search=${searchQuery}`);

        const searchProduct = response.data.searchProduct;
        dispatch(searchProductsSuccess(searchProduct));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response && error.response.data && error.response.data.message 
        ? error.response.data.message 
        : 'Failed to Fetch Search Product!';
        dispatch(searchProductsFailure(errorMessage));
        toast.error(errorMessage)
    }
}


// Product Slice
const ProductSlice = createSlice({
    name: "products",
    initialState: {
        allProducts : [],
        newCollections : [],
        relatedProducts : [],
        searchProduct : [],
        statusAllProducts: 'idle',
        statusNewCollections: 'idle',
        statusRelatedProducts: 'idle',
        statusSearchProduct: 'idle',
        errorAllProducts: null,
        errorNewCollections: null,
        errorRelatedProducts: null,
        errorSearchProduct: null,
    },
    reducers: {
        fetchAllProductsLoad (state) {
            state.statusAllProducts = 'loading';
        },
        fetchAllProductsSuccess (state, action) {
            state.allProducts = action.payload;
            state.statusAllProducts = 'succeeded';
        },
        fetchAllProductsFailure (state, action) {
            state.errorAllProducts  = action.payload;
            state.statusAllProducts = 'failed';
        },
        fetchNewCollectionsLoad (state) {
            state.statusNewCollections = 'loading';
        },
        fetchNewCollectionsSuccess (state, action) {
            state.newCollections = action.payload;
            state.statusNewCollections = 'succeeded';
        },
        fetchNewCollectionsFailure (state, action) {
            state.errorNewCollections  = action.payload;
            state.statusNewCollections = 'failed';
        },
        fetchRelatedProductsLoad (state) {
            state.statusRelatedProducts  = 'loading';
            state.relatedProducts = []
        },
        fetchRelatedProductsSuccess (state, action){            
            state.relatedProducts = action.payload;
            state.statusRelatedProducts  = 'succeeded';
        },
        fetchRelatedProductsFailure (state,action) {
            state.errorRelatedProducts  = action.payload;
            state.statusRelatedProducts  = 'failed';
        },
        searchProductsLoad(state) {
            state.statusSearchProduct = 'loading';
            state.errorSearchProduct = null;
        },
        searchProductsSuccess(state, action) {
            state.searchProduct = action.payload;
            state.statusSearchProduct = 'succeeded';
        },
        searchProductsFailure(state, action) {
            state.statusSearchProduct = 'failed';
            state.errorSearchProduct = action.payload;
        }
    },
})

const {
    fetchAllProductsLoad,
    fetchAllProductsSuccess, 
    fetchAllProductsFailure, 
    fetchNewCollectionsLoad,
    fetchNewCollectionsSuccess, 
    fetchNewCollectionsFailure,
    fetchRelatedProductsLoad,
    fetchRelatedProductsSuccess,
    fetchRelatedProductsFailure,
    searchProductsLoad,
    searchProductsSuccess,
    searchProductsFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;