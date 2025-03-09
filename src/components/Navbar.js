import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-100 p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          CafeSaaS
        </NavLink>
        
        <div className="space-x-4">
          {!auth.currentUser ? (
            // Show these links only when user is not authenticated
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => 
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
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
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/tables" 
                className={({ isActive }) => 
                  isActive ? "text-orange-500 font-medium" : "text-gray-600 hover:text-orange-500"
                }
              >
                Tables
              </NavLink>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-orange-500"
              >
                Quit
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;