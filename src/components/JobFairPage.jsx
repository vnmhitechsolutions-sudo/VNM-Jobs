// src/components/JobFairPage.jsx
import React from 'react';
import { FiMapPin, FiCalendar, FiClock, FiPlusCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Mock Data for Job Fairs (You would replace this with an API fetch)
const mockJobFairs = [
    { id: 1, title: 'Mega Job Fair - 14 NOV 2025', location: 'Thiruvallur District', details: 'District Employment and Career Guidance Centre, Thiruvallur District, ...', date: '14.11.2025', time: '10:00 AM - 05:00 PM', category: 'Mega' },
    { id: 2, title: 'Micro Job Fair - 14-11-2025', location: 'Union Club, Mylapore, Chennai', details: 'District Employment and Career Guidance Centre - Mylapore at Union Club...', date: '14.11.2025', time: '10:00 AM - 01:00 PM', category: 'Micro' },
    { id: 3, title: 'Women Mega Job Fair - 21 NOV 2025', location: 'Tirunelveli District, Palayamkottai', details: 'Organized by District Employment Office Palayamkottai, focusing on women candidates.', date: '21.11.2025', time: '09:30 AM - 04:00 PM', category: 'Women' },
];

const JobFairPage = () => {
  return (
    <main className="pt-[80px] bg-primary-light min-h-screen">
        
        {/* Job Fair Header (Accent Color) */}
        <div className="bg-accent-teal py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-primary-dark">Upcoming Job Fairs 🗓️</h1>
                <p className="text-primary-dark/80 mt-1">Stay updated with the latest recruitment events across the state.</p>
            </div>
        </div>

        {/* Vertical Timeline Layout */}
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="relative border-l-4 border-primary-dark/20 ml-4 md:ml-12 lg:ml-20">
                {mockJobFairs.map((fair, index) => (
                    <motion.div
                        key={fair.id}
                        className="mb-10 ml-6 md:ml-8 lg:ml-10 relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-9 md:-left-11 lg:-left-13 top-0 w-6 h-6 bg-primary-dark rounded-full border-4 border-primary-light shadow-md"></div>
                        
                        <div className="bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100 hover:shadow-xl transition duration-300">
                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
                                fair.category === 'Mega' ? 'bg-accent-yellow/20 text-accent-yellow' : 
                                fair.category === 'Micro' ? 'bg-indigo-100 text-indigo-700' :
                                'bg-purple-100 text-purple-700'
                            }`}>
                                {fair.category} Job Fair
                            </span>
                            
                            <h3 className="text-2xl font-bold text-primary-dark mb-2 hover:text-accent-teal transition cursor-pointer">{fair.title}</h3>
                            
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <p className="flex items-center"><FiCalendar className="mr-2 text-accent-teal" /> Date: **{fair.date}**</p>
                                <p className="flex items-center"><FiClock className="mr-2 text-accent-teal" /> Time: {fair.time}</p>
                                <p className="flex items-start"><FiMapPin className="mr-2 mt-1 text-accent-teal min-w-[16px]" /> Location: {fair.location}</p>
                            </div>
                            
                            <p className="text-gray-700 line-clamp-2">{fair.details}</p>
                            
                            <motion.button 
                                className="mt-4 flex items-center text-accent-teal font-semibold hover:text-primary-dark transition"
                                whileHover={{ x: 5 }}
                            >
                                <FiPlusCircle className="mr-1" /> Read More & Register
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
                
                {/* End of Timeline Marker */}
                <div className="absolute -left-9 md:-left-11 lg:-left-13 bottom-[-10px] w-6 h-6 bg-primary-dark/50 rounded-full border-4 border-primary-light shadow-md"></div>
                
            </div>
            {mockJobFairs.length === 0 && (
                <p className="text-center text-gray-500 py-20">No upcoming job fairs currently scheduled.</p>
            )}
        </div>

    </main>
  );
};

export default JobFairPage;