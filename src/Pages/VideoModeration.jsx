import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Layout/Loader"; // Assuming Loader is your component
import Alert from "../Layout/Alert"; // Assuming Alert is your component

const VideoModeration = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
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
      setAlertMessage("Please upload a video first.");
      setAlertType("warning");
      return;
    }

    const api_user = '1504143661'; // Your API user
    const api_secret = 'JtpeQRUS7TcBLkXqAfykUuvwzL4MXur3'; // Your API secret

    const formData = new FormData();
    formData.append('media', file); // Append the video file
    formData.append('models', 'nudity-2.1,violence,weapon,offensive,recreational_drug,alcohol,gambling,tobacco,gore-2.0');
    formData.append('api_user', api_user);
    formData.append('api_secret', api_secret);

    setLoading(true);
    setAlertMessage(null);

    try {
      const response = await axios.post('https://api.sightengine.com/1.0/video/check-sync.json', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Browser handles boundary
        },
      });

      console.log(response.data); // Log the response data for debugging

      // Check if the response is successful and contains expected data
      if (response.data && response.data.status === "success" && response.data.data.frames) {
        setModerationResult(response.data);
        setAlertMessage("Video moderation completed successfully.");
        setAlertType("success");
      } else {
        console.error("Unexpected response structure:", response.data); // Log unexpected structure
        setAlertMessage("Moderation failed or returned an unexpected response.");
        setAlertType("error");
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error.message
        : error.message;
      console.error("Error during video moderation:", errorMessage);
      setAlertMessage("Video moderation failed: " + errorMessage);
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const getModerationMessage = (result) => {
    if (result && result.data) {
      return (
        <div>
          <h4>Results:</h4>
          <ul>
            {result.data.frames.map((frame, index) => (
              <li key={index}>
                <h5>Frame {index + 1}:</h5>
                <p>Nudity: {frame.nudity ? (frame.nudity.probability * 100).toFixed(2) + "%" : "No nudity detected"}</p>
                <p>Weapons: {frame.weapons ? (frame.weapons.probability * 100).toFixed(2) + "%" : "No weapons detected"}</p>
                <p>Drugs: {frame.drugs ? (frame.drugs.probability * 100).toFixed(2) + "%" : "No drugs detected"}</p>
                <p>Hate Speech: {frame.hate ? (frame.hate.probability * 100).toFixed(2) + "%" : "No hate speech detected"}</p>
                <p>Offensive Content: {frame.offensive ? (frame.offensive.probability * 100).toFixed(2) + "%" : "No offensive content detected"}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return "Moderation failed or incomplete.";
  };

  return (
    <div className="container-video-moderation container flex">
      <section className="section-moderation flex">
        <h2 className="video-moderation-main-heading">Video Moderation</h2>
        
        {/* File input for video upload */}
        <div className="get-video-input flex">
          <label htmlFor="mediaInput" className="video-upload-icon grid cursor-pointer">
            <IoMdCloudUpload />
          </label>
          <input type="file" id="mediaInput" accept="video/*" onChange={handleFileChange} style={{ display: "none" }} />
        </div>

        {/* Buttons for navigation and moderation */}
        <div className="btn-Moderate-video flex">
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={handleCheckVideoModeration}>Moderate</button>
        </div>

        {/* Loader to indicate the video is being checked */}
        {loading && <Loader />}

        {/* Alert component to show success or error messages */}
        {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
        )}

        {/* Moderation result display */}
        {!loading && moderationResult && (
          <div className="moderation-result flex">
            <h3>Moderation Result:</h3>
            {getModerationMessage(moderationResult)}
          </div>
        )}
      </section>
    </div>
  );
};

export default VideoModeration;
