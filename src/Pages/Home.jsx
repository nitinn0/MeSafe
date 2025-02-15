import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/MySafeLogo.png";
import FeaturesSection from "./FeaturesSection";
import VideoChecker from "../Layout/VideoChecker";
import ImageDetector from "../Layout/ImageDetector";

const Home = () => {
  return (
    <div className="bg-gray-100 font-poppins">
      <ImageDetector />
      <VideoChecker />
      <FeaturesSection />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <main className="bg-white p-16 lg:p-18 rounded-3xl shadow-2xl text-center max-w-6xl w-full mx-6">

          <div className="mb-6">
            <img src={logo} alt="MeSafe Logo" className="w-52 mx-auto" />
          </div>

          <h1 className="text-4xl mb-20 text-gray-600 font-bold">
            "Don't trust everything you see! MeSafe helps you identify AI-generated
            images and deepfakes. Verify the truth with our AI-powered app."
          </h1>

          <div className="mt-12 flex justify-center gap-10">
            <NavLink to="/DetectAi">
              <button className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 from-blue-300 to-blue-600 text-white px-20 py-7 rounded-xl text-2xl font-semibold shadow-lg transition duration-300 transform hover:scale-110 hover:from-blue-500 hover:to-blue-700 hover:shadow-xl">
                Detect AI
              </button>
            </NavLink>

            <NavLink to="/VideoModeration">
              <button className="bg-gradient-to-bl from-gray-200 to-indigo-600 text-gray-900 px-20 py-7 rounded-xl text-2xl font-semibold shadow-lg transition duration-300 transform hover:scale-110 hover:from-white hover:to-blue-300 hover:text-blue-900 hover:shadow-xl">
                Deepfake Detection
              </button>
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
