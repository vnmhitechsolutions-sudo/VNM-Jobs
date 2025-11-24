// src/data/jobsData.js

export const jobsData = [
    //  IT/Software Sector (High Salary) 
    {
        id: 101,
        title: "Senior React JS Developer",
        company: "Innovatech Solutions",
        location: "chennai",
        sector: "it",
        experience: "3-5y",
        salary: "10-20LPA",
        salaryText: "₹12,00,000 - ₹18,00,000 P.A.",
        type: "regular",
        companyLogo: "/logos/innovatech.png",
        posted: "2 days ago"
    },
    {
        id: 102,
        title: "AI/ML Engineer (LLMs)",
        company: "DataSphere AI",
        location: "coimbatore",
        sector: "it",
        experience: "3-5y",
        salary: "20+LPA",
        salaryText: "₹20,00,000 - ₹35,00,000 P.A.",
        type: "contract",
        companyLogo: "/logos/datasphere.png",
        posted: "5 days ago"
    },
    {
        id: 103,
        title: "Cloud Infrastructure Analyst (AWS)",
        company: "SecureNet Systems",
        location: "chennai",
        sector: "it",
        experience: "1-3y",
        salary: "6-10LPA",
        salaryText: "₹7,00,000 - ₹9,50,000 P.A.",
        type: "regular",
        companyLogo: "/logos/securenet.png",
        posted: "1 day ago"
    },
    
    //  Manufacturing/Automobile Sector (Mid to High Volume) 
    {
        id: 201,
        title: "Production Supervisor",
        company: "AutoCorp Motors",
        location: "chennai", // Chennai/Sriperumbudur area is auto hub
        sector: "automotive",
        experience: "3-5y",
        salary: "3-6LPA",
        salaryText: "₹4,50,000 - ₹5,50,000 P.A.",
        type: "regular",
        companyLogo: "/logos/autocorp.png",
        posted: "4 days ago"
    },
    {
        id: 202,
        title: "Quality Control Technician (Fresher)",
        company: "Precision Tools",
        location: "coimbatore", // Coimbatore is a major industrial/manufacturing hub
        sector: "manufacturing",
        experience: "fresher",
        salary: "below-3LPA",
        salaryText: "₹1,80,000 - ₹2,50,000 P.A.",
        type: "regular",
        companyLogo: "/logos/precision.png",
        posted: "1 day ago"
    },
    {
        id: 203,
        title: "CNC Machine Operator",
        company: "Titan Components",
        location: "madurai",
        sector: "manufacturing",
        experience: "1-3y",
        salary: "3-6LPA",
        salaryText: "₹3,00,000 - ₹4,20,000 P.A.",
        type: "contract",
        companyLogo: "/logos/titan.png",
        posted: "7 days ago"
    },

    //  Banking/Finance/Service Sector (General) 
    {
        id: 301,
        title: "Relationship Manager (Bancassurance)",
        company: "LifeSecure Financial",
        location: "chennai",
        sector: "banking",
        experience: "1-3y",
        salary: "3-6LPA",
        salaryText: "₹3,50,000 - ₹6,00,000 P.A. + Incentives",
        type: "regular",
        companyLogo: "/logos/lifesecure.png",
        posted: "3 days ago"
    },
    {
        id: 302,
        title: "Front Desk Executive / Receptionist",
        company: "Apollo Healthcare TN",
        location: "madurai",
        sector: "healthcare",
        experience: "fresher",
        salary: "below-3LPA",
        salaryText: "₹1,50,000 - ₹2,00,000 P.A.",
        type: "regular",
        companyLogo: "/logos/apollo.png",
        posted: "6 days ago"
    },
    {
        id: 303,
        title: "Digital Marketing Specialist",
        company: "MarketGrowth Agency",
        location: "coimbatore",
        sector: "marketing",
        experience: "3-5y",
        salary: "6-10LPA",
        salaryText: "₹7,50,000 - ₹10,00,000 P.A.",
        type: "regular",
        companyLogo: "/logos/marketgrowth.png",
        posted: "1 day ago"
    },

    //  Entry Level/General Jobs 
    {
        id: 401,
        title: "Data Entry Operator",
        company: "Swift Data Services",
        location: "chennai",
        sector: "services",
        experience: "fresher",
        salary: "below-3LPA",
        salaryText: "₹1,20,000 - ₹1,80,000 P.A.",
        type: "regular",
        companyLogo: "/logos/swift.png",
        posted: "2 days ago"
    },
    {
        id: 402,
        title: "Telecaller (Tamil & English)",
        company: "Client Connect BPO",
        location: "coimbatore",
        sector: "services",
        experience: "fresher",
        salary: "below-3LPA",
        salaryText: "₹1,50,000 - ₹2,50,000 P.A.",
        type: "regular",
        companyLogo: "/logos/clientconnect.png",
        posted: "3 days ago"
    },
    {
        id: 403,
        title: "Store Keeper",
        company: "Retail Max Hyper",
        location: "madurai",
        sector: "retail",
        experience: "1-3y",
        salary: "3-6LPA",
        salaryText: "₹2,50,000 - ₹3,50,000 P.A.",
        type: "contract",
        companyLogo: "/logos/retailmax.png",
        posted: "5 days ago"
    },
    // 1. IT / Senior / Regular / High Salary / UG/PG
    {
        id: 101,
        title: "Senior Full Stack Developer",
        company: "Innovatech Solutions",
        location: "chennai",
        sector: "it_ites", // Matches IT-ITES
        experience: "5-10", // Matches 5-10 Years
        salary: "above_1lakh", // Matches Above ₹1 Lakh
        salary_range: "above_1lakh", 
        type: "regular", // Matches Regular
        qualification: "pg", // Matches PG
        gender: "male",
        differently_abled: "none",
        salaryText: "₹15,00,000 - ₹25,00,000 P.A.",
        posted: "2 days ago"
    },
    // 2. Healthcare / Trainee / Fresher / Low Salary / Cert. Medical
    {
        id: 102,
        title: "Patient Care Trainee",
        company: "Apollo Healthcare TN",
        location: "madurai",
        sector: "healthcare", // Matches Healthcare
        experience: "fresher", // Matches Fresher
        salary: "7500-10000", // Matches 7500-10000
        salary_range: "7500-10000",
        type: "trainee", // Matches Trainee
        qualification: "cert_med", // Matches CERT. IN MEDICAL
        gender: "female",
        differently_abled: "none",
        salaryText: "₹90,000 - ₹1,20,000 P.A.",
        posted: "1 day ago"
    },
    // 3. Automotive / Apprentice / Low Salary / ITI / Disabled
    {
        id: 103,
        title: "Mechanic Apprentice",
        company: "AutoCorp Motors",
        location: "coimbatore",
        sector: "automotive", // Matches Automotive
        experience: "0-1", // Matches 0-1 Year
        salary: "15000-25000", // Matches 15,000 - 25,000
        salary_range: "15000-25000",
        type: "apprentice", // Matches Apprentice
        qualification: "iti", // Matches ITI
        gender: "male",
        differently_abled: "locomotor_disability", // Matches Locomotor Disability
        salaryText: "₹1,80,000 - ₹3,00,000 P.A.",
        posted: "4 days ago"
    },
    // 4. BFSI / Regular / Mid Salary / Diploma / Deaf
    {
        id: 104,
        title: "Bank Sales Officer",
        company: "LifeSecure Financial",
        location: "trichy",
        sector: "bfsi", // Matches BFSI
        experience: "2-3", // Matches 2-3 Years
        salary: "25000-50000", // Matches 25,000 - 50,000
        salary_range: "25000-50000",
        type: "regular",
        qualification: "diploma", // Matches Diploma
        gender: "female",
        differently_abled: "deaf_hard_hearing", // Matches Deaf and hard of hearing
        salaryText: "₹3,50,000 - ₹6,00,000 P.A.",
        posted: "3 days ago"
    },
    // 5. Retail / Part-Time / HSC / Mid Salary
    {
        id: 105,
        title: "Store Assistant (Evening Shift)",
        company: "Retail Max Hyper",
        location: "karur",
        sector: "retail", // Matches Retail
        experience: "1-2", // Matches 1-2 Years
        salary: "25000-50000",
        salary_range: "25000-50000",
        type: "part_time", // Matches Part Time
        qualification: "hsc", // Matches HSC
        gender: "female",
        differently_abled: "none",
        salaryText: "₹3,00,000 - ₹4,00,000 P.A.",
        posted: "6 days ago"
    },
    // 6. Construction / Regular / 4-5 Years / Mid Salary / UG
    {
        id: 106,
        title: "Site Supervisor",
        company: "BuildWell Infra",
        location: "others",
        sector: "construction", // Matches Construction
        experience: "4-5", // Matches 4-5 Years
        salary: "50000-100000", // Matches 50,000 - 1 Lakh
        salary_range: "50000-100000",
        type: "regular",
        qualification: "ug", // Matches UG
        gender: "male",
        differently_abled: "none",
        salaryText: "₹7,00,000 - ₹10,00,000 P.A.",
        posted: "1 day ago"
    },
    // 7. IT-ITES / Mid-level / 3-4 Years / High Salary / UG/PG
    {
        id: 107,
        title: "Software Tester (QA)",
        company: "QuickTest Labs",
        location: "chennai",
        sector: "it_ites",
        experience: "3-4", // Matches 3-4 Years
        salary: "50000-100000",
        salary_range: "50000-100000",
        type: "regular",
        qualification: "pg",
        gender: "other",
        differently_abled: "none",
        salaryText: "₹8,00,000 - ₹12,00,000 P.A.",
        posted: "5 days ago"
    },
    // 8. Manufacturing / Trainee / Fresher / Low Salary / SSLC
    {
        id: 108,
        title: "Assembly Line Trainee",
        company: "Precision Tools",
        location: "coimbatore",
        sector: "manufacturing",
        experience: "fresher",
        salary: "15000-25000",
        salary_range: "15000-25000",
        type: "trainee",
        qualification: "sslc", // Matches SSLC
        gender: "male",
        differently_abled: "none",
        salaryText: "₹2,00,000 - ₹3,00,000 P.A.",
        posted: "7 days ago"
    },
    // 9. Logistics / Regular / 1-2 Years / Mid Salary / HSC
    {
        id: 109,
        title: "Logistics Coordinator",
        company: "Global Transport",
        location: "chennai",
        sector: "logistics", // Matches Logistics
        experience: "1-2",
        salary: "25000-50000",
        salary_range: "25000-50000",
        type: "regular",
        qualification: "hsc",
        gender: "male",
        differently_abled: "none",
        salaryText: "₹3,20,000 - ₹4,50,000 P.A.",
        posted: "2 days ago"
    },
    // 10. Education / Part-Time / 2-3 Years / Mid Salary / UG
    {
        id: 110,
        title: "Tutor (Part-Time)",
        company: "Education Hub",
        location: "madurai",
        sector: "education", // Matches Education
        experience: "2-3",
        salary: "25000-50000",
        salary_range: "25000-50000",
        type: "part_time",
        qualification: "ug",
        gender: "female",
        differently_abled: "none",
        salaryText: "₹3,60,000 - ₹4,80,000 P.A.",
        posted: "3 days ago"
    },
    // 11. Aerospace / Regular / 5-10 Years / High Salary / PG
    {
        id: 111,
        title: "Aerospace Design Engineer",
        company: "AeroDynamics Ltd",
        location: "chennai",
        sector: "aerospace", // Matches Aerospace & Aviation
        experience: "5-10",
        salary: "above_1lakh",
        salary_range: "above_1lakh",
        type: "regular",
        qualification: "pg",
        gender: "male",
        differently_abled: "none",
        salaryText: "₹18,00,000 - ₹30,00,000 P.A.",
        posted: "1 day ago"
    },
    // 12. Food Processing / Apprentice / Fresher / Low Salary / Below SSLC
    {
        id: 112,
        title: "Food Packer Apprentice",
        company: "Rural Foods",
        location: "others",
        sector: "food_processing", // Matches Food Processing
        experience: "fresher",
        salary: "7500-10000",
        salary_range: "7500-10000",
        type: "apprentice",
        qualification: "below_sslc", // Matches Below SSLC
        gender: "female",
        differently_abled: "none",
        salaryText: "₹90,000 - ₹1,00,000 P.A.",
        posted: "6 days ago"
    },
    // 13. Infrastructure / Regular / 3-4 Years / Mid Salary / Diploma
    {
        id: 113,
        title: "Equipment Maintenance Lead",
        company: "InfraTech TN",
        location: "trichy",
        sector: "infra_equip", // Matches Infrastructure Equipment
        experience: "3-4",
        salary: "50000-100000",
        salary_range: "50000-100000",
        type: "regular",
        qualification: "diploma",
        gender: "male",
        differently_abled: "none",
        salaryText: "₹6,00,000 - ₹8,00,000 P.A.",
        posted: "4 days ago"
    },
    // 14. Beauty & Wellness / Part Time / 0-1 Year / Low Salary / SSLC
    {
        id: 114,
        title: "Salon Assistant (Weekends)",
        company: "Glamour Services",
        location: "karur",
        sector: "beauty", // Matches Beauty & Wellness
        experience: "0-1",
        salary: "15000-25000",
        salary_range: "15000-25000",
        type: "part_time",
        qualification: "sslc",
        gender: "female",
        differently_abled: "none",
        salaryText: "₹1,50,000 - ₹2,50,000 P.A.",
        posted: "2 days ago"
    },
    // 15. IT-ITES / Junior / 1-2 Years / Mid Salary / UG / Deaf & Mute
    {
        id: 115,
        title: "BPO Process Associate",
        company: "CallConnect Global",
        location: "chennai",
        sector: "it_ites",
        experience: "1-2",
        salary: "25000-50000",
        salary_range: "25000-50000",
        type: "regular",
        qualification: "ug",
        gender: "female",
        differently_abled: "deaf_mute", // Matches Deaf and Mute
        salaryText: "₹3,00,000 - ₹4,50,000 P.A.",
        posted: "1 day ago"
    },
];

/*
    Legend for Filter Keys (used in JobsPage.jsx):
    - location: 'chennai', 'coimbatore', 'madurai'
    - sector: 'it', 'automotive', 'manufacturing', 'banking', 'healthcare', 'marketing', 'services', 'retail'
    - experience: 'fresher', '1-3y', '3-5y', '5+y'
    - salary: 'below-3LPA', '3-6LPA', '6-10LPA', '10-20LPA', '20+LPA'
    - type: 'regular', 'contract'
*/