import React from 'react';

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;