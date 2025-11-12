<<<<<<< HEAD
// src/components/AuthLayoutSide.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiBriefcase, FiUploadCloud, FiFileText, FiUsers } from 'react-icons/fi';

const InfoCard = ({ Icon, title, description, color }) => (
    <motion.div 
        className="info-card p-5 bg-primary-dark/10 rounded-lg shadow-inner border border-gray-100 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Icon className={`text-3xl mb-3 ${color}`} />
        <h3 className="text-lg font-semibold text-primary-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
);

const AuthLayoutSide = ({ children, title, infoType = 'candidate' }) => {
    const isCandidate = infoType === 'candidate';
    
    // Define Info Card data based on type
    const infoData = isCandidate ? [
        { Icon: FiSearch, title: "Job Search", description: "Find jobs that will suit your skills and expectations. Search by location, sector, and salary.", color: "text-accent-teal" },
        { Icon: FiBriefcase, title: "Career Opportunities", description: "We have job opportunities covering all sectors. Get roles suiting your qualification.", color: "text-accent-yellow" },
        { Icon: FiFileText, title: "Job Fair Alerts", description: "Get notified about all Job fair events conducted regularly across the districts.", color: "text-accent-teal" },
        { Icon: FiUploadCloud, title: "Upload Your Resume", description: "Log in, upload your resume, and apply for suitable jobs posted by verified employers.", color: "text-accent-yellow" },
    ] : [
        { Icon: FiUsers, title: "Candidate Search", description: "Access profiles of candidates with diverse skillsets. Easily find the best fit.", color: "text-primary-dark" },
        { Icon: FiFileText, title: "Post Jobs Instantly", description: "Post details of job openings, clearly explaining your needs and expectations to attract the right talent.", color: "text-accent-teal" },
        { Icon: FiBriefcase, title: "Job Fair Participation", description: "Participate in job fairs conducted regularly to meet and recruit large numbers of candidates.", color: "text-primary-dark" },
        { Icon: FiSearch, title: "Candidate Data Access", description: "Find an exhaustive list of candidates suiting your requirements for further shortlisting.", color: "text-accent-teal" },
    ];

    return (
        <div className="min-h-screen pt-[80px] pb-10 flex items-center justify-center bg-primary-light p-4 md:p-8">
            <motion.div
                className="w-full max-w-6xl bg-card-bg rounded-xl shadow-classic overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 1. Info Section (Modern Grid) */}
                <div className={`p-8 md:p-10 ${isCandidate ? 'bg-gradient-to-br from-white to-teal-50' : 'bg-gradient-to-br from-white to-indigo-50'}`}>
                    <h2 className={`text-2xl font-bold mb-6 ${isCandidate ? 'text-accent-teal' : 'text-primary-dark'}`}>
                        {isCandidate ? "CANDIDATE BENEFITS" : "EMPLOYER BENEFITS"}
                    </h2>
                    <div className="info-grid grid grid-cols-1 gap-6">
                        {infoData.map((data, index) => (
                            <InfoCard key={index} {...data} />
                        ))}
                    </div>
                </div>

                {/* 2. Form Section */}
                <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                    <h2 className="text-3xl font-bold text-primary-dark mb-2">{title}</h2>
                    <p className="text-gray-500 mb-6">{isCandidate ? "Access your job search dashboard." : "Manage your recruitment process."}</p>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

=======
// src/components/AuthLayoutSide.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiBriefcase, FiUploadCloud, FiFileText, FiUsers } from 'react-icons/fi';

const InfoCard = ({ Icon, title, description, color }) => (
    <motion.div 
        className="info-card p-5 bg-primary-dark/10 rounded-lg shadow-inner border border-gray-100 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Icon className={`text-3xl mb-3 ${color}`} />
        <h3 className="text-lg font-semibold text-primary-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
);

const AuthLayoutSide = ({ children, title, infoType = 'candidate' }) => {
    const isCandidate = infoType === 'candidate';
    
    // Define Info Card data based on type
    const infoData = isCandidate ? [
        { Icon: FiSearch, title: "Job Search", description: "Find jobs that will suit your skills and expectations. Search by location, sector, and salary.", color: "text-accent-teal" },
        { Icon: FiBriefcase, title: "Career Opportunities", description: "We have job opportunities covering all sectors. Get roles suiting your qualification.", color: "text-accent-yellow" },
        { Icon: FiFileText, title: "Job Fair Alerts", description: "Get notified about all Job fair events conducted regularly across the districts.", color: "text-accent-teal" },
        { Icon: FiUploadCloud, title: "Upload Your Resume", description: "Log in, upload your resume, and apply for suitable jobs posted by verified employers.", color: "text-accent-yellow" },
    ] : [
        { Icon: FiUsers, title: "Candidate Search", description: "Access profiles of candidates with diverse skillsets. Easily find the best fit.", color: "text-primary-dark" },
        { Icon: FiFileText, title: "Post Jobs Instantly", description: "Post details of job openings, clearly explaining your needs and expectations to attract the right talent.", color: "text-accent-teal" },
        { Icon: FiBriefcase, title: "Job Fair Participation", description: "Participate in job fairs conducted regularly to meet and recruit large numbers of candidates.", color: "text-primary-dark" },
        { Icon: FiSearch, title: "Candidate Data Access", description: "Find an exhaustive list of candidates suiting your requirements for further shortlisting.", color: "text-accent-teal" },
    ];

    return (
        <div className="min-h-screen pt-[80px] pb-10 flex items-center justify-center bg-primary-light p-4 md:p-8">
            <motion.div
                className="w-full max-w-6xl bg-card-bg rounded-xl shadow-classic overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 1. Info Section (Modern Grid) */}
                <div className={`p-8 md:p-10 ${isCandidate ? 'bg-gradient-to-br from-white to-teal-50' : 'bg-gradient-to-br from-white to-indigo-50'}`}>
                    <h2 className={`text-2xl font-bold mb-6 ${isCandidate ? 'text-accent-teal' : 'text-primary-dark'}`}>
                        {isCandidate ? "CANDIDATE BENEFITS" : "EMPLOYER BENEFITS"}
                    </h2>
                    <div className="info-grid grid grid-cols-1 gap-6">
                        {infoData.map((data, index) => (
                            <InfoCard key={index} {...data} />
                        ))}
                    </div>
                </div>

                {/* 2. Form Section */}
                <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                    <h2 className="text-3xl font-bold text-primary-dark mb-2">{title}</h2>
                    <p className="text-gray-500 mb-6">{isCandidate ? "Access your job search dashboard." : "Manage your recruitment process."}</p>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default AuthLayoutSide;