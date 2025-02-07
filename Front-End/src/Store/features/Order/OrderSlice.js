import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/order`;


// create User Order Action

export const createUserOrder = (userId, shippingAddress, paymentMethod, totalAmount ) => async (dispatch) => {
    const token = localStorage.getItem("authToken") || "";

    try {
        const orderData = {
            userId,
            paymentMethod,
            totalAmount,
            shippingAddress
        };
        const response = await axios.post(`${API_URL}/createOrder`, orderData, {headers : {token}});
        const userOrderData = response.data;
        dispatch(createOrderSuccess(userOrderData));
        toast.success(response.data.message)

        if (userOrderData.sessionUrl) {
            return userOrderData.sessionUrl;
        } else {
            throw new Error("Session URL is missing in the response.");
        }
    } catch (error) {
        console.log("create user order error", error);
        const errorMessage = error.response?.data?.message || "Failed to create Order";
        dispatch(createOrderFailed(errorMessage));
        toast.error(errorMessage);
    }
}

// verify order Payment Action
export const verifyOrdersPayment = (success, orderId, navigate) => async (dispatch) => {
    try {
        // Send request to verify the order payment
        const response = await axios.post(`${API_URL}/verifyOrder`, { success, orderId } );
        

        if (response.data.success) {
            dispatch(verifyOrderSuccess(orderId)); 
            toast.success(response.data.message);
            navigate('/order');
        } else {
            dispatch(verifyOrderFailed("Payment verification failed. Please try again")); 
            toast.error(response.data.message); 
            navigate('/'); 
        }
    } catch (error) {
        console.error("Error verifying the order payment:", error);
        const errorMessage = error.response?.data?.message || "Failed to verify order payment";
        dispatch(verifyOrderFailed(errorMessage));
        toast.error(errorMessage);
        navigate('/'); 
    }
};


// fetch User Order on base UserId
export const fetchUserOrder = ({userId}) => async (dispatch) => {

    const token = localStorage.getItem("authToken") || "";
    try {
        const response = await axios.get(`${API_URL}/getOrderByUserId/${userId}`, {
            headers : {token}
        });
        const fetchOrderData = response.data.orderById;
        dispatch(fetchUserOrderSuccess(fetchOrderData));
    } catch (error) {
        console.log("fetch user order error", error);
        const errorMessage = error.response?.data?.message || "Failed to Fetch User Order";
        dispatch(fetchUserOrderFailed(errorMessage))
        toast.error(errorMessage)
    }
}





const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        status : 'idle',
        error: null
    },
    reducers : {
        createOrderSuccess(state, action) {
            state.orders.push(action.payload);
            state.status = 'success';
        },
        createOrderFailed(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        fetchUserOrderLoad : (state) =>{
            state.status = 'loading';
            state.error = null
        },
        fetchUserOrderSuccess (state, action){
            state.orders = action.payload;
            state.status = 'success';
        },
        fetchUserOrderFailed(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        verifyOrderSuccess(state, action) {
            const orderId = action.payload;
            state.orders = state.orders.map(order =>
                order._id === orderId ? { ...order, paymentStatus: 'success' } : order
            );
            state.status = 'success';
        },
        verifyOrderFailed(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})


export const {
    createOrderSuccess,
    createOrderFailed,
    fetchUserOrderLoad,
    fetchUserOrderSuccess,
    fetchUserOrderFailed,
    verifyOrderSuccess,
    verifyOrderFailed

} = OrderSlice.actions;

export default OrderSlice.reducer