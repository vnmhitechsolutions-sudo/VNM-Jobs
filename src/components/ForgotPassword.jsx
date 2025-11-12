<<<<<<< HEAD
// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { FiMail, FiUsers, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [userType, setUserType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userType) {
            alert('Please select a User Type.');
            return;
        }
        alert(`Password reset link sent to the email for the ${userType}! (Simulated)`);
    };

    return (
        <main className="pt-[80px] min-h-screen flex items-center justify-center bg-primary-light p-4">
            <motion.div
                className="w-full max-w-md bg-card-bg p-8 rounded-xl shadow-classic"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="form-header text-center mb-6">
                    <h2 className="text-3xl font-bold text-primary-dark mb-2">Forgot Password</h2>
                    <div className="user-type-links text-sm text-gray-500">
                        <Link to="/candidate-login" className="hover:text-primary-dark">Candidate</Link> | <Link to="/employer-login" className="hover:text-primary-dark">Employer</Link>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-5">
                        <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">User type *</label>
                        <div className="relative">
                            <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select 
                                id="user-type" 
                                name="user-type" 
                                value={userType} 
                                onChange={(e) => setUserType(e.target.value)} 
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-accent-yellow focus:border-accent-yellow transition appearance-none bg-white cursor-pointer"
                            >
                                <option value="" disabled>-Select User Type-</option>
                                <option value="candidate">Candidate</option>
                                <option value="employer">Employer</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter Your E-mail" 
                                required 
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-yellow focus:border-accent-yellow transition" 
                            />
                        </div>
                    </div>
                    <motion.button 
                        type="submit" 
                        className="submit-btn w-full bg-accent-yellow text-primary-dark font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition duration-300 text-lg"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        SUBMIT
                    </motion.button>
                </form>
            </motion.div>
        </main>
    );
};

=======
// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { FiMail, FiUsers, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [userType, setUserType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userType) {
            alert('Please select a User Type.');
            return;
        }
        alert(`Password reset link sent to the email for the ${userType}! (Simulated)`);
    };

    return (
        <main className="pt-[80px] min-h-screen flex items-center justify-center bg-primary-light p-4">
            <motion.div
                className="w-full max-w-md bg-card-bg p-8 rounded-xl shadow-classic"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="form-header text-center mb-6">
                    <h2 className="text-3xl font-bold text-primary-dark mb-2">Forgot Password</h2>
                    <div className="user-type-links text-sm text-gray-500">
                        <Link to="/candidate-login" className="hover:text-primary-dark">Candidate</Link> | <Link to="/employer-login" className="hover:text-primary-dark">Employer</Link>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-5">
                        <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">User type *</label>
                        <div className="relative">
                            <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select 
                                id="user-type" 
                                name="user-type" 
                                value={userType} 
                                onChange={(e) => setUserType(e.target.value)} 
                                required
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-accent-yellow focus:border-accent-yellow transition appearance-none bg-white cursor-pointer"
                            >
                                <option value="" disabled>-Select User Type-</option>
                                <option value="candidate">Candidate</option>
                                <option value="employer">Employer</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter Your E-mail" 
                                required 
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-yellow focus:border-accent-yellow transition" 
                            />
                        </div>
                    </div>
                    <motion.button 
                        type="submit" 
                        className="submit-btn w-full bg-accent-yellow text-primary-dark font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition duration-300 text-lg"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        SUBMIT
                    </motion.button>
                </form>
            </motion.div>
        </main>
    );
};

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default ForgotPassword;