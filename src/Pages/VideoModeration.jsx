import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import Loader from "../Layout/Loader";

const VideoModeration = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moderationResult, setModerationResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCheckVideoModeration = async () => {
    if (!file) {
      alert("Please upload a video first.");
      return;
    }

    const api_user = "1504143661";
    const api_secret = "JtpeQRUS7TcBLkXqAfykUuvwzL4MXur3";

    setLoading(true);

    const formData = new FormData();
    formData.append("media", file);
    formData.append(
      "models",
      "nudity-2.1,violence,weapon,offensive,recreational_drug,alcohol,gambling,tobacco,gore-2.0"
    );
    formData.append("api_user", api_user);
    formData.append("api_secret", api_secret);

    try {
      const response = await axios.post(
        "https://api.sightengine.com/1.0/video/check-sync.json",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.status === "success" && response.data.data.frames) {
        setModerationResult(response.data);
      } else {
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      alert("Video moderation failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 flex flex-col items-center justify-center min-h-screen p-10">
      
      <div className="bg-white shadow-2xl rounded-3xl p-24 w-full max-w-3xl text-center transform transition-all duration-300 hover:scale-105">
        
        <h2 className="text-5xl font-bold text-indigo-500 mb-12 tracking-wide drop-shadow-md">
          Video Moderation
        </h2>

        <div className="w-90 h-0.5 bg-blue-200 mx-auto mb-12 rounded-full"></div>

        <div className="flex flex-col items-center">
          <label htmlFor="videoInput" className="cursor-pointer text-blue-500 text-7xl mb-5 transition-transform duration-300 hover:scale-110">
            <IoMdCloudUpload />
          </label>
          <input type="file" id="videoInput" accept="video/*" onChange={handleFileChange} className="hidden" />
          {file && <p className="text-gray-800 font-medium text-lg">{file.name}</p>}
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent my-8"></div>

        <div className="flex justify-center mt-14 gap-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-16 mx-4 rounded-xl font-semibold text-xl transition-all duration-300 shadow-lg hover:bg-gray-600 hover:scale-105"
          >
            Go Back
          </button>
          
          <button
            onClick={handleCheckVideoModeration}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-gray-100 px-16 py-7 rounded-xl text-2xl font-semibold shadow-lg transition duration-300 transform hover:scale-110 hover:from-blue-500 hover:to-blue-700 hover:shadow-xl ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                Checking...
              </>
            ) : (
              "Detect Video"
            )}
          </button>
        </div>

        {loading && <Loader />}

        {!loading && moderationResult && (
          <div className={`mt-8 p-5 rounded-xl font-semibold text-xl transition-all duration-300 shadow-md hover:shadow-lg ${
            moderationResult.data.frames.length > 0 
              ? "bg-red-200 text-red-800 hover:bg-red-300" 
              : "bg-green-200 text-green-800 hover:bg-green-300"
          }`}>
            {moderationResult.data.frames.length > 0
              ? "This video contains restricted content."
              : "This video is safe."}
          </div>
        )}

      </div>
      
    </div>
  );
};

export default VideoModeration;
