// src/components/candidate/CandidateDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCheckSquare, FiBookmark, FiCalendar, FiUser } from 'react-icons/fi';

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
    const stats = {
        appliedJobs: 5,
        bookmarkedJobs: 12,
        jobFairApps: 3,
        profileCompletion: 78
    };

    return (
        <CandidateDashboardLayout title="Overview">
            <h2 className="text-3xl font-bold text-primary-dark mb-8">Your Activity at a Glance</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <DashboardStatCard title="Profile Completion" count={`${stats.profileCompletion}%`} Icon={FiUser} colorClass="text-accent-teal" />
                <DashboardStatCard title="Applied Jobs" count={stats.appliedJobs} Icon={FiCheckSquare} colorClass="text-indigo-600" />
                <DashboardStatCard title="Bookmarked Jobs" count={stats.bookmarkedJobs} Icon={FiBookmark} colorClass="text-accent-yellow" />
                <DashboardStatCard title="Job Fair Apps" count={stats.jobFairApps} Icon={FiCalendar} colorClass="text-red-600" />
            </div>

            {/* Quick Links and Recent Activity (Simplified) */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">What's Next?</h3>
                <ul className="space-y-2 text-gray-700">
                    <li><FiBriefcase className="inline mr-2 text-accent-teal" /> Complete your profile (22% remaining) to unlock premium listings.</li>
                    <li><FiCalendar className="inline mr-2 text-accent-teal" /> Next Job Fair in Chennai: Nov 25th. <Link to="/candidate/job-fair-calendar" className="text-blue-600 hover:underline">View Calendar</Link></li>
                </ul>
            </div>
        </CandidateDashboardLayout>
    );
};

export default CandidateDashboard;