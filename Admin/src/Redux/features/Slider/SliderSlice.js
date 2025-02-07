import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/slider`;

// fetch Slider
export const fetchSliderData = () => async (dispatch) => {
    dispatch(getSliderLoad())
    try {
        const response = await axios.get(`${API_URL}/fetchSlider`);
        dispatch(getSliderSuccess(response.data.fetchSlider));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message;
        dispatch(getSliderFailure(errorMessage));
        toast.error(errorMessage)
    }
}


// fetchSliderById
export const fetchSliderById = (id) => async (dispatch) => {
    dispatch(getSliderLoad())
    try {
        const response = await axios.get(`${API_URL}/fetchSliderById/${id}`);
        dispatch(getSliderSuccess(response.data.fetchSliderById));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message;
        dispatch(getSliderFailure(errorMessage));
        toast.error(errorMessage)
    }
}

// add Slider Action
export const addSlider = (formData) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/addSlider`, formData);
        dispatch(addSliderSuccess(response.data.newSlider));
        toast.success(response.data.message);
        dispatch(fetchSliderData()) // refetch data
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Something went wrong!";
        dispatch(addSliderFailure(errorMessage));
        toast.error(errorMessage);
        
    }
}

// add Slider Action
export const updateSlider = (formData, id) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/updateSlider/${id}`, formData);
        dispatch(updateSliderSuccess(response.data.updateSlider));
        toast.success(response.data.message);
        dispatch(fetchSliderData())  // refetch data
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message;
        dispatch(updateSliderFailed(errorMessage));
        toast.error(errorMessage);
        
    }
}


// delete Slider Action
export const deleteSlider = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteSlider/${id}`);
        toast.success(response.data.message);
        dispatch(fetchSliderData());
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message;
        dispatch(getSliderFailure(errorMessage));
        toast.error(errorMessage);
    }
}





const SliderSlice = createSlice({
    name: "slider",
    initialState: {
        slides: [],
        status: "idle",
        error: null
    },
    reducers : {
        getSliderLoad (state) {
            state.status = 'loading',
            state.error = null
        },
        getSliderSuccess (state, action) {
            state.status = 'succeeded',
            state.slides = action.payload,
            state.error = null
        },
        getSliderFailure (state, action) {
            state.status = 'failed',
            state.error = action.payload
        },
        addSliderSuccess (state, action) {
            state.slides = action.payload,
            state.status = 'succeeded',
            state.error = null
        },
        addSliderFailure (state, action) {
            state.status = 'failed',
            state.error = action.payload
        },
        updateSliderSuccess (state, action) {
            state.status = 'succeeded',
            state.slides.push(action.payload);
            state.error = null
        },
        updateSliderFailed (state, action) {
            state.status = 'failed',
            state.error = action.payload
        }
    }
});

export const {
    getSliderLoad, 
    getSliderSuccess,
    getSliderFailure,
    addSliderSuccess,
    addSliderFailure,
    updateSliderSuccess,
    updateSliderFailed,
    } =
SliderSlice.actions;
export default SliderSlice.reducer;