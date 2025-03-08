import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          CafeSaaS
        </NavLink>
        
        <div className="space-x-4">
          <NavLink 
            to="/" 
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;