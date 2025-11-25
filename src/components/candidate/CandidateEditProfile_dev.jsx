// src/components/candidate/CandidateEditProfile.jsx
import React, { useState, useRef } from 'react';
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
        internships: profile.internships || [],
        projects: profile.projects || [],
        experience: profile.experience || []
    });
    const formRef = useRef(null);

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

    //Input definition with this
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

    const addProject = () => {
        setProfileData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), { title: '', description: '', url: '' }]
        }));
    };

    const updateProject = (index, field, value) => {
        const updated = [...(profileData.projects || [])];
        updated[index] = { ...(updated[index] || {}), [field]: value };
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
            // extra current-job detail fields (shown only when isCurrentJob === true)
            currentCompanyName: '',
            currentRole: '',
            currentSalary: '',
            currentExperience: '' // e.g. "2 years 3 months"
        }]
    }));
};


    const updateExperience = (index, field, value) => {
        const updated = [...(profileData.experience || [])];
        updated[index] = { ...(updated[index] || {}), [field]: value };
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
                    documentFile: null
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


    return (
        <CandidateDashboardLayout title="Edit Profile">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
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
<SectionTitle title="Education Details" Icon={FiCalendar} onAdd={() => addEducation('UG')} />

{(profileData.educationDetails || []).length === 0 && (
  <p className="text-gray-500">No education details added yet.</p>
)}

{(profileData.educationDetails || []).map((edu, idx) => (
  <div key={edu.id || idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
    {/* Header: type */}
    <div className="mb-3">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (optional)</label>
        <textarea
          rows={2}
          value={edu.additionalNotes || ''}
          onChange={e => updateEducation(idx, 'additionalNotes', e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Honors, relevant courses, projects..."
        />
      </div>

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

    {/* Remove button placed at bottom-right like workexperience */}
    <div className="mt-4 text-right">
      <button type="button" onClick={() => removeEducation(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
    </div>

  </div>
))}



              {/* ---------- Work Experience (Yes => full details, No => minimal + description) ---------- */}
<div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Work Experience</h3>
    <button type="button" onClick={addExperience} className="text-green-600 font-medium hover:underline">+ Add</button>
  </div>

  {(profileData.experience || []).length === 0 && <p className="text-gray-500">No experience added yet.</p>}

  {(profileData.experience || []).map((exp, idx) => (
    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
      {/* Designation / Organization (always visible) */}
      <div className="mb-4">
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

      {/* Is this your present company? — Yes / No radio (always visible) */}
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

      {/* Started Working From (Year + Month) — always visible (above the Yes/No in your screenshot) */}
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

      {/* Branch: If user chose NO => show End Year+Month and Description only (minimal) */}
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

          {/*Job Profile description (and the fields above which are already visible) */}
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
        /*  If user choose YES => show Present + current-job details + description */
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
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
                <input
                  type="text"
                  value={exp.currentExperience || ''}
                  onChange={e => updateExperience(idx, 'currentExperience', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g. 2 years 3 months"
                />
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

      <div className="mt-2 text-right">
        <button type="button" onClick={() => removeExperience(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
      </div>
    </div>
  ))}
</div>


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


                {/* ---------- Internships ---------- */}
<div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold flex items-center">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
      Internships
    </h3>
    <button type="button" onClick={addInternship} className="text-green-600 font-medium hover:underline">+ Add</button>
  </div>

  {(profileData.internships || []).length === 0 && <p className="text-gray-500">No internships added yet.</p>}

  {(profileData.internships || []).map((intern, idx) => (
    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input type="text" value={intern.companyName || ''} onChange={e=> updateInternship(idx, 'companyName', e.target.value)} className="w-full px-3 py-2 border rounded-md" required/>
        </div>

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

        <div className="text-right">
          <button type="button" onClick={()=> removeInternship(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
        </div>
      </div>
    </div>
  ))}
</div>


{/* ---------- Projects ---------- */}
<div className="mb-8 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Projects</h3>
    <button type="button" onClick={addProject} className="text-green-600 font-medium hover:underline">+ Add</button>
  </div>

  {(profileData.projects || []).length === 0 && <p className="text-gray-500">No projects added yet.</p>}

  {(profileData.projects || []).map((proj, idx) => (
    <div key={idx} className="mb-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
        <input type="text" value={proj.title || ''} onChange={(e)=> updateProject(idx, 'title', e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
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

        <div className="text-right">
          <button type="button" onClick={()=> removeProject(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
        </div>
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