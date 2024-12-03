import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:3002/api/slider'


// fetch Slider Home
export const fetchSliderHome = () => async (dispatch) => {
    dispatch(getSliderHomeRequest());
    try {
        const response = await axios.get(`${API_URL}/fetchSlider`);
        dispatch(getSliderHomeSuccess(response.data.fetchSlider));
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Failed To fetch Slider Content";
        dispatch(getSliderHomeFailure(errorMessage));
        toast.error(errorMessage);
    }
}

const SliderHomeSlice = createSlice({
    name: "sliderHome",
    initialState: {
        sliderData: [],
        status : 'idle',
        error : null
    },
    reducers: {
        getSliderHomeRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        getSliderHomeSuccess(state, action) {
            state.status = 'succeeded';
            state.sliderData  = action.payload;
        },
        getSliderHomeFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
})

export const { getSliderHomeRequest, getSliderHomeSuccess, getSliderHomeFailure } = SliderHomeSlice.actions;
export default SliderHomeSlice.reducer;