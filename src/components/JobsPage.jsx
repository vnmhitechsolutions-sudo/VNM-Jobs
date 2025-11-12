<<<<<<< HEAD
// src/components/JobsPage.jsx

import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/JobData'; // Import the job data
import JobCard from './JobCard'; // Import the styled JobCard
import { FiFilter, FiChevronDown, FiSearch, FiLayout, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Component for a collapsible filter section
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
                className="filter-content mt-3 space-y-2 max-h-48 overflow-y-auto pr-2"
                initial={false}
                // Animate height to auto or 0 for smooth open/close
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
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
            </motion.div>
        </div>
    );
};

const JobsPage = () => {
    // State for filtering
    const [filters, setFilters] = useState({});
    const [jobRoleSearch, setJobRoleSearch] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    
    // State for UI
    const [filterSectionOpen, setFilterSectionOpen] = useState({
        location: true, sector: true, experience: true, salary: true, type: true // All open by default
    });
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // --- Filter Logic (Main useEffect Hook) ---
    useEffect(() => {
        const newFilteredJobs = jobsData.filter(job => {
            // 1. Filter by job role search input
            const matchesJobRole = job.title.toLowerCase().includes(jobRoleSearch.toLowerCase());
            if (!matchesJobRole) return false;

            // 2. Filter by checkbox selections (location, sector, salary, etc.)
            for (const filterType in filters) {
                // Check if any filter in the group is selected
                if (filters[filterType] && filters[filterType].length > 0) {
                    // Check if the job's value for this filterType is NOT in the selected list
                    if (!filters[filterType].includes(job[filterType])) {
                        return false; // Exclude job if it doesn't match any selected option in this group
                    }
                }
            }
            return true; // Include job if it passed all checks
        });
        setFilteredJobs(newFilteredJobs);
    }, [filters, jobRoleSearch]); // Re-run whenever filters or search term change

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (checked) {
                // Add value to the filter array
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                // Remove value from the filter array
                newFilters[name] = newFilters[name].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    const handleFilterTitleClick = (section) => {
        setFilterSectionOpen(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    
    // --- Mock Filter Options (Matching jobData.js keys) ---
    const mockFilters = {
        location: [
            { value: 'chennai', label: 'Chennai' },
            { value: 'coimbatore', label: 'Coimbatore' },
            { value: 'madurai', label: 'Madurai' },
            { value: 'others', label: 'Other Districts' },
        ],
        sector: [
            { value: 'it', label: 'IT / Software' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'automotive', label: 'Automobile' },
            { value: 'banking', label: 'Banking / Finance' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'services', label: 'Services / BPO' },
            { value: 'retail', label: 'Retail' },
        ],
        salary: [
            { value: 'below-3LPA', label: '< ₹3,00,000 P.A.' },
            { value: '3-6LPA', label: '₹3L - ₹6L P.A.' },
            { value: '6-10LPA', label: '₹6L - ₹10L P.A.' },
            { value: '10-20LPA', label: '₹10L - ₹20L P.A.' },
            { value: '20+LPA', label: '₹20L+ P.A. (Senior/Expert)' },
        ],
        experience: [
            { value: 'fresher', label: 'Fresher / Entry Level' },
            { value: '1-3y', label: '1 - 3 Years' },
            { value: '3-5y', label: '3 - 5 Years' },
            { value: '5+y', label: '5+ Years (Senior)' },
        ],
        type: [
            { value: 'regular', label: 'Full-Time / Regular' },
            { value: 'contract', label: 'Contract / Project-based' },
        ]
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
                
                {/* 1. Search Filter Sidebar (Sticky, Professional) */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24 bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-3">Refine Search</h3>
                        
                        {/* Search Bar Top */}
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

                        {/* Filter Sections */}
                        {Object.keys(mockFilters).map(section => (
                            <FilterSection
                                key={section}
                                title={section.charAt(0).toUpperCase() + section.slice(1)}
                                options={mockFilters[section]}
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
                    {/* Results Header and View Toggle */}
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

                    {/* Job Cards Layout */}
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

=======
// src/components/JobsPage.jsx

import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/JobData'; // Import the job data
import JobCard from './JobCard'; // Import the styled JobCard
import { FiFilter, FiChevronDown, FiSearch, FiLayout, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Component for a collapsible filter section
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
                className="filter-content mt-3 space-y-2 max-h-48 overflow-y-auto pr-2"
                initial={false}
                // Animate height to auto or 0 for smooth open/close
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
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
            </motion.div>
        </div>
    );
};

const JobsPage = () => {
    // State for filtering
    const [filters, setFilters] = useState({});
    const [jobRoleSearch, setJobRoleSearch] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    
    // State for UI
    const [filterSectionOpen, setFilterSectionOpen] = useState({
        location: true, sector: true, experience: true, salary: true, type: true // All open by default
    });
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // --- Filter Logic (Main useEffect Hook) ---
    useEffect(() => {
        const newFilteredJobs = jobsData.filter(job => {
            // 1. Filter by job role search input
            const matchesJobRole = job.title.toLowerCase().includes(jobRoleSearch.toLowerCase());
            if (!matchesJobRole) return false;

            // 2. Filter by checkbox selections (location, sector, salary, etc.)
            for (const filterType in filters) {
                // Check if any filter in the group is selected
                if (filters[filterType] && filters[filterType].length > 0) {
                    // Check if the job's value for this filterType is NOT in the selected list
                    if (!filters[filterType].includes(job[filterType])) {
                        return false; // Exclude job if it doesn't match any selected option in this group
                    }
                }
            }
            return true; // Include job if it passed all checks
        });
        setFilteredJobs(newFilteredJobs);
    }, [filters, jobRoleSearch]); // Re-run whenever filters or search term change

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (checked) {
                // Add value to the filter array
                newFilters[name] = [...(newFilters[name] || []), value];
            } else {
                // Remove value from the filter array
                newFilters[name] = newFilters[name].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    const handleFilterTitleClick = (section) => {
        setFilterSectionOpen(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    
    // --- Mock Filter Options (Matching jobData.js keys) ---
    const mockFilters = {
        location: [
            { value: 'chennai', label: 'Chennai' },
            { value: 'coimbatore', label: 'Coimbatore' },
            { value: 'madurai', label: 'Madurai' },
            { value: 'others', label: 'Other Districts' },
        ],
        sector: [
            { value: 'it', label: 'IT / Software' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'automotive', label: 'Automobile' },
            { value: 'banking', label: 'Banking / Finance' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'services', label: 'Services / BPO' },
            { value: 'retail', label: 'Retail' },
        ],
        salary: [
            { value: 'below-3LPA', label: '< ₹3,00,000 P.A.' },
            { value: '3-6LPA', label: '₹3L - ₹6L P.A.' },
            { value: '6-10LPA', label: '₹6L - ₹10L P.A.' },
            { value: '10-20LPA', label: '₹10L - ₹20L P.A.' },
            { value: '20+LPA', label: '₹20L+ P.A. (Senior/Expert)' },
        ],
        experience: [
            { value: 'fresher', label: 'Fresher / Entry Level' },
            { value: '1-3y', label: '1 - 3 Years' },
            { value: '3-5y', label: '3 - 5 Years' },
            { value: '5+y', label: '5+ Years (Senior)' },
        ],
        type: [
            { value: 'regular', label: 'Full-Time / Regular' },
            { value: 'contract', label: 'Contract / Project-based' },
        ]
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
                
                {/* 1. Search Filter Sidebar (Sticky, Professional) */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24 bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-3">Refine Search</h3>
                        
                        {/* Search Bar Top */}
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

                        {/* Filter Sections */}
                        {Object.keys(mockFilters).map(section => (
                            <FilterSection
                                key={section}
                                title={section.charAt(0).toUpperCase() + section.slice(1)}
                                options={mockFilters[section]}
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
                    {/* Results Header and View Toggle */}
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

                    {/* Job Cards Layout */}
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

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default JobsPage;