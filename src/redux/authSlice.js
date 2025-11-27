// src/redux/authSlice.js (FINALIZED PERSISTENCE LOGIC)
import { createSlice } from '@reduxjs/toolkit';

//  PERSISTENCE HELPERS (Simplified and robust) 
const loadState = (key, defaultValue) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (key === 'userAuth' && serializedState) {
            const parsedState = JSON.parse(serializedState);
            return {
                ...parsedState,
                isLoggedIn: false, // Force logout on refresh
            };
        }
        return serializedState === null ? defaultValue : JSON.parse(serializedState);
    } catch (e) {
        console.warn(`Could not load state for key ${key}`, e);
        return defaultValue;
    }
};

const saveState = (key, state) => {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
        console.warn(`Could not save state for key ${key}`, e);
    }
};
// 

const calculateCompletion = (profile) => {
    let completedSteps = 0;
    // ... (rest of the completion logic remains the same)
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

const initialAuthState = loadState('userAuth', {
    isLoggedIn: false,
    userName: null,
    profile: initialProfileState,
    profileCompletion: 0,
});

const authSlice = createSlice({
    name: 'auth',
    // Load both the current session and the master user list
    initialState: {
        ...initialAuthState,
        registeredUsers: loadState('registeredUsers', []), // Load ALL user accounts
    },
    reducers: {
        registerUser: (state, action) => {
            const newUser = {
                ...initialProfileState,
                ...action.payload,
                id: Date.now(),
            };

            state.registeredUsers.push(newUser);

            // 🔥 CRITICAL FIX: Save the entire master list immediately after registration
            saveState('registeredUsers', state.registeredUsers);
        },
        loginSuccess: (state, action) => {
            const userProfile = action.payload.profile;

            state.isLoggedIn = true;
            state.userName = userProfile.name.split(' ')[0];
            state.profile = { ...state.profile, ...userProfile };
            state.profileCompletion = calculateCompletion(state.profile);

            // Save the current session details (userAuth)
            saveState('userAuth', state);
        },
        updateProfile: (state, action) => {
            const updatedData = action.payload;
            state.profile = { ...state.profile, ...updatedData };
            state.profileCompletion = calculateCompletion(state.profile);

            // Update the profile data within the global registeredUsers array
            state.registeredUsers = state.registeredUsers.map(user => {
                if (user.email === state.profile.email) {
                    return state.profile; // Replace old user object with the new profile data
                }
                return user;
            });

            saveState('userAuth', state);
            // 🔥 CRITICAL FIX: Save the master list after any profile edit
            saveState('registeredUsers', state.registeredUsers);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userName = null;
            state.profile = initialProfileState;
            state.profileCompletion = 0;
            saveState('userAuth', state);
        },
    },
});

export const { registerUser, loginSuccess, updateProfile, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectRegisteredUsers = (state) => state.auth.registeredUsers;

export default authSlice.reducer;