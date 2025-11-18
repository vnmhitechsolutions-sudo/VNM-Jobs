// src/components/EmployerLogin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayoutSide from './AuthLayoutSide';
import { FiMail, FiLock, FiEye, FiEyeOff, FiRefreshCw, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EmployerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [loginData, setLoginData] = useState({ email: '', password: '' });

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
        if (captchaInput !== captcha) {
            alert('Invalid CAPTCHA. Please try again.');
            generateCaptcha();
            setCaptchaInput('');
        } else {
            // Logic for form submission
            console.log("Employer Login Data:", loginData);
            alert('Login successful! (Simulated)');
        }
    };
    
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <AuthLayoutSide title="Login as Employer" infoType="employer">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor="e-email-login" className="block text-sm font-medium text-gray-700 mb-1">E-mail / Mobile Number / Employer ID</label>
                    <div className="relative">
                        <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input type="text" id="e-email-login" name="email" value={loginData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-dark focus:border-primary-dark transition" />
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="e-password-login" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="e-password-login"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-dark focus:border-primary-dark transition"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* CAPTCHA Group (Modernized) */}
                <div className="form-group mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CAPTCHA Verification</label>
                    <div className="flex items-center space-x-3">
                        <div className="captcha-box bg-gray-100 text-primary-dark font-mono text-xl tracking-widest px-4 py-2 rounded-lg border border-primary-dark/50 select-none flex-grow text-center">
                            {captcha}
                        </div>
                        <motion.button type="button" className="refresh-captcha-btn p-2 bg-primary-dark text-white rounded-full hover:bg-gray-700 transition" onClick={generateCaptcha} whileTap={{ rotate: 360 }}>
                            <FiRefreshCw />
                        </motion.button>
                        <input
                            type="text"
                            id="e-captcha-input"
                            placeholder="Enter Code"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            required
                            className="w-full max-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-dark focus:border-primary-dark transition"
                        />
                    </div>
                </div>
                
                <div className="form-links flex justify-between items-center mb-6 text-sm">
                    <p className="text-gray-600">
                        New Company? <Link to="/employer-signup" className="font-semibold text-primary-dark hover:text-accent-teal transition">Click here</Link>
                    </p>
                    <Link to="/forgot-password" className="font-medium text-gray-600 hover:text-primary-dark transition">Forgot Password?</Link>
                </div>

                <motion.button
                    type="submit"
                    className="submit-btn w-full bg-accent-teal text-primary-dark font-bold py-3 rounded-lg shadow-lg hover:bg-teal-400 transition duration-300 text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Login
                </motion.button>
            </form>
        </AuthLayoutSide>
    );
};

export default EmployerLogin;