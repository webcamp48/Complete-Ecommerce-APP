import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// fetch Contact Us Message action
export const fetchContactUsMessage = () => async (dispatch) => {
    dispatch(contactUsRequest());
    try {
        const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/contact/fetchContactUs`;
        const response = await axios.get(API_URL);        
        dispatch(contactUsSuccess(response.data.fetchContact));
    } catch (error) {
        console.error(error);
        const errorMessage = error.response.data.message;
        dispatch(contactUsFailure(errorMessage))
        toast.error(errorMessage);
    }
}

// DELETE cntact Us Message Action
export const deleteContactUsMessage = (id) => async (dispatch) => {
    dispatch(contactUsRequest());
    try {
        const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/contact/deleteContactUs/${id}`;
        const response = await axios.delete(API_URL);        
        dispatch(fetchContactUsMessage())
        toast.success(response.data.message);
    } catch (error) {
        console.log(error);
        const errorMessage = error.response.data.message;
        dispatch(contactUsFailure(errorMessage))
        toast.error(errorMessage);
    }
}

// slice Contact Us
const ContactUsSlice = createSlice({
    name: "contact",
    initialState : {
        contactUs: [],
        status : "idle",
        error : null
    },
    reducers : {
        contactUsRequest(state) {
            state.status = "loading";
            state.error = null;
        },
        contactUsSuccess(state, action) {
            state.status = "succeeded";
            state.contactUs = action.payload;
        },
        contactUsFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

// export reducer
export const { contactUsRequest, contactUsSuccess, contactUsFailure } = ContactUsSlice.actions
export default  ContactUsSlice.reducer;