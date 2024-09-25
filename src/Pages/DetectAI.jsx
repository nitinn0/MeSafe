import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader"; // Import your Loader component
import Alert from "../Layout/Alert"; // Import your custom Alert component

const DetectAI = () => {
  const [file, setFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // State to manage alerts
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the actual file
      setAlert(null); // Clear any previous alerts
    }
  };

  const handleDetectAi = () => {
    if (!file) {
      setAlert({ message: "Please upload an image or video first.", type: "warning" });
      return;
    }

    const api_user = '1808784719'; // Your API user
    const api_secret = 'RMFamwQpxE95dsPP2nRmxBu5vhggVWut'; // Your API secret

    setLoading(true);

    const formData = new FormData();
    formData.append('media', file);
    formData.append('models', 'genai');
    formData.append('api_user', api_user);
    formData.append('api_secret', api_secret);

    fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setDetectionResult(data);
        setLoading(false);

        const aiGenerated = data.type.ai_generated;
        setAlert({
          message: aiGenerated > 0.89 ? "This media is likely AI-generated." : "This media is not AI-generated.",
          type: aiGenerated > 0.89 ? "error" : "success"
        });
      })
      .catch(error => {
        setLoading(false);
        setAlert({ message: "An error occurred during detection.", type: "error" });
      });
  };

  return (
    <div className="container-ai-detect container flex">
      <section className="section-detect--ai flex">
        <h2 className="ai-detection-main-heading">AI Detection</h2>
        <div className="get-video-input flex">
          <label
            htmlFor="mediaInput"
            className="image-upload-icon grid cursor-pointer"
          >
            <IoMdCloudUpload />
          </label>
          <input
            type="file"
            id="mediaInput"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="btn-Detect-ai flex">
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={handleDetectAi}>Detect</button>
        </div>

        {/* Show alert if there's a message */}
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

        {/* Show the loader while the data is being fetched */}
        {loading && <Loader />}

        {!loading && detectionResult && detectionResult.type && (
          <div className="detection-result flex">
            <h3>Detection Result:</h3>
            <p style={{ color: detectionResult.type.ai_generated > 0.89 ? "red" : "green" }}>
              {detectionResult.type.ai_generated > 0.89 
                ? "This media is likely AI-generated." 
                : "This media is not AI-generated."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DetectAI;
