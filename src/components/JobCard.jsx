// src/components/JobCard.jsx
import React from 'react';
import { 
    FiMapPin, FiClock, FiDollarSign, FiCalendar, FiExternalLink, 
    FiBriefcase, FiBookmark 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

//  REDUX IMPORTS 
import { useSelector, useDispatch } from 'react-redux';
import { toggleBookmark, selectBookmarkedIds } from '../redux/bookmarkSlice'; 
import { selectAuth } from '../redux/authSlice'; // Import Auth Selector
// 

const JobCard = ({ job, viewMode = 'list' }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // REDUX STATE: Read bookmarked IDs and authentication status
    const bookmarkedIds = useSelector(selectBookmarkedIds);
    const { isLoggedIn } = useSelector(selectAuth); // Get login status
    
    const isBookmarked = bookmarkedIds.includes(job.id);

    //  HANDLER: Check Auth before bookmarking 
    const handleBookmarkClick = () => {
        if (!isLoggedIn) {
            // 🛑 BARRIER: Redirect to login if user tries to save while logged out
            alert('Please log in to save jobs.'); 
            navigate('/candidate-login'); 
            return;
        }
        // If logged in, proceed with the save action
        dispatch(toggleBookmark(job.id));
    };

    // Determine layout based on viewMode
    const cardClasses = viewMode === 'list'
        ? 'flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6'
        : 'flex flex-col space-y-4';

    const JobBadge = ({ type }) => {
        let color = '';
        if (type.toLowerCase() === 'regular') {
            color = 'bg-teal-100 text-teal-800';
        } else if (type.toLowerCase() === 'contract') {
             color = 'bg-yellow-100 text-yellow-800';
        } else {
             color = 'bg-indigo-100 text-indigo-800';
        }
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };

    return (
        <motion.div
            className={`bg-card-bg p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 ${cardClasses}`}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(28, 39, 76, 0.1)', transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Company Logo/Placeholder */}
            <div className={`w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-accent-teal`}>
                {job.companyLogo ? (
                    <img src={job.companyLogo} alt={`${job.company} Logo`} className="w-full h-full object-contain p-1" />
                ) : (
                    <FiBriefcase className="text-primary-dark text-2xl" />
                )}
            </div>

            <div className="flex-grow">
                {/* Title and Company (Link for quick access) */}
                <Link to={`/job/${job.id}`} className="text-xl font-bold text-primary-dark hover:text-accent-teal transition cursor-pointer">
                    {job.title}
                </Link>
                <p className="text-sm text-gray-500 font-medium mb-2">{job.company}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mt-3">
                    <div className="flex items-center">
                        <FiMapPin className="text-accent-teal mr-2 min-w-[16px]" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                        <FiClock className="text-accent-teal mr-2 min-w-[16px]" />
                        <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center col-span-2 lg:col-span-1">
                        <FiDollarSign className="text-accent-teal mr-2 min-w-[16px]" />
                        <span>{job.salaryText}</span>
                    </div>
                    <div className="flex items-center col-span-2 lg:col-span-1">
                        <FiCalendar className="text-accent-teal mr-2 min-w-[16px]" />
                        <span>{job.sector}</span>
                    </div>
                </div>
            </div>

            {/* CTA Buttons, Badges, and Bookmark */}
            <div className="flex flex-col space-y-2 items-start md:items-end flex-shrink-0 mt-4 md:mt-0">
                <JobBadge type={job.type} />
                
                <div className="flex space-x-2 mt-3">
                    {/* Bookmark Button (Uses handler with auth check) */}
                    <motion.button
                        onClick={handleBookmarkClick} 
                        className="p-2 border border-gray-300 rounded-full transition duration-300 hover:border-accent-yellow"
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle Bookmark"
                    >
                        <FiBookmark 
                            className={`text-xl ${
                                isBookmarked 
                                ? 'text-accent-yellow fill-accent-yellow/50' // Saved state
                                : 'text-gray-400 hover:text-accent-yellow' // Default state
                            }`} 
                        />
                    </motion.button>
                    
                    {/* View Details Button (Publicly accessible) */}
                    <Link 
                        to={`/job/${job.id}`}
                        className="flex items-center px-4 py-2 bg-primary-dark text-white text-sm font-semibold rounded-full transition duration-300 hover:bg-accent-teal shadow-md"
                    >
                        View Details <FiExternalLink className="ml-2 text-sm" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;