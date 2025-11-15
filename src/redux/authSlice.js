// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userName: null,
        // In a real app, this would hold JWT token, user ID, etc.
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            // Use a payload for user data, e.g., action.payload.name
            state.userName = action.payload.name || "Gowthaman"; 
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userName = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

// Selector to read state
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;