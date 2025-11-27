// Temporary bridge file to maintain backward compatibility.
// The component was renamed to EducationModal, but several imports
// (e.g., CandidateProfile, App routes) still reference the old name.
// Re-exporting keeps those imports working without touching other files.
export { default } from './EducationModal';

