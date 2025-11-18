// src/components/candidate/FeedbackPage.jsx
import React, { useState } from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", feedback);
        alert("Thank you for your feedback! We will review it shortly.");
        setFeedback('');
    };

    return (
        <CandidateDashboardLayout title="Feedback">
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <FiMessageSquare className="mr-3 text-accent-teal" /> Share Your Feedback
            </h2>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <p className="text-gray-600">Help us improve the portal by sharing your suggestions, bug reports, or comments below.</p>
                
                <div>
                    <label htmlFor="feedback-text" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                    <textarea
                        id="feedback-text"
                        name="feedback"
                        rows="6"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                        placeholder="Type your feedback here"
                    ></textarea>
                </div>
                
                <motion.button
                    type="submit"
                    className="px-6 py-3 bg-accent-teal text-primary-dark font-bold rounded-lg hover:bg-teal-400 transition shadow-lg flex items-center"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!feedback.trim()}
                >
                    <FiSend className="mr-2" /> Submit Feedback
                </motion.button>
            </form>
        </CandidateDashboardLayout>
    );
};

export default FeedbackPage;