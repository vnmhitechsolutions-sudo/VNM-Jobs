// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { NavLink, Link } from 'react-router-dom';
// Changed FiChevronDown to FiChevronUp for visual cue on open state
import { FiBriefcase, FiLogIn, FiMenu, FiX, FiChevronDown, FiUser, FiHome, FiSearch, FiCalendar, FiLayers, FiChevronUp } from 'react-icons/fi'; 
import { motion } from 'framer-motion';

// NOTE: Replace '../assets/rescue-skills-logo.png' with your actual logo path

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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // NEW STATE for the dropdown
    const dropdownRef = useRef(null); // Ref to track clicks outside the dropdown

    // --- EFFECT: Handle Scroll for Sticky Header ---
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- EFFECT: Handle Clicks Outside Dropdown to Close It ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Only close if we are clicking outside the whole dropdown area (button and menu)
                setIsDropdownOpen(false);
            }
        };

        // Attach listener only when the dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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
                    Rescue<span className="text-accent-teal">Jobs</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                    <NavItem to="/" Icon={FiHome}>Home</NavItem>
                    <NavItem to="/jobs" Icon={FiSearch}>Jobs</NavItem>
                    <NavItem to="/job-fair" Icon={FiCalendar}>Job Fair</NavItem>
                    
                    {/* Login Dropdown (Click-to-Toggle) */}
                    {/* Attach ref to the entire container to track clicks */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-accent-teal rounded-full transition duration-300 hover:bg-teal-400 ml-4"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle state on click
                        >
                            Login 
                            {isDropdownOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                        </button>
                        
                        {/* Dropdown Content - Conditional rendering based on isDropdownOpen */}
                        <motion.div 
                            className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl origin-top-right overflow-hidden"
                            initial={false} // Prevent initial animation glitch
                            // Animation based on isDropdownOpen state
                            animate={isDropdownOpen ? "open" : "closed"}
                            variants={{
                                open: { opacity: 1, scale: 1, height: "auto", transition: { duration: 0.2 } },
                                closed: { opacity: 0, scale: 0.95, height: 0, transition: { duration: 0.2 } }
                            }}
                            // Use conditional classes to control visibility/position before/after animation
                            style={{ display: isDropdownOpen || window.innerWidth >= 1024 ? 'block' : 'none' }}
                        >
                            <Link 
                                to="/candidate-login" 
                                className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                onClick={() => setIsDropdownOpen(false)} // Close dropdown after selection
                            >
                                <FiUser className="mr-2 text-accent-teal" /> Candidate Login
                            </Link>
                            <Link 
                                to="/employer-login" 
                                className="flex items-center px-4 py-3 text-sm text-primary-dark hover:bg-gray-100 transition"
                                onClick={() => setIsDropdownOpen(false)} // Close dropdown after selection
                            >
                                <FiLayers className="mr-2 text-primary-dark" /> Employer Login
                            </Link>
                        </motion.div>
                    </div>
                </nav>

                {/* Mobile Menu Icon */}
                <button 
                    className="lg:hidden text-white text-2xl" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Animated) */}
            {isMobileMenuOpen && (
                <motion.div 
                    className="lg:hidden bg-primary-dark p-4 shadow-xl border-t border-gray-700 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                >
                    <NavItem to="/" Icon={FiHome} onClick={() => setIsMobileMenuOpen(false)}>Home</NavItem>
                    <NavItem to="/jobs" Icon={FiSearch} onClick={() => setIsMobileMenuOpen(false)}>Jobs</NavItem>
                    <NavItem to="/job-fair" Icon={FiCalendar} onClick={() => setIsMobileMenuOpen(false)}>Job Fair</NavItem>
                    <div className="pt-2 border-t border-gray-700 mt-2 space-y-2">
                        <Link to="/candidate-login" className="flex items-center px-3 py-2 text-sm font-medium text-white bg-accent-teal/20 rounded-lg hover:bg-accent-teal/40 transition" onClick={() => setIsMobileMenuOpen(false)}><FiUser className="mr-2" /> Candidate Login</Link>
                        <Link to="/employer-login" className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-dark/50 rounded-lg hover:bg-primary-dark/70 transition" onClick={() => setIsMobileMenuOpen(false)}><FiLayers className="mr-2" /> Employer Login</Link>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;