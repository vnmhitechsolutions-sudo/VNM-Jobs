<<<<<<< HEAD
// src/components/shared/PasswordStrengthIndicator.jsx
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const getStrength = (password) => {
    let strength = 0;
    const requirements = [
        /(?=.*[a-z])/,       // Lowercase letter
        /(?=.*[A-Z])/,       // Uppercase letter
        /(?=.*\d)/,         // Digit
        /(?=.*[!@#$%^&*])/,  // Special character
        /(?=.{8,})/,        // Minimum length 8
    ];

    const satisfied = requirements.map(regex => regex.test(password));
    strength = satisfied.filter(Boolean).length;

    const strengthText = strength === 5 ? 'Strong' :
                         strength >= 3 ? 'Medium' :
                         strength > 0 ? 'Weak' : 'Too Short';
                         
    const color = strength === 5 ? 'text-green-500' :
                  strength >= 3 ? 'text-yellow-500' :
                  'text-red-500';

    return { strength, strengthText, color, satisfied };
};

const PasswordStrengthIndicator = ({ password }) => {
    const { strength, strengthText, color, satisfied } = getStrength(password);

    const requirementsList = [
        { label: "Minimum 8 characters", check: satisfied[4] },
        { label: "One uppercase letter (A-Z)", check: satisfied[1] },
        { label: "One lowercase letter (a-z)", check: satisfied[0] },
        { label: "One number (0-9)", check: satisfied[2] },
        { label: "One special character", check: satisfied[3] },
    ];

    return (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Password Strength:</span>
                <span className={`text-sm font-bold ${color}`}>{strengthText}</span>
            </div>
            
            {/* Visual Strength Bar */}
            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                        width: `${strength * 20}%`,
                        backgroundColor: strength === 5 ? '#10B981' : strength >= 3 ? '#FBBF24' : '#EF4444'
                    }}
                />
            </div>

            {/* Detailed Requirements List */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {requirementsList.map((req, index) => (
                    <div key={index} className={`flex items-center ${req.check ? 'text-green-600' : 'text-gray-500'}`}>
                        <FiCheckCircle className="mr-1 text-sm" />
                        {req.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

=======
// src/components/shared/PasswordStrengthIndicator.jsx
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const getStrength = (password) => {
    let strength = 0;
    const requirements = [
        /(?=.*[a-z])/,       // Lowercase letter
        /(?=.*[A-Z])/,       // Uppercase letter
        /(?=.*\d)/,         // Digit
        /(?=.*[!@#$%^&*])/,  // Special character
        /(?=.{8,})/,        // Minimum length 8
    ];

    const satisfied = requirements.map(regex => regex.test(password));
    strength = satisfied.filter(Boolean).length;

    const strengthText = strength === 5 ? 'Strong' :
                         strength >= 3 ? 'Medium' :
                         strength > 0 ? 'Weak' : 'Too Short';
                         
    const color = strength === 5 ? 'text-green-500' :
                  strength >= 3 ? 'text-yellow-500' :
                  'text-red-500';

    return { strength, strengthText, color, satisfied };
};

const PasswordStrengthIndicator = ({ password }) => {
    const { strength, strengthText, color, satisfied } = getStrength(password);

    const requirementsList = [
        { label: "Minimum 8 characters", check: satisfied[4] },
        { label: "One uppercase letter (A-Z)", check: satisfied[1] },
        { label: "One lowercase letter (a-z)", check: satisfied[0] },
        { label: "One number (0-9)", check: satisfied[2] },
        { label: "One special character", check: satisfied[3] },
    ];

    return (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Password Strength:</span>
                <span className={`text-sm font-bold ${color}`}>{strengthText}</span>
            </div>
            
            {/* Visual Strength Bar */}
            <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                        width: `${strength * 20}%`,
                        backgroundColor: strength === 5 ? '#10B981' : strength >= 3 ? '#FBBF24' : '#EF4444'
                    }}
                />
            </div>

            {/* Detailed Requirements List */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {requirementsList.map((req, index) => (
                    <div key={index} className={`flex items-center ${req.check ? 'text-green-600' : 'text-gray-500'}`}>
                        <FiCheckCircle className="mr-1 text-sm" />
                        {req.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default PasswordStrengthIndicator;