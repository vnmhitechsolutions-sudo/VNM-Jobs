// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// --- PERSISTENCE HELPERS ---
const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('userAuth');
        if (serializedState === null) {
            return { isLoggedIn: false, userName: null, profile: initialProfileState, profileCompletion: 0 };
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return { isLoggedIn: false, userName: null, profile: initialProfileState, profileCompletion: 0 };
    }
};

const saveAuthState = (state) => {
    try {
        const serializedState = JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userName: state.userName,
            profile: state.profile,
            profileCompletion: state.profileCompletion,
        });
        localStorage.setItem('userAuth', serializedState);
    } catch (e) {
        console.warn("Could not save auth state to local storage", e);
    }
};
// ----------------------------

const calculateCompletion = (profile) => {
    let completedSteps = 0;
    // (Logic for calculating completion remains the same)
    if (profile.name && profile.dob && profile.gender) completedSteps++;
    if (profile.mobile && profile.email && profile.currentAddress) completedSteps++;
    if (profile.educationDetails && profile.educationDetails.length > 0) completedSteps++;
    if (profile.desiredCareer) completedSteps++;
    if (profile.languages && profile.languages.length > 0) completedSteps++;
    
    return Math.floor((completedSteps / 5) * 100);
};

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
    // 💥 FIX: Load initial state from local storage
    initialState: loadAuthState(), 
    reducers: {
        loginSuccess: (state, action) => {
            // (Login success logic remains the same, but we add saveState)
            state.isLoggedIn = true;
            
            const userData = action.payload.profile || { 
                name: action.payload.name || "Gowthaman",
                email: "test@example.com",
                mobile: "9999900000",
                dob: "2003-09-22", gender: "Male", currentAddress: "123 Main St, Karur",
                desiredCareer: "Full Stack Developer", languages: [], educationDetails: [],
            };
            
            state.userName = userData.name.split(' ')[0];
            state.profile = { ...state.profile, ...userData };
            state.profileCompletion = calculateCompletion(state.profile);

            saveAuthState(state); // Save state on login
        },
        updateProfile: (state, action) => {
            // (Update profile logic remains the same, but we add saveState)
            state.profile = { ...state.profile, ...action.payload };
            state.profileCompletion = calculateCompletion(state.profile);
            saveAuthState(state); // Save state on profile update
        },
        logout: (state) => {
            // (Logout logic remains the same, but we add saveState)
            state.isLoggedIn = false;
            state.userName = null;
            state.profile = initialProfileState;
            state.profileCompletion = 0;
            saveAuthState(state); // Clear and save state on logout
        },
    },
});

export const { loginSuccess, updateProfile, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;