import React from 'react';
import { SyncLoader } from 'react-spinners';

const FirstPage = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-gray-100">

      <div className="flex justify-center items-center ">
        <h1 className="text-6xl font-bold font-logo">
          <span className="text-blue-600">F</span>
          <span className="text-blue-600">I</span>
          <span className="text-blue-600">R</span>
          <span className="text-orange-500">S</span> {/* Center letter in orange */}
          <span className="text-blue-600">T</span>
        </h1>
      </div>



        <SyncLoader color="#3B82F6" size={15} /> 

    </div>
  );
};

export default FirstPage;