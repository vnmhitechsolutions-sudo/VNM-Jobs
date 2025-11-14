// src/components/candidate/StatusListingLayout.jsx
import React from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import JobCard from '../JobCard'; // Reusing the JobCard component
import { FiInfo, FiCheckSquare, FiBookmark, FiLayers } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectBookmarkedIds } from '../../redux/bookmarkSlice';
import { jobsData } from '../../data/JobData';
const mockJobs = [
    { id: 1, title: 'Senior React JS Developer', company: 'Innovatech Solutions', location: 'chennai', type: 'regular', salaryText: '₹12L - ₹18L P.A.' },
    { id: 2, title: 'Data Analyst (Entry Level)', company: 'DataSphere AI', location: 'coimbatore', type: 'contract', salaryText: '₹4L - ₹6L P.A.' },
];

const StatusListingLayout = ({ title, Icon, listType }) => {
    // Determine data based on listType prop
    const listData = listType === 'applied' ? mockJobs : listType === 'bookmarked' ? mockJobs.slice(0, 1) : [];

return (
        <CandidateDashboardLayout title={title}>
            {/* ... (Rendering logic remains the same) ... */}
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <Icon className="mr-3 text-accent-teal" /> {title}
            </h2>

            {listData.length > 0 ? (
                <div className="space-y-6">
                    {listData.map(job => (
                        <JobCard key={job.id} job={job} viewMode="list" />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <FiInfo className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">{emptyMessage}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {listType === 'applied' ? 'Start applying for jobs via the Job Search page.' : 'View listings to begin saving.'}
                    </p>
                </div>
            )}
        </CandidateDashboardLayout>
    );
};
// --- Exporting the specific pages using the layout ---

export const AppliedJobsPage = () => (
    <StatusListingLayout title="Applied Jobs" Icon={FiCheckSquare} listType="applied" />
);

export const BookmarkedJobsPage = () => (
    <StatusListingLayout title="Bookmarked Jobs" Icon={FiBookmark} listType="bookmarked" />
);

export const JobFairListPage = () => (
    <StatusListingLayout title="Job Fair List" Icon={FiLayers} listType="fairlist" />
);

export const BookmarkedJobFairListPage = () => (
    <StatusListingLayout title="Bookmarked Job Fair List" Icon={FiBookmark} listType="bookmarkedfair" />
);