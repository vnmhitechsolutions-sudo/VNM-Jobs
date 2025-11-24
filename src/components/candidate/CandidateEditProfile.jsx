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
        shortProfileDescription: profile.shortProfileDescription || '',
        languages: profile.languages || [],
        educationDetails: profile.educationDetails || [],
        internships: profile.internships || []
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
        const updated = [...(profileData.internships || [])];
        updated[index] = { ...(updated[index] || {}), [field]: value };
        setProfileData({ ...profileData, internships: updated });
        console.log('internships updated:', updated);
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

                {/*  5. Technical Skills and Certifications (Placeholders)  */}
                <SectionTitle title="Certification Details" Icon={FiCalendar} onAdd={() => alert("Add Certification Form")} />
                <SectionTitle title="Technical Skill Details" Icon={FiCalendar} onAdd={() => alert("Add Technical Skill Form")} />

                {/* 6. Internship Details */}

                <SectionTitle title="Internship Details" Icon={FiBriefcase} onAdd={addInternship} />

                {profileData.internships && profileData.internships.length > 0 ? (
                    profileData.internships.map((intern, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-4">

                    <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            value={intern.companyName || ''}
        
                            onChange={(e) => updateInternship(index, 'companyName', e.target.value)}
        
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        
                        />
                    </div>

               {/* Internship Type */}
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Internship Type</label>
                    <select
                        value={intern.type || ''}
                        onChange={(e) => updateInternship(index, 'type', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Type</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                   </select>
                </div>

      {/* Duration */}
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <input
          type="text"
          value={intern.duration || ''}
          onChange={(e) => updateInternship(index, 'duration', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="e.g. 3 months / Jun 2023 - Aug 2023"
        />
      </div>

      {/* Project Name */}
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input
          type="text"
          value={intern.projectName || ''}
          onChange={(e) => updateInternship(index, 'projectName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Responsibilities (already working) */}
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={intern.responsibilities || ''}
          onChange={(e) => updateInternship(index, 'responsibilities', e.target.value)}
          rows={4}
        />
      </div>

      {/* Stipend */}
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
        <input
          type="text"
          value={intern.stipend || ''}
          onChange={(e) => updateInternship(index, 'stipend', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="e.g. 5000 / N/A"
        />
      </div>

      {/* Certificate Upload */}
      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate (Optional)</label>
        <input
          type="file"
          onChange={(e) => updateInternship(index, 'certificateFile', e.target.files[0])}
          className="w-full"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => removeInternship(index)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Remove Internship
        </button>
      </div>
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