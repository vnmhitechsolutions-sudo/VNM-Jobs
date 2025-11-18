// src/components/candidate/ResetPassword.jsx
import React, { useState } from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiLock, FiEye, FiEyeOff, FiKey } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ResetPassword = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [showPassword, setShowPassword] = useState({}); // State for individual eye toggles

    const handleChange = (e) => {
        setPasswords({ passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            alert("New password and confirmation do not match!");
            return;
        }
        console.log("Password Reset Attempt:", passwords);
        alert("Password change initiated (Simulated success)");
    };

    const PasswordInput = ({ label, name, value, onChange }) => {
        const isVisible = showPassword[name] || false;
        
        return (
            <div className="mb-6">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
                <div className="relative max-w-lg">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type={isVisible ? 'text' : 'password'}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                    />
                    <span 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" 
                        onClick={() => setShowPassword(prev => ({ prev, [name]: !isVisible }))}
                    >
                        {isVisible ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <CandidateDashboardLayout title="Reset Password">
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <FiKey className="mr-3 text-accent-teal" /> Security Management
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <PasswordInput 
                    label="Enter Current Password" 
                    name="currentPassword" 
                    value={passwords.currentPassword} 
                    onChange={handleChange}
                />
                <PasswordInput 
                    label="Enter New Password" 
                    name="newPassword" 
                    value={passwords.newPassword} 
                    onChange={handleChange}
                />
                <PasswordInput 
                    label="Confirm New Password" 
                    name="confirmNewPassword" 
                    value={passwords.confirmNewPassword} 
                    onChange={handleChange}
                />

                <motion.button
                    type="submit"
                    className="px-6 py-3 bg-accent-teal text-primary-dark font-bold rounded-lg hover:bg-teal-400 transition shadow-lg mt-8"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Change Password
                </motion.button>
            </form>
        </CandidateDashboardLayout>
    );
};

export default ResetPassword;