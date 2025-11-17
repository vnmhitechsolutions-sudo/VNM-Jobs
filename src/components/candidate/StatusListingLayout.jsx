// src/components/candidate/StatusListingLayout.jsx
import React from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import JobCard from '../JobCard';
import { FiInfo, FiCheckSquare, FiBookmark, FiLayers, FiSend } from 'react-icons/fi'; // Added FiSend
import { useSelector } from 'react-redux';
import { selectBookmarkedIds } from '../../redux/bookmarkSlice'; // Correct Redux selector
import { jobsData } from '../../data/JobData'; // CRITICAL: Master job data source

//  Mock Data for Applied/Fair Lists (since their real data isn't in Redux yet) 
const MOCK_APPLIED_FAIR_DATA = [
    { id: 101, title: 'Senior React JS Developer', company: 'Innovatech Solutions', location: 'chennai', type: 'regular', salaryText: '₹12L - ₹18L P.A.', isApplied: true },
    { id: 201, title: 'Data Analyst (Entry Level)', company: 'DataSphere AI', location: 'coimbatore', type: 'contract', salaryText: '₹4L - ₹6L P.A.', isApplied: true },
    { id: 303, title: 'Digital Marketing Specialist', company: 'MarketGrowth Agency', location: 'coimbatore', type: 'regular', salaryText: '₹7L - ₹10L P.A.', isApplied: true },
];
// --


const StatusListingLayout = ({ title, Icon, listType }) => {
    // Read the bookmarked IDs from the Redux store
    const bookmarkedJobIds = useSelector(selectBookmarkedIds);

    let listData = [];
    let emptyMessage = `No ${title} found.`;

    //  DATA FETCHING LOGIC 
    if (listType === 'bookmarked') {
        // FIX: Filter the master job list (jobsData) to find only the bookmarked IDs
        listData = jobsData.filter(job => bookmarkedJobIds.includes(job.id));
        emptyMessage = 'Bookmark interesting jobs from the Job Search page to save them here.';
    } 
    
    else if (listType === 'applied') {
        // Mock: In a real app, you would fetch applied job IDs from a user profile endpoint.
        listData = MOCK_APPLIED_FAIR_DATA.filter(job => job.isApplied);
        emptyMessage = 'You have not applied for any jobs yet. Start your search!';
    }
    
    else if (listType === 'jobfairlist' || listType === 'bookmarkedfair') {
        // Mock: Job Fair listings typically render different cards, but for consistency:
        listData = listType === 'bookmarkedfair' ? [] : MOCK_APPLIED_FAIR_DATA.slice(0, 2);
        emptyMessage = listType === 'bookmarkedfair' ? 'Bookmark job fair events to see them here.' : 'No active Job Fair listings available.';
    }
    
    //  END DATA FETCHING LOGIC 

    return (
        <CandidateDashboardLayout title={title}>
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <Icon className="mr-3 text-accent-teal" /> {title}
            </h2>

            {listData.length > 0 ? (
                <div className="space-y-6">
                    {/* Render job cards for the filtered data */}
                    {listData.map(job => (
                        <JobCard key={job.id} job={job} viewMode="list" />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <FiInfo className="text-5xl text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">{emptyMessage}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {listType === 'applied' ? 'View listings to begin saving.' : 'Start applying for jobs via the Job Search page.'}
                    </p>
                </div>
            )}
        </CandidateDashboardLayout>
    );
};


//  Exporting the specific pages using the layout 

export const AppliedJobsPage = () => (
    <StatusListingLayout title="Applied Jobs" Icon={FiCheckSquare} listType="applied" />
);

export const BookmarkedJobsPage = () => (
    <StatusListingLayout title="Bookmarked Jobs" Icon={FiBookmark} listType="bookmarked" />
);

export const JobFairListPage = () => (
    <StatusListingLayout title="Job Fair List" Icon={FiLayers} listType="jobfairlist" />
);

export const BookmarkedJobFairListPage = () => (
    <StatusListingLayout title="Bookmarked Job Fair List" Icon={FiBookmark} listType="bookmarkedfair" />
);

export default StatusListingLayout;