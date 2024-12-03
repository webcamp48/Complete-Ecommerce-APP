import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Custom thunk for fetching all users
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersPending());
  try {
    const response = await axios.get("http://localhost:3002/api/auth/getAllUsers");
    dispatch(fetchUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(fetchUsersError(error.message));
  }
};

// Custom thunk for fetching chat history
export const fetchChatHistory = ({senderId, receiverId}) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3002/api/chats/getMessages", {
      sender: senderId,
      receiver: receiverId,
    });
    dispatch(fetchChatHistorySuccess(response.data.chats));
  } catch (error) {
    dispatch(fetchChatHistoryError(error.message));
  }
};



const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    updateUserStatus(state, action) {
      const { userId, status } = action.payload;
      state.users = state.users.map(user =>
        user._id === userId ? { ...user, status } : user
      );
    },
    fetchUsersPending(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchChatHistorySuccess(state, action) {
      state.messages = action.payload;
    },
    fetchChatHistoryError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  fetchSelectedUser,
  addMessage,
  updateUserStatus,
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersError,
  fetchChatHistorySuccess,
  fetchChatHistoryError,
} = ChatSlice.actions;

export default ChatSlice.reducer;
