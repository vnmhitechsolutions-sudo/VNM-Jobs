// src/redux/jobsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load state safely (for persistence, similar to bookmarks)
const loadAppliedJobsState = () => {
    try {
        const serializedState = localStorage.getItem('appliedJobIds');
        return serializedState === null ? [] : JSON.parse(serializedState);
    } catch (e) {
        return [];
    }
};
const saveAppliedJobsState = (state) => {
    localStorage.setItem('appliedJobIds', JSON.stringify(state));
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        appliedJobIds: loadAppliedJobsState(),
    },
    reducers: {
        applyJob: (state, action) => {
            const jobId = action.payload;
            // Only add if not already present
            if (!state.appliedJobIds.includes(jobId)) {
                state.appliedJobIds.push(jobId);
                saveAppliedJobsState(state.appliedJobIds);
            }
        },
    },
});

export const { applyJob } = jobsSlice.actions;

// Selector to get all applied job IDs
export const selectAppliedJobIds = (state) => state.jobs.appliedJobIds;

export default jobsSlice.reducer;