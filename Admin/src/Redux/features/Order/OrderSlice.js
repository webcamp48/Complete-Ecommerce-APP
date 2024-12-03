import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const API_URL = 'http://localhost:3002/api/order'


// fetch all order
export const fetchAllOrders = () => async (dispatch) => {
    fetchAllOrderLoad()
    try {
        const response = await axios.get(`${API_URL}/getAllOrders`);
        const fetchOrder = response.data.allOrders;
        dispatch(fetchAllOrderSuccess(fetchOrder));
        toast.success(response.data.message);
    } catch (error) {
        console.log(error);
        const errorMessage = 'Failed to Fetch All Order';
        dispatch(fetchAllOrderFailed(errorMessage));
        toast.error(errorMessage);
    }
}


// updateOrderStatus 
export const updateOrderStatus = (orderId, orderStatus) => async (dispatch) => {
    fetchAllOrderLoad()
    try {
        const response = await axios.put(`${API_URL}/updateOrderStatus/${orderId}`, { orderStatus });
        const updateStatus = response.data.updateOrderStatus;
        dispatch(fetchAllOrders()) // refetch all order when status update
        toast.success(response.data.message);
    } catch (error) {
        console.error(error);
        const errorMessage = 'Failed to Update Order Status';
        dispatch(fetchAllOrderFailed(errorMessage));
        toast.error(errorMessage);
    }
}


// updatePaymentStatus 
export const updatePaymentStatus = (orderId, paymentStatus) => async (dispatch) => {
    fetchAllOrderLoad()
    try {
        const response = await axios.put(`${API_URL}/updatePaymentStatus/${orderId}`, { paymentStatus });
        const updateStatus = response.data.updatePaymentStatus;
        dispatch(fetchAllOrders()) // refetch all order when status update
        toast.success(response.data.message)
    } catch (error) {
        console.log( error);
        const errorMessage = 'Failed to Update Payment Status';
        dispatch(fetchAllOrderFailed(errorMessage));
        toast.error(errorMessage);
    }
}

// delete Order base on order Id
export const deleteOrder = (orderId) => async (dispatch) => {
    fetchAllOrderLoad()
        try {
            const response = await axios.delete(`${API_URL}/deleteOrder/${orderId}`);
            const deleteOrder = response.data.orderDelete;
            dispatch(fetchAllOrders());
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            const errorMessage = 'Failed to Delete Order';
            dispatch(fetchAllOrderFailed(errorMessage));
            toast.error(errorMessage);
        }
    }


// create slice
const OrderSlice = createSlice({
    name : 'order',
    initialState : {
        orders : [],
        status : "idle",
        error : null,
    },
    reducers : {
        // fetch All order Reducer
        fetchAllOrderLoad (state) {
            state.status = 'loading';
        },
        fetchAllOrderSuccess (state, action) {
            state.status = 'succeeded';
            state.orders = action.payload;
        },
        fetchAllOrderFailed (state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
    }
})

export const {
    fetchAllOrderLoad,
    fetchAllOrderSuccess,
    fetchAllOrderFailed,
} = OrderSlice.actions;

export default OrderSlice.reducer;