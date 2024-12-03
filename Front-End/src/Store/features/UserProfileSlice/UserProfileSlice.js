import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:3002/api/auth'

export const fetchUserProfile = ({ userId }) => async (dispatch) => {
    dispatch(fetchUserProfileLoad());
    try {
        const response = await axios.get(`${API_URL}/fetchUserProfile/${userId}`);
        dispatch(fetchUserProfileSuccess(response.data.user));
        toast.success(response.message);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        const errorMessage = 'Failed to fetch user profile data';
        dispatch(fetchUserProfileFailed(errorMessage));
        toast.error(errorMessage);
    }
};




// update User Profile action
export const updateUserProfile = ({userId, formData}) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/updateUserProfile/${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        const profileData = response.data;
        dispatch(updateUserProfileSuccess(profileData));
        dispatch(fetchUserProfile({ userId }));
        toast.success(response.data.message);
    } catch (error) {
        console.error(error);
        const errorMessage = 'Failed to  Update User Profile successfully';
        dispatch(updateUserProfileFailed(errorMessage))
        toast.error(errorMessage);
    }
}


// user profile slice
const UserProfileSlice = createSlice({
    name: "profile",
    initialState : {
        profileData: null,
        status : "idle",
        error: null,
    },
    reducers : {
        fetchUserProfileLoad (state) {
            state.status = "loading";
            state.profileData = null;
        },
        fetchUserProfileSuccess (state, action){
            state.status = "succeeded";
            state.profileData = action.payload;
        },
        fetchUserProfileFailed(state, action)  {
            state.status = 'failed',
            state.error = action.payload
        },
        updateUserProfileSuccess (state, action) {
            state.status = 'succeeded';
            state.profileData = action.payload;
        },
        updateUserProfileFailed (state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});


export const {
    fetchUserProfileLoad,
    fetchUserProfileSuccess,
    fetchUserProfileFailed,
    updateUserProfileSuccess,
    updateUserProfileFailed
} = UserProfileSlice.actions;
export default UserProfileSlice.reducer;

