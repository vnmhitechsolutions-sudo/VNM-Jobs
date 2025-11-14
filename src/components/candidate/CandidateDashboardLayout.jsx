// src/components/candidate/CandidateDashboardLayout.jsx
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { motion } from 'framer-motion';

const CandidateDashboardLayout = ({ children, title }) => {
    return (
        <main className="pt-[80px] bg-primary-light min-h-screen">
            {/* Header Banner */}
            <div className="bg-primary-dark py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-white">Candidate Dashboard</h1>
                    <p className="text-accent-teal text-xl mt-1">{title}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Sidebar (1/4 width) */}
                <div className="lg:col-span-1">
                    <DashboardSidebar />
                </div>

                {/* Content Area (3/4 width) */}
                <motion.div 
                    className="lg:col-span-3 bg-card-bg p-6 md:p-8 rounded-xl shadow-classic border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </div>
        </main>
    );
};

export default CandidateDashboardLayout;