import React from 'react';
import './SpeechControls.css'; // Import the CSS for styling

/**
 * SpeechControls Component
 * Provides play, pause, stop, speed, pitch, and volume controls for speech.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isPlaying - Indicates if speech is currently playing.
 * @param {boolean} props.isPaused - Indicates if speech is currently paused.
 * @param {function} props.onPlay - Callback to start/resume speech.
 * @param {function} props.onPause - Callback to pause speech.
 * @param {function} props.onStop - Callback to stop speech.
 * @param {number} props.speed - Current speech rate.
 * @param {function} props.onSpeedChange - Callback for speed change.
 * @param {number} props.pitch - Current speech pitch.
 * @param {function} props.onPitchChange - Callback for pitch change.
 * @param {number} props.volume - Current speech volume.
 * @param {function} props.onVolumeChange - Callback for volume change.
 */
const SpeechControls = ({
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  speed,
  onSpeedChange,
  pitch,
  onPitchChange,
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="speech-controls-container">
      <div className="playback-buttons">
        <button
          className="control-button play-button"
          onClick={onPlay}
          disabled={isPlaying && !isPaused}
        >
          {isPlaying && !isPaused ? 'Playing...' : isPaused ? 'Resume' : 'Play'}
        </button>
        <button
          className="control-button pause-button"
          onClick={onPause}
          disabled={!isPlaying || isPaused}
        >
          Pause
        </button>
        <button
          className="control-button stop-button"
          onClick={onStop}
          disabled={!isPlaying}
        >
          Stop
        </button>
      </div>

      <div className="speech-settings">
        <div className="setting-item">
          <label htmlFor="speed-slider">Speed: {speed.toFixed(1)}x</label>
          <input
            type="range"
            id="speed-slider"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="slider"
          />
        </div>

        <div className="setting-item">
          <label htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</label>
          <input
            type="range"
            id="pitch-slider"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => onPitchChange(parseFloat(e.target.value))}
            className="slider"
          />
        </div>

        <div className="setting-item">
          <label htmlFor="volume-slider">Volume: {(volume * 100).toFixed(0)}%</label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="slider"
          />
        </div>
      </div>
      {/* Future features: Skip forward/backward */}
    </div>
  );
};

export default SpeechControls;