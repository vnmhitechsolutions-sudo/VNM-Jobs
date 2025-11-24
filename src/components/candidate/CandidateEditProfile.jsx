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
        educationDetails: profile.educationDetails || [],
        internships: profile.internships || []
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

    const addInternship = () => {
        setProfileData(prev => ({
            ...prev,
            internships: [
                ...(prev.internships || []),
                {
                    companyName: "",
                    type: "",
                    duration: "",
                    projectName: "",
                    responsibilities: "",
                    stipend: "",
                    certificateFile: null
                }
            ]
        }));
    };

    const updateInternship = (index, field, value) => {
        const updated = [...profileData.internships];
        updated[index][field] = value;
        setProfileData({ ...profileData, internships: updated });
    };

    const removeInternship = (index) => {
        const updated = [...profileData.internships];
        updated.splice(index, 1);
        setProfileData({ ...profileData, internships: updated });
    };

    // REPLACE the existing Input definition with this
    const Input = ({ label, name, type = 'text', value, onChange, required = true, disabled = false, halfWidth = false }) => (
    <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange ?? handleFormChange}   // <-- use custom onChange if provided, otherwise fallback
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

                {/* 6. Internship Details */}
                <SectionTitle title="Internship Details" Icon={FiBriefcase} onAdd={addInternship} />

                {profileData.internships && profileData.internships.length > 0 ? (
                    profileData.internships.map((intern, index) => (
                
            <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-4">

            <Input 
                label="Company Name" 
                name={`intern_company_${index}`}
                value={intern.companyName}
                onChange={(e) => updateInternship(index, "companyName", e.target.value)}
            />

            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Internship Type *</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={intern.type}
                    onChange={(e) => updateInternship(index, "type", e.target.value)}
                >
                    <option value="">Select Type</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            <Input 
                label="Duration" 
                name={`intern_duration_${index}`}
                value={intern.duration}
                onChange={(e) => updateInternship(index, "duration", e.target.value)}
            />

            <Input 
                label="Project Name" 
                name={`intern_project_${index}`}
                value={intern.projectName}
                onChange={(e) => updateInternship(index, "projectName", e.target.value)}
            />

            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={intern.responsibilities}
                    onChange={(e) => updateInternship(index, "responsibilities", e.target.value)}
                ></textarea>
            </div>

            <Input 
                label="Stipend" 
                name={`intern_stipend_${index}`}
                value={intern.stipend}
                onChange={(e) => updateInternship(index, "stipend", e.target.value)}
            />

            {/* Certificate Upload */}
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate (Optional)</label>
                <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    onChange={(e) => updateInternship(index, "certificateFile", e.target.files[0])}
                />
            </div>

            <button
                type="button"
                onClick={() => removeInternship(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
            >
                Remove Internship
            </button>
        </div>
    ))
) : (
    <p className="text-gray-500">No internships added yet.</p>
)}



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