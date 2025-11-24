// src/components/candidate/CandidateProfile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/authSlice'; 
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiMail, FiPhone, FiCalendar, FiBriefcase, FiUser, FiMapPin, FiEdit2, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Helper component for clean display (Section remains the same)
const Section = ({ title, Icon, children }) => (
    <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center border-b border-accent-teal/50 pb-2">
            <Icon className="mr-3 text-accent-teal" /> {title}
        </h3>
        {children}
    </div>
);

// Component to generate the completion circle color
const getCompletionColor = (percent) => {
    if (percent === 100) return 'border-green-500 text-green-500';
    if (percent >= 75) return 'border-yellow-500 text-yellow-500';
    return 'border-red-500 text-red-500';
};


const CandidateProfile = () => {
    const { profile, profileCompletion, userName } = useSelector(selectAuth);
    
    // Destructure necessary fields (using defaults for safe rendering)
    const { 
        name, email, mobile, educationDetails, languages, desiredCareer, 
        shortProfileDescription, gender, dob, currentAddress
    } = profile;
    
    const nameDisplay = name || 'User Profile';
    const completion = profileCompletion || 0;
    const completionColorClass = getCompletionColor(completion);

    return (
        <CandidateDashboardLayout title="My Profile (View)">
            
            {/* --- UNIFIED PROFILE CARD (Referencing your image) --- */}
            <div className="bg-card-bg p-6 rounded-xl shadow-classic border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT COLUMN: Photo, Completion, Name/Title */}
                    <div className="md:col-span-1 flex flex-col items-center border-r border-gray-100 pr-6">
                        {/* Profile Photo Circle & Percentage */}
                        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-4 border-4 ${completionColorClass}`}>
                            <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden">
                                {/*  */}
                                <FiUser className="text-gray-500 text-6xl w-full h-full p-6" />
                            </div>
                            <span className={`absolute bottom-0 right-0 px-2 py-1 text-xs font-bold rounded-full bg-white border ${completionColorClass}`}>
                                {completion}%
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-extrabold text-primary-dark mt-2">{nameDisplay}</h3>
                        <p className="text-md text-gray-600 mb-4">B.Tech./B.E. (Placeholder)</p>
                        
                        <Link to="/candidate/edit-profile" className="flex items-center text-accent-teal hover:underline transition">
                            <FiEdit2 className="mr-1 text-lg"/> Edit Profile
                        </Link>
                    </div>

                    {/* CENTER COLUMN: Contact Details & Info */}
                    <div className="md:col-span-2 pt-4">
                        <h4 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">Profile Details</h4>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            
                            <div className="flex items-center space-x-2"><FiMapPin className="text-accent-teal" /> <span>{currentAddress || 'N/A Location'}</span></div>
                            <div className="flex items-center space-x-2"><FiPhone className="text-accent-teal" /> <span>{mobile || 'N/A Phone'}</span></div>
                            
                            <div className="flex items-center space-x-2"><FiUser className="text-accent-teal" /> <span>{gender || 'N/A Gender'}</span></div>
                            <div className="flex items-center space-x-2"><FiMail className="text-accent-teal" /> <span>{email || 'N/A Email'}</span></div>
                            
                            <div className="flex items-center space-x-2"><FiCalendar className="text-accent-teal" /> <span>DOB: {dob || 'N/A'}</span></div>
                            
                        </div>
                        
                        {/* Call to Action for Missing Details (Referencing image_77bbbe.png) */}
                        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <h4 className="text-md font-bold text-primary-dark mb-2">Add Missing Details</h4>
                            <div className="space-y-2 text-sm text-yellow-800">
                                <div className="flex justify-between">
                                    <span>Add project</span> <span><span className="text-green-600">↑7%</span></span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Add certificates</span> <span><span className="text-green-600">↑5%</span></span>
                                </div>
                            </div>
                            <Link to="/candidate/edit-profile" className="mt-4 px-4 py-2 inline-block bg-red-500 text-white font-bold rounded-lg transition hover:bg-red-600">
                                Add {100 - completion}% Missing Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- END UNIFIED PROFILE CARD --- */}


            {/* --- REST OF PROFILE SECTIONS (Simplified List View) --- */}
            <Section title="Desired Career Profile" Icon={FiBriefcase}>
                <p className="text-lg font-medium text-primary-dark mb-2">{desiredCareer || 'N/A'}</p>
                <p className="text-gray-600">{shortProfileDescription || 'No description provided.'}</p>
            </Section>

            {/* ... (Education Details, Languages Known sections follow) ... */}
            
            <Section title="Education Details" Icon={FiCalendar}>
                {educationDetails && educationDetails.length > 0 ? (
                    educationDetails.map((edu, index) => (
                        <div key={index} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold text-primary-dark">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.college}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No education details recorded.</p>
                )}
            </Section>

            <Section title="Languages Known" Icon={FiUser}>
                {languages && languages.length > 0 ? (
                    <p className="text-gray-600">Languages added: {languages.length}</p>
                ) : (
                    <p className="text-gray-500">No languages recorded.</p>
                )}
            </Section>

            <button className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg">
                Delete My Account
            </button>
        </CandidateDashboardLayout>
    );
};

export default CandidateProfile;