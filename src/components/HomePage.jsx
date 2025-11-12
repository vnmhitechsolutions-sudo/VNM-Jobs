// src/components/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiDollarSign, FiMapPin, FiBriefcase, FiLayers } from 'react-icons/fi';
// Import or define your internal components here (StatsBar, LatestJobs, etc.)
// For now, we'll keep them as simple placeholders.

const StatCard = ({ number, label, Icon }) => (
    <motion.div 
        className="stat-card p-6 bg-card-bg rounded-xl shadow-classic border border-gray-100 text-center"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(28, 39, 76, 0.2)' }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Icon className="mx-auto text-4xl text-accent-teal mb-3" />
        <motion.span 
            className="text-4xl font-extrabold text-primary-dark block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
            {number}
        </motion.span>
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    </motion.div>
);

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('jobs');

    const SearchForm = ({ tab }) => {
        let content;
        if (tab === 'jobs') {
            content = (
                <>
                    <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                    <input type="text" id="job-title-input" placeholder="Job Title, Company, or Keyword" className="w-full pl-12 pr-4 py-3 bg-white rounded-l-full focus:outline-none text-primary-dark" />
                </>
            );
        } else if (tab === 'salaries') {
            content = (
                <>
                    <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                    <select id="salary-select" className="w-full pl-12 pr-4 py-3 bg-white rounded-l-full focus:outline-none text-primary-dark appearance-none cursor-pointer">
                        <option value="">-Select Salary Range-</option>
                        <option value="below-15000">Below 15,000</option>
                        <option value="15000-25000">15,000 - 25,000</option>
                        <option value="25000-35000">25,000 - 50,000</option>
                         <option value="25000-35000">50,000 - 1 Lakh</option>
                          <option value="25000-50000">25,000 - 50,000</option>
                           <option value="100000">above 1 Lakhs</option>
                    </select>
                </>
            );
        } else if (tab === 'locations') {
            content = (
                <>
                    <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
                    <input type="text" id="location-input" placeholder="Search Locations (e.g., Chennai)" autoComplete="off" className="w-full pl-12 pr-4 py-3 bg-white rounded-l-full focus:outline-none text-primary-dark" />
                </>
            );
        }

        return (
            <motion.form 
                id={`${tab}-search-form`} 
                className="search-form flex w-full relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                {content}
                <button type="submit" className="search-btn bg-accent-yellow text-primary-dark px-6 py-3 font-bold rounded-r-full transition duration-300 hover:bg-yellow-400 flex items-center shadow-lg">
                    <FiSearch className="text-xl" />
                </button>
            </motion.form>
        );
    };

    return (
        <main className="pt-[80px] min-h-screen bg-primary-light">
            <div className="hero relative h-[50vh] flex items-center justify-center overflow-hidden bg-primary-dark">
                {/* Modern Hero Background Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder-city-view.jpg')" }}></div>
                <div className="absolute inset-0 bg-primary-dark/80"></div>
                
                <div className="search-container relative z-10 w-full max-w-4xl px-4">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Your Next Career <span className="text-accent-teal">Starts Here</span>.
                    </motion.h1>

                    <div className="search-tabs flex justify-center mb-6 space-x-2 bg-primary-dark/50 p-2 rounded-full shadow-lg">
                        {['jobs', 'salaries', 'locations'].map(tab => (
                            <motion.button
                                key={tab}
                                className={`px-5 py-2 text-sm font-semibold rounded-full transition duration-300 ${
                                    activeTab === tab ? 'bg-accent-teal text-primary-dark shadow-md' : 'text-gray-300 hover:text-white hover:bg-primary-dark/30'
                                }`}
                                onClick={() => setActiveTab(tab)}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </motion.button>
                        ))}
                    </div>

                    <div className="search-bar-wrapper">
                        <SearchForm tab={activeTab} key={activeTab} />
                    </div>
                </div>
            </div>
            
            <section className="live-vacancies py-12 -mt-10 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary-dark text-center mb-8">Live Vacancies</h2>
                    <div className="stats-container grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <StatCard number="26,160" label="Vacancies" Icon={FiBriefcase} />
                        <StatCard number="612" label="Employers" Icon={FiLayers} />
                    </div>
                </div>
            </section>
            
            {/* Placeholder for Latest Jobs, Sectors, etc. (Components from earlier responses) */}
            {/* <LatestJobs /> */}
            {/* <SectorSearch /> */}
        </main>
    );
};

export default HomePage;