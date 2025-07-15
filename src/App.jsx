import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Main App CSS
import './styles/globals.css'; // Global styles
import './styles/variables.css'; // CSS variables
import './styles/themes.css'; // Theme styles

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import feature components
import TextInput from './components/TextInput/TextInput';
import PDFUpload from './components/PDFUpload/PDFUpload';
import SpeechControls from './components/SpeechControls/SpeechControls';
import VoiceSettings from './components/VoiceSettings/VoiceSettings';
import ProgressBar from './components/ProgressBar/ProgressBar';

// Import custom hooks
import useSpeechSynthesis from './hooks/useSpeechSynthesis';
import usePDFReader from './hooks/usePDFReader';
import useLocalStorage from './hooks/useLocalStorage';

// Import utilities and services
import { countCharacters, countWords, chunkText } from './utils/textUtils';
import { validatePdfFile } from './utils/pdfUtils';
import { MAX_FILE_SIZE, DEFAULT_SPEECH_RATE, DEFAULT_SPEECH_PITCH, DEFAULT_SPEECH_VOLUME } from './utils/constants';
import speechService from './services/speechService';
import pdfService from './services/pdfService';

/**
 * App Component
 * The main application component that orchestrates all features.
 * It manages global state, integrates hooks, and renders all sub-components.
 */
function App() {
  // State for the text content, persisted in local storage
  const [textToSpeak, setTextToSpeak] = useLocalStorage('textToSpeak', '');
  // State for tracking if the source is PDF or text input
  const [isPdfSource, setIsPdfSource] = useState(false);
  // State for displaying messages to the user (e.g., errors, info)
  const [appMessage, setAppMessage] = useState({ type: '', text: '' }); // { type: 'success'|'error'|'info', text: 'message' }

  // Integrate useSpeechSynthesis hook for speech logic
  const {
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
  } = useSpeechSynthesis();

  // Integrate usePDFReader hook for PDF processing logic
  const {
    pdfText,
    isLoadingPdf,
    pdfError,
    extractTextFromPdf,
    clearPdfData,
  } = usePDFReader();

  // Effect to update textToSpeak when PDF text is extracted
  useEffect(() => {
    if (pdfText) {
      setTextToSpeak(pdfText);
      setIsPdfSource(true);
      setAppMessage({ type: 'success', text: 'PDF text extracted successfully!' });
    } else if (isPdfSource && !pdfText && !isLoadingPdf && !pdfError) {
      // If PDF was the source but now no text, switch back to text input mode
      setIsPdfSource(false);
    }
  }, [pdfText, setTextToSpeak, isPdfSource, isLoadingPdf, pdfError]);

  // Effect to set up speech service callbacks
  useEffect(() => {
    speechService.setCallbacks({
      onStart: () => {
        // useSpeechSynthesis already handles isPlaying state, but this is here for completeness
        setAppMessage({ type: 'info', text: 'Speech started.' });
      },
      onEnd: () => {
        // useSpeechSynthesis already handles isPlaying/isPaused state
        setAppMessage({ type: 'success', text: 'Speech ended.' });
      },
      onPause: () => {
        setAppMessage({ type: 'info', text: 'Speech paused.' });
      },
      onResume: () => {
        setAppMessage({ type: 'info', text: 'Speech resumed.' });
      },
      onBoundary: (event) => {
        // The useSpeechSynthesis hook already updates charIndex,
        // so this callback primarily serves for potential additional UI updates
        // or logging if needed.
        // console.log('Boundary:', event.charIndex, event.name);
      },
      onError: (error) => {
        setAppMessage({ type: 'error', text: `Speech error: ${error.message || error}` });
      },
    });
  }, []); // Only run once on mount

  // Handler for text input changes
  const handleTextInputChange = useCallback((text) => {
    setTextToSpeak(text);
    setIsPdfSource(false); // Switch to text input mode
    setAppMessage({ type: '', text: '' }); // Clear any previous messages
  }, [setTextToSpeak]);

  // Handler for PDF file selection
  const handlePdfFileSelect = useCallback(async (file) => {
    // Clear previous PDF data and messages
    clearPdfData();
    setAppMessage({ type: '', text: '' });

    const validationError = validatePdfFile(file);
    if (validationError) {
      setAppMessage({ type: 'error', text: validationError });
      return;
    }

    try {
      // Use the hook's function to extract text
      await extractTextFromPdf(file);
      // pdfText state will be updated by the hook, triggering the useEffect above
    } catch (error) {
      setAppMessage({ type: 'error', text: error.message || 'Failed to process PDF.' });
      console.error("PDF processing failed:", error);
    }
  }, [extractTextFromPdf, clearPdfData]);

  // Handler for playing speech
  const handlePlay = useCallback(() => {
    if (!textToSpeak.trim()) {
      setAppMessage({ type: 'error', text: 'Please enter some text or upload a PDF to speak.' });
      return;
    }
    if (!selectedVoice) {
      setAppMessage({ type: 'error', text: 'No voice selected. Please choose a voice in settings.' });
      return;
    }

    // If currently paused, resume. Otherwise, start new speech.
    if (isPaused) {
      resume();
    } else {
      speak(textToSpeak);
    }
    setAppMessage({ type: '', text: '' }); // Clear messages on play
  }, [textToSpeak, selectedVoice, isPaused, speak, resume]);

  // Handler for pausing speech
  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  // Handler for stopping speech
  const handleStop = useCallback(() => {
    stop();
    setAppMessage({ type: 'info', text: 'Speech stopped.' });
  }, [stop]);

  // Handler for voice preview
  const handleVoicePreview = useCallback(() => {
    if (selectedVoice) {
      speechService.previewVoice({
        voice: selectedVoice,
        rate: DEFAULT_SPEECH_RATE, // Use default for preview
        pitch: DEFAULT_SPEECH_PITCH,
        volume: DEFAULT_SPEECH_VOLUME
      });
      setAppMessage({ type: 'info', text: 'Playing voice preview...' });
    } else {
      setAppMessage({ type: 'error', text: 'No voice selected for preview.' });
    }
  }, [selectedVoice]);

  // Calculate progress for ProgressBar
  const totalTextLength = countCharacters(textToSpeak);
  const progress = totalTextLength > 0 ? (charIndex / totalTextLength) * 100 : 0;
  const progressBarStatusText = isPlaying
    ? (isPaused ? 'Paused' : 'Playing...')
    : (textToSpeak ? 'Ready to speak' : 'Enter text or upload PDF');


  return (
    <div className="App">
      <Header />
      <main className="App-content">
        {/* Display application messages */}
        {appMessage.text && (
          <div className={`app-message ${appMessage.type}`}>
            {appMessage.text}
          </div>
        )}

        <div className="input-section">
          <TextInput
            text={textToSpeak}
            onTextChange={handleTextInputChange}
            maxCharacters={20000} // Example max characters
          />
          <PDFUpload
            onFileSelect={handlePdfFileSelect}
            isLoading={isLoadingPdf}
            errorMessage={pdfError}
          />
        </div>

        <div className="controls-section">
          <SpeechControls
            isPlaying={isPlaying}
            isPaused={isPaused}
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
            speed={rate}
            onSpeedChange={setRate}
            pitch={pitch}
            onPitchChange={setPitch}
            volume={volume}
            onVolumeChange={setVolume}
          />
          <VoiceSettings
            voices={voices}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            onVoicePreview={handleVoicePreview}
          />
        </div>

        <ProgressBar
          progress={progress}
          statusText={progressBarStatusText}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;