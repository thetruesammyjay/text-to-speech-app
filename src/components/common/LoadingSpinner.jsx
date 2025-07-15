import React from 'react';
import './LoadingSpinner.css'; // Import the CSS for styling

/**
 * LoadingSpinner Component
 * A simple visual indicator for loading states.
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
