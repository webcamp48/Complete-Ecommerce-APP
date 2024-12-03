import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// action thunk for fetching all users
export const fetchAllUserMange = () => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get("http://localhost:3002/api/auth/getAllUsers");        
        dispatch(getUserSuccess(response.data.users));
    } catch (error) {
        dispatch(getUserFailure(error.message || "Failed To Fetch User!"));
    }
}

// deleteUser
export const deleteUserMange = (id) => async (dispatch) => {
    dispatch(getUserRequest())
    try {
        const response = await axios.delete(`http://localhost:3002/api/auth/deleteUser/${id}`);
        toast.success(response.data.message);
        dispatch(fetchAllUserMange());
    } catch (error) {
        const errorMessage = error.response.data.message;
        dispatch(getUserFailure(errorMessage))
        toast.error(errorMessage);
    }
}

// createSlice

const UserMangeSlice = createSlice({
    name: "userManage",
    initialState: {
        allUsers: [], 
        loading: false,
        error: null
    },
    reducers: {
        getUserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess(state, action) {
            state.loading = false;
            state.allUsers = action.payload; 
        },
        getUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

// Export the actions and the reducer
export const { getUserRequest, getUserSuccess, getUserFailure } = UserMangeSlice.actions;
export default UserMangeSlice.reducer;
