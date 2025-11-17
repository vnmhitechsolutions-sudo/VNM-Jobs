// src/components/JobDetailsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
    FiMapPin, FiClock, FiDollarSign, FiBriefcase, FiSend, 
    FiBookmark, FiCalendar, FiExternalLink, FiUser 
} from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom'; 

//  REDUX & DATA IMPORTS 
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../redux/authSlice';
import { toggleBookmark, selectBookmarkedIds } from '../redux/bookmarkSlice'; 
import { jobsData } from '../data/JobData'; // <-- CRITICAL: Import master job data
// -
import { applyJob } from '../redux/jobsSlice';

// Component for a list of items (unchanged)
const DetailList = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
        {items.map((item, index) => (
            <li key={index} className="pl-2 relative before:content-['\\2022'] before:absolute before:left-0 before:text-accent-teal before:font-bold">
                {item}
            </li>
        ))}
    </ul>
);

const JobDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { jobId } = useParams(); // Get the ID from the URL (e.g., '101', '201')
    
    // REDUX STATE
    const { isLoggedIn } = useSelector(selectAuth);
    const bookmarkedIds = useSelector(selectBookmarkedIds);
    
    // -
    // 💥 THE FIX: Dynamically find the job details
    // -
    // Convert jobId (which is a string from URL params) to a number for comparison
    const jobIdInt = parseInt(jobId);
    
    // Look up the job object in your master array
    const job = jobsData.find(j => j.id === jobIdInt);
    
    // Fallback data for required fields if the job is found (details need to be constructed)
    const jobDetails = job ? {
        // Use real job data from jobsData.js for key details
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        sector: job.sector,
        salaryText: job.salaryText,
        type: job.type,
        experience: job.experience,
        postedDate: job.posted,
        companyLogo: job.companyLogo,
        // Mock detailed content (since jobsData.js is simplified)
        description: `This is the dynamic description for ${job.title} at ${job.company}. We are looking for candidates with expertise in the ${job.sector} sector. Apply now!`,
        responsibilities: ["Dynamic duty 1.", "Dynamic duty 2.", "Dynamic duty 3."],
        requirements: ["Dynamic requirement 1.", "Dynamic requirement 2."],
    } : null;

    
    const isBookmarked = jobDetails ? bookmarkedIds.includes(jobDetails.id) : false;

    const handleApplyClick = () => {
        if (!isLoggedIn) {
            alert('You must be logged in to apply for this job.'); 
            navigate(`/candidate-login?redirect=/job/${jobId}`); 
            return;
        }
        dispatch(applyJob(job.id))
        alert(`Successfully applied for Job ID ${jobDetails.id}! (Simulated)`);
        navigate('/candidate/applied-jobs');
    };

    const handleBookmarkClick = () => {
        if (!isLoggedIn) {
            alert('You must be logged in to save this job.'); 
            navigate(`/candidate-login`); 
            return;
        }

        dispatch(toggleBookmark(jobDetails.id)); 
    };

    if (!jobDetails) {
        return <main className="pt-[80px] text-center py-20 text-red-600 font-bold">Error: Job ID {jobId} Not Found.</main>;
    }

    return (
        <main className="pt-[80px] bg-primary-light min-h-screen">
            
            {/* Header Banner */}
            <div className="bg-primary-dark py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-white">{jobDetails.title}</h1>
                    <p className="text-accent-teal text-xl mt-1">{jobDetails.company}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* 1. Main Job Description (3/4 width) */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Key Info Bar (Using dynamic jobDetails) */}
                    <motion.div 
                        className="bg-card-bg p-6 rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {[
                            { Icon: FiMapPin, label: "Location", value: jobDetails.location.split(',')[0] },
                            { Icon: FiDollarSign, label: "Salary", value: jobDetails.salaryText.split(' ')[0] },
                            { Icon: FiClock, label: "Job Type", value: jobDetails.type },
                            { Icon: FiUser, label: "Experience", value: jobDetails.experience },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-start p-2 border-r last:border-r-0 border-gray-10_0">
                                <item.Icon className="text-accent-teal text-2xl mb-1" />
                                <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                                <span className="text-sm font-semibold text-primary-dark">{item.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Job Overview and Details (Using dynamic jobDetails) */}
                    <motion.div className="bg-card-bg p-8 rounded-xl shadow-lg border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4 border-b pb-2">Job Overview</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{jobDetails.description}</p>
                    </motion.div>
                    
                    <motion.div className="bg-card-bg p-8 rounded-xl shadow-lg border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4 border-b pb-2">Key Responsibilities</h2>
                        <DetailList items={jobDetails.responsibilities} />
                    </motion.div>
                </div>

                {/* 2. Sticky Apply Box (1/4 width) */}
                <div className="lg:col-span-1">
                    <motion.div 
                        className="lg:sticky lg:top-24 bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100 text-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                    >
                        <img src={jobDetails.companyLogo} alt={`${jobDetails.company} Logo`} className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-accent-yellow/50" />
                        <h3 className="text-xl font-bold text-primary-dark mb-1">{jobDetails.company}</h3>
                        <p className="text-sm text-gray-500 mb-6">Posted: {jobDetails.postedDate}</p>

                        {/* Apply Button */}
                        <motion.button
                            onClick={handleApplyClick}
                            className="w-full flex items-center justify-center bg-accent-teal text-primary-dark font-bold py-3 rounded-lg shadow-md transition duration-300 hover:bg-teal-400 text-lg mb-3"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiSend className="mr-2" /> 
                            {isLoggedIn ? "Apply Now" : "Login to Apply"}
                        </motion.button>
                        
                        {/* Save Job Button */}
                        <motion.button
                            onClick={handleBookmarkClick}
                            className={`w-full flex items-center justify-center font-semibold py-3 rounded-lg shadow-md transition duration-300 text-base ${
                                isBookmarked 
                                ? 'bg-accent-yellow text-primary-dark hover:bg-yellow-400'
                                : 'bg-primary-dark text-white hover:bg-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiBookmark className="mr-2" /> 
                            {isBookmarked ? "Job Saved" : "Save Job"}
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default JobDetailsPage;