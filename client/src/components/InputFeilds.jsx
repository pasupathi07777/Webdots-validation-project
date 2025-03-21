import React from 'react';

const InputFeilds = ({ placeholder, type, lable, value, setOnChange, loading, name, accept, className }) => {


  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm font-medium text-gray-500" htmlFor={name}>
        {lable}
      </label>
      <input
        name={name}
        type={type || 'text'}
        value={type === 'file' ? undefined : value} 
        onChange={setOnChange}
        placeholder={placeholder}
        disabled={loading}
        className={`w-full border-0 border-b-2 border-gray-200 focus:outline-none ${className}`}
        accept={accept}
      />
      {type === 'file' && value && (
        <div className="mt-">
          <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default InputFeilds;