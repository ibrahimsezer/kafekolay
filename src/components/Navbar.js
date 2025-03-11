import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../logo16_9.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow-sm transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
          <img src={logo} alt="KafeKolay Logo" className="w-32 h-18" />
        </NavLink>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? '🌞' : '🌙'}
          </button>
          {!auth.currentUser ? (
            // Show these links only when user is not authenticated
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            // Show these links only when user is authenticated
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                }
              >
                Anasayfa
              </NavLink>
              <NavLink
                to="/tables"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                }
              >
                Masalar
              </NavLink>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                }
              >
                Analiz
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;