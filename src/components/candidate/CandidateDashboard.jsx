// src/components/candidate/CandidateDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBookmarkedIds } from '../../redux/bookmarkSlice';
import { selectAppliedJobIds } from '../../redux/jobsSlice';
import { selectAuth } from '../../redux/authSlice'; // Import auth slice
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCheckSquare, FiBookmark, FiCalendar, FiUser, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DashboardStatCard = ({ title, count, Icon, colorClass }) => (
    <motion.div 
        className="p-6 bg-card-bg rounded-xl shadow-md border border-gray-200 flex items-center justify-between transition hover:shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
    >
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className={`text-3xl font-extrabold mt-1 ${colorClass}`}>{count}</h3>
        </div>
        <Icon className={`text-4xl p-1 rounded-full ${colorClass}/20 ${colorClass}`} />
    </motion.div>
);

const CandidateDashboard = () => {
    // Read counts directly from Redux state
    const { profileCompletion } = useSelector(selectAuth); // DYNAMIC PROFILE COMPLETION
    const bookmarkedJobIds = useSelector(selectBookmarkedIds);
    const appliedJobIds = useSelector(selectAppliedJobIds); 

    const stats = {
        appliedJobs: appliedJobIds.length,
        bookmarkedJobs: bookmarkedJobIds.length,
        jobFairApps: 3, // Mocked for now
        profileCompletion: profileCompletion
    };
    
    const completionRemaining = 100 - stats.profileCompletion;
    const completionColor = stats.profileCompletion < 50 ? 'text-red-500' : stats.profileCompletion < 100 ? 'text-accent-yellow' : 'text-accent-teal';

    return (
        <CandidateDashboardLayout title="Overview">
            <h2 className="text-3xl font-bold text-primary-dark mb-8">Your Activity at a Glance</h2>
            
            {/* Stats Grid uses dynamic counts */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <DashboardStatCard 
                    title="Profile Completion" 
                    count={`${stats.profileCompletion}%`} 
                    Icon={FiUser} 
                    colorClass={completionColor} 
                />
                <DashboardStatCard title="Applied Jobs" count={stats.appliedJobs} Icon={FiCheckSquare} colorClass="text-indigo-600" />
                <DashboardStatCard title="Bookmarked Jobs" count={stats.bookmarkedJobs} Icon={FiBookmark} colorClass="text-accent-yellow" />
                <DashboardStatCard title="Job Fair Apps" count={stats.jobFairApps} Icon={FiCalendar} colorClass="text-red-600" />
            </div>

            {/* Quick Links and Recent Activity */}
            {completionRemaining > 0 && (
                <motion.div 
                    className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-between shadow-md"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="flex items-center space-x-3 text-yellow-800">
                        <FiInfo className="text-2xl" />
                        <p className="font-semibold">
                            Profile is **{completionRemaining}% incomplete**. Update your profile now to unlock better job matches.
                        </p>
                    </div>
                    <Link to="/candidate/edit-profile" className="px-4 py-2 bg-accent-yellow text-primary-dark font-bold rounded-lg hover:bg-yellow-400 transition">
                        Finish Profile
                    </Link>
                </motion.div>
            )}
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">What's Next?</h3>
                <ul className="space-y-2 text-gray-700">
                    <li><FiBriefcase className="inline mr-2 text-accent-teal" /> Start browsing our latest job listings.</li>
                    <li><FiCalendar className="inline mr-2 text-accent-teal" /> Next Job Fair in Chennai: Nov 25th. <Link to="/candidate/job-fair-calendar" className="text-blue-600 hover:underline">View Calendar</Link></li>
                </ul>
            </div>
        </CandidateDashboardLayout>
    );
};

export default CandidateDashboard;