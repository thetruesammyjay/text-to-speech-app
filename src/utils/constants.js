/**
 * src/utils/constants.js
 *
 * Defines application-wide constants, including environment variables
 * and other fixed configuration values.
 */

// Environment Variables (prefixed with REACT_APP_ for Create React App)
// These values are typically loaded from .env files.
export const APP_NAME = process.env.REACT_APP_NAME || 'Text-to-Speech App';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';
export const MAX_FILE_SIZE = parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '10485760', 10); // Default 10MB in bytes
export const SUPPORTED_LANGUAGES = (process.env.REACT_APP_SUPPORTED_LANGUAGES || 'en,es,fr,de,it')
  .split(',')
  .map(lang => lang.trim());

// Other application constants
export const DEFAULT_SPEECH_RATE = 1.0;
export const MIN_SPEECH_RATE = 0.5;
export const MAX_SPEECH_RATE = 2.0;

export const DEFAULT_SPEECH_PITCH = 1.0;
export const MIN_SPEECH_PITCH = 0.0;
export const MAX_SPEECH_PITCH = 2.0;

export const DEFAULT_SPEECH_VOLUME = 1.0;
export const MIN_SPEECH_VOLUME = 0.0;
export const MAX_SPEECH_VOLUME = 1.0;

export const PREVIEW_VOICE_TEXT = "Hello, this is a voice preview.";