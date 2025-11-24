// src/components/candidate/CandidateProfile.jsx (Reading Dynamic Data)
import React from 'react';
import { useSelector } from 'react-redux'; // <-- NEW IMPORT
import { selectAuth } from '../../redux/authSlice'; // <-- NEW IMPORT
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiMail, FiPhone, FiCalendar, FiBriefcase, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// NOTE: Mock data object is now deleted, replaced by Redux selector.

// Helper component for cleaner layout (Section remains the same)
const Section = ({ title, Icon, children }) => (
    <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center border-b border-accent-teal/50 pb-2">
            <Icon className="mr-3 text-accent-teal" /> {title}
        </h3>
        {children}
    </div>
);

const CandidateProfile = () => {
    // 💥 FIX: Read all profile data and completion status from Redux
    const { profile, profileCompletion, userName } = useSelector(selectAuth);
    
    // Destructure necessary fields (use optional chaining for safety)
    const { 
        name, email, mobile, educationDetails, languages, desiredCareer, 
        shortProfileDescription 
    } = profile;
    
    // Provide defaults if data is null
    const nameDisplay = name || 'User Profile';
    const completion = profileCompletion || 0;
    
    // Check if profile data exists before attempting to display.
    if (!name) {
        return (
            <CandidateDashboardLayout title="My Profile (View)">
                <div className="text-center py-12">
                    <FiInfo className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-primary-dark">No Profile Data Found</h2>
                    <p className="text-gray-600 mt-2">Please go to Edit Profile to complete your details.</p>
                    <Link to="/candidate/edit-profile" className="mt-4 px-4 py-2 bg-accent-teal text-primary-dark font-semibold rounded-lg hover:bg-teal-400 transition shadow-md inline-block">
                        Go to Edit Profile
                    </Link>
                </div>
            </CandidateDashboardLayout>
        );
    }

    return (
        <CandidateDashboardLayout title="My Profile (View)">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                <h2 className="text-3xl font-bold text-primary-dark">Welcome, {userName || nameDisplay.split(' ')[0]}! 👋</h2>
                <Link to="/candidate/edit-profile" className="px-4 py-2 bg-accent-teal text-primary-dark font-semibold rounded-lg hover:bg-teal-400 transition shadow-md">
                    Edit Profile
                </Link>
            </div>
            
            {/* Profile Header Card */}
            <div className="flex items-center space-x-6 p-4 bg-indigo-50 rounded-xl mb-8 border border-indigo-100">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-primary-dark text-xl font-bold border-4 border-accent-teal">
                    {nameDisplay.charAt(0)}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-primary-dark">{nameDisplay}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                        <p className="flex items-center"><FiMail className="mr-2" />{email || 'N/A'}</p>
                        <p className="flex items-center"><FiPhone className="mr-2" />{mobile || 'N/A'}</p>
                    </div>
                </div>
                <div className="ml-auto text-right">
                    <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2.5 mt-1">
                        <div className="bg-accent-teal h-2.5 rounded-full" style={{ width: `${completion}%` }}></div>
                    </div>
                    <span className="text-md font-bold text-primary-dark mt-1 block">{completion}%</span>
                </div>
            </div>

            {/* Profile Sections - Now DYNAMIC */}
            <Section title="Desired Career Profile" Icon={FiBriefcase}>
                <p className="text-lg font-medium text-primary-dark mb-2">{desiredCareer || 'N/A'}</p>
                <p className="text-gray-600">{shortProfileDescription || 'No description provided.'}</p>
            </Section>

            <Section title="Education Details" Icon={FiCalendar}>
                {educationDetails && educationDetails.length > 0 ? (
                    educationDetails.map((edu, index) => (
                        <div key={index} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold text-primary-dark">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.college} - {edu.percentage}</p>
                            <p className="text-xs text-gray-500">{edu.year}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No education details recorded.</p>
                )}
            </Section>

            <Section title="Languages Known" Icon={FiUser}>
                {languages && languages.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... (Table head remains the same) ... */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {languages.map(lang => (
                                <tr key={lang.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-dark">{lang.language}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lang.proficiency}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lang.read && 'Read, '}
                                        {lang.write && 'Write, '}
                                        {lang.speak && 'Speak'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No languages recorded.</p>
                )}
            </Section>


            <Section title="Internships" Icon={FiBriefcase}>
                {profile.internships && profile.internships.length > 0 ? (
                    profile.internships.map((intern, index) => (
                    <div key={index} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-primary-dark">{intern.companyName}</p>
                        <p className="text-sm text-gray-600">Type: {intern.type}</p>
                        <p className="text-sm text-gray-600">Duration: {intern.duration}</p>
                        <p className="text-sm text-gray-600">Project: {intern.projectName}</p>
                        <p className="text-sm text-gray-600">Responsibilities: {intern.responsibilities}</p>
                        <p className="text-sm text-gray-600">Stipend: {intern.stipend || "N/A"}</p>
                        {intern.certificateUrl && (
                            <a 
                            href={intern.certificateUrl} 
                            target="_blank" 
                            className="text-blue-600 underline text-sm"
                            >
                            
                            View Certificate
                           </a>
                        )}
                        </div>
                        ))
                    ) : (
                    <p className="text-gray-500">No internship details recorded.</p>
                )}
           
            </Section>


            <button className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg">
                Delete My Account
            </button>
        </CandidateDashboardLayout>
    );
};

export default CandidateProfile;