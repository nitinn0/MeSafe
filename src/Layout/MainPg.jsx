import React from "react";
import { FaArrowRight } from "react-icons/fa";

const MainPg = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6">
      
  
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
        Detect AI-generated images at scale
      </h1>

      <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
        Our AI image detector automatically detects images from popular AI generators.
        No watermarks needed.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12">
        


        <FaArrowRight className="text-4xl text-gray-700 hidden md:block" />


      </div>
    </div>
  );
};

export default MainPg;
