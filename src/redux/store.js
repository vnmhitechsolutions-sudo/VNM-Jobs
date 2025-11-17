// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './bookmarkSlice';
import authReducer from './authSlice';
import jobsReducer from './jobsSlice';
export const store = configureStore({
    reducer: {
        // Add all your reducers here
        bookmarks: bookmarksReducer,
        auth: authReducer,
        jobs: jobsReducer,
        // user: userReducer, // Example for future use
    },
    // Middleware and dev tools are automatically included by RTK
});