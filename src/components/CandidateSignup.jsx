// src/components/CandidateSignup.jsx (Simplified for Focus Stability)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayoutSide from './AuthLayoutSide'; 
import PasswordStrengthIndicator from './PasswordStrengthIndicator'; 
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CandidateSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        name: '', fatherName: '', email: '', mobile: '', password: '', confirmPassword: '', terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }
        console.log("Candidate Signup Data:", form);
        alert('Candidate registration successful! (Simulated)');
    };
    
    // NOTE: The InputField function component is REMOVED to prevent functional nesting issues.
    // The inputs are written directly into the form for maximum stability.

    const InputIcon = ({ Icon, name }) => (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    );
    
    const InputLabel = ({ htmlFor, text }) => (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
    );

    const InputClass = (isPassword = false) => (
        `w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition ${isPassword ? 'pr-10' : 'pr-4'}`
    );


    return (
        <AuthLayoutSide title="Sign Up as Candidate" infoType="candidate">
            <form onSubmit={handleSubmit}>
                
                {/* 1. Full Name Input (Fixes typing by simplifying structure) */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-name" text="Full Name" />
                    <div className="relative">
                        <InputIcon Icon={FiUser} name="name" />
                        <input
                            key="name" // Still essential for stability
                            type="text"
                            id="c-name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className={InputClass()}
                        />
                    </div>
                </div>

                {/* 2. Father's Name Input */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-fatherName" text="Father's Name" />
                    <div className="relative">
                        <InputIcon Icon={FiUser} name="fatherName" />
                        <input
                            key="fatherName" // Still essential for stability
                            type="text"
                            id="c-fatherName"
                            name="fatherName"
                            value={form.fatherName}
                            onChange={handleChange}
                            required
                            className={InputClass()}
                        />
                    </div>
                </div>
                
                {/* 3. Email Input */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-email" text="E-mail" />
                    <div className="relative">
                        <InputIcon Icon={FiMail} name="email" />
                        <input
                            key="email"
                            type="email"
                            id="c-email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className={InputClass()}
                        />
                    </div>
                </div>
                
                {/* 4. Mobile Number Input */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-mobile" text="Mobile Number" />
                    <div className="relative">
                        <InputIcon Icon={FiPhone} name="mobile" />
                        <input
                            key="mobile"
                            type="tel"
                            id="c-mobile"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            required
                            className={InputClass()}
                        />
                    </div>
                </div>

                {/* 5. Password Input (Most Complex) */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-password" text="Password" />
                    <div className="relative">
                        <InputIcon Icon={FiLock} name="password" />
                        <input
                            key="password"
                            type={showPassword ? 'text' : 'password'}
                            id="c-password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className={InputClass(true)}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>
                
                {/* Strength Indicator */}
                {form.password.length > 0 && <PasswordStrengthIndicator password={form.password} />}

                {/* 6. Confirm Password Input */}
                <div className="form-group mb-4">
                    <InputLabel htmlFor="c-confirmPassword" text="Confirm Password" />
                    <div className="relative">
                        <InputIcon Icon={FiLock} name="confirmPassword" />
                        <input
                            key="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="c-confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className={InputClass(true)}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="form-group checkbox-group flex items-start mb-6 mt-4 text-sm">
                    <input type="checkbox" id="c-terms" name="terms" checked={form.terms} onChange={handleChange} required className="form-checkbox mt-1 text-accent-teal rounded border-gray-300 focus:ring-accent-teal mr-2" />
                    <label htmlFor="c-terms" className="text-gray-600">
                        I Accept the <Link to="/terms-conditions" className="font-medium text-accent-teal hover:text-primary-dark transition">Terms & Conditions</Link>
                    </label>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="submit-btn w-full bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Register
                </motion.button>
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already a member? <Link to="/candidate-login" className="font-semibold text-accent-teal hover:text-primary-dark transition">Login Here</Link>
                </p>
            </form>
        </AuthLayoutSide>
    );
};

export default CandidateSignup;