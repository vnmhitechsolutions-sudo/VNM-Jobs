// src/components/AuthenticatedHeaderControls.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../redux/authSlice';
import { FiChevronDown, FiLogOut, FiUser, FiGrid, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AuthNavLink = ({ to, children }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `mx-4 text-sm font-extrabold tracking-wider transition duration-200 uppercase pb-1 
            ${isActive 
                ? 'text-white border-b-2 border-accent-teal' 
                : 'text-gray-300 hover:text-white'
            }`
        }
    >
        {children}
    </NavLink>
);

const AuthenticatedHeaderControls = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userName } = useSelector(selectAuth);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); 
    };

    return (
        <div className="flex items-center space-x-6 text-white">
            
            {/* 1. Primary Navigation Links (DASHBOARD, MY PROFILE, JOB FAIR) */}
            <div className="hidden md:flex items-center">
                <AuthNavLink to="/candidate/dashboard">Dashboard</AuthNavLink>
                <AuthNavLink to="/candidate/profile">My Profile</AuthNavLink>
                <AuthNavLink to="/job-fair">Job Fair</AuthNavLink>
            </div>

            {/* 2. User Profile Dropdown (Hi, Name...) */}
            <div 
                className="relative cursor-pointer flex items-center bg-primary-dark/50 rounded-full py-1 pl-3 pr-2 transition duration-200"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
                <span className="text-white text-sm font-semibold mr-2 hidden sm:block">Hi, {userName || 'User'}</span>
                
                {/* User Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-accent-teal">
                    <FiUser className="text-primary-dark text-lg" />
                </div>
                <FiChevronDown className={`ml-1 transition duration-200 ${isUserMenuOpen ? 'transform rotate-180' : ''}`} />

                {/* Dropdown Menu */}
                <motion.div
                    className="absolute right-0 top-full mt-3 w-48 bg-white rounded-lg shadow-xl origin-top-right overflow-hidden border border-gray-100 z-50"
                    initial={false}
                    animate={isUserMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { opacity: 1, scale: 1, height: "auto", transition: { duration: 0.2 } },
                        closed: { opacity: 0, scale: 0.95, height: 0, transition: { duration: 0.2 } }
                    }}
                    style={{ pointerEvents: isUserMenuOpen ? 'auto' : 'none' }}
                >
                    <Link 
                        to="/candidate/profile" 
                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                    >
                        <FiUser className="mr-2 text-indigo-600" /> My Profile
                    </Link>
                    <Link 
                        to="/candidate/dashboard" 
                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                    >
                        <FiGrid className="mr-2 text-indigo-600" /> Dashboard Home
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-200"
                    >
                        <FiLogOut className="mr-2" /> Logout
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthenticatedHeaderControls;