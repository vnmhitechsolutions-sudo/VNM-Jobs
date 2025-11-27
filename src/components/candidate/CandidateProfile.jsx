// src/components/candidate/CandidateProfile.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, updateProfile } from '../../redux/authSlice';
import CandidateDashboardLayout from './CandidateDashboardLayout';
// Import the separate Education Modal component
import EducationModal from './ExperienceJobModal';
import {
    FiMail, FiPhone, FiCalendar, FiBriefcase, FiUser, FiMapPin,
    FiEdit2, FiSave, FiCamera, FiTrash2, FiPlus, FiCheckCircle,
    FiFileText, FiAward, FiAperture, FiX
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

//  Helper Component Definitions (Required for rendering inputs) 

const Input = ({ label, name, type = 'text', value, required = true, disabled = false, halfWidth = false, onChange, ...props }) => (
    <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
        <input
            key={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
            {...props}
        />
    </div>
);

const SelectInput = ({ label, name, value, options, onChange, required = true, halfWidth = false }) => (
    <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition appearance-none cursor-pointer"
        >
            <option value="">-Select {label}-</option>
            {options.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
        </select>
    </div>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange, disabled }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
        <div className="flex space-x-6">
            {options.map(opt => (
                <label key={opt.value} className={`flex items-center space-x-2 text-sm text-gray-700 ${!disabled && 'cursor-pointer'}`}>
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={selectedValue === opt.value}
                        onChange={onChange}
                        required
                        disabled={disabled}
                        className="form-radio text-accent-teal"
                    />
                    <span>{opt.label}</span>
                </label>
            ))}
        </div>
    </div>
);


const Section = ({ title, Icon, children, onEdit, isEditing, onAdd }) => (
    <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-primary-dark mb-4 flex justify-between items-center border-b border-accent-teal/50 pb-2">
            <span className="flex items-center"><Icon className="mr-3 text-accent-teal" /> {title}</span>
            {onEdit && !isEditing && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex items-center text-primary-dark hover:text-accent-teal transition text-sm font-medium"
                >
                    <FiEdit2 className="mr-1" /> Edit
                </button>
            )}
            {onAdd && isEditing && ( // Only show ADD button in Edit Mode
                <button type="button" onClick={onAdd} className="text-accent-teal hover:text-primary-dark transition flex items-center text-sm font-semibold">
                    <FiPlus className="mr-1" /> Add
                </button>
            )}
        </h3>
        {children}
    </div>
);
//  End Helper Components 


const CandidateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const modalFileInputRef = useRef(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const { profile, profileCompletion, userName } = useSelector(selectAuth);
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState(profile);
    const [previewUrl, setPreviewUrl] = useState(profile.profilePicture || null);

    // NEW STATE: Manage Education Modal
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [modalEducationData, setModalEducationData] = useState(null);

    // Sync local state with Redux state on initial load/profile update
    useEffect(() => {
        setProfileData(profile);
        setPreviewUrl(profile.profilePicture || null);
    }, [profile]);

    //  Data Calculation (omitted for brevity) 
    const getCompletionColor = (percent) => {
        if (percent === 100) return 'border-green-500 text-green-500';
        if (percent >= 75) return 'border-yellow-500 text-yellow-500';
        return 'border-red-500 text-red-500';
    };

    const nameDisplay = profile.name || 'User Profile';
    const completion = profileCompletion || 0;
    const completionColorClass = getCompletionColor(completion);
    const firstEducation = profileData.educationDetails?.[0];

    //  Handlers 
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleEnterEditMode = () => {
        // Navigate to dedicated edit screen for profile updates
        navigate('/candidate/edit-profile');
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();

        dispatch(updateProfile(profileData));

        alert("Profile updated successfully!");
        setIsEditing(false); // Switch back to View Mode
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setProfileData(prev => ({ ...prev, profilePicture: url }));
            alert("Image selected! Click 'Save Changes' to finalize.");
        }
    };

    const triggerFileInput = () => { fileInputRef.current.click(); };

    // Photo Modal Handlers
    const openPhotoModal = () => setShowPhotoModal(true);
    const closePhotoModal = () => setShowPhotoModal(false);

    const handleModalFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setProfileData(prev => ({ ...prev, profilePicture: url, profilePictureFile: file }));
        }
    };

    const handleDeletePhoto = () => {
        setPreviewUrl(null);
        setProfileData(prev => ({ ...prev, profilePicture: '' }));
        closePhotoModal();
    };

    // 1. Education Modal Handlers
    const handleOpenEducationModal = (data = null) => {
        setModalEducationData(data); // Pass null for new entry, or data for edit
        setShowEducationModal(true);
    };

    const handleSaveEducation = (newEducation) => {
        setProfileData(prev => ({
            ...prev,
            // Add the new education record
            educationDetails: [...(prev.educationDetails || []), { ...newEducation, id: Date.now() }]
        }));
        setShowEducationModal(false); // Close modal
    };

    const removeEducation = (id) => {
        setProfileData(prev => ({
            ...prev,
            educationDetails: prev.educationDetails.filter(edu => edu.id !== id)
        }));
    };

    // 2. Educations/Internship Handlers (FIXED)
    const addExperience = () => {
        // Adds a blank template for a new experience/internship record
        setProfileData(prev => ({
            ...prev,
            experienceDetails: [...(prev.experienceDetails || []), {
                id: Date.now(), designation: '', organization: '', isCurrent: 'No', startYear: '', startMonth: ''
            }]
        }));
    };

    const removeExperience = (id) => {
        setProfileData(prev => ({
            ...prev,
            experienceDetails: profileData.experienceDetails.filter(exp => exp.id !== id)
        }));
    };

    // 3. Language Handlers (FIXED)
    const addLanguage = () => {
        setProfileData(prev => ({
            ...prev,
            languages: [...(prev.languages || []), { language: '', proficiency: '', read: false, write: false, speak: false, id: Date.now() }]
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


    // Options Lists (Used for rendering Select/Radio inputs in Edit Mode)
    const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
    const addressTypeOptions = [{ value: 'Rural', label: 'Rural' }, { value: 'Urban', label: 'Urban' }];
    const disabilityOptions = [
        { value: 'Deaf', label: 'Deaf and hard of hearing' },
        { value: 'Locomotor', label: 'Locomotor Disability' },
        { value: 'Other', label: 'Other Disability Type' }
    ];
    const yesNoOptions = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];


    //  RENDER LOGIC 
    return (
        <CandidateDashboardLayout title={isEditing ? "Edit Profile" : "My Profile (View)"}>

            {/*  1. UNIFIED PROFILE CARD & TOP CONTROLS  */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 items-start">

                    {/* LEFT COLUMN: Profile Info (Span 2) */}
                    <div className="lg:col-span-2 p-8 border-r border-gray-100">
                        <div className="flex flex-col md:flex-row items-start gap-6">

                            {/* Profile Picture & Completion Circle */}
                            <div
                                className={`relative w-32 h-32 flex-shrink-0 rounded-full flex items-center justify-center border-4 ${completionColorClass} ${isEditing && 'cursor-pointer hover:border-accent-teal transition'}`}
                                onClick={openPhotoModal}
                            >
                                <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <FiUser className="text-gray-500 text-6xl w-full h-full p-6" />
                                    )}
                                </div>
                                { (isEditing || true) && ( // show camera overlay icon (click opens modal)
                                    <FiCamera size={24} className="absolute inset-0 m-auto text-white bg-black/50 rounded-full p-1" />
                                )}
                                <span className={`absolute -bottom-2 bg-white px-2 py-0.5 text-xs font-bold rounded-full border border-gray-200 shadow-sm text-green-600`}>
                                    {completion}%
                                </span>
                            </div>

                            {/* Hidden file input (kept for backward compatibility but primary input is in modal) */}
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />


                            {/* Name & Basic Info */}
                            <div className="flex-grow w-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            {nameDisplay}
                                            {!isEditing && (
                                                <button onClick={handleEnterEditMode} className="text-gray-400 hover:text-accent-teal transition">
                                                    <FiEdit2 size={16} />
                                                </button>
                                            )}
                                        </h2>
                                    </div>
                                </div>

                                {/* Personal Info Grid (View Mode) */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-8 mt-6">
                                    <div className="flex items-center text-gray-600 text-sm"><FiMapPin className="mr-3 text-gray-400" size={18} /> <span>{profile.addressDistrict || 'N/A District'}</span></div>
                                    <div className="flex items-center text-gray-600 text-sm"><FiPhone className="mr-3 text-gray-400" size={18} /> <span>{profile.mobile || 'N/A Phone'} <FiCheckCircle className="text-green-500 ml-1" /></span></div>
                                    <div className="flex items-center text-gray-600 text-sm"><FiUser className="mr-3 text-gray-400" size={18} /> <span>{profile.gender || 'N/A Gender'}</span></div>
                                    <div className="flex items-center text-gray-600 text-sm"><FiMail className="mr-3 text-gray-400" size={18} /> <span>{profile.email || 'N/A Email'} <FiCheckCircle className="text-green-500 ml-1" /></span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Missing Details Widget (Only in View Mode) */}
                    <div className="lg:col-span-1 bg-orange-50/50 p-8 flex flex-col justify-center" style={{ display: isEditing ? 'none' : 'flex' }}>
                        <h4 className="text-md font-bold text-primary-dark mb-4">Profile Completion Actions</h4>
                        <p className="text-sm text-gray-700 mb-4">Complete your profile to unlock full features and match better with employers.</p>

                        <button onClick={handleEnterEditMode} className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition transform active:scale-95 text-sm">
                            Add {100 - completion}% Missing Details
                        </button>
                    </div>

                </div>
            </div>
            {/*  END UNIFIED PROFILE CARD  */}


            {/*  MERGED EDITING FORM (Displayed only when isEditing is true)  */}
            {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-8">

                    {/*  A. PERSONAL DETAILS INPUTS  */}
                    <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-card-bg">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">1. Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Full Name" name="name" value={profileData.name} onChange={handleFormChange} required={true} />
                            <Input label="Father's Name" name="fatherName" value={profileData.fatherName} onChange={handleFormChange} required={true} />
                            <Input label="Date of Birth" name="dob" type="date" value={profileData.dob} onChange={handleFormChange} required={true} />
                            <SelectInput label="Gender" name="gender" value={profileData.gender} options={genderOptions} onChange={handleFormChange} required={true} />
                            <Input label="Email" name="email" value={profileData.email} onChange={handleFormChange} disabled={true} />
                            <Input label="Mobile Number" name="mobile" value={profileData.mobile} onChange={handleFormChange} disabled={true} />
                            <Input label="Nationality" name="nationality" value={profileData.nationality} onChange={handleFormChange} required={true} />
                        </div>
                    </div>

                    {/*  B. ADDRESS DETAILS INPUTS  */}
                    <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-card-bg">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">2. Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Street/House No." name="addressStreet" value={profileData.addressStreet} onChange={handleFormChange} />
                            <Input label="Area/Locality" name="addressArea" value={profileData.addressArea} onChange={handleFormChange} />
                            <SelectInput label="Rural/Urban" name="addressType" value={profileData.addressType} options={addressTypeOptions} onChange={handleFormChange} />
                            <Input label="District" name="addressDistrict" value={profileData.addressDistrict} onChange={handleFormChange} />
                            <Input label="State" name="addressState" value={profileData.addressState} onChange={handleFormChange} disabled={true} />
                            <Input label="Pin Code" name="pinCode" value={profileData.pinCode} onChange={handleFormChange} />
                        </div>
                    </div>

                    {/*  C. Profile Summary  */}
                    <div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-card-bg">
                        <h3 className="text-xl font-bold text-primary-dark mb-4 border-b pb-2">3.Profile Summary    </h3>

                        <Section>
                            <Input label="Career Goal" name="desiredCareer" value={profileData.desiredCareer} onChange={handleFormChange} />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Description</label>
                            <textarea name="shortProfileDescription" value={profileData.shortProfileDescription} onChange={handleFormChange} rows="3" placeholder="Key skills..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition" />
                        </Section>
                    </div>

                    <Section title="Disability Information" Icon={FiAperture} isEditing={true}>
                        <RadioGroup label="Are you a person with disability?" name="isDisabled" options={yesNoOptions} selectedValue={profileData.isDisabled} onChange={handleFormChange} />
                        {profileData.isDisabled === 'Yes' && (<SelectInput label="Type of Disability" name="disabilityType" value={profileData.disabilityType} options={disabilityOptions} onChange={handleFormChange} required={false} />)}
                    </Section>
                    {/* Educations */}
                    <Section title="Educations" Icon={FiBriefcase} isEditing={true} onAdd={addExperience}>
                        {profileData.experienceDetails && profileData.experienceDetails.length > 0 ? (
                            profileData.experienceDetails.map((exp) => (
                                <div key={exp.id} className="border-l-4 border-blue-400 pl-4 py-2 mb-4 bg-blue-50 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-primary-dark">{exp.designation} at {exp.organization}</p>
                                        <p className="text-xs text-gray-600">
                                            {exp.startMonth}/{exp.startYear} - {exp.isCurrent === 'Yes' ? 'Present' : `${exp.endMonth}/${exp.endYear}`}
                                        </p>
                                    </div>
                                    <button type="button" onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 transition ml-4 p-2" title="Delete Experience">
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (<p className="text-gray-500 italic">No Educations added. Click 'Add' above.</p>)}
                    </Section>

                    {/* EDUCATION DETAILS (Wired to Modal) */}
                    <Section title="Education Details" Icon={FiCalendar} isEditing={true} onAdd={handleOpenEducationModal}>
                        {profileData.educationDetails && profileData.educationDetails.length > 0 ? (
                            profileData.educationDetails.map((edu) => (
                                <div key={edu.id} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-primary-dark">{edu.qualificationType}: {edu.degree || edu.course || edu.board}</p>
                                        <p className="text-sm text-gray-600">{edu.instituteName}</p>
                                    </div>
                                    <button type="button" onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 transition ml-4 p-2" title="Delete Education">
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (<p className="text-gray-500 italic">No education details added yet. Click 'Add' above.</p>)}
                    </Section>



                    <Section title="Languages Known" Icon={FiCalendar} isEditing={true} onAdd={addLanguage}>
                        {profileData.languages && profileData.languages.length > 0 ? (
                            <p className="text-gray-500 italic">Language list editor here...</p>
                        ) : (<p className="text-gray-500 italic">No languages recorded. Click 'Add' above.</p>)}
                    </Section>


                    {/*  FINAL ACTION BUTTONS  */}
                    <div className="flex justify-end space-x-4 pt-6 w-full">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 bg-gray-300 text-primary-dark font-bold rounded-lg hover:bg-gray-400 transition text-sm">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                /*  DEFAULT VIEW MODE (View Sections)  */
                <>
                    {/* 1. Project/Summary Section */}
                    <Section title="Profile Summary" Icon={FiFileText} onEdit={handleEnterEditMode}>
                        <p className="text-lg font-medium text-primary-dark mb-2">
                            {profile.desiredCareer || 'Career Goal: Not Specified'}
                        </p>
                        <p className="text-gray-600 whitespace-pre-wrap">
                            {profile.shortProfileDescription || 'No detailed professional summary or project description provided yet.'}
                        </p>
                    </Section>

                    {/* 2. Experience Details */}
                    <Section title="Experience" Icon={FiCalendar} onEdit={handleEnterEditMode}>
                        {profileData.educationDetails && profileData.educationDetails.length > 0 ? (
                            profileData.educationDetails.map((edu, index) => (
                                <div key={index} className="border-l-4 border-accent-teal pl-4 py-2 mb-4 bg-gray-50 rounded-lg">
                                    <p className="font-semibold text-primary-dark">{edu.qualificationType}: {edu.degree || edu.course || edu.board}</p>
                                    <p className="text-sm text-gray-600">{edu.instituteName}</p>
                                </div>
                            ))
                        ) : (<p className="text-gray-500">No experience details recorded. Click Edit Profile.</p>)}
                    </Section>

                    {/* 3. Educations */}
                    <Section title="Educations" Icon={FiBriefcase} onEdit={handleEnterEditMode}>
                        {profileData.experienceDetails && profileData.experienceDetails.length > 0 ? (
                            profileData.experienceDetails.map((exp) => (
                                <div key={exp.id} className="border-l-4 border-blue-400 pl-4 py-2 mb-4 bg-blue-50 rounded-lg">
                                    <p className="font-semibold text-primary-dark">{exp.designation} at {exp.organization}</p>
                                    <p className="text-xs text-gray-600">
                                        {exp.startMonth}/{exp.startYear} - {exp.isCurrent === 'Yes' ? 'Present' : `${exp.endMonth}/${exp.endYear}`}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{exp.description}</p>
                                </div>
                            ))
                        ) : (<p className="text-gray-500">No Educations added. Click Edit Profile.</p>)}
                    </Section>

                    {/* 4. Languages Known */}
                    <Section title="Languages Known" Icon={FiCalendar} onEdit={handleEnterEditMode}>
                        {profileData.languages && profileData.languages.length > 0 ? (
                            <p className="text-gray-500">Languages added: {profileData.languages.length}</p>
                        ) : (<p className="text-gray-500">No languages recorded. Click Edit Profile.</p>)}
                    </Section>

                    <Section title="Disability Information" Icon={FiFileText} onEdit={handleEnterEditMode}>
                        <p className="text-gray-500">Disability status: {profileData.isDisabled}</p>
                    </Section>
                </>
            )}

            {/* Delete Account button appears only in View Mode */}
            {!isEditing && (
                <button className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg">
                    Delete My Account
                </button>
            )}

            {/*  EDUCATION MODAL RENDERING (MUST BE OUTSIDE IS_EDITING CONDITIONAL)  */}
            <EducationModal
                isOpen={showEducationModal}
                onClose={() => setShowEducationModal(false)}
                onSave={handleSaveEducation}
                educationData={modalEducationData}
            />

            {/* Photo Modal (appears when change photo clicked) */}
            {showPhotoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl w-11/12 max-w-md p-6 relative">
                        <button onClick={closePhotoModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FiX size={20} /></button>
                        <h3 className="text-xl font-semibold text-center mb-2">Upload a recent photo</h3>
                        <p className="text-sm text-center text-gray-500 mb-4">Photo enhances memorability, and helps you demonstrate professionalism</p>

                        <div className="flex flex-col items-center">
                            <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-200 mb-4">
                                {previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400"><FiUser size={48} /></div>}
                            </div>

                            <div className="flex items-center space-x-4">
                                <input ref={modalFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleModalFileChange} />
                                <button onClick={() => modalFileInputRef.current.click()} className="px-5 py-2 bg-blue-600 text-white rounded-full shadow">Change photo</button>
                                <button onClick={handleDeletePhoto} className="text-red-600">Delete photo</button>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">Supported file format: png, jpg, jpeg, gif - up to 2MB</p>
                        </div>
                    </div>
                </div>
            )}
        </CandidateDashboardLayout>
    );
};

export default CandidateProfile;