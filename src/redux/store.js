// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './bookmarkSlice';

export const store = configureStore({
    reducer: {
        // Add all your reducers here
        bookmarks: bookmarksReducer,
        // user: userReducer, // Example for future use
    },
    // Middleware and dev tools are automatically included by RTK
});