// src/components/candidate/EducationModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiInfo, FiCalendar, FiBookOpen } from 'react-icons/fi';

// Helper functions for date pickers (Moved here for modal self-sufficiency)
const generateYears = (startYear, endYear) => {
    const years = [];
    for (let i = endYear; i >= startYear; i--) {
        years.push({ value: i.toString(), label: i.toString() });
    }
    return years;
};

const passingYearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
});


// --- Reusable Input Helpers ---
const ModalInput = ({ label, name, value, type = 'text', required = false, Icon, halfWidth = false, onChange, placeholder, ...props }) => (
    <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition ${Icon ? 'pl-10' : ''}`}
                {...props}
            />
        </div>
    </div>
);

const ModalSelect = ({ label, name, value, options, required = false, halfWidth = false, onChange, defaultValue = "" }) => (
    <div className={`mb-4 ${halfWidth ? 'md:w-1/2 md:pr-2' : 'w-full'}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition appearance-none cursor-pointer"
        >
            <option value={defaultValue}>-Select {label.includes('Year') ? 'Year' : 'Option'}-</option>
            {options.map(opt => (
                <option key={opt.value || opt.label} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);
// --- End Helpers ---


const EducationModal = ({ isOpen, onClose, onSave, educationData }) => {
    
    // --- State Management for the Modal Form ---
    const [formData, setFormData] = useState(educationData || {});

    // Reset state on modal open/data change
    useEffect(() => {
        // Initialize with the standard education structure for a new entry
        setFormData(educationData || {
            qualificationType: '', course: '', specialization: '', passingYear: '', 
            instituteName: '', board: '', percentage: '', cgpa: '', courseType: '', 
            document: null, additionalQualification: '', qualification: ''
        });
    }, [educationData, isOpen]); 

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation check (CGPA/Percentage must be numeric or N/A if required)
        const score = formData.cgpa;
        if (formData.qualificationType !== 'Below SSLC' && score && isNaN(score) && score.toLowerCase() !== 'n/a' && score.toLowerCase() !== 'na') {
            alert("CGPA/Percentage must be a number or 'N/A' if percentage conversion is used.");
            return;
        }

        onSave(formData); // Send data to the parent component
        onClose(); // Close the modal
    };
    
    // Pass the standard handleChange to the helpers
    const inputChange = handleChange;


    // --- Options Lists ---
    const qualificationOptions = [
        { value: 'Below SSLC', label: 'Below SSLC' }, { value: '10th', label: '10th' }, { value: '12th', label: '12th' },
        { value: 'Diploma', label: 'Diploma' }, { value: 'ITI', label: 'ITI' }, { value: 'NAC', label: 'NAC' }, 
        { value: 'CERT', label: 'CERT. In Medical/ Para Medical/ Nursing' },
        { value: 'UG Degree', label: 'UG Degree' }, { value: 'PG Degree', label: 'PG Degree' }
    ];

    const courseOptions = [
        { value: 'Science', label: 'Science' }, { value: 'Arts', label: 'Arts' },
        { value: 'Commerce', label: 'Commerce' }, { value: 'Engineering', label: 'Engineering' }
    ];

    const specializationOptions = [
        { value: 'Computer Science', label: 'Computer Science' }, { value: 'Electrical', label: 'Electrical' },
        { value: 'Mechanical', label: 'Mechanical' }, { value: 'Civil', label: 'Civil' }
    ];
    
    const courseTypeOptions = [
        { value: 'Full-time', label: 'Full-time' }, { value: 'Part-time', label: 'Part-time' },
        { value: 'Correspondence', label: 'Correspondence/Distance Learning' }
    ];


    // --- Dynamic Field Rendering Logic ---
    const renderFields = () => {
        const { qualificationType } = formData;
        const fields = [];

        // Determine if Degree/Diploma fields are needed
        const needsCourseAndSpec = ['UG Degree', 'PG Degree', 'Diploma', 'ITI', 'NAC', 'CERT'].includes(qualificationType);
        
        // 1. Course, Specialization, Course Type
        if (needsCourseAndSpec) {
            fields.push(
                <ModalSelect key="course" label="Course" name="course" value={formData.course} options={courseOptions} onChange={handleChange} required={true} />,
                <ModalSelect key="specialization" label="Specialization" name="specialization" value={formData.specialization} options={specializationOptions} onChange={handleChange} required={true} />,
                <ModalSelect key="courseType" label="Course Type" name="courseType" value={formData.courseType} options={courseTypeOptions} onChange={handleChange} required={true} />
            );
        }

        // 2. Passing Year & Institute/Board Fields
        if (qualificationType) {
            // Passing Year
            fields.push(
                <ModalSelect key="passingYear" label="Passing Year" name="passingYear" value={formData.passingYear} options={passingYearOptions} onChange={handleChange} required={true} halfWidth />,
            );
            
            // Institute/Board Name (10th/12th/Below SSLC needs Board; UG/PG needs Institute)
            if (['10th', '12th', 'Below SSLC'].includes(qualificationType)) {
                fields.push(
                    <ModalInput key="board" label="Board/Council" name="board" value={formData.board} onChange={handleChange} required={true} placeholder="e.g. State Board / CBSE" />
                );
            } else if (qualificationType !== 'Below SSLC') {
                 fields.push(
                    <ModalInput key="institute" label="Institute Name" name="instituteName" value={formData.instituteName} onChange={handleChange} required={true} placeholder="Institute Name" />
                );
            }
        }
        
        // 3. CGPA / Percentage Input (Required for most, not Below SSLC)
        if (qualificationType && qualificationType !== 'Below SSLC') {
             fields.push(
                <div key="cgpa_input" className="mb-4 md:w-1/2 md:pr-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        CGPA / Percentage * <FiInfo size={14} className="ml-1 text-blue-500 cursor-pointer" title="If score is in percentage, convert to CGPA (e.g., 75.5% -> 7.5)" />
                    </label>
                    <Input
                        type="text" 
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        required={true}
                        placeholder="e.g. 7.5 or 85%"
                    />
                </div>
            );
        }
        
        // 4. Document Upload & Additional (Always shown if qualification is selected)
        if (qualificationType) {
             fields.push(
                <ModalInput 
                    key="additional" 
                    label="Additional Qualification (Optional)" 
                    name="additionalQualification" 
                    value={formData.additionalQualification} 
                    onChange={handleChange} 
                    required={false}
                    placeholder="E.g. AutoCAD, Tally"
                />
            );

            fields.push(
                <div key="document-upload" className="mb-4 border-t pt-4 border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Upload (Optional)</label>
                    <input
                        type="file"
                        name="document"
                        onChange={handleChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-primary-dark hover:file:bg-indigo-200"
                    />
                </div>
            );
        }

        return fields;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center bg-accent-teal p-5 text-white">
                            <h3 className="text-xl font-bold flex items-center">
                                Education Details
                            </h3>
                            <button onClick={onClose} className="text-gray-100 hover:text-white transition">
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                        
                        {/* Modal Body (Form) */}
                        <form onSubmit={handleSubmit} className="p-6">
                            
                            {/* Education/Qualification Type Selector (Always visible) */}
                            <ModalSelect 
                                label="Education/Qualification" 
                                name="qualificationType" 
                                value={formData.qualificationType} 
                                options={qualificationOptions} 
                                onChange={handleChange} 
                                required={true}
                            />

                            {/* Dynamically rendered fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
                                {renderFields()}
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg text-primary-dark hover:bg-gray-300">
                                    Close
                                </button>
                                <motion.button
                                    type="submit"
                                    className="px-4 py-2 bg-accent-teal text-white rounded-lg hover:bg-teal-600 transition flex items-center"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <FiSave className="mr-2" /> Add
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EducationModal;