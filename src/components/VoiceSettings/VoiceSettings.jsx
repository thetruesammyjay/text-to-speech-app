import React from 'react';
import './VoiceSettings.css';

/**
 * VoiceSettings Component
 * Allows users to select from available voices and potentially set language/gender preferences.
 *
 * @param {object} props - Component props.
 * @param {Array<SpeechSynthesisVoice>} props.voices - Array of available voices.
 * @param {SpeechSynthesisVoice | null} props.selectedVoice - The currently selected voice.
 * @param {function} props.onVoiceChange - Callback when voice selection changes.
 * @param {function} props.onVoicePreview - Callback to play a preview of the selected voice.
 */
const VoiceSettings = ({ voices, selectedVoice, onVoiceChange, onVoicePreview }) => {
  return (
    <div className="voice-settings-container">
      <div className="setting-item">
        <label htmlFor="voice-select">Voice Selection:</label>
        <select
          id="voice-select"
          className="voice-select"
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={(e) => {
            const voiceName = e.target.value;
            const voice = voices.find(v => v.name === voiceName);
            onVoiceChange(voice || null);
          }}
        >
          <option value="">Select a voice</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang}) {voice.default ? '(Default)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="voice-actions">
        <button
          className="preview-button"
          onClick={onVoicePreview}
          disabled={!selectedVoice}
        >
          Preview Voice
        </button>
      </div>
      {/* Future features: Language detection, Gender preference */}
    </div>
  );
};

export default VoiceSettings;