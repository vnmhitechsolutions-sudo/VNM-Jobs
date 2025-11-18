// src/components/candidate/CandidateEditProfile.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, updateProfile } from '../../redux/authSlice'; // NEW IMPORTS
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiUser, FiCalendar, FiBriefcase } from 'react-icons/fi'; // Added FiBriefcase for desired career

const CandidateEditProfile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector(selectAuth); // Get the profile data from Redux

    // Initialize local state with Redux profile data
    const [profileData, setProfileData] = useState({
        name: profile.name || '',
        fatherName: profile.fatherName || '', // Not explicitly used for completion but useful data
        dob: profile.dob || '',
        gender: profile.gender || '',
        district: profile.district || '',
        currentAddress: profile.currentAddress || '',
        desiredCareer: profile.desiredCareer || '',
        shortProfileDescription: profile.shortProfileDescription || '',
        languages: profile.languages || [],
        educationDetails: profile.educationDetails || []
    });

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const addLanguage = () => {
        setProfileData(prev => ({
            ...prev,
            languages: [...prev.languages, { language: '', proficiency: '', read: false, write: false, speak: false, id: Date.now() }]
        }));
    };

    const removeLanguage = (id) => {
        setProfileData(prev => ({
            ...prev,
            languages: prev.languages.filter(lang => lang.id !== id)
        }));
    };
    
    const handleLanguageChange = (id, field, value) => {
        setProfileData(prev => ({
            ...prev,
            languages: prev.languages.map(lang => 
                lang.id === id ? { ...lang, [field]: value } : lang
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Dispatch the entire updated profile object to Redux
        dispatch(updateProfile(profileData));
        
        alert("Profile updated successfully! Completion recalculated.");
    };

    const Input = ({ label, name, type = 'text', value, required = true, disabled = false, halfWidth = false }) => (
        <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
            <input
                key={name} 
                type={type}
                name={name}
                value={value}
                onChange={handleFormChange}
                required={required}
                disabled={disabled}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
            />
        </div>
    );

    const SectionTitle = ({ title, Icon, onAdd }) => (
        <h3 className="text-xl font-bold text-primary-dark mb-4 mt-6 flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="flex items-center"><Icon className="mr-2 text-accent-teal" /> {title}</span>
            {onAdd && (
                <button type="button" onClick={onAdd} className="text-accent-teal hover:text-primary-dark transition flex items-center text-sm font-semibold">
                    <FiPlus className="mr-1" /> Add
                </button>
            )}
        </h3>
    );

    return (
        <CandidateDashboardLayout title="Edit Profile">
            <form onSubmit={handleSubmit} className="space-y-6">
                <button type="button" onClick={() => window.history.back()} className="flex items-center text-primary-dark hover:text-accent-teal transition mb-6">
                    <FiArrowLeft className="mr-2" /> Back to Profile View
                </button>

                {/*  1. Personal Details  */}
                <SectionTitle title="Personal Details" Icon={FiUser} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Name" name="name" value={profileData.name} halfWidth />
                    <Input label="Father's Name" name="fatherName" value={profileData.fatherName} halfWidth />
                    <Input label="Date of Birth" name="dob" type="date" value={profileData.dob} halfWidth />
                    <Input label="Gender" name="gender" value={profileData.gender} halfWidth />
                    <Input label="Current Address" name="currentAddress" value={profileData.currentAddress} />
                </div>
                
                {/*  2. Desired Career Profile  */}
                <SectionTitle title="Desired Career Profile" Icon={FiBriefcase} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Desired Career/Industry" name="desiredCareer" value={profileData.desiredCareer} />
                </div>

                {/*  3. Education Details  */}
                <SectionTitle title="Education Details" Icon={FiCalendar} onAdd={() => alert("Add Education Form")} />
                {profileData.educationDetails.map(edu => (
                    <div key={edu.id} className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 flex justify-between items-center">
                        <div><p className="font-semibold">{edu.degree}</p><p className="text-sm text-gray-600">{edu.college}</p></div>
                        <button type="button" className="text-red-600 hover:text-red-900 transition"><FiTrash2 /></button>
                    </div>
                ))}


                {/*  4. Languages Known (Dynamic Table)  */}
                <SectionTitle title="Languages Known" Icon={FiCalendar} onAdd={addLanguage} />
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... (Table head remains the same) ... */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {profileData.languages.map(lang => (
                                <tr key={lang.id}>
                                    <td className="px-3 py-3"><input type="text" value={lang.language} onChange={(e) => handleLanguageChange(lang.id, 'language', e.target.value)} className="w-full border-gray-300 rounded-md text-sm" /></td>
                                    <td className="px-3 py-3"><input type="text" value={lang.proficiency} onChange={(e) => handleLanguageChange(lang.id, 'proficiency', e.target.value)} className="w-full border-gray-300 rounded-md text-sm" /></td>
                                    {['read', 'write', 'speak'].map(field => (
                                        <td key={field} className="px-3 py-3 text-center">
                                            <input type="checkbox" checked={lang[field]} onChange={(e) => handleLanguageChange(lang.id, field, e.target.checked)} className="form-checkbox text-accent-teal rounded" />
                                        </td>
                                    ))}
                                    <td className="px-3 py-3">
                                        <button type="button" onClick={() => removeLanguage(lang.id)} className="text-red-600 hover:text-red-900 transition"><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/*  5. Technical Skills and Certifications (Placeholders)  */}
                <SectionTitle title="Certification Details" Icon={FiCalendar} onAdd={() => alert("Add Certification Form")} />
                <SectionTitle title="Technical Skill Details" Icon={FiCalendar} onAdd={() => alert("Add Technical Skill Form")} />

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-3 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg flex items-center">
                        <FiSave className="mr-2" /> Save Changes
                    </button>
                </div>
            </form>
        </CandidateDashboardLayout>
    );
};

export default CandidateEditProfile;