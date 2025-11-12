<<<<<<< HEAD
// src/components/CandidateSignup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayoutSide from './AuthLayoutSide';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CandidateSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        name: '', fatherName: '', email: '', mobile: '', password: '', confirmPassword: '', terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }
        // Logic for form submission
        console.log("Candidate Signup Data:", form);
        alert('Candidate registration successful! (Simulated)');
    };

    const InputField = ({ Icon, placeholder, type = 'text', name, value, onChange, isPassword = false, showPass, setShowPass }) => (
        <div className="form-group mb-4">
            <label htmlFor={`c-${name}`} className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type={isPassword ? (showPass ? 'text' : 'password') : type}
                    id={`c-${name}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                />
                {isPassword && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FiEyeOff /> : <FiEye />}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <AuthLayoutSide title="Sign Up as Candidate" infoType="candidate">
            <form onSubmit={handleSubmit}>
                <InputField Icon={FiUser} placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
                <InputField Icon={FiUser} placeholder="Father's Name" name="fatherName" value={form.fatherName} onChange={handleChange} />
                <InputField Icon={FiMail} placeholder="E-mail" name="email" value={form.email} onChange={handleChange} type="email" />
                <InputField Icon={FiPhone} placeholder="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} type="tel" />
                
                <InputField Icon={FiLock} placeholder="Password" name="password" value={form.password} onChange={handleChange} isPassword showPass={showPassword} setShowPass={setShowPassword} />
                <InputField Icon={FiLock} placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} isPassword showPass={showConfirmPassword} setShowPass={setShowConfirmPassword} />

                <div className="form-group checkbox-group flex items-start mb-6 text-sm">
                    <input type="checkbox" id="c-terms" name="terms" checked={form.terms} onChange={handleChange} required className="form-checkbox mt-1 text-accent-teal rounded border-gray-300 focus:ring-accent-teal mr-2" />
                    <label htmlFor="c-terms" className="text-gray-600">
                        I Accept the <Link to="/terms-conditions" className="font-medium text-accent-teal hover:text-primary-dark transition">Terms & Conditions</Link>
                    </label>
                </div>

                <motion.button
                    type="submit"
                    className="submit-btn w-full bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Register
                </motion.button>
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already a member? <Link to="/candidate-login" className="font-semibold text-accent-teal hover:text-primary-dark transition">Login Here</Link>
                </p>
            </form>
        </AuthLayoutSide>
    );
};

=======
// src/components/CandidateSignup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayoutSide from './AuthLayoutSide';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const CandidateSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        name: '', fatherName: '', email: '', mobile: '', password: '', confirmPassword: '', terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }
        // Logic for form submission
        console.log("Candidate Signup Data:", form);
        alert('Candidate registration successful! (Simulated)');
    };

    const InputField = ({ Icon, placeholder, type = 'text', name, value, onChange, isPassword = false, showPass, setShowPass }) => (
        <div className="form-group mb-4">
            <label htmlFor={`c-${name}`} className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type={isPassword ? (showPass ? 'text' : 'password') : type}
                    id={`c-${name}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-accent-teal focus:border-accent-teal transition"
                />
                {isPassword && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary-dark" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FiEyeOff /> : <FiEye />}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <AuthLayoutSide title="Sign Up as Candidate" infoType="candidate">
            <form onSubmit={handleSubmit}>
                <InputField Icon={FiUser} placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
                <InputField Icon={FiUser} placeholder="Father's Name" name="fatherName" value={form.fatherName} onChange={handleChange} />
                <InputField Icon={FiMail} placeholder="E-mail" name="email" value={form.email} onChange={handleChange} type="email" />
                <InputField Icon={FiPhone} placeholder="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} type="tel" />
                
                <InputField Icon={FiLock} placeholder="Password" name="password" value={form.password} onChange={handleChange} isPassword showPass={showPassword} setShowPass={setShowPassword} />
                <InputField Icon={FiLock} placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} isPassword showPass={showConfirmPassword} setShowPass={setShowConfirmPassword} />

                <div className="form-group checkbox-group flex items-start mb-6 text-sm">
                    <input type="checkbox" id="c-terms" name="terms" checked={form.terms} onChange={handleChange} required className="form-checkbox mt-1 text-accent-teal rounded border-gray-300 focus:ring-accent-teal mr-2" />
                    <label htmlFor="c-terms" className="text-gray-600">
                        I Accept the <Link to="/terms-conditions" className="font-medium text-accent-teal hover:text-primary-dark transition">Terms & Conditions</Link>
                    </label>
                </div>

                <motion.button
                    type="submit"
                    className="submit-btn w-full bg-primary-dark text-white font-bold py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Register
                </motion.button>
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already a member? <Link to="/candidate-login" className="font-semibold text-accent-teal hover:text-primary-dark transition">Login Here</Link>
                </p>
            </form>
        </AuthLayoutSide>
    );
};

>>>>>>> 8ddf9b2188da9f20c450939e3cd463717041a287
export default CandidateSignup;