import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/MySafeLogo.png";

export const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectClick = (route) => {
    if (route) {
      navigate(`/${route}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 shadow-lg p-6 fixed top-0 left-0 w-full flex items-center justify-between px-14">
      
      {/* Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="MeSafe Logo" className="h-24 w-auto object-contain" />
      </div>

      {/* Tagline */}
      <div className="hidden sm:block text-white text-3xl font-semibold">
        Your Digital Safety, Our Priority
      </div>

      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 
                     text-white text-2xl font-bold px-8 py-4 
                     rounded-lg cursor-pointer shadow-xl 
                     flex items-center gap-2 
                     transition-all duration-300 ease-in-out 
                     transform hover:scale-105 hover:shadow-2xl 
                     hover:from-indigo-600 hover:via-blue-600 hover:to-purple-700"
        >
          Menu <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>


        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg transform scale-95 origin-top-right transition-all duration-200 ease-in-out hover:scale-100 overflow-hidden text-center">
            <a
              className="block w-full mb-2 p-4 text-xl text-white font-bold 
                         bg-indigo-500 hover:bg-indigo-500 hover:text-white 
                         transition-all duration-300 cursor-pointer"
              href="http://147.93.18.13:5000/"
            >
              Detect AI
            </a>
            <a
              className="block w-full p-4 text-xl text-white font-bold 
                         bg-indigo-500 hover:bg-indigo-500 hover:text-white 
                         transition-all duration-300 cursor-pointer"
              href="http://147.93.18.13:5000/"
            >
              Deepfake Detection
            </a>
          </div>
        )}
      </div>
      
    </header>
  );
};
