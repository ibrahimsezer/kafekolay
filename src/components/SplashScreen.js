import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../logo600.png';

const SplashScreen = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [showDoors, setShowDoors] = useState(false);
  
  useEffect(() => {
    // First show the logo for 2 seconds
    const logoTimer = setTimeout(() => {
      setShowDoors(true);
    }, 1000);

    // Then animate the doors and call onComplete after animation
    const doorTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(doorTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}></div>
      
      {/* Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-center"
      >
        <img src={logo} alt="KafeKolay Logo" className="w-600 h-600" />
      </motion.div>

      {/* Left Door */}
      <motion.div
        className={`absolute inset-y-0 left-0 w-1/2 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}
        initial={{ x: 0 }}
        animate={{ x: showDoors ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 2 }}
      />

      {/* Right Door */}
      <motion.div
        className={`absolute inset-y-0 right-0 w-1/2 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}
        initial={{ x: 0 }}
        animate={{ x: showDoors ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
};

export default SplashScreen;