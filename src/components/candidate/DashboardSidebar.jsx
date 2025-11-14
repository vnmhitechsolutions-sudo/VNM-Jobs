// src/components/candidate/DashboardSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    FiGrid, FiUser, FiEdit3, FiSearch, FiCheckSquare, 
    FiBookmark, FiCalendar, FiLock, FiLogOut, FiLayers, 
    FiKey, FiMessageSquare, FiSend 
} from 'react-icons/fi';

const NavItem = ({ to, Icon, label }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `flex items-center space-x-3 p-3 text-sm font-medium transition duration-300 ${
                isActive 
                ? 'bg-accent-teal text-primary-dark font-bold shadow-md' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-dark'
            }`
        }
    >
        <Icon className="text-lg min-w-[20px]" />
        <span>{label}</span>
    </NavLink>
);

const DashboardSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here (clear tokens, etc.)
        // For now, just navigate to home page
        navigate('/');
    };

    return (
        <div className="bg-card-bg p-4 rounded-xl shadow-lg border border-gray-100 space-y-1 sticky top-24">
            
            <NavItem to="/candidate/dashboard" Icon={FiGrid} label="Dashboard" /> 
            <NavItem to="/candidate/profile" Icon={FiUser} label="My Profile" />
            <NavItem to="/candidate/edit-profile" Icon={FiEdit3} label="Edit Profile" />
            
            <div className="border-t border-gray-200 my-2 pt-2 space-y-1">
                <NavItem to="/jobs" Icon={FiSearch} label="Job Search" /> 
                <NavItem to="/candidate/applied-jobs" Icon={FiCheckSquare} label="Applied Jobs" />
                <NavItem to="/candidate/bookmarked-jobs" Icon={FiBookmark} label="Bookmarked Jobs" />
                
                <NavItem to="/candidate/job-fair-list" Icon={FiLayers} label="Job Fair List" />
                <NavItem to="/candidate/job-fair-calendar" Icon={FiCalendar} label="Job Fair Calendar" />
                <NavItem to="/candidate/applied-job-fair-list" Icon={FiSend} label="Applied Job Fair List" />
                <NavItem to="/candidate/bookmarked-job-fair" Icon={FiBookmark} label="Bookmarked Job Fair List" />
            </div>

            <div className="border-t border-gray-200 my-2 pt-2 space-y-1">
                <NavItem to="/candidate/feedback" Icon={FiMessageSquare} label="Feedback" />
                <NavItem to="/candidate/reset-password" Icon={FiKey} label="Reset Password" />
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 text-sm font-medium transition duration-300 text-gray-600 hover:bg-gray-100 hover:text-primary-dark w-full text-left"
            >
                <FiLogOut className="text-lg min-w-[20px]" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default DashboardSidebar;