import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';

const ImageDetector = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 mt-24 md:mt-32 pt-24">
      
      <div className="container mx-auto px-8 py-20 text-center">
        <h1 className="text-8xl font-extrabold uppercase text-gray-700">
          IMAGE AI DETECTOR
        </h1>
        <p className="text-2xl lg:max-w-4xl text-gray-600 mt-6 mx-auto">
          Detect AI-generated images, deepfake photos, and manipulated content.
        </p>
        <div className="mt-10">
          <button 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate("/DetectAi")}
          >
            Detect AI
          </button>
        </div>
      </div>

      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12">

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <img src={img4} alt="AI Generated Image" className="rounded-lg w-full object-cover" />
            <div className="mt-4 text-gray-700 text-lg flex items-center justify-between">
              <span>🖼️ 1K Images Scanned</span>
              <span>⚠️ 12 Fakes Found</span>
              <span>🔍 Accuracy 94%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Scans</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {[img2, img3, img1].map((image, index) => (
                <div key={index} className="w-32 rounded-lg overflow-hidden">
                  <img src={image} alt={`Scan ${index + 1}`} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="flex flex-wrap gap-5 justify-center">
          {["All", "AI-Generated", "Photoshopped", "Deepfake", "Verified Real"].map((category, index) => (
            <button
              key={index}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl text-lg hover:bg-gray-300 transition duration-300 hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDetector;
