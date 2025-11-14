// src/components/candidate/CandidateEditProfile.jsx
import React, { useState } from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiUser, FiCalendar, FiMail } from 'react-icons/fi';

const CandidateEditProfile = () => {
    const [profileData, setProfileData] = useState({
        name: "Gowthaman Chandrasekaran",
        fatherName: "Chandirasekaran",
        dob: "2003-09-22",
        district: "Karur",
        gender: "Male",
        currentAddress: "",
        shortProfileDescription: "Full Stack Developer Java React.js MySQL. Actively Seeking Opportunities.",
        languages: [{ language: 'English', proficiency: 'Proficient', read: true, write: true, speak: true, id: 1 }],
        education: [{ degree: 'B.E. Computer Science', college: 'Karpagam College', year: 2023, id: 1 }]
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
        console.log("Saving Profile Data:", profileData);
        alert("Profile updated successfully!");
    };

    const Input = ({ label, name, type = 'text', value, required = true, disabled = false, halfWidth = false }) => (
        <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
            <input
                key={name} // FIX: Stabilizes input field
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
                
                {/* Profile Snapshot (Matches Screenshot) */}
                <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-xl mb-8 border border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-primary-dark text-xl font-bold border-4 border-accent-teal">
                        {profileData.name.charAt(0)}
                    </div>
                    <div className="text-sm text-gray-700">
                        <p className="font-semibold text-primary-dark flex items-center"><FiUser className="mr-2"/>{profileData.name}</p>
                        <p className="flex items-center"><FiMail className="mr-2"/>gcp1801@gmail.com</p>
                    </div>
                </div>

                {/* --- 1. Personal Details --- */}
                <SectionTitle title="Personal Details" Icon={FiUser} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Name" name="name" value={profileData.name} halfWidth />
                    <Input label="Father's Name" name="fatherName" value={profileData.fatherName} halfWidth />
                    <Input label="Date of Birth" name="dob" type="date" value={profileData.dob} halfWidth />
                    <Input label="District" name="district" value={profileData.district} halfWidth />
                </div>
                
                {/* --- 2. Education Details --- */}
                <SectionTitle title="Education Details" Icon={FiCalendar} onAdd={() => alert("Add Education Form")} />
                {profileData.education.map(edu => (
                    <div key={edu.id} className="p-4 border border-indigo-100 rounded-lg bg-indigo-50 flex justify-between items-center">
                        <div><p className="font-semibold">{edu.degree}</p><p className="text-sm text-gray-600">{edu.college}</p></div>
                        <button type="button" className="text-red-600 hover:text-red-900 transition"><FiTrash2 /></button>
                    </div>
                ))}


                {/* --- 3. Languages Known (Dynamic Table) --- */}
                <SectionTitle title="Languages Known" Icon={FiCalendar} onAdd={addLanguage} />
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Language', 'Proficiency', 'Read', 'Write', 'Speak', 'Action'].map(header => (
                                    <th key={header} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
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
                                        <button type="button" onClick={() => removeLanguage(lang.id)} className="text-red-600 hover:text-red-900 transition">
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- 4. Certifications and Skills (Placeholders) --- */}
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