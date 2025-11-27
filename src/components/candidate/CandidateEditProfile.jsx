// src/components/candidate/CandidateEditProfile.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, updateProfile } from '../../redux/authSlice'; // NEW IMPORTS
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiUser, FiCalendar, FiBriefcase, FiX } from 'react-icons/fi'; // Added FiX for modal close

const CandidateEditProfile = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth) || {}; // safe guard if selector returns undefined
    const profile = auth.profile || {};

    // Initialize local state with Redux profile data
    const [profileData, setProfileData] = useState({
        name: profile.name || '',
        fatherName: profile.fatherName || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        phone: profile.phone || '',
        email: profile.email || '',
        district: profile.district || '',
        state: profile.state || '',
        street: profile.street || '',
        area: profile.area || '',
        areaType: profile.areaType || 'Urban', // 'Urban' or 'Rural'
        nationality: 'India', // Fixed
        desiredCareer: profile.desiredCareer || '',
        shortProfileDescription: profile.shortProfileDescription || '',
        languages: profile.languages || [],
        educationDetails: profile.educationDetails || [],
        internships: profile.internships || [],
        projects: profile.projects || [],
        experience: profile.experience || [],
        skills: profile.skills || [] // <-- added skills array
    });
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const [profilePicPreview, setProfilePicPreview] = useState(profile.profilePicture || null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const modalFileRef = useRef(null);

    const openPhotoModal = () => setShowPhotoModal(true);
    const closePhotoModal = () => setShowPhotoModal(false);

    const handleModalProfilePicChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePicPreview(url);
            setProfileData(prev => ({ ...prev, profilePicture: url, profilePictureFile: file }));
        }
    };

    const handleDeletePhoto = () => {
        setProfilePicPreview(null);
        setProfileData(prev => ({ ...prev, profilePicture: '' }));
        closePhotoModal();
    };

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
        // Use browser native validation tooltips
        if (formRef.current && !formRef.current.reportValidity()) {
            return; // stop if any required field is empty
        }
        // All required fields filled — save
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
                    certificateFile: null,
                    isSaved: false,
                    isOpen: true
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

    const addProject = () => {
        setProfileData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), { title: '', description: '', url: '', isSaved: false, isOpen: true }]
        }));
    };

    const updateProject = (index, field, value) => {
        const updated = [...(profileData.projects || [])];
        updated[index] = { ...(updated[index] || {}) };

        if (field === 'documentFile') {
          if (value) {
            updated[index].documentFile = value;
            updated[index].documentFileName = value.name;
            try {
              updated[index].documentFileUrl = URL.createObjectURL(value);
            } catch (e) {
              updated[index].documentFileUrl = null;
            }
          } else {
            updated[index].documentFile = null;
            updated[index].documentFileName = '';
            updated[index].documentFileUrl = null;
          }
        } else {
          updated[index][field] = value;
        }

        setProfileData({ ...profileData, projects: updated });
    };

    const removeProject = (index) => {
        const updated = [...(profileData.projects || [])];
        updated.splice(index, 1);
        setProfileData({ ...profileData, projects: updated });
    };

    const addExperience = () => {
    setProfileData(prev => ({
        ...prev,
        experience: [...(prev.experience || []), {
            jobTitle: '',
            companyName: '',
            employmentType: '',
            isCurrentJob: false,
            startDate: '',
            endDate: '',
            salary: '',
            description: '',
            currentCompanyName: '',
            currentRole: '',
            currentSalary: '',
            currentExperience: '',
            isSaved: false,
            isOpen: true
        }]
    }));
};


    const updateExperience = (index, field, value) => {
        const updated = [...(profileData.experience || [])];
        updated[index] = { ...(updated[index] || {}) };

        if (field === 'documentFile') {
          if (value) {
            updated[index].documentFile = value;
            updated[index].documentFileName = value.name;
            try {
              updated[index].documentFileUrl = URL.createObjectURL(value);
            } catch (e) {
              updated[index].documentFileUrl = null;
            }
          } else {
            updated[index].documentFile = null;
            updated[index].documentFileName = '';
            updated[index].documentFileUrl = null;
          }
        } else {
          updated[index][field] = value;
        }

        setProfileData({ ...profileData, experience: updated });
    };

    const removeExperience = (index) => {
        const updated = [...(profileData.experience || [])];
        updated.splice(index, 1);
        setProfileData({ ...profileData, experience: updated });
    };

    // Month + Year dropdown values
    const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

    // --- State and District data (used by State/District selects) ---
    const states = [
        'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
        'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
        'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
        'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
        'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Puducherry'
    ];
    
    // Sample district lists by state (expand as needed)
    const districtsByState = {
        'Andhra Pradesh': ['Anantapur','Chittoor','East Godavari','Guntur','Kurnool','Nellore','Prakasam','Srikakulam','Visakhapatnam','Vizianagaram','West Godavari'],
        'Karnataka': ['Bagalkot','Bangalore Rural','Bangalore Urban','Belgaum','Bellary','Dakshina Kannada','Davanagere','Dharwad','Gulbarga','Hassan','Mysore','Shimoga','Tumkur','Udupi'],
        'Maharashtra': ['Ahmednagar','Aurangabad','Beed','Bhandara','Buldhana','Chandrapur','Dhule','Gondia','Jalgaon','Jalna','Kolhapur','Latur','Mumbai City','Mumbai Suburban','Nagpur','Nanded','Nashik','Pune','Ratnagiri','Sangli','Satara','Solapur','Thane','Wardha','Yavatmal'],
        'Delhi': ['Central','North','South','East','West','New Delhi'],
        'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Vellore'],
        // fallback for other states
        'default': []
    };
    // ---------- Education helpers (from PDF) ----------

    const addEducation = (type = 'UG') => {
        setProfileData(prev => ({
            ...prev,
            educationDetails: [
                ...(prev.educationDetails || []),
                {
                    id: Date.now(),
                    type,                 // default type when adding
                    course: '',           // degree/course/specialization
                    specialization: '',
                    passingYear: '',
                    institute: '',
                    boardOrCollege: '',
                    cgpaOrPercentage: '',
                    courseType: '',
                    additionalNotes: '',
                    documentFile: null,
                    isSaved: false,
                    isOpen: true
                }
            ]
        }));
    };

    const updateEducation = (index, field, value) => {
  const updated = [...(profileData.educationDetails || [])];
  updated[index] = { ...(updated[index] || {}) };

  if (field === 'documentFile') {
    // value is a File object (or null)
    if (value) {
      // store filename and a temporary object URL so CandidateProfile can show a preview link
      updated[index].documentFile = value; // keep the File (in-memory)
      updated[index].documentFileName = value.name;
      try {
        updated[index].documentFileUrl = URL.createObjectURL(value);
      } catch (e) {
        updated[index].documentFileUrl = null;
      }
    } else {
      updated[index].documentFile = null;
      updated[index].documentFileName = '';
      updated[index].documentFileUrl = null;
    }
  } else {
    updated[index][field] = value;
  }

  setProfileData({ ...profileData, educationDetails: updated });
};

    const removeEducation = (index) => {
        const updated = [...(profileData.educationDetails || [])];
        updated.splice(index, 1);
        setProfileData({ ...profileData, educationDetails: updated });
    };


    const handleProfilePicChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePicPreview(url);
            setProfileData(prev => ({ ...prev, profilePicture: url, profilePictureFile: file }));
        }
    };

    const triggerProfileFile = () => fileInputRef.current && fileInputRef.current.click();

    // Save / Close handlers for Education
    const saveEducation = (index) => {
      const updated = [...(profileData.educationDetails || [])];
      if (!updated[index]) return;
      updated[index] = { ...(updated[index] || {}), isSaved: true, isOpen: true };
      setProfileData({ ...profileData, educationDetails: updated });
    };

    const closeEducation = (index) => {
      const updated = [...(profileData.educationDetails || [])];
      const item = updated[index];
      if (!item || !item.isSaved) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...item, isOpen: false };
      }
      setProfileData({ ...profileData, educationDetails: updated });
    };

    // Save / Close handlers for Internships
    const saveInternship = (index) => {
      const updated = [...(profileData.internships || [])];
      if (!updated[index]) return;
      updated[index] = { ...(updated[index] || {}), isSaved: true, isOpen: true };
      setProfileData({ ...profileData, internships: updated });
    };

    const closeInternship = (index) => {
      const updated = [...(profileData.internships || [])];
      const item = updated[index];
      if (!item || !item.isSaved) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...item, isOpen: false };
      }
      setProfileData({ ...profileData, internships: updated });
    };

    // Save / Close handlers for Projects
    const saveProject = (index) => {
      const updated = [...(profileData.projects || [])];
      if (!updated[index]) return;
      updated[index] = { ...(updated[index] || {}), isSaved: true, isOpen: true };
      setProfileData({ ...profileData, projects: updated });
    };

    const closeProject = (index) => {
      const updated = [...(profileData.projects || [])];
      const item = updated[index];
      if (!item || !item.isSaved) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...item, isOpen: false };
      }
      setProfileData({ ...profileData, projects: updated });
    };

    // ---------- Skills handlers ----------
    const addSkill = () => {
      setProfileData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), {
          id: Date.now(),
          name: '',
          mode: '', // 'Online' | 'Offline'
          instituteName: '',
          platformName: '',
          duration: '',
          certificateFile: null,
          certificateFileName: '',
          certificateFileUrl: null,
          isSaved: false,
          isOpen: true
        }]
      }));
    };

    const updateSkill = (index, field, value) => {
      const updated = [...(profileData.skills || [])];
      updated[index] = { ...(updated[index] || {}) };

      if (field === 'certificateFile') {
        if (value) {
          updated[index].certificateFile = value;
          updated[index].certificateFileName = value.name;
          try {
            updated[index].certificateFileUrl = URL.createObjectURL(value);
          } catch (e) {
            updated[index].certificateFileUrl = null;
          }
        } else {
          updated[index].certificateFile = null;
          updated[index].certificateFileName = '';
          updated[index].certificateFileUrl = null;
        }
      } else {
        updated[index][field] = value;
      }

      setProfileData({ ...profileData, skills: updated });
    };

    const removeSkill = (index) => {
      const updated = [...(profileData.skills || [])];
      updated.splice(index, 1);
      setProfileData({ ...profileData, skills: updated });
    };

    const saveSkill = (index) => {
      const updated = [...(profileData.skills || [])];
      if (!updated[index]) return;
      updated[index] = { ...(updated[index] || {}), isSaved: true, isOpen: true };
      setProfileData({ ...profileData, skills: updated });
    };

    const closeSkill = (index) => {
      const updated = [...(profileData.skills || [])];
      const item = updated[index];
      if (!item || !item.isSaved) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...item, isOpen: false };
      }
      setProfileData({ ...profileData, skills: updated });
    };

    // Add: save handler for Personal Details
    const savePersonalDetails = () => {
      // Optionally mark as saved in local state
      setProfileData(prev => ({ ...prev, personalSaved: true }));
      // Persist (saves full profile; backend should pick relevant fields)
      dispatch(updateProfile(profileData));
      alert('Personal details saved.');
    };

    //Input definition with this
    function Input({ label, name, type = 'text', value, onChange, required = true, disabled = false, halfWidth = false }) {
      const [localValue, setLocalValue] = useState(value ?? '');
      const composingRef = useRef(false);
      const inputRef = useRef(null);

      // Sync parent->local when parent changes, but do not overwrite while composing
      useEffect(() => {
        if (!composingRef.current) setLocalValue(value ?? '');
      }, [value]);

      const forwardChange = (val) => {
        const evt = { target: { name, value: val } };
        (onChange ?? handleFormChange)(evt);
      };

      // Update only local on each keystroke to avoid parent re-renders.
      // Forward to parent on blur, Enter, or composition end.
      const handleChange = (e) => {
        setLocalValue(e.target.value);
      };

      const handleBlur = (e) => {
        if (!composingRef.current) forwardChange(localValue);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !composingRef.current) {
          forwardChange(localValue);
        }
      };

      const handleCompositionStart = () => { composingRef.current = true; };
      const handleCompositionEnd = (e) => {
        composingRef.current = false;
        // commit composed text
        setLocalValue(e.target.value);
        forwardChange(e.target.value);
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
      };

      return (
        <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
          <input
            ref={inputRef}
            type={type}
            name={name}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            required={required}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
          />
        </div>
      );
    }
    
    // Section title helper used throughout the form
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                <button type="button" onClick={() => window.history.back()} className="flex items-center text-primary-dark hover:text-accent-teal transition mb-6">
                    <FiArrowLeft className="mr-2" /> Back to Profile View
                </button>

                {/* Modern Profile Photo Upload (above Personal Details) */}
                <div className="mb-6 flex items-center space-x-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-200">
                        {profilePicPreview ? (
                            <img src={profilePicPreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <FiUser size={36} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                        <input ref={modalFileRef} type="file" accept="image/*" className="hidden" onChange={handleModalProfilePicChange} />
                        <button type="button" onClick={openPhotoModal} className="inline-flex items-center px-5 py-2 w-32 bg-primary-dark text-white rounded-md shadow-sm hover:bg-primary-dark/90 transition">
                            Add Photo
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Recommended: square image, JPG/PNG -. Click Add Photo to select.</p>
                    </div>
                </div>

                {/* Photo modal */}
                {showPhotoModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-xl w-11/12 max-w-md p-6 relative">
                            <button onClick={closePhotoModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><FiX size={20} /></button>
                            <h3 className="text-xl font-semibold text-center mb-2">Upload a recent photo</h3>
                            <p className="text-sm text-center text-gray-500 mb-4">Photo enhances memorability, and helps you demonstrate professionalism</p>

                            <div className="flex flex-col items-center">
                                <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-200 mb-4">
                                    {profilePicPreview ? <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400"><FiUser size={48} /></div>}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button onClick={() => modalFileRef.current.click()} className="px-5 py-2 bg-blue-600 text-white rounded-full shadow">Change photo</button>
                                    <button onClick={handleDeletePhoto} className="text-red-600">Delete photo</button>
                                </div>

                                <p className="text-xs text-gray-400 mt-4">Supported file format: png, jpg, jpeg, gif - up to 2MB</p>
                            </div>
                        </div>
                    </div>
                )}

                {/*  1. Personal Details  */}
                <SectionTitle title="Personal Details" Icon={FiUser} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Name" name="name" value={profileData.name} halfWidth />
                    <Input label="Father's Name" name="fatherName" value={profileData.fatherName} halfWidth />
                    <Input label="Date of Birth" name="dob" type="date" value={profileData.dob} halfWidth />

                    {/* Gender select: replaced text input with select options */}
                    <div className="mb-4 md:w-1/2 md:pr-2 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
      <select
        name="gender"
        value={profileData.gender}
        onChange={handleFormChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
      >
        <option value="">-- Select Gender --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
      </select>
    </div>

                    {/* Phone and Email in one row (two columns) */}
                    <Input label="Phone Number" name="phone" type="tel" value={profileData.phone} halfWidth required={false} />
                    <Input label="Email" name="email" type="email" value={profileData.email} halfWidth disabled={true} required={false} />

                    {/* Address Details */}
                    <div className="w-full">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Address Details</h4>
                    </div>

                    <Input label="Street Address" name="street" value={profileData.street} />
                    <Input label="Area / Locality" name="area" value={profileData.area} />

                    {/* Area Type: Urban / Rural */}
                    <div className="w-full mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area Type *</label>
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="areaType"
                            value="Urban"
                            checked={profileData.areaType === 'Urban'}
                            onChange={handleFormChange}
                          />
                          <span className="text-sm">Urban</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="areaType"
                            value="Rural"
                            checked={profileData.areaType === 'Rural'}
                            onChange={handleFormChange}
                          />
                          <span className="text-sm">Rural</span>
                        </label>
                      </div>
                    </div>

                    {/* State (Searchable) */}
                    <div className="mb-4 md:w-1/2 md:pr-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <select
                        name="state"
                        value={profileData.state}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                      >
                        <option value="">-- Select State --</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* District (Searchable, depends on State) */}
                    <div className="mb-4 md:w-1/2 md:pr-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                      <select
                        name="district"
                        value={profileData.district}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                      >
                        <option value="">-- Select District --</option>
                        {profileData.state && districtsByState[profileData.state]
                          ? districtsByState[profileData.state].map(d => <option key={d} value={d}>{d}</option>)
                          : <option disabled>Select a state first</option>
                        }
                      </select>
                    </div>

                    {/* Nationality (Fixed as India) */}
                    <div className="mb-4 md:w-1/2 md:pr-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                      <input
                        type="text"
                        value="India"
                        readOnly
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                      />
                    </div>

                    {/* Add Save button for Personal Details */}
                    <div className="w-full flex justify-end mt-2">
                      <button type="button" onClick={savePersonalDetails} className="px-4 py-2 bg-primary-dark text-white rounded-md">
                        Save 
                      </button>
                    </div>
                </div>

                {/*  2. Desired Career Profile  */}
                {/* <SectionTitle title="Desired Career Profile" Icon={FiBriefcase} />
                <div className="flex flex-wrap -mx-2">
                    <Input label="Desired Career/Industry" name="desiredCareer" value={profileData.desiredCareer} />
                </div> */}
                

                {/*  3. Education Details  */}
<SectionTitle title="Education Details" Icon={FiCalendar} onAdd={() => addEducation('UG')} />

{(profileData.educationDetails || []).length === 0 && (
  <p className="text-gray-500">No education details added yet.</p>
)}

{(profileData.educationDetails || []).map((edu, idx) => (
  <div key={edu.id || idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
    {/* Header: type + delete icon */}
    <div className="mb-3 flex justify-between items-start">
      <div className="w-full pr-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Education / Qualification *</label>
        <select
          value={edu.type || ''}
          onChange={e => updateEducation(idx, 'type', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">-- Select Education/Qualification --</option>
          <option value="Below SSLC">Below SSLC</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="Diploma">Diploma</option>
          <option value="ITI">ITI</option>
          <option value="NAC">NAC</option>
          <option value="CERT">CERT</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>
      </div>
      <div className="flex-shrink-0">
        <button type="button" onClick={() => removeEducation(idx)} className="text-red-600 hover:text-red-900 p-1" title="Delete education">
          <FiTrash2 />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Course / Degree */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
        <input
          type="text"
          value={edu.course || ''}
          onChange={e => updateEducation(idx, 'course', e.target.value)}
          placeholder="Degree / Course"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
        <input
          type="text"
          value={edu.specialization || ''}
          onChange={e => updateEducation(idx, 'specialization', e.target.value)}
          placeholder="Specialization (if any)"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Passing Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year *</label>
        <input
          type="number"
          value={edu.passingYear || ''}
          onChange={e => updateEducation(idx, 'passingYear', e.target.value)}
          placeholder="e.g. 2024"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Institute */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Institute / School / Board *</label>
        <input
          type="text"
          value={edu.institute || ''}
          onChange={e => updateEducation(idx, 'institute', e.target.value)}
          placeholder="Institute / School / Board"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* CGPA / Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CGPA / Percentage</label>
        <input
          type="text"
          value={edu.cgpaOrPercentage || ''}
          onChange={e => updateEducation(idx, 'cgpaOrPercentage', e.target.value)}
          placeholder="e.g. 7.76 / 78%"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Course Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
        <select
          value={edu.courseType || ''}
          onChange={e => updateEducation(idx, 'courseType', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">-- Select Course Type --</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Distance">Distance</option>
        </select>
      </div>
    </div>

    {/* Additional notes and document upload */}
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document (Optional)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={e => updateEducation(idx, 'documentFile', e.target.files[0])}
          className="w-full"
        />
        {edu.documentFileName && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {edu.documentFileName}
            {edu.documentFileUrl && (
              <div><a href={edu.documentFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline"> View document</a></div>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Save / Close buttons for education */}
    <div className="mt-4 flex justify-end space-x-3">
      <button type="button" onClick={() => saveEducation(idx)} className="px-4 py-2 bg-primary-dark text-white rounded-md">Save</button>
      <button type="button" onClick={() => closeEducation(idx)} className="px-4 py-2 border rounded-md">Close</button>
    </div>

  </div>
))}



              {/* ---------- Work Experience (promoted to its own section) ---------- */}
<SectionTitle title="Work Experience" Icon={FiBriefcase} onAdd={addExperience} />

<div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
  {(profileData.experience || []).length === 0 && <p className="text-gray-500">No experience added yet.</p>}

  {(profileData.experience || []).map((exp, idx) => (
    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
      {/* Top row: designation + delete */}
      <div className="mb-4 flex justify-between items-start">
        <div className="flex-1 pr-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
          <input
              type="text"
              value={exp.jobTitle || ''}
              onChange={e => updateExperience(idx, 'jobTitle', e.target.value)}
              placeholder="Designation"
              className="w-full px-3 py-2 border rounded-md"
              required
          />
        </div>
        <div className="flex-shrink-0">
          <button type="button" onClick={() => removeExperience(idx)} className="text-red-600 hover:text-red-900 p-1 mt-6" title="Delete experience">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
        <input
  type="text"
  value={exp.companyName || ''}
  onChange={e => updateExperience(idx, 'companyName', e.target.value)}
  placeholder="Organization Name"
  className="w-full px-3 py-2 border rounded-md"
  required
/>

      </div>

      {/* Is this your present company? — Yes / No radio */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Is this your present company ? *</label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`isCurrentJob-${idx}`}
              checked={!!exp.isCurrentJob}
              onChange={() => updateExperience(idx, 'isCurrentJob', true)}
            />
            <span className="text-sm">Yes</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`isCurrentJob-${idx}`}
              checked={!exp.isCurrentJob}
              onChange={() => updateExperience(idx, 'isCurrentJob', false)}
            />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>

      {/* Started Working From (Year + Month) */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Started Working From (Year)</label>
          <select
  value={exp.startYear || ''}
  onChange={e => updateExperience(idx, 'startYear', e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
  required
>

            <option value="">--Select Year--</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
  value={exp.startMonth || ''}
  onChange={e => updateExperience(idx, 'startMonth', e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
  required
>
            <option value="">--Select Month--</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Branching UI for current vs past job (keeps existing logic) */}
      {!exp.isCurrentJob ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Worked Till</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={exp.endYear || ''}
                onChange={e => updateExperience(idx, 'endYear', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required={!exp.isCurrentJob}
              >
                <option value="">--Select Year--</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>

              <select
                value={exp.endMonth || ''}
                onChange={e => updateExperience(idx, 'endMonth', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required={!exp.isCurrentJob}
              >
                <option value="">--Select Month--</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe your Job Profile *</label>
            <textarea
  rows={4}
  value={exp.description || ''}
  onChange={e => updateExperience(idx, 'description', e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
  placeholder="Type here.."
  required
/>

          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Worked Till</label>
            <input type="text" value={"Present"} readOnly className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

        <div className="mb-4 p-3 border border-dashed rounded-md bg-white">
          <h4 className="text-sm font-semibold mb-2">Current Job Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
              <input
                type="text"
                value={exp.currentCompanyName || ''}
                onChange={e => updateExperience(idx, 'currentCompanyName', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
              <input
                type="text"
                value={exp.currentRole || ''}
                onChange={e => updateExperience(idx, 'currentRole', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Salary and Total Experience in one row (two columns) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="text"
                value={exp.currentSalary || ''}
                onChange={e => updateExperience(idx, 'currentSalary', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. 25,000 / month"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience</label>
              <select
                value={exp.currentExperience || ''}
                onChange={e => updateExperience(idx, 'currentExperience', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">-- Select Experience --</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="Above 3 years">Above 3 years</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe your Job Profile *</label>
          <textarea
              rows={4}
              value={exp.description || ''}
              onChange={e => updateExperience(idx, 'description', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Type here.."
              required
          />
        </div>
      </>
      )}
 
      {/* Upload document for experience (optional) */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document (Optional)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          onChange={e => updateExperience(idx, 'documentFile', e.target.files[0])}
          className="w-full"
        />
        {exp.documentFileName && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {exp.documentFileName}
            {exp.documentFileUrl && (
              <div><a href={exp.documentFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline"> View document</a></div>
            )}
          </div>
        )}
      </div>

    {/* end of experience item — Save / Close buttons */}
    <div className="mt-1 flex justify-end space-x-3">
      <button type="button" onClick={() => saveExperienceItem(idx)} className="px-4 py-2 bg-primary-dark text-white rounded-md">Save</button>
      <button type="button" onClick={() => closeExperience(idx)} className="px-4 py-2 border rounded-md">Close</button>
    </div>
    </div>
  ))}
</div>


                {/*  4. Languages Known (Dynamic Table)  */}
                <SectionTitle title="Languages Known" Icon={FiCalendar} onAdd={addLanguage} />
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Language</th>
                        <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Proficiency</th>
                        <th className="px-3 py-2 text-center text-sm font-medium text-gray-600">Read</th>
                        <th className="px-3 py-2 text-center text-sm font-medium text-gray-600">Write</th>
                        <th className="px-3 py-2 text-center text-sm font-medium text-gray-600">Speak</th>
                        <th className="px-3 py-2 text-right text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {(profileData.languages || []).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-3 py-4 text-sm text-gray-500">
                            No languages added yet. Click "Add" to add a language.
                          </td>
                        </tr>
                      ) : (
                        profileData.languages.map(lang => (
                          <tr key={lang.id}>
                            <td className="px-3 py-3">
                              <select
                                value={lang.language || ''}
                                onChange={e => handleLanguageChange(lang.id, 'language', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                              >
                                <option value="">-- Select Language --</option>
                                <option value="Tamil">Tamil</option>
                                <option value="English">English</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Kannada">Kannada</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Marathi">Marathi</option>
                              </select>
                            </td>

                            <td className="px-3 py-3">
                              <select
                                value={lang.proficiency || ''}
                                onChange={e => handleLanguageChange(lang.id, 'proficiency', e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                              >
                                <option value="">-- Select Proficiency --</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Proficient">Proficient</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </td>

                            {['read', 'write', 'speak'].map(field => (
                              <td key={field} className="px-3 py-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={!!lang[field]}
                                  onChange={e => handleLanguageChange(lang.id, field, e.target.checked)}
                                  className="form-checkbox text-accent-teal rounded"
                                />
                              </td>
                            ))}

                            <td className="px-3 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => removeLanguage(lang.id)}
                                className="px-2 py-1 text-sm text-red-600 hover:text-red-900 transition border border-red-100 rounded"
                                title="Remove language"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* ---------- Internships (now a top-level section) ---------- */}
                <SectionTitle title="Internships" Icon={FiBriefcase} onAdd={addInternship} />
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                  {(profileData.internships || []).length === 0 && <p className="text-gray-500">No internships added yet.</p>}

                  {(profileData.internships || []).map((intern, idx) => (
                    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-full pr-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                          <input type="text" value={intern.companyName || ''} onChange={e=> updateInternship(idx, 'companyName', e.target.value)} className="w-full px-3 py-2 border rounded-md" required/>
                        </div>
                        <div className="flex-shrink-0">
                          <button type="button" onClick={()=> removeInternship(idx)} className="text-red-600 hover:text-red-900 p-1" title="Delete internship">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                          <select value={intern.type || 'Onsite'} onChange={e=> updateInternship(idx, 'type', e.target.value)} className="w-full px-3 py-2 border rounded-md" required>
                            <option>Onsite</option>
                            <option>Remote</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                          <input type="text" value={intern.duration || ''} onChange={e=> updateInternship(idx, 'duration', e.target.value)} placeholder="e.g. 3 months / Jun 2023 - Aug 2023" className="w-full px-3 py-2 border rounded-md" required/>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stipend *</label>
                          <input type="text" value={intern.stipend || ''} onChange={e=> updateInternship(idx, 'stipend', e.target.value)} placeholder="e.g. 5000 / N/A" className="w-full px-3 py-2 border rounded-md" required/>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                        <input type="text" value={intern.projectName || ''} onChange={e=> updateInternship(idx, 'projectName', e.target.value)} className="w-full px-3 py-2 border rounded-md" required/>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                        <textarea rows={5} value={intern.responsibilities || ''} onChange={e=> updateInternship(idx, 'responsibilities', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate (Optional)</label>
                          <input type="file" onChange={e=> updateInternship(idx, 'certificateFile', e.target.files[0])} className="w-full" />
                        </div>
                      </div>

                      {/* Save / Close buttons for internship */}
                      <div className="mt-4 flex justify-end space-x-3">
                        <button type="button" onClick={() => saveInternship(idx)} className="px-4 py-2 bg-primary-dark text-white rounded-md">Save</button>
                        <button type="button" onClick={() => closeInternship(idx)} className="px-4 py-2 border rounded-md">Close</button>
                      </div>
                    </div>
                  ))}
                </div>

{/* ---------- Projects (now a top-level section) ---------- */}
                <SectionTitle title="Projects" Icon={FiBriefcase} onAdd={addProject} />
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                  {(profileData.projects || []).length === 0 && <p className="text-gray-500">No projects added yet.</p>}

                  {(profileData.projects || []).map((proj, idx) => (
                    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                      <div className="mb-3 flex justify-between items-start">
                        <div className="w-full pr-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                          <input type="text" value={proj.title || ''} onChange={(e)=> updateProject(idx, 'title', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div className="flex-shrink-0">
                          <button type="button" onClick={()=> removeProject(idx)} className="text-red-600 hover:text-red-900 p-1" title="Delete project">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                        <textarea rows={4} value={proj.description || ''} onChange={(e)=> updateProject(idx, 'description', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                      </div>

                      <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Project URL (optional)</label>
                          <input type="url" value={proj.url || ''} onChange={(e)=> updateProject(idx, 'url', e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                        </div>

                        {/* Choose file for project */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Project Document (Optional)</label>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.png"
                            onChange={e => updateProject(idx, 'documentFile', e.target.files[0])}
                            className="w-full"
                          />
                          {proj.documentFileName && (
                            <div className="mt-2 text-sm text-gray-600">
                              Selected: {proj.documentFileName}
                              {proj.documentFileUrl && (
                                <div><a href={proj.documentFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline"> View document</a></div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Save / Close buttons for project */}
                      <div className="mt-4 flex justify-end space-x-3">
                        <button type="button" onClick={() => saveProject(idx)} className="px-4 py-2 bg-primary-dark text-white rounded-md">Save</button>
                        <button type="button" onClick={() => closeProject(idx)} className="px-4 py-2 border rounded-md">Close</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ---------- Skills (new main section) ---------- */}
                <SectionTitle title="Skills" Icon={FiBriefcase} onAdd={addSkill} />
                <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                  {(profileData.skills || []).length === 0 && <p className="text-gray-500">No skills added yet.</p>}

                  {(profileData.skills || []).map((skill, idx) => (
                    <div key={skill.id || idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                      <div className="mb-3 flex justify-between items-start">
                        <div className="w-full pr-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
                          <input type="text" value={skill.name || ''} onChange={e => updateSkill(idx, 'name', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div className="flex-shrink-0">
                          <button type="button" onClick={() => removeSkill(idx)} className="text-red-600 hover:text-red-900 p-1" title="Delete skill">
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mode *</label>
                          <select value={skill.mode || ''} onChange={e => updateSkill(idx, 'mode', e.target.value)} className="w-full px-3 py-2 border rounded-md" required>
                            <option value="">-- Select Mode --</option>
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                          </select>
                        </div>

                        {/* For Offline: Institute Name */}
                        {skill.mode === 'Offline' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name *</label>
                              <input type="text" value={skill.instituteName || ''} onChange={e => updateSkill(idx, 'instituteName', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                              <input
                                type="text"
                                value={skill.duration || ''}
                                onChange={e => updateSkill(idx, 'duration', e.target.value)}
                                placeholder="e.g. 6 weeks"
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                          </>
                        )}

                        {/* For Online: Platform + Duration */}
                        {skill.mode === 'Online' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name *</label>
                              <input type="text" value={skill.platformName || ''} onChange={e => updateSkill(idx, 'platformName', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                              <input type="text" value={skill.duration || ''} onChange={e => updateSkill(idx, 'duration', e.target.value)} placeholder="e.g. 6 weeks" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate (Optional)</label>
                        <input type="file" accept=".pdf,.jpg,.png" onChange={e => updateSkill(idx, 'certificateFile', e.target.files[0])} className="w-full" />
                        {skill.certificateFileName && (
                          <div className="mt-2 text-sm text-gray-600">
                            Selected: {skill.certificateFileName}
                            {skill.certificateFileUrl && (
                              <div><a href={skill.certificateFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline"> View certificate</a></div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end space-x-3">
                        <button type="button" onClick={() => saveSkill(idx)} className="px-4 py-2 bg-primary-dark text-white rounded-md">Save</button>
                        <button type="button" onClick={() => closeSkill(idx)} className="px-4 py-2 border rounded-md">Close</button>
                      </div>
                    </div>
                  ))}
                </div>

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