// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current location object from React Router
  const { pathname } = useLocation();

  // This effect runs every time the 'pathname' (URL route) changes
  useEffect(() => {
    // Scroll to the top of the page (0, 0) smoothly
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' 
    });
  }, [pathname]);

  // This component doesn't render any visible UI, it only manages a side effect
  return null;
};

export default ScrollToTop;