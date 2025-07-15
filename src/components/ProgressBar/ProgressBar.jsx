import React from 'react';
import './ProgressBar.css'; 

/**
 * ProgressBar Component
 * Displays the progress of speech playback.
 *
 * @param {object} props - Component props.
 * @param {number} props.progress - Current progress as a percentage (0-100).
 * @param {string} [props.statusText] - Optional text to display above the bar (e.g., "Playing...", "Paused").
 */
const ProgressBar = ({ progress, statusText }) => {
  // Ensure progress is within 0-100 range
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="progress-bar-container">
      {statusText && <p className="progress-status-text">{statusText}</p>}
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{clampedProgress.toFixed(0)}%</div>
      {/* Future features: Current word highlighting, time remaining, sentence navigation */}
    </div>
  );
};

export default ProgressBar;