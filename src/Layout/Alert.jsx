import React from "react";
import PropTypes from "prop-types";

const Alert = ({ message, type, onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-400";
      case "error":
        return "bg-red-100 text-red-700 border-red-400";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      default:
        return "bg-blue-100 text-blue-700 border-blue-400";
    }
  };

  return (
    <div className="container alert-container grid flex">
      <div className={`border-l-4 p-4 ${getAlertStyles()} mb-4`} role="alert">
        <p>{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-lg font-semibold ml-4">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  onClose: PropTypes.func, // Optional function to handle alert close
};

export default Alert;
