import { chunkText } from '../utils/textUtils';
import { PREVIEW_VOICE_TEXT } from '../utils/constants';

// Get the SpeechSynthesis interface
const synth = window.speechSynthesis;

// Array to hold text chunks for sequential speaking
let utteranceQueue = [];
// Current utterance being spoken
let currentUtterance = null;
// Callback for when speech starts
let onSpeechStartCallback = null;
// Callback for when speech ends
let onSpeechEndCallback = null;
// Callback for when speech is paused
let onSpeechPauseCallback = null;
// Callback for when speech resumes
let onSpeechResumeCallback = null;
// Callback for character boundary updates (for progress tracking)
let onBoundaryCallback = null;
// Callback for errors
let onErrorCallback = null;

/**
 * Processes the next utterance in the queue.
 * This function is called internally to manage sequential playback of chunks.
 */
const processNextUtterance = () => {
  if (utteranceQueue.length > 0 && !synth.speaking) {
    currentUtterance = utteranceQueue.shift();
    synth.speak(currentUtterance);
  } else if (utteranceQueue.length === 0 && !synth.speaking && onSpeechEndCallback) {
    // If queue is empty and nothing is speaking, call end callback
    onSpeechEndCallback();
  }
};

/**
 * Creates a SpeechSynthesisUtterance with common properties and event handlers.
 * @param {string} text - The text for the utterance.
 * @param {object} options - Options for the utterance.
 * @param {SpeechSynthesisVoice} options.voice - The voice to use.
 * @param {number} options.rate - The speech rate.
 * @param {number} options.pitch - The speech pitch.
 * @param {number} options.volume - The speech volume.
 * @returns {SpeechSynthesisUtterance} The configured utterance.
 */
const createUtterance = (text, { voice, rate, pitch, volume }) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  utterance.onstart = () => {
    if (onSpeechStartCallback) onSpeechStartCallback();
  };

  utterance.onend = () => {
    // When an utterance ends, process the next one in the queue
    processNextUtterance();
  };

  utterance.onerror = (event) => {
    console.error('SpeechSynthesisUtterance error:', event);
    if (onErrorCallback) onErrorCallback(event.error);
    // If an error occurs, clear the queue and stop
    synth.cancel();
    utteranceQueue = [];
    currentUtterance = null;
    if (onSpeechEndCallback) onSpeechEndCallback(); // Signal end even on error
  };

  utterance.onpause = () => {
    if (onSpeechPauseCallback) onSpeechPauseCallback();
  };

  utterance.onresume = () => {
    if (onSpeechResumeCallback) onSpeechResumeCallback();
  };

  utterance.onboundary = (event) => {
    if (onBoundaryCallback) onBoundaryCallback(event);
  };

  return utterance;
};

const speechService = {
  /**
   * Speaks the given text with specified options.
   * Automatically chunks long text into smaller utterances.
   * @param {string} text - The text to speak.
   * @param {object} options - Speech options.
   * @param {SpeechSynthesisVoice} options.voice - The voice to use.
   * @param {number} options.rate - The speech rate.
   * @param {number} options.pitch - The speech pitch.
   * @param {number} options.volume - The speech volume.
   */
  speak: (text, options) => {
    if (!synth) {
      console.error("SpeechSynthesis API not supported.");
      if (onErrorCallback) onErrorCallback("SpeechSynthesis API not supported.");
      return;
    }

    // Cancel any ongoing speech and clear the queue before starting new speech
    synth.cancel();
    utteranceQueue = [];
    currentUtterance = null;

    // Chunk the text to handle browser limits and improve control
    const textChunks = chunkText(text, 200); // Using a default chunk size

    textChunks.forEach(chunk => {
      utteranceQueue.push(createUtterance(chunk, options));
    });

    // Start processing the queue
    processNextUtterance();
  },

  /**
   * Pauses the current speech.
   */
  pause: () => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
    }
  },

  /**
   * Resumes the paused speech.
   */
  resume: () => {
    if (synth.paused) {
      synth.resume();
    }
  },

  /**
   * Stops the current speech and clears the queue.
   */
  stop: () => {
    if (synth.speaking || synth.paused) {
      synth.cancel();
      utteranceQueue = [];
      currentUtterance = null;
      if (onSpeechEndCallback) onSpeechEndCallback(); // Ensure end callback is triggered
    }
  },

  /**
   * Gets the list of available speech synthesis voices.
   * @returns {Array<SpeechSynthesisVoice>} An array of voices.
   */
  getVoices: () => {
    return synth.getVoices();
  },

  /**
   * Plays a short preview of a specific voice.
   * @param {object} options - Options for the preview.
   * @param {SpeechSynthesisVoice} options.voice - The voice to preview.
   * @param {number} options.rate - The speech rate for the preview.
   * @param {number} options.pitch - The speech pitch for the preview.
   * @param {number} options.volume - The speech volume for the preview.
   */
  previewVoice: (options) => {
    if (!synth) {
      console.warn("SpeechSynthesis API not supported for preview.");
      return;
    }
    synth.cancel(); // Stop any ongoing speech before preview
    const previewUtterance = createUtterance(PREVIEW_VOICE_TEXT, options);
    synth.speak(previewUtterance);
  },

  /**
   * Sets callback functions for speech events.
   * @param {object} callbacks - An object containing callback functions.
   * @param {function} [callbacks.onStart] - Callback for speech start.
   * @param {function} [callbacks.onEnd] - Callback for speech end.
   * @param {function} [callbacks.onPause] - Callback for speech pause.
   * @param {function} [callbacks.onResume] - Callback for speech resume.
   * @param {function} [callbacks.onBoundary] - Callback for word/sentence boundaries.
   * @param {function} [callbacks.onError] - Callback for errors.
   */
  setCallbacks: ({ onStart, onEnd, onPause, onResume, onBoundary, onError }) => {
    onSpeechStartCallback = onStart;
    onSpeechEndCallback = onEnd;
    onSpeechPauseCallback = onPause;
    onSpeechResumeCallback = onResume;
    onBoundaryCallback = onBoundary;
    onErrorCallback = onError;
  },

  /**
   * Returns the currently active utterance if any.
   * This can be used by the hook to determine the total length for progress.
   * @returns {SpeechSynthesisUtterance | null}
   */
  getCurrentUtterance: () => currentUtterance,

  /**
   * Returns the current state of the speech synthesizer.
   * @returns {object} An object with speaking, pending, and paused status.
   */
  getStatus: () => ({
    speaking: synth.speaking,
    pending: synth.pending,
    paused: synth.paused,
  }),
};

export default speechService;