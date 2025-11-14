// src/redux/bookmarksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to safely load state from localStorage (for persistence)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('bookmarkedJobIds');
        if (serializedState === null) {
            return [];
        }
        // Ensure only valid JSON is parsed
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load bookmarked state from local storage", e);
        return [];
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('bookmarkedJobIds', serializedState);
    } catch (e) {
        console.warn("Could not save bookmarked state to local storage", e);
    }
};

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: loadState(), // Load initial state from local storage
    reducers: {
        toggleBookmark: (state, action) => {
            const jobId = action.payload;
            const index = state.indexOf(jobId);

            if (index !== -1) {
                // Remove bookmark (Unbookmark)
                state.splice(index, 1);
            } else {
                // Add bookmark
                state.push(jobId);
            }
            saveState(state); // Save state after every change
        },
    },
});

export const { toggleBookmark } = bookmarksSlice.actions;

// Selector to get all bookmarked IDs
export const selectBookmarkedIds = (state) => state.bookmarks;

export default bookmarksSlice.reducer;