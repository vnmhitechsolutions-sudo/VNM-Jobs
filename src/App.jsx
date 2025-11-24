// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import all the enhanced components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop'; 

// Core Pages
import HomePage from './components/HomePage.jsx';
import JobsPage from './components/JobsPage.jsx';
import JobDetailsPage from './components/JobDetailsPage.jsx'; // The final piece
import JobFairPage from './components/JobFairPage.jsx';

// Authentication Pages
import CandidateLogin from './components/CandidateLogin.jsx';
import EmployerLogin from './components/EmployerLogin.jsx';
import CandidateSignup from './components/CandidateSignup.jsx';
import EmployerSignup from './components/EmployerSignup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

//  NEW IMPORTS REQUIRED FOR DASHBOARD PAGES 
import CandidateDashboard from './components/candidate/CandidateDashboard';
import CandidateProfile from './components/candidate/CandidateProfile';
import CandidateEditProfile from './components/candidate/CandidateEditProfile';
import JobFairCalendar from './components/candidate/JobFairCalendar';
import ResetPassword from './components/candidate/ResetPassword';
import FeedbackPage from './components/candidate/FeedbackPage';
import AppliedJobFairList from './components/candidate/AppliedJobFairList';
import { AppliedJobsPage, BookmarkedJobsPage, JobFairListPage, BookmarkedJobFairListPage } from './components/candidate/StatusListingLayout'; 
// --

// Static/Utility Pages
import TermsConditions from './components/TermsConditions.jsx';

const App = () => {
  return (
    <Router>
      {/* The Header and Footer are rendered outside the <Routes> 
        to ensure they appear on every page, providing a consistent layout.
      */}
      <ScrollToTop />
      <Header /> 
      
      <Routes>
        {/* Core Job Portal Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/job-fair" element={<JobFairPage />} />
        
        {/* Dynamic Detail Route: Passes the job ID for fetching data */}
        <Route path="/job/:jobId" element={<JobDetailsPage />} /> 

        {/* Authentication Routes */}
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/candidate-signup" element={<CandidateSignup />} />
        <Route path="/employer-signup" element={<EmployerSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/*  NEW CANDIDATE DASHBOARD ROUTES  */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/edit-profile" element={<CandidateEditProfile />} />
        <Route path="/candidate/job-search" element={<JobsPage />} /> {/* Links to the public JobsPage */}
        <Route path="/candidate/applied-jobs" element={<AppliedJobsPage />} />
        <Route path="/candidate/bookmarked-jobs" element={<BookmarkedJobsPage />} />
        <Route path="/candidate/job-fair-list" element={<JobFairListPage />} />
        <Route path="/candidate/job-fair-calendar" element={<JobFairCalendar />} />
        <Route path="/candidate/applied-job-fair-list" element={<AppliedJobFairList />} />
        <Route path="/candidate/bookmarked-job-fair" element={<BookmarkedJobFairListPage />} />
        <Route path="/candidate/feedback" element={<FeedbackPage />} />
        <Route path="/candidate/reset-password" element={<ResetPassword />} />

        {/* Static/Legal Routes */}
        <Route path="/terms-conditions" element={<TermsConditions />} />
        
        {/* Add a 404 Not Found Page */}
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      
      <Footer />
      <ScrollToTop/>
    </Router>
  );
};

// Simple Placeholder for the 404 Page (for completeness)
const NotFoundPage = () => (
    <div className="pt-[100px] text-center p-20 min-h-screen bg-primary-light">
        <h1 className="text-6xl font-extrabold text-accent-yellow">404</h1>
        <p className="text-2xl text-primary-dark mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">The page you are looking for doesn't exist or an error occurred.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-accent-teal text-primary-dark font-bold rounded-lg hover:bg-teal-400 transition">
            Go to Home
        </Link>
    </div>
);

export default App;