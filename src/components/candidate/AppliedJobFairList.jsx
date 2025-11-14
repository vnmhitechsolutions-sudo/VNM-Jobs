// src/components/candidate/AppliedJobFairList.jsx
import React from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiSend, FiInfo } from 'react-icons/fi';

const AppliedJobFairList = () => {
    // Mock applied data
    const appliedFairs = []; // Empty array matches the screenshot

    return (
        <CandidateDashboardLayout title="Applied Job Fair List">
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <FiSend className="mr-3 text-accent-teal" /> Your Applications
            </h2>

            {appliedFairs.length > 0 ? (
                <div className="space-y-4">
                    {/* Render List of Applied Fairs Here */}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <FiInfo className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">No Job Fair applications found.</p>
                    <p className="text-sm text-gray-500 mt-1">Visit the Job Fair Calendar to find and apply for events.</p>
                </div>
            )}
        </CandidateDashboardLayout>
    );
};

export default AppliedJobFairList;