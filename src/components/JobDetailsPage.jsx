// src/components/JobDetailsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
    FiMapPin, FiClock, FiDollarSign, FiBriefcase, FiSend, 
    FiBookmark, FiCalendar, FiExternalLink, FiUser 
} from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom'; 

// --- REDUX IMPORTS ---
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../redux/authSlice';
import { toggleBookmark, selectBookmarkedIds } from '../redux/bookmarkSlice';
// ---------------------


// Mock Data (In a real app, this would be fetched using jobId from API)
const mockJobDetails = {
    id: 101, // Use a matching ID from jobsData.js for bookmarking to work
    title: "Senior Full Stack Developer (MERN)",
    company: "TechNova Solutions Pvt Ltd",
    location: "Chennai, Tamil Nadu (Remote Flex)",
    sector: "IT / Software Development",
    salaryText: "₹12,00,000 - ₹18,00,000 P.A.",
    type: "Full-Time",
    experience: "5+ Years",
    postedDate: "2 days ago",
    companyLogo: "https://via.placeholder.com/80?text=TN",
    description: `
        TechNova is seeking a highly skilled and motivated Senior Full Stack Developer to join our dynamic team. You will be responsible for the development of both the front-end and back-end of our public-facing applications. This role requires strong proficiency in the MERN stack (MongoDB, Express, React, Node.js).
        `,
    responsibilities: [
        "Design and implement robust, scalable, and secure APIs using Node.js and Express.",
        "Develop user-facing features using React.js, ensuring high performance on mobile and desktop.",
        "Manage and optimize MongoDB databases, ensuring data integrity and query efficiency.",
    ],
    requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "5+ years of professional experience in full-stack development.",
    ],
    benefits: [
        "Competitive salary and performance bonuses.",
        "Flexible work hours and remote work options.",
    ]
};

// Component for a list of items
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
    const { jobId } = useParams();
    
    // REDUX STATE
    const { isLoggedIn } = useSelector(selectAuth);
    const bookmarkedIds = useSelector(selectBookmarkedIds);
    
    // Find the specific job detail (using mock data for demonstration)
    const job = mockJobDetails; 
    const isBookmarked = bookmarkedIds.includes(job.id);
    
    // --- HANDLER: Apply Job (Requires Login) ---
    const handleApplyClick = () => {
        if (!isLoggedIn) {
            alert('You must be logged in to apply for this job.'); 
            // Redirect to login page, optionally include deep link for better UX
            navigate(`/candidate-login?redirect=/job/${jobId}`); 
            return;
        }

        // Action: Dispatch to mark job as applied (Requires a similar slice/action setup as bookmarks)
        // dispatch(applyJob(job.id)); 
        alert(`Successfully applied for Job ID ${job.id}! (Simulated)`);
        navigate('/candidate/applied-jobs');
    };

    // --- HANDLER: Bookmark Job (Requires Login) ---
    const handleBookmarkClick = () => {
        if (!isLoggedIn) {
            alert('You must be logged in to save this job.'); 
            navigate(`/candidate-login`); 
            return;
        }
        // Action: Dispatch to toggle bookmark status
        dispatch(toggleBookmark(job.id)); 
    };

    if (!job) {
        return <main className="pt-[80px] text-center py-20">Job Not Found</main>;
    }

    return (
        <main className="pt-[80px] bg-primary-light min-h-screen">
            
            {/* Header Banner */}
            <div className="bg-primary-dark py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-white">{job.title}</h1>
                    <p className="text-accent-teal text-xl mt-1">{job.company}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* 1. Main Job Description (3/4 width) */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Key Info Bar */}
                    <motion.div 
                        className="bg-card-bg p-6 rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {[
                            { Icon: FiMapPin, label: "Location", value: job.location.split(',')[0] },
                            { Icon: FiDollarSign, label: "Salary", value: job.salaryText.split(' ')[0] },
                            { Icon: FiClock, label: "Job Type", value: job.type },
                            { Icon: FiUser, label: "Experience", value: job.experience },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-start p-2 border-r last:border-r-0 border-gray-10_0">
                                <item.Icon className="text-accent-teal text-2xl mb-1" />
                                <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                                <span className="text-sm font-semibold text-primary-dark">{item.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Job Overview and Details */}
                    {/* (Structure for Responsibilities, Requirements, and Benefits remains the same) */}
                    
                    <motion.div className="bg-card-bg p-8 rounded-xl shadow-lg border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4 border-b pb-2">Job Overview</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                    </motion.div>

                    <motion.div className="bg-card-bg p-8 rounded-xl shadow-lg border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4 border-b pb-2">Key Responsibilities</h2>
                        <DetailList items={job.responsibilities} />
                    </motion.div>

                    <motion.div className="bg-card-bg p-8 rounded-xl shadow-lg border border-gray-100" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <h2 className="text-3xl font-bold text-primary-dark mb-4 border-b pb-2">Required Skills & Qualifications</h2>
                        <DetailList items={job.requirements} />
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
                        <img src={job.companyLogo} alt={`${job.company} Logo`} className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-accent-yellow/50" />
                        <h3 className="text-xl font-bold text-primary-dark mb-1">{job.company}</h3>
                        <p className="text-sm text-gray-500 mb-6">Posted: {job.postedDate}</p>

                        {/* Apply Button (Uses Auth Barrier) */}
                        <motion.button
                            onClick={handleApplyClick}
                            className="w-full flex items-center justify-center bg-accent-teal text-primary-dark font-bold py-3 rounded-lg shadow-md transition duration-300 hover:bg-teal-400 text-lg mb-3"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiSend className="mr-2" /> 
                            {isLoggedIn ? "Apply Now" : "Login to Apply"} {/* Visual Cue */}
                        </motion.button>
                        
                        {/* Save Job Button (Uses Auth Barrier & Redux State) */}
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