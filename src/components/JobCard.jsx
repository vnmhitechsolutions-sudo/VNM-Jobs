<<<<<<< HEAD
// src/components/JobCard.jsx
import React from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiExternalLink, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const JobCard = ({ job, viewMode = 'list' }) => {
    // Determine layout based on viewMode (JobsPage handles the 'list'/'grid' state)
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
            // You might want to remove the initial/animate if this is used within a parent animated container
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
                {/* Title and Company */}
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

            {/* CTA Button and Badges */}
            <div className="flex flex-col space-y-2 items-start md:items-end flex-shrink-0 mt-4 md:mt-0">
                <JobBadge type={job.type} />
                
                <Link 
                    to={`/job/${job.id}`}
                    className="flex items-center px-4 py-2 bg-primary-dark text-white text-sm font-semibold rounded-full mt-3 transition duration-300 hover:bg-accent-teal shadow-md"
                >
                    View Details <FiExternalLink className="ml-2 text-sm" />
                </Link>
            </div>
        </motion.div>
    );
};

=======
// src/components/JobCard.jsx
import React from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiExternalLink, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const JobCard = ({ job, viewMode = 'list' }) => {
    // Determine layout based on viewMode (JobsPage handles the 'list'/'grid' state)
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
            // You might want to remove the initial/animate if this is used within a parent animated container
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
                {/* Title and Company */}
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

            {/* CTA Button and Badges */}
            <div className="flex flex-col space-y-2 items-start md:items-end flex-shrink-0 mt-4 md:mt-0">
                <JobBadge type={job.type} />
                
                <Link 
                    to={`/job/${job.id}`}
                    className="flex items-center px-4 py-2 bg-primary-dark text-white text-sm font-semibold rounded-full mt-3 transition duration-300 hover:bg-accent-teal shadow-md"
                >
                    View Details <FiExternalLink className="ml-2 text-sm" />
                </Link>
            </div>
        </motion.div>
    );
};

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default JobCard;