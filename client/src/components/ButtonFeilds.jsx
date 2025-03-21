import React from 'react';
import {SyncLoader} from 'react-spinners'

const ButtonFeilds = ({ label, onClick, type = "submit", className = "",loading,disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-ful flex justify-center items-center   border border-transparent rounded-m text-sm font-medium text-white bg-blue-600   ${className}`}
      disabled={loading || disabled}
      
    >
      { loading? <SyncLoader size={3} color="#fff" /> :label} 
    </button>
  );
};

export default ButtonFeilds;

