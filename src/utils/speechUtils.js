/**
 * src/utils/speechUtils.js
 *
 * Utility functions related to Web Speech API operations,
 * complementing the useSpeechSynthesis hook.
 */

import { PREVIEW_VOICE_TEXT } from './constants';

/**
 * Plays a short preview of a given voice.
 * @param {SpeechSynthesisVoice} voice - The voice object to preview.
 * @param {number} rate - The speech rate for the preview.
 * @param {number} pitch - The speech pitch for the preview.
 * @param {number} volume - The speech volume for the preview.
 */
export const previewVoice = (voice, rate, pitch, volume) => {
  if (!window.speechSynthesis) {
    console.warn("SpeechSynthesis API not supported.");
    return;
  }

  // Stop any ongoing speech before playing preview
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(PREVIEW_VOICE_TEXT);
  utterance.voice = voice;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  utterance.onerror = (event) => {
    console.error('Voice preview error:', event.error);
  };

  window.speechSynthesis.speak(utterance);
};

/**
 * Checks if the Web Speech API is supported by the current browser.
 * @returns {boolean} True if supported, false otherwise.
 */
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

/**
 * Gets a voice by its name from a list of voices.
 * @param {Array<SpeechSynthesisVoice>} voices - Array of available voices.
 * @param {string} name - The name of the voice to find.
 * @returns {SpeechSynthesisVoice | undefined} The found voice or undefined.
 */
export const getVoiceByName = (voices, name) => {
  return voices.find(voice => voice.name === name);
};