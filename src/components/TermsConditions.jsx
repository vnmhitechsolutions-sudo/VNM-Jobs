// src/components/TermsConditions.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <main className="pt-[80px] bg-primary-light min-h-screen">
            <div className="bg-primary-dark py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white">Terms & Conditions 📜</h1>
                    <p className="text-gray-400 mt-1">Governing your use of the Rescue Ski Job Portal.</p>
                </div>
            </div>

            <motion.div 
                className="container mx-auto px-4 py-16 max-w-4xl"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="content-section bg-card-bg p-8 md:p-10 rounded-xl shadow-classic border border-gray-100" variants={itemVariants}>
                    <p className="mb-6 text-gray-700 border-b pb-4">
                        Welcome to Rescue <Jobs></Jobs>. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully. If you do not agree to these terms, you should not use this website.
                    </p>
                    
                    <motion.h2 className="text-2xl font-bold text-primary-dark mb-3 mt-6 border-b border-accent-teal/50 pb-1" variants={itemVariants}>
                        1. Use of the Website
                    </motion.h2>
                    <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
                        The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                    </motion.p>
                    
                    <motion.h2 className="text-2xl font-bold text-primary-dark mb-3 mt-6 border-b border-accent-teal/50 pb-1" variants={itemVariants}>
                        2. User Accounts
                    </motion.h2>
                    <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
                        To access certain features of the website, you may be required to create an account. You agree to provide accurate and complete information and to keep your account information updated. You are responsible for maintaining the confidentiality of your account password and are responsible for all activities that occur under your account.
                    </motion.p>
                    
                    <motion.h2 className="text-2xl font-bold text-primary-dark mb-3 mt-6 border-b border-accent-teal/50 pb-1" variants={itemVariants}>
                        3. Intellectual Property
                    </motion.h2>
                    <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
                        This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                    </motion.p>
                    
                    <motion.h2 className="text-2xl font-bold text-primary-dark mb-3 mt-6 border-b border-accent-teal/50 pb-1" variants={itemVariants}>
                        4. Limitation of Liability
                    </motion.h2>
                    <motion.p className="text-gray-600 mb-4" variants={itemVariants}>
                        Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                    </motion.p>
                    
                    <motion.h2 className="text-2xl font-bold text-primary-dark mb-3 mt-6 border-b border-accent-teal/50 pb-1" variants={itemVariants}>
                        5. Governing Law
                    </motion.h2>
                    <motion.p className="text-gray-600" variants={itemVariants}>
                        Your use of this website and any dispute arising out of such use of the website is subject to the laws of **Tamil Nadu, India**.
                    </motion.p>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default TermsConditions;