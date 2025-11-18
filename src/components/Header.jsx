// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { 
    FiBriefcase, FiLogIn, FiMenu, FiX, FiChevronDown, FiUser, FiHome, 
    FiSearch, FiCalendar, FiLayers, FiChevronUp, FiLogOut, FiGrid // Added FiLogOut, FiGrid
} from 'react-icons/fi'; 
import { motion } from 'framer-motion';

//REDUX IMPORTS 
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../redux/authSlice'; // Import selector and logout action
//

const NavItem = ({ to, children, Icon }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center px-3 py-2 text-sm font-medium transition duration-300 rounded-lg ${
                isActive ? 'text-accent-yellow bg-primary-dark/50' : 'text-gray-200 hover:text-accent-yellow hover:bg-primary-dark/30'
            }`
        }
    >
        {Icon && <Icon className="mr-1 text-lg" />}
        {children}
    </NavLink>
);

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, userName } = useSelector(selectAuth); // Read authentication state

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // EFFECT: Handle Scroll for Sticky Header 
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // EFFECT: Handle Clicks Outside Dropdown to Close It 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Navigate to home page after logout
    };

    const headerClasses = isScrolled
        ? 'bg-primary-dark/90 backdrop-blur-lg shadow-classic'
        : 'bg-primary-dark shadow-lg';

    return (
        <motion.header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo (Modern Classic Typography) */}
                <Link to="/" className="text-2xl font-extrabold flex items-center text-white">
                    <FiBriefcase className="mr-2 text-accent-yellow text-3xl" />
                    VNM<span className="text-accent-teal"> Jobs</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                    <NavItem to="/" Icon={FiHome}>Home</NavItem>
                    <NavItem to="/jobs" Icon={FiSearch}>Jobs</NavItem>
                    <NavItem to="/job-fair" Icon={FiCalendar}>Job Fair</NavItem>
                    
                    {/*AUTH STATUS / DROPDOWN*/}
                    <div 
                        className="relative" 
                        ref={dropdownRef} 
                    >
                        {isLoggedIn ? (
                            // 1. LOGGED IN VIEW: "Hi, Name" button
                            <button 
                                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full transition duration-300 hover:bg-indigo-700 ml-4"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                            >
                                Hi, {userName || "Candidate"} 
                                {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                            </button>
                        ) : (
                            // 2. LOGGED OUT VIEW: Standard Login button
                            <button 
                                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-accent-teal rounded-full transition duration-300 hover:bg-teal-400 ml-4"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                Login <FiChevronDown className="ml-2" />
                            </button>
                        )}
                        
                        {/* Dropdown Content - Conditional based on isDropdownOpen */}
                        <motion.div 
                            className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl origin-top-right overflow-hidden"
                            initial={false}
                            animate={isDropdownOpen ? "open" : "closed"}
                            variants={{
                                open: { opacity: 1, scale: 1, height: "auto", transition: { duration: 0.2 } },
                                closed: { opacity: 0, scale: 0.95, height: 0, transition: { duration: 0.2 } }
                            }}
                            style={{ display: isDropdownOpen || window.innerWidth >= 1024 ? 'block' : 'none' }}
                        >
                            {isLoggedIn ? (
                                <>
                                    {/* LOGGED IN LINKS */}
                                    <Link 
                                        to="/candidate/dashboard" 
                                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiGrid className="mr-2 text-indigo-600" /> Dashboard
                                    </Link>
                                    <Link 
                                        to="/candidate/profile" 
                                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiUser className="mr-2 text-indigo-600" /> My Profile
                                    </Link>
                                    <button
                                        onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                                        className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-200"
                                    >
                                        <FiLogOut className="mr-2" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* LOGGED OUT LINKS (Login/Register Options) */}
                                    <Link 
                                        to="/candidate-login" 
                                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiUser className="mr-2 text-accent-teal" /> Candidate Login
                                    </Link>
                                    <Link 
                                        to="/employer-login" 
                                        className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiLayers className="mr-2 text-primary-dark" /> Employer Login
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </div>
                </nav>

                {/* Mobile Menu Icon (Mobile menu logic is complex, simplified here) */}
                <button 
                    className="lg:hidden text-white text-2xl" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Animated) - Needs authentication checks too */}
            {isMobileMenuOpen && (
                <motion.div 
                    className="lg:hidden bg-primary-dark p-4 shadow-xl border-t border-gray-700 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                >
                    {/* ... (Mobile NavItem links) ... */}
                    {/* Mobile Login/Logout links need updating based on isLoggedIn as well */}
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;