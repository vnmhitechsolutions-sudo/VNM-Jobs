// src/components/JobsPage.jsx

import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/JobData'; 
import { filterOptions } from '../data/FilterOptions'; // <-- CRITICAL: Imported the new data structure
import JobCard from './JobCard'; 
import { FiFilter, FiChevronDown, FiSearch, FiLayout, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';

// FilterSection component remains the same (handles individual open/close/scroll)
const FilterSection = ({ title, options, type, handleCheckboxChange, isOpen, onClick }) => {
    return (
        <div className="filter-section border-b border-gray-200 py-4">
            <button
                className="filter-title w-full flex justify-between items-center font-semibold text-primary-dark transition hover:text-accent-teal"
                onClick={onClick}
            >
                Jobs By {title} <FiChevronDown className={`w-5 h-5 text-gray-400 transform transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <motion.div
                className="filter-content mt-3 space-y-2 pr-2" 
                initial={false}
                animate={{ 
                    maxHeight: isOpen ? '240px' : '0px', 
                    opacity: isOpen ? 1 : 0 
                }} 
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }} 
            >
                {/* Scrollable Container */}
                <div className="max-h-60 overflow-y-auto pr-2"> 
                    {options.map(option => (
                        <label key={option.value} className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-primary-dark transition">
                            <input 
                                type="checkbox" 
                                name={type} 
                                value={option.value} 
                                onChange={handleCheckboxChange} 
                                className="form-checkbox text-accent-teal rounded border-gray-300 focus:ring-accent-teal"
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const JobsPage = () => {
    // State for filtering
    const [filters, setFilters] = useState({});
    const [jobRoleSearch, setJobRoleSearch] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    
    // Define the full list of filter categories in the correct display order
    const filterCategories = [
        'location', 'type', 'sector', 'gender', 'experience', 
        'salary_range', 'qualification', 'differently_abled'
    ];

    // Initialize state for opening/closing filter sections
    // Defaulting all to false (closed)
    const initialFilterState = filterCategories.reduce((acc, category) => {
        acc[category] = false;
        return acc;
    }, {});
    
    const [filterSectionOpen, setFilterSectionOpen] = useState(initialFilterState);
    const [viewMode, setViewMode] = useState('list'); 

    // Filter Logic (Ensures filtering works across all new categories) 
    useEffect(() => {
        const newFilteredJobs = jobsData.filter(job => {
            const matchesJobRole = job.title.toLowerCase().includes(jobRoleSearch.toLowerCase());
            if (!matchesJobRole) return false;

            for (const filterType in filters) {
                if (filters[filterType] && filters[filterType].length > 0) {
                    // Check if the job's value for this filterType is NOT in the selected list
                    if (!filters[filterType].includes(job[filterType])) {
                        return false; 
                    }
                }
            }
            return true; 
        });
        setFilteredJobs(newFilteredJobs);
    }, [filters, jobRoleSearch]); 

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                newFilters[name] = newFilters[name].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    // Implements accordion logic for filter sections
    const handleFilterTitleClick = (section) => {
        setFilterSectionOpen(prev => {
            // Close all sections first
            const newState = filterCategories.reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            // Then toggle the clicked section (open it if it was closed)
            if (!prev[section]) {
                newState[section] = true;
            }
            
            return newState;
        });
    };
    
    return (
        <main className="pt-[80px] bg-primary-light min-h-screen">
            <div className="bg-primary-dark py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white">Job Search 🔎</h1>
                    <p className="text-gray-400 mt-1">
                        Showing results 1 to {filteredJobs.length} of {jobsData.length} entries.
                    </p>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* 1. Filter Sidebar */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24 bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-3">Refine Search</h3>
                        
                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="job-role-input"
                                placeholder="Search a Job Title"
                                value={jobRoleSearch}
                                onChange={(e) => setJobRoleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-teal focus:border-accent-teal transition"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Filter Sections Loop */}
                        {filterCategories.map(section => (
                            <FilterSection
                                key={section}
                                // Uses custom logic for title casing (e.g., salary_range -> Salary_range)
                                title={section.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                options={filterOptions[section]} // Uses data from FilterOptions.js
                                type={section}
                                handleCheckboxChange={handleCheckboxChange}
                                isOpen={filterSectionOpen[section]}
                                onClick={() => handleFilterTitleClick(section)}
                            />
                        ))}

                        <motion.button 
                            className="apply-filter-btn w-full mt-6 py-3 bg-accent-teal text-primary-dark font-bold rounded-lg shadow-md transition duration-300 hover:bg-teal-400"
                            onClick={() => { /* Filter logic is now automatic via useEffect */ }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <FiFilter className="inline mr-2" /> Apply Filter
                        </motion.button>
                    </div>
                </div>

                {/* 2. Job Listings Results */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-300">
                        <p className="text-lg font-semibold text-gray-700">Displaying {filteredJobs.length} Jobs</p>
                        <div className="flex space-x-2 bg-white p-1 rounded-full shadow-inner">
                            <motion.button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-full transition ${viewMode === 'list' ? 'bg-accent-teal text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                <FiList className="text-xl" />
                            </motion.button>
                            <motion.button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-full transition ${viewMode === 'grid' ? 'bg-accent-teal text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                <FiLayout className="text-xl" />
                            </motion.button>
                        </div>
                    </div>

                    <motion.div 
                        className={`job-listings ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} viewMode={viewMode} />
                            ))
                        ) : (
                            <motion.div 
                                className="lg:col-span-3 bg-white p-10 rounded-xl shadow-md text-center text-gray-500"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                No jobs found matching your criteria. Try adjusting your filters.
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default JobsPage;