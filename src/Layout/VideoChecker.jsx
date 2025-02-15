import React from "react";
import { useNavigate } from "react-router-dom";
import ai2 from '../assets/ai2.png';
import ai3 from '../assets/ai3.png';
import ai4 from '../assets/ai4.png';
import ai6 from '../assets/ai6.png';

const VideoChecker = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 pt-24">
      <div className="container mx-auto px-8 py-20 text-center">
        <h1 className="text-8xl font-extrabold uppercase tracking-wide text-white drop-shadow-lg">
          VIDEO AI CHECKER
        </h1>
        <p className="text-2xl lg:max-w-4xl text-cyan-200 mt-10 mx-auto">
Detect deepfakes for video KYC, scams, and misinformation campaigns.
        </p>
        <div className="mt-12">
          <a
            className="text-green-400 text-2xl border-b-2 border-green-400 pb-2 hover:text-green-300 transition duration-300 cursor-pointer"
            onClick={() => navigate('/VideoModeration')}
          >
            — Start Checking
          </a>
        </div>
      </div>

      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-6 rounded-2xl shadow-2xl bg-opacity-20 backdrop-blur-lg border border-white/20">
            <img src={ai2} alt="AI Detected Image" className="rounded-lg w-full" />
            <div className="mt-8 text-white text-xl flex items-center justify-between">
              <span>❤️ 100K</span>
              <span>👀 10.7M</span>
              <span>⭐ 56</span>
              <span>💬 30.9K</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl shadow-2xl bg-opacity-20 backdrop-blur-lg border border-white/20">
            <h2 className="text-3xl font-semibold text-purple-300 mb-8">Shorts</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {[ai3, ai4, ai6].map((image, index) => (
                <div key={index} className="w-52">
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="rounded-lg w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChecker;


