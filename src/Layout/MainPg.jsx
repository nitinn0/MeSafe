import React from "react";
import { FaArrowRight } from "react-icons/fa";
// import sampleImage from "../assets/sample-image.jpg"; // Replace with your image
// import codeSnippet from "../assets/code-snippet.png"; // Replace with a code UI image

const MainPg = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-6">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
        Detect AI-generated images at scale
      </h1>

      {/* Subtext */}
      <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
        Our AI image detector automatically detects images from popular AI generators.
        No watermarks needed.
      </p>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12">
        
        {/* Left Side - AI Image */}
        {/* <div className="shadow-xl rounded-xl overflow-hidden">
          <img src={sampleImage} alt="AI-generated" className="w-80 md:w-96 rounded-xl" />
        </div> */}

        {/* Arrow Icon */}
        <FaArrowRight className="text-4xl text-gray-700 hidden md:block" />

        {/* Right Side - Code Output */}
        {/* <div className="shadow-xl rounded-xl overflow-hidden bg-gray-900 p-4 w-80 md:w-96">
          <img src={codeSnippet} alt="AI detection result" className="w-full rounded-xl" />
        </div> */}

      </div>
    </div>
  );
};

export default MainPg;
