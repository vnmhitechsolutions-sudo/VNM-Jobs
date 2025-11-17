// src/components/Footer.jsx
import React from 'react';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }) => (
    <Link to={to || '#'} className="text-gray-300 hover:text-accent-yellow transition duration-300 text-sm">
        {children}
    </Link>
);

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white pt-12 pb-6 border-t border-gray-700">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
                    
                    {/* Column 1: Logo and Brand Info */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link to="/" className="text-2xl font-extrabold flex items-center text-white">
                            <FiBriefcase className="mr-2 text-accent-yellow text-3xl" />
                            R<span className="text-accent-teal">Skills</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            The advanced private job portal for aspiring talent across sectors.
                        </p>
                        <div className="flex space-x-4">
                            <FiFacebook className="text-gray-400 hover:text-white transition duration-300 text-xl cursor-pointer" />
                            <FiTwitter className="text-gray-400 hover:text-white transition duration-300 text-xl cursor-pointer" />
                            <FiLinkedin className="text-gray-400 hover:text-white transition duration-300 text-xl cursor-pointer" />
                            <FiInstagram className="text-gray-400 hover:text-white transition duration-300 text-xl cursor-pointer" />
                        </div>
                    </div>

                    {/* Column 2: Employer Links */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-accent-teal mb-3">Employer</h4>
                        <div className="space-y-2 flex flex-col">
                            <FooterLink to="/employer-signup">Post a Job</FooterLink>
                            <FooterLink to="/employer-login">Employer Login</FooterLink>
                            <FooterLink to="#">Our Plans</FooterLink>
                        </div>
                    </div>

                    {/* Column 3: Candidate Links */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-accent-teal mb-3">Candidate</h4>
                        <div className="space-y-2 flex flex-col">
                            <FooterLink to="/jobs">Browse Jobs</FooterLink>
                            <FooterLink to="/candidate-signup">Create Account</FooterLink>
                            <FooterLink to="#">Upload Resume</FooterLink>
                        </div>
                    </div>

                    {/* Column 4: Legal & Info */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-accent-teal mb-3">Legal</h4>
                        <div className="space-y-2 flex flex-col">
                            <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
                            <FooterLink to="#">Privacy Policy</FooterLink>
                            <FooterLink to="#">Sitemap</FooterLink>
                        </div>
                    </div>

                    {/* Column 5: Mobile App (Advanced Callout) */}
                    <div className="col-span-2 md:col-span-1 space-y-4 bg-gray-800 p-4 rounded-xl">
                        <h4 className="text-lg font-semibold text-accent-yellow">Get the Mobile App</h4>
                        <p className="text-gray-400 text-sm">Scan the QR code to download our app and apply on the go!</p>
                        <div className="bg-white w-24 h-24 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-primary-dark font-bold">QR Code</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-500 pt-4">
                    &copy; 2025 VNM Jobs. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;