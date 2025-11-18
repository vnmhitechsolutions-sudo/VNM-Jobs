// src/components/candidate/JobFairCalendar.jsx
import React, { useState, useMemo } from 'react';
import CandidateDashboardLayout from './CandidateDashboardLayout';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

//  MOCK DATA BASED ON SCREENSHOT 
const MOCK_FAIRS = [
    { date: '2025-11-07', id: 1, isBookmarked: true, title: 'Micro Job Fair - Theni', time: '10:00 AM', location: 'Theni Govt Auditorium' },
    { date: '2025-11-08', id: 2, isBookmarked: false, title: 'District Job Fair - Madurai', time: '9:30 AM', location: 'Madurai Collectorate' },
    { date: '2025-11-14', id: 3, isBookmarked: true, title: 'Mega Job Mela - Chennai', time: '9:00 AM', location: 'Chennai Trade Centre' },
    { date: '2025-11-15', id: 4, isBookmarked: false, title: 'Skill Development Fair', time: '11:00 AM', location: 'Coimbatore Expo' },
    { date: '2025-11-21', id: 5, isBookmarked: true, title: 'IT Sector Recruitment', time: '10:30 AM', location: 'Tidel Park, Chennai' },
    { date: '2025-11-22', id: 6, isBookmarked: false, title: 'Tiruchy Job Connect', time: '9:00 AM', location: 'Tiruchy Convention Hall' },
    { date: '2025-11-28', id: 7, isBookmarked: true, title: 'State Level Fair - Karur', time: '9:30 AM', location: 'Karur Engineering College' },
    { date: '2025-11-29', id: 8, isBookmarked: false, title: 'Job Search Workshop', time: '2:00 PM', location: 'Virtual Event' },
];

// Helper to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

const JobFairCalendar = () => {
    // We are hardcoding to November 2025 based on the screenshot
    const year = 2025;
    const month = 10; // November is month 10 (0-indexed)
    
    // Set the initial selected date to Nov 13, 2025, matching the screenshot
    const initialDate = new Date(year, month, 13);
    const [selectedDate, setSelectedDate] = useState(initialDate);

    // Get the first day of the month (e.g., Nov 1st, 2025)
    const firstDayOfMonth = new Date(year, month, 1);
    // Get the weekday of the first day (0=Sun, 1=Mon... Sat=6). Sunday is the start of the week in US/Canada, but usually Monday in India. Let's use Monday=1.
    const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Adjusting for Monday start (0=Mon)
    // Total days in November is 30
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Memoize the calendar grid calculation
    const calendarDays = useMemo(() => {
        const days = [];
        // Add padding for previous month's days to align to Monday (startDayIndex)
        for (let i = 0; i < startDayIndex; i++) {
            days.push({ day: null, date: null });
        }
        // Add actual days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dateObj = new Date(year, month, day);
            const dateKey = formatDate(dateObj);
            const fair = MOCK_FAIRS.find(f => f.date === dateKey);
            
            days.push({
                day,
                date: dateKey,
                isToday: dateKey === formatDate(new Date()), // Check against current real date
                isFair: !!fair,
                isBookmarked: fair ? fair.isBookmarked : false
            });
        }
        return days;
    }, [year, month, totalDays, startDayIndex]);


    const eventsForSelectedDay = useMemo(() => {
        const selectedDateKey = formatDate(selectedDate);
        return MOCK_FAIRS.filter(fair => fair.date === selectedDateKey);
    }, [selectedDate]);

    const handleDateSelect = (dayInfo) => {
        if (dayInfo.date) {
            setSelectedDate(new Date(dayInfo.date));
        }
    };

    const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    return (
        <CandidateDashboardLayout title="Job Fair Calendar">
            <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <FiCalendar className="mr-3 text-accent-teal" /> Job Fair Calendar
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/*  CALENDAR VIEW (Left Side)  */}
                <div className="p-4 border border-gray-200 rounded-xl shadow-md">
                    
                    {/* Calendar Header (Month Selector) */}
                    <div className="flex justify-between items-center text-primary-dark font-bold mb-4">
                        <button className="text-2xl hover:text-accent-teal transition">{'<'}</button>
                        <span className="text-2xl">{monthName}</span>
                        <button className="text-2xl hover:text-accent-teal transition">{'>'}</button>
                    </div>
                    
                    {/* Year/Day Header */}
                    <div className="flex justify-between items-center text-gray-500 font-bold mb-4 border-b pb-2">
                        <span className="text-lg">{year}</span>
                    </div>

                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
                        {dayNames.map(day => <span key={day}>{day}</span>)}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((dayInfo, index) => (
                            <motion.div
                                key={index}
                                onClick={() => handleDateSelect(dayInfo)}
                                className={`
                                    relative flex flex-col items-center justify-center p-2 h-16 rounded-lg cursor-pointer transition 
                                    ${dayInfo.day 
                                        ? 'text-primary-dark hover:bg-gray-100'
                                        : 'text-gray-400 pointer-events-none'
                                    }
                                    ${dayInfo.date === formatDate(selectedDate) ? 'bg-accent-teal text-primary-dark font-bold shadow-inner' : 'bg-white'}
                                    ${dayInfo.isFair ? 'border border-blue-200' : 'border border-transparent'}
                                `}
                                whileHover={{ scale: dayInfo.day ? 1.05 : 1 }}
                                whileTap={{ scale: dayInfo.day ? 0.95 : 1 }}
                            >
                                {/* Day Number */}
                                {dayInfo.day && (
                                    <>
                                        <span className="text-lg font-bold">{dayInfo.day}</span>
                                        {/* Mela Marker (M) */}
                                        {dayInfo.isFair && (
                                            <span className="text-xs font-semibold text-red-500">M</span>
                                        )}
                                        {/* Bookmarked/Remembered Marker (Red Dot) */}
                                        {dayInfo.isBookmarked && (
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/*  EVENT LIST (Right Side)  */}
                <div className="p-4 border border-gray-200 rounded-xl shadow-md">
                    <div className="flex justify-between items-center text-primary-dark font-bold mb-4 border-b pb-2">
                        <span className="text-lg">
                            {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
                        </span>
                    </div>

                    {eventsForSelectedDay.length > 0 ? (
                        <div className="space-y-4">
                            {eventsForSelectedDay.map(event => (
                                <motion.div 
                                    key={event.id}
                                    className="p-4 border-l-4 border-accent-teal bg-teal-50 rounded-lg shadow-sm"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h4 className="text-md font-bold text-primary-dark mb-1">{event.title}</h4>
                                    <p className="text-sm text-gray-600 flex items-center"><FiClock className="mr-2" /> {event.time}</p>
                                    <p className="text-sm text-gray-600 flex items-center"><FiMapPin className="mr-2" /> {event.location}</p>
                                    {event.isBookmarked && <span className="text-xs text-red-500 font-medium mt-1 block">★ Bookmarked</span>}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg font-medium">No events on this day</p>
                            <p className="text-sm">Check other dates with an 'M' marker.</p>
                        </div>
                    )}
                </div>
            </div>
        </CandidateDashboardLayout>
    );
};

export default JobFairCalendar;