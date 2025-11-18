// src/redux/authSlice.js (Crucial Fixes for Profile Persistence)
import { createSlice } from '@reduxjs/toolkit';

// Helper function remains the same
const calculateCompletion = (profile) => {
    let completedSteps = 0;
    
    // Check 5 required steps (20% each)
    if (profile.name && profile.dob && profile.gender) completedSteps++;
    if (profile.mobile && profile.email && profile.currentAddress) completedSteps++;
    if (profile.educationDetails && profile.educationDetails.length > 0) completedSteps++; // Check existence and length
    if (profile.desiredCareer) completedSteps++;
    if (profile.languages && profile.languages.length > 0) completedSteps++; // Check existence and length
    
    return Math.floor((completedSteps / 5) * 100);
};

// Initial State Definition
const initialProfileState = {
    name: null, fatherName: null, dob: null, gender: null, district: null,
    mobile: null, email: null, currentAddress: null,
    educationDetails: [], 
    desiredCareer: null,
    languages: [], 
    shortProfileDescription: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userName: null,
        profile: initialProfileState,
        profileCompletion: 0,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            
            // 💥 FIX 1: Initialize Profile with returned data (or simulation)
            const userData = action.payload.profile || { 
                name: action.payload.name || "Gowthaman",
                email: "test@example.com",
                mobile: "9999900000",
                // Simulate some initial data from signup:
                dob: "2003-09-22",
                gender: "Male",
                currentAddress: "123 Main St, Karur",
                desiredCareer: "Full Stack Developer",
                languages: [{ language: "English", proficiency: "Proficient", read: true, write: true, speak: true, id: 1 }],
                educationDetails: [{ degree: "B.E. CSE", college: "Karpagam", id: 1 }],
                // Add any other user data saved during signup
            };
            
            state.userName = userData.name.split(' ')[0]; // Use first name for header
            state.profile = { ...initialProfileState, ...userData };
            
            // 💥 FIX 2: Calculate percentage immediately
            state.profileCompletion = calculateCompletion(state.profile);
        },
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
            state.profileCompletion = calculateCompletion(state.profile);
        },
        // ... (logout reducer remains the same)
    },
});

export const { loginSuccess, updateProfile, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;