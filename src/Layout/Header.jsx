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
    <header className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 shadow-lg p-6 fixed top-0 left-0 w-full flex items-center text-center justify-between px-14">
      
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="MeSafe Logo" className="h-24 w-auto object-contain" />
      </div>

      <div className="hidden sm:block text-white hover:bg-indigo-600
 text-3xl font-semibold">
        Your Digital Safety, Our Priority
      </div>

      {/* <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-500 text-white hover:bg-indigo-600
 text-white text-2xl font-bold px-8 py-4 rounded-lg cursor-pointer shadow-xl hover:from-blue-400 hover:to-blue-600 transition duration-300 flex items-center gap-2"
        >
          Menu <FaChevronDown />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 transform scale-95 origin-top-right transition duration-200 ease-in-out hover:scale-100">
            <a
              className="w-full mb-2 p-4 text-xl text-gray-100 font-bold bg-indigo-500 hover:from-blue-400 hover:to-blue-600 hover:text-black transition duration-300"
              href="http://147.93.18.13:5000/"
            >
              Detect AI
            </a>
            <a
              className="w-full p-4 text-xl text-gray-100 font-bold bg-indigo-500 hover:from-blue-400 hover:to-blue-600 hover:text-black transition duration-300"
              href='http://147.93.18.13:5000/'
            >
              Deepfake Detection
            </a>
          </div> */}
        {/* )} */}
      {/* </div> */}
      
    </header>
  );
};
