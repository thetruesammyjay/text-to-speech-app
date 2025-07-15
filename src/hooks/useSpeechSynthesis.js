import { useState, useEffect, useCallback } from 'react';

/**
 * useSpeechSynthesis Hook
 * Manages speech synthesis using the Web Speech API.
 * Provides functions to speak, pause, resume, stop, and manage speech settings.
 *
 * @returns {object} An object containing:
 * - {Array<SpeechSynthesisVoice>} voices: List of available speech synthesis voices.
 * - {SpeechSynthesisVoice | null} selectedVoice: The currently selected voice.
 * - {function} setSelectedVoice: Setter for the selected voice.
 * - {number} pitch: Current speech pitch (0-2).
 * - {function} setPitch: Setter for pitch.
 * - {number} rate: Current speech rate (0.1-10).
 * - {function} setRate: Setter for rate.
 * - {number} volume: Current speech volume (0-1).
 * - {function} setVolume: Setter for volume.
 * - {boolean} isPlaying: True if speech is currently playing.
 * - {boolean} isPaused: True if speech is currently paused.
 * - {function} speak: Function to start speech.
 * - {function} pause: Function to pause speech.
 * - {function} resume: Function to resume speech.
 * - {function} stop: Function to stop speech.
 * - {number} charIndex: Current character index being spoken (for progress tracking).
 * - {function} setCharIndex: Setter for charIndex.
 */
const useSpeechSynthesis = () => {
  // State for available voices
  const [voices, setVoices] = useState([]);
  // State for the currently selected voice
  const [selectedVoice, setSelectedVoice] = useState(null);
  // State for speech pitch
  const [pitch, setPitch] = useState(1); // Default pitch
  // State for speech rate
  const [rate, setRate] = useState(1);   // Default rate
  // State for speech volume
  const [volume, setVolume] = useState(1); // Default volume
  // State to track if speech is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // State to track if speech is paused
  const [isPaused, setIsPaused] = useState(false);
  // State to track current character index for progress bar
  const [charIndex, setCharIndex] = useState(0);

  // Get the SpeechSynthesisUtterance and SpeechSynthesis interfaces
  const synth = window.speechSynthesis;

  /**
   * Fetches and sets the available voices.
   * This needs to be called after voices are loaded by the browser.
   */
  const populateVoiceList = useCallback(() => {
    const availableVoices = synth.getVoices();
    setVoices(availableVoices);
    // Set a default voice if none is selected, or if the previously selected one is no longer available
    if (!selectedVoice && availableVoices.length > 0) {
      // Try to find a default English voice, otherwise pick the first one
      const defaultEnglishVoice = availableVoices.find(
        (voice) => voice.lang === 'en-US' || voice.lang === 'en-GB' || voice.default
      );
      setSelectedVoice(defaultEnglishVoice || availableVoices[0]);
    } else if (selectedVoice && !availableVoices.some(v => v.name === selectedVoice.name)) {
      // If previously selected voice is gone, reset to default or first
      const defaultEnglishVoice = availableVoices.find(
        (voice) => voice.lang === 'en-US' || voice.lang === 'en-GB' || voice.default
      );
      setSelectedVoice(defaultEnglishVoice || availableVoices[0]);
    }
  }, [synth, selectedVoice]);

  useEffect(() => {
    // Check if voices are already loaded
    if (synth.getVoices().length > 0) {
      populateVoiceList();
    } else {
      // If not, listen for the 'voiceschanged' event
      synth.addEventListener('voiceschanged', populateVoiceList);
    }

    // Cleanup listener on unmount
    return () => {
      synth.removeEventListener('voiceschanged', populateVoiceList);
      // Ensure any ongoing speech is stopped when component unmounts
      synth.cancel();
    };
  }, [synth, populateVoiceList]);

  /**
   * Speaks the given text with current settings.
   * @param {string} text - The text to speak.
   */
  const speak = useCallback((text) => {
    if (!synth) {
      console.error("SpeechSynthesis not supported by this browser.");
      return;
    }

    // If speech is already playing and not paused, do nothing or stop and restart
    if (synth.speaking && !synth.paused) {
      synth.cancel(); // Cancel current speech to start new one
    }

    // If paused, just resume
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Set utterance properties
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    // Event listeners for utterance
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCharIndex(0); // Reset progress when new speech starts
      console.log('Speech started');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCharIndex(0); // Reset progress on end
      console.log('Speech ended');
    };

    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
      console.log('Speech paused');
    };

    utterance.onresume = () => {
      setIsPaused(false);
      console.log('Speech resumed');
    };

    utterance.onboundary = (event) => {
      // This event fires when a word or sentence is spoken.
      // We can use it to track progress.
      if (event.name === 'word' || event.name === 'sentence') {
        setCharIndex(event.charIndex);
      }
    };

    // Speak the utterance
    synth.speak(utterance);
  }, [synth, selectedVoice, pitch, rate, volume]);

  /**
   * Pauses the current speech.
   */
  const pause = useCallback(() => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
      console.log('Speech paused via pause function');
    }
  }, [synth]);

  /**
   * Resumes the paused speech.
   */
  const resume = useCallback(() => {
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      console.log('Speech resumed via resume function');
    }
  }, [synth]);

  /**
   * Stops the current speech and clears the queue.
   */
  const stop = useCallback(() => {
    if (synth.speaking || synth.paused) {
      synth.cancel(); // This stops all utterances in the queue
      setIsPlaying(false);
      setIsPaused(false);
      setCharIndex(0); // Reset progress on stop
      console.log('Speech stopped');
    }
  }, [synth]);

  // Return the state and functions
  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    pitch,
    setPitch,
    rate,
    setRate,
    volume,
    setVolume,
    isPlaying,
    isPaused,
    speak,
    pause,
    resume,
    stop,
    charIndex,
    setCharIndex, // Expose for potential external manipulation if needed
  };
};

export default useSpeechSynthesis;