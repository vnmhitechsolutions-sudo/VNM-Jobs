// src/data/jobsData.js

export const jobsData = [
    // --- IT/Software Sector (High Salary) ---
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
    
    // --- Manufacturing/Automobile Sector (Mid to High Volume) ---
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

    // --- Banking/Finance/Service Sector (General) ---
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

    // --- Entry Level/General Jobs ---
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
];

/*
    Legend for Filter Keys (used in JobsPage.jsx):
    - location: 'chennai', 'coimbatore', 'madurai'
    - sector: 'it', 'automotive', 'manufacturing', 'banking', 'healthcare', 'marketing', 'services', 'retail'
    - experience: 'fresher', '1-3y', '3-5y', '5+y'
    - salary: 'below-3LPA', '3-6LPA', '6-10LPA', '10-20LPA', '20+LPA'
    - type: 'regular', 'contract'
*/