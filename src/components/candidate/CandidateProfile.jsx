// src/components/candidate/CandidateProfile.jsx
import React from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiMail, FiPhone, FiCalendar, FiBriefcase, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const mockProfile = {
    name: "Gowthaman Chandirasekaran",
    email: "gcp1801@gmail.com",
    phone: "8825951056",
    dob: "22-09-2003",
    pincode: "639005",
    completion: 78,
    desiredCareer: "IT/ITES - With I Taminadu",
    shortDescription: "Full Stack Developer (Java, React.js, MySQL). Actively Seeking Opportunities.",
    education: [
        { degree: "Under Graduate - Bachelor of Engineering / Technology - COMPUTER SCIENCE AND ENGINEERING", college: "Karpagam College Of Engineering", percentage: "7.6 %", year: "2023 (Full Time)" }
    ],
    languages: [{ id: 1, language: "English", proficiency: "Proficient", read: true, write: true, speak: true }]
};

const CandidateProfile = () => {
    const { name, completion, education, languages, desiredCareer, shortDescription } = mockProfile;

    // Helper component for cleaner layout
    const Section = ({ title, Icon, children }) => (
        <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center border-b border-accent-teal/50 pb-2">
                <Icon className="mr-3 text-accent-teal" /> {title}
            </h3>
            {children}
        </div>
    );

    return (
        <CandidateDashboardLayout title="My Profile (View)">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                <h2 className="text-3xl font-bold text-primary-dark">Welcome, {name.split(' ')[0]}! 👋</h2>
                <Link to="/candidate/edit-profile" className="px-4 py-2 bg-accent-teal text-primary-dark font-semibold rounded-lg hover:bg-teal-400 transition shadow-md">
                    Edit Profile
                </Link>
            </div>
            
            {/* Profile Header Card */}
            <div className="flex items-center space-x-6 p-4 bg-indigo-50 rounded-xl mb-8 border border-indigo-100">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-primary-dark text-xl font-bold border-4 border-accent-teal">
                    {name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-primary-dark">{name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                        <p className="flex items-center"><FiMail className="mr-2" />{mockProfile.email}</p>
                        <p className="flex items-center"><FiPhone className="mr-2" />{mockProfile.phone}</p>
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

            {/* Profile Sections */}
            <Section title="Desired Career Profile" Icon={FiBriefcase}>
                <p className="text-lg font-medium text-primary-dark mb-2">{desiredCareer}</p>
                <p className="text-gray-600">{shortDescription}</p>
            </Section>

            <Section title="Education Details" Icon={FiCalendar}>
                {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-primary-dark">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.college} - {edu.percentage}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                    </div>
                ))}
            </Section>

            <Section title="Languages Known" Icon={FiUser}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proficiency</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read/Write/Speak</th>
                        </tr>
                    </thead>
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
            </Section>

            <button className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg">
                Delete My Account
            </button>
        </CandidateDashboardLayout>
    );
};

export default CandidateProfile;