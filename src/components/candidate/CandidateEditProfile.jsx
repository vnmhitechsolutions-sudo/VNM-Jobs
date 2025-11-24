// src/components/candidate/CandidateEditProfile.jsx

import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, updateProfile } from '../../redux/authSlice'; 
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { 
    FiSave, FiArrowLeft, FiPlus, FiTrash2, FiUser, FiCalendar, 
    FiBriefcase, FiMapPin, FiCamera, FiAperture 
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'; 

// Helper Components (Reusable input structures)

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
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label} *</label>
        <div className="flex space-x-6">
            {options.map(opt => (
                <label key={opt.value} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={selectedValue === opt.value}
                        onChange={onChange}
                        required
                        className="form-radio text-accent-teal"
                    />
                    <span>{opt.label}</span>
                </label>
            ))}
        </div>
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

// MAIN COMPONENT
const CandidateEditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useSelector(selectAuth);
    const fileInputRef = useRef(null);

    // Initial state setup (Use Redux data as source of truth)
    const [profileData, setProfileData] = useState({
        name: profile.name || '', fatherName: profile.fatherName || '', dob: profile.dob || '', 
        gender: profile.gender || '', shortProfileDescription: profile.shortProfileDescription || '',
        email: profile.email || '', mobile: profile.mobile || '',
        pinCode: profile.pinCode || '', nationality: profile.nationality || 'Indian',
        addressStreet: profile.addressStreet || '', addressArea: profile.addressArea || '',
        addressType: profile.addressType || 'Rural', addressDistrict: profile.addressDistrict || '',
        addressState: profile.addressState || 'Tamil Nadu',
        isDisabled: profile.isDisabled || 'No', disabilityType: profile.disabilityType || null, 
        languages: profile.languages || [], educationDetails: profile.educationDetails || [],
        desiredCareer: profile.desiredCareer || '',
    });

    const [profilePicture, setProfilePicture] = useState(profile.profilePicture || null);
    const [previewUrl, setPreviewUrl] = useState(profile.profilePicture || null);


    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };
    
    // Global Save Handler (for per-section submission)
    const handleSaveSection = (e) => {
        e.preventDefault();
        
        // Dispatch the entire updated profile object to Redux
        dispatch(updateProfile(profileData));
        
        // Navigate to the view page after saving
        navigate('/candidate/profile'); 
    };
    
    // Photo Upload Handlers
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setPreviewUrl(URL.createObjectURL(file)); 
            alert("Image selected! Click 'Save Changes' below to update the profile.");
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current.click();
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


    // Options Lists
    const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
    const addressTypeOptions = [{ value: 'Rural', label: 'Rural' }, { value: 'Urban', label: 'Urban' }];
    const disabilityOptions = [
        { value: 'Deaf', label: 'Deaf and hard of hearing' },
        { value: 'Locomotor', label: 'Locomotor Disability' },
        { value: 'Other', label: 'Other Disability Type' }
    ];
    const yesNoOptions = [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }];


    return (
        <CandidateDashboardLayout title="Edit Profile">
            <Link to="/candidate/profile" className="flex items-center text-primary-dark hover:text-accent-teal transition mb-6">
                <FiArrowLeft className="mr-2" /> Back to Profile View
            </Link>
            
            
            {/* --- 1. PERSONAL & CONTACT DETAILS (Includes Photo) --- */}
            <form onSubmit={handleSaveSection} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
                <SectionTitle title="Personal & Contact Details" Icon={FiUser} />
                
                {/* Photo Upload Area - Integrated */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-6 pb-6 border-b border-gray-200">
                    {/* Preview Area */}
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-indigo-200 overflow-hidden flex-shrink-0">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                        ) : (
                            <FiUser className="text-gray-500 text-3xl" />
                        )}
                    </div>
                    
                    {/* Upload Button */}
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-700">Profile Photo (Optional)</span>
                        <button 
                            type="button" 
                            onClick={triggerFileInput}
                            className="px-4 py-2 bg-gray-200 text-primary-dark font-bold rounded-lg hover:bg-gray-300 transition text-sm"
                        >
                            <FiCamera className="inline mr-2" /> Choose File
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*"/>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="flex flex-wrap -mx-2">
                    <Input label="Name" name="name" value={profileData.name} onChange={handleFormChange} halfWidth />
                    <Input label="Father's Name" name="fatherName" value={profileData.fatherName} onChange={handleFormChange} halfWidth />
                    <Input label="Date of Birth" name="dob" type="date" value={profileData.dob} onChange={handleFormChange} halfWidth />
                    <SelectInput label="Gender" name="gender" value={profileData.gender} options={genderOptions} onChange={handleFormChange} halfWidth />
                    <Input label="Email" name="email" type="email" value={profileData.email} onChange={handleFormChange} halfWidth disabled />
                    <Input label="Mobile Number" name="mobile" type="tel" value={profileData.mobile} onChange={handleFormChange} halfWidth disabled />
                </div>
                
                {/* Save Button for this section (Style Fix Applied) */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button type="submit" className="px-4 py-2 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">
                        Save Changes
                    </button>
                </div>
            </form>
            
            {/* --- 2. CURRENT ADDRESS --- */}
            <form onSubmit={handleSaveSection} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
                <SectionTitle title="Current Address" Icon={FiMapPin} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Street/House No." name="addressStreet" value={profileData.addressStreet} onChange={handleFormChange} />
                    <Input label="Area/Locality" name="addressArea" value={profileData.addressArea} onChange={handleFormChange} halfWidth />
                    <SelectInput label="Rural/Urban" name="addressType" value={profileData.addressType} options={addressTypeOptions} onChange={handleFormChange} halfWidth />
                    <Input label="District" name="addressDistrict" value={profileData.addressDistrict} onChange={handleFormChange} halfWidth />
                    <Input label="State" name="addressState" value={profileData.addressState} onChange={handleFormChange} halfWidth disabled />
                    <Input label="Pin Code" name="pinCode" value={profileData.pinCode} onChange={handleFormChange} halfWidth />
                    <Input label="Nationality" name="nationality" value={profileData.nationality} onChange={handleFormChange} halfWidth disabled />
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button type="submit" className="px-4 py-2 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">
                        Save Changes
                    </button>
                </div>
            </form>
            
            {/* --- 3. PROFILE DESCRIPTION & DISABILITY --- */}
            <form onSubmit={handleSaveSection} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
                <SectionTitle title="Profile Description" Icon={FiBriefcase} />
                <textarea
                    name="shortProfileDescription"
                    value={profileData.shortProfileDescription}
                    onChange={handleFormChange}
                    rows="4"
                    placeholder="Briefly describe your career goal and key skills..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition mb-6"
                />

                <SectionTitle title="Differently Abled Status" Icon={FiAperture} />
                <RadioGroup 
                    label="Are you a person with disability?" 
                    name="isDisabled" 
                    options={yesNoOptions} 
                    selectedValue={profileData.isDisabled} 
                    onChange={handleFormChange}
                />
                
                {profileData.isDisabled === 'Yes' && (
                    <SelectInput label="Type of Disability" name="disabilityType" value={profileData.disabilityType} options={disabilityOptions} onChange={handleFormChange} required={false} />
                )}
                
                <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                    <button type="submit" className="px-4 py-2 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">
                        Save Details
                    </button>
                </div>
            </form>
            
            {/* --- 4. Dynamic Lists (Education, Languages) --- */}
            <form onSubmit={handleSaveSection} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
                <SectionTitle title="Education Details" Icon={FiCalendar} onAdd={() => alert("Add Education Form")} />
                {/* ... (Education display/edit logic would go here) ... */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button type="submit" className="px-4 py-2 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">Save Changes</button>
                </div>
            </form>

            <form onSubmit={handleSaveSection} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
                <SectionTitle title="Languages Known" Icon={FiCalendar} onAdd={addLanguage} />
                {/* ... (Languages table/edit logic would go here) ... */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button type="submit" className="px-4 py-2 bg-primary-dark text-white font-bold rounded-lg hover:bg-gray-700 transition shadow-lg text-sm">Save Changes</button>
                </div>
            </form>
            
        </CandidateDashboardLayout>
    );
};

export default CandidateEditProfile;