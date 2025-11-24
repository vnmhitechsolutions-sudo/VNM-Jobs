// src/components/CandidateLogin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, selectRegisteredUsers } from '../redux/authSlice'; 

import AuthLayoutSide from './AuthLayoutSide';
import { FiMail, FiLock, FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CandidateLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registeredUsers = useSelector(selectRegisteredUsers);

    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [loginData, setLoginData] = useState({ identifier: '', password: '' }); // Renamed 'email' to 'identifier'

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newCaptcha = '';
        for (let i = 0; i < 6; i++) {
            newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(newCaptcha);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. CAPTCHA Check
        if (captchaInput !== captcha) {
            alert('Invalid CAPTCHA. Please try again.');
            generateCaptcha();
            setCaptchaInput('');
            return;
        } 
        
        // 2. Find and Validate User (against master list)
        const identifier = loginData.identifier.trim();
        
        // 🔥 FIX: Check if the identifier matches either email OR mobile number
        const userFound = registeredUsers.find(
            user => 
                (user.email === identifier || user.mobile === identifier) && 
                user.password === loginData.password
        );
        
        if (userFound) {
            // Success
            dispatch(loginSuccess({ profile: userFound, name: userFound.name })); 
            
            alert(`Welcome back, ${userFound.name.split(' ')[0]}! Redirecting to Dashboard.`);
            navigate('/candidate/dashboard'); 
            
        } else {
            // Failure
            alert('Login failed: Invalid identifier or password.');
            generateCaptcha();
            setCaptchaInput('');
        }
    };

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <AuthLayoutSide title="Login as Candidate" infoType="candidate">
            <form onSubmit={handleSubmit}>
                
                {/* 1. Email / Mobile Number Input (Now Identifier) */}
                <div className="form-group mb-4">
                    <label htmlFor="c-email-login" className="block text-sm font-medium text-gray-700 mb-1">E-mail / Mobile Number</label>
                    <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            id="c-email-login"
                            name="identifier" // Renamed input name to identifier
                            value={loginData.identifier}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                        />
                    </div>
                </div>

                {/* 2. Password Input */}
                <div className="form-group mb-4">
                    <label htmlFor="c-password-login" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="c-password-login"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* 3. CAPTCHA Verification (Remains the same) */}
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CAPTCHA Verification</label>
                    <div className="flex items-center space-x-3">
                        <div className="captcha-box bg-gray-100 text-primary-dark font-mono text-xl tracking-widest px-4 py-2 rounded-lg border border-accent-teal/50 select-none flex-grow text-center">
                            {captcha}
                        </div>
                        <motion.button
                            type="button"
                            className="refresh-captcha-btn p-2 bg-accent-teal text-white rounded-full hover:bg-teal-600 transition"
                            onClick={generateCaptcha}
                            whileTap={{ rotate: 360 }}
                        >
                            <FiRefreshCw />
                        </motion.button>
                        <input
                            type="text"
                            id="c-captcha-input"
                            placeholder="Enter Code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            required
                            className="w-full max-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                        />
                    </div>
                </div>

                {/* 4. Links and CTA (Remains the same) */}
                <div className="form-links flex justify-between items-center mb-6 text-sm">
                    <p className="text-gray-600">
                        New Account?{' '}
                        <Link to="/candidate-signup" className="font-semibold text-accent-teal hover:text-primary-dark transition">
                            Click here
                        </Link>
                    </p>
                    <Link to="/forgot-password" className="font-medium text-gray-600 hover:text-primary-dark transition">
                        Forgot Password?
                    </Link>
                </div>

                <motion.button
                    type="submit"
                    className="submit-btn w-full bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Login
                </motion.button>
            </form>
        </AuthLayoutSide>
    );
};

export default CandidateLogin;