import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loader from "../Layout/Loader";

const DetectAI = () => {
  const [file, setFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      extractMetadata(selectedFile);
    }
  };


  const extractMetadata = (file) => {
    const metadataInfo = {
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB", // Convert to KB
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
    };

    if (file.type.startsWith("image")) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        metadataInfo.width = img.width + " px";
        metadataInfo.height = img.height + " px";
        setMetadata(metadataInfo);
      };
    } else {
      setMetadata(metadataInfo);
    }
  };

  const handleDetectAi = () => {
    if (!file) {
      alert("Please upload an image or video first.");
      return;
    }

    const api_user = "1808784719";
    const api_secret = "RMFamwQpxE95dsPP2nRmxBu5vhggVWut";

    setLoading(true);

    const formData = new FormData();
    formData.append("media", file);
    formData.append("models", "genai");
    formData.append("api_user", api_user);
    formData.append("api_secret", api_secret);

    fetch("https://api.sightengine.com/1.0/check.json", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setDetectionResult(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("An error occurred during detection.");
      });
  };

  return (
    <div className="bg-gradient-to-r mt-12 from-blue-700 via-purple-600 to-pink-500 flex flex-col items-center justify-center min-h-screen p-10">
      
      <div className="bg-white shadow-2xl rounded-3xl p-24 w-full max-w-3xl text-center transform transition-all duration-300 hover:scale-105">
        
        <h2 className="text-5xl font-bold text-indigo-500 mb-12 tracking-wide drop-shadow-md">
          AI Detection
        </h2>

        <div className="w-90 h-0.5 bg-blue-200 mx-auto mb-12 rounded-full"></div>

        <div className="flex flex-col items-center">
          <label htmlFor="mediaInput" className="cursor-pointer text-blue-500 text-7xl mb-5 transition-transform duration-300 hover:scale-110">
            <IoMdCloudUpload />
          </label>
          <input
            type="file"
            id="mediaInput"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && <p className="text-gray-800 font-medium text-lg">{file.name}</p>}
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent my-8"></div>
        
        <div className="flex justify-center mt-14 gap-6">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-20 mx-4 rounded-xl font-semibold text-xl transition-all duration-300 shadow-lg hover:bg-gray-600 hover:scale-105"
          >
            Go Back
          </button>
          
          <button
            onClick={handleDetectAi}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-gray-100 px-20 py-7 rounded-xl text-2xl font-semibold shadow-lg transition duration-300 transform hover:scale-110 hover:from-blue-500 hover:to-blue-700 hover:shadow-xl ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                Detecting...
              </>
            ) : (
              "Detect AI"
            )}
          </button>
        </div>

        {loading && <Loader />}

        {!loading && detectionResult && detectionResult.type && (
          <div className={`mt-8 p-5 rounded-xl font-semibold text-xl transition-all duration-300 shadow-md hover:shadow-lg ${
            detectionResult.type.ai_generated > 0.89 
              ? "bg-red-200 text-red-800 hover:bg-red-300" 
              : "bg-green-200 text-green-800 hover:bg-green-300"
          }`}>
            {detectionResult.type.ai_generated > 0.89 
              ? "This media is likely AI-generated." 
              : "This media is not AI-generated."}
          </div>
        )}

        {metadata && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md text-left text-xl">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Image Metadata</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">File Name:</td>
                  <td className="p-2 text-black">{metadata.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">File Size:</td>
                  <td className="p-2 text-black">{metadata.size}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">File Type:</td>
                  <td className="p-2 text-black">{metadata.type}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold text-gray-600">Last Modified:</td>
                  <td className="p-2 text-black">{metadata.lastModified}</td>
                </tr>
                {metadata.width && metadata.height && (
                  <>
                    <tr className="border-b">
                      <td className="p-2 font-semibold text-gray-600">Width:</td>
                      <td className="p-2 text-black">{metadata.width}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-gray-600">Height:</td>
                      <td className="p-2 text-black">{metadata.height}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectAI;
