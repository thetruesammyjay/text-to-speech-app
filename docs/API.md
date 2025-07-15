# API Documentation

This document describes the internal APIs and services used in the Text-to-Speech App.

## Table of Contents

- [Speech Service API](#speech-service-api)
- [PDF Service API](#pdf-service-api)
- [Hooks API](#hooks-api)
- [Utilities API](#utilities-api)
- [Web Speech API Integration](#web-speech-api-integration)
- [Error Handling](#error-handling)

## Speech Service API

### `speechService.js`

The main service for handling text-to-speech functionality.

#### Methods

##### `speak(text, options)`
Starts speech synthesis with the provided text.

**Parameters:**
- `text` (string): The text to be spoken
- `options` (object): Configuration options

**Options Object:**
```javascript
{
  voice: SpeechSynthesisVoice,    // Selected voice (optional)
  rate: number,                   // Speech rate (0.1 - 10, default: 1)
  pitch: number,                  // Speech pitch (0 - 2, default: 1)
  volume: number,                 // Speech volume (0 - 1, default: 1)
  onStart: function,              // Callback when speech starts
  onEnd: function,                // Callback when speech ends
  onError: function,              // Callback when error occurs
  onPause: function,              // Callback when speech pauses
  onResume: function,             // Callback when speech resumes
  onBoundary: function            // Callback for word boundaries
}
```

**Example:**
```javascript
import { speechService } from '../services/speechService';

speechService.speak("Hello world!", {
  rate: 1.2,
  pitch: 1.1,
  onStart: () => console.log('Speech started'),
  onEnd: () => console.log('Speech ended')
});
```

##### `pause()`
Pauses the current speech synthesis.

**Returns:** `boolean` - Success status

##### `resume()`
Resumes paused speech synthesis.

**Returns:** `boolean` - Success status

##### `stop()`
Stops the current speech synthesis.

**Returns:** `boolean` - Success status

##### `getVoices()`
Retrieves available speech synthesis voices.

**Returns:** `SpeechSynthesisVoice[]` - Array of available voices

**Example:**
```javascript
const voices = speechService.getVoices();
const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
```

##### `isSupported()`
Checks if speech synthesis is supported in the current browser.

**Returns:** `boolean` - Support status

##### `getCurrentStatus()`
Gets the current speech synthesis status.

**Returns:** `object`
```javascript
{
  speaking: boolean,
  paused: boolean,
  pending: boolean,
  currentText: string,
  currentVoice: SpeechSynthesisVoice,
  progress: number  // 0-100
}
```

## PDF Service API

### `pdfService.js`

Service for handling PDF file processing and text extraction.

#### Methods

##### `extractText(file)`
Extracts text from a PDF file.

**Parameters:**
- `file` (File): PDF file object

**Returns:** `Promise<string>` - Extracted text content

**Example:**
```javascript
import { pdfService } from '../services/pdfService';

const handleFileUpload = async (file) => {
  try {
    const text = await pdfService.extractText(file);
    console.log(text);
  } catch (error) {
    console.error('PDF extraction failed:', error);
  }
};
```

##### `extractTextFromPages(file, pageNumbers)`
Extracts text from specific pages of a PDF.

**Parameters:**
- `file` (File): PDF file object
- `pageNumbers` (number[]): Array of page numbers to extract

**Returns:** `Promise<string>` - Extracted text from specified pages

##### `getPageCount(file)`
Gets the total number of pages in a PDF.

**Parameters:**
- `file` (File): PDF file object

**Returns:** `Promise<number>` - Total page count

##### `validatePDF(file)`
Validates if a file is a valid PDF.

**Parameters:**
- `file` (File): File to validate

**Returns:** `Promise<boolean>` - Validation result

**Example:**
```javascript
const isValid = await pdfService.validatePDF(file);
if (!isValid) {
  throw new Error('Invalid PDF file');
}
```

##### `getMetadata(file)`
Extracts metadata from a PDF file.

**Parameters:**
- `file` (File): PDF file object

**Returns:** `Promise<object>` - PDF metadata

**Metadata Object:**
```javascript
{
  title: string,
  author: string,
  subject: string,
  creator: string,
  producer: string,
  creationDate: Date,
  modificationDate: Date,
  pageCount: number,
  fileSize: number
}
```

## Hooks API

### `useSpeechSynthesis.js`

Custom hook for managing speech synthesis state and operations.

#### Usage

```javascript
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const MyComponent = () => {
  const {
    speak,
    pause,
    resume,
    stop,
    voices,
    isSupported,
    isLoading,
    isPlaying,
    isPaused,
    currentText,
    progress,
    error
  } = useSpeechSynthesis();

  return (
    <div>
      <button onClick={() => speak('Hello world!')}>
        Speak
      </button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
```

#### Return Values

- `speak(text, options)`: Function to start speech
- `pause()`: Function to pause speech
- `resume()`: Function to resume speech
- `stop()`: Function to stop speech
- `voices`: Array of available voices
- `isSupported`: Boolean indicating browser support
- `isLoading`: Boolean indicating loading state
- `isPlaying`: Boolean indicating if speech is active
- `isPaused`: Boolean indicating if speech is paused
- `currentText`: Currently spoken text
- `progress`: Speech progress (0-100)
- `error`: Error message if any

### `usePDFReader.js`

Custom hook for PDF file processing.

#### Usage

```javascript
import { usePDFReader } from '../hooks/usePDFReader';

const PDFUpload = () => {
  const {
    extractText,
    isProcessing,
    progress,
    error,
    metadata
  } = usePDFReader();

  const handleFileUpload = async (file) => {
    const text = await extractText(file);
    // Use extracted text
  };

  return (
    <div>
      {isProcessing && <div>Processing: {progress}%</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};
```

#### Return Values

- `extractText(file)`: Function to extract text from PDF
- `isProcessing`: Boolean indicating processing state
- `progress`: Processing progress (0-100)
- `error`: Error message if any
- `metadata`: PDF metadata object

### `useLocalStorage.js`

Custom hook for managing localStorage with React state.

#### Usage

```javascript
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const [settings, setSettings] = useLocalStorage('tts-settings', {
    rate: 1,
    pitch: 1,
    volume: 1,
    voiceIndex: 0
  });

  return (
    <div>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={settings.rate}
        onChange={(e) => setSettings({
          ...settings,
          rate: parseFloat(e.target.value)
        })}
      />
    </div>
  );
};
```

## Utilities API

### `speechUtils.js`

Utility functions for speech processing.

#### Functions

##### `chunkText(text, maxLength)`
Splits text into chunks for better speech processing.

**Parameters:**
- `text` (string): Text to chunk
- `maxLength` (number): Maximum chunk length

**Returns:** `string[]` - Array of text chunks

##### `detectLanguage(text)`
Attempts to detect the language of given text.

**Parameters:**
- `text` (string): Text to analyze

**Returns:** `string` - Language code (e.g., 'en-US')

##### `sanitizeText(text)`
Cleans and sanitizes text for speech synthesis.

**Parameters:**
- `text` (string): Text to sanitize

**Returns:** `string` - Sanitized text

##### `estimateSpeechDuration(text, rate)`
Estimates speech duration based on text length and rate.

**Parameters:**
- `text` (string): Text to analyze
- `rate` (number): Speech rate

**Returns:** `number` - Estimated duration in seconds

### `pdfUtils.js`

Utility functions for PDF processing.

#### Functions

##### `validateFileSize(file, maxSize)`
Validates PDF file size.

**Parameters:**
- `file` (File): File to validate
- `maxSize` (number): Maximum allowed size in bytes

**Returns:** `boolean` - Validation result

##### `formatFileSize(bytes)`
Formats file size for display.

**Parameters:**
- `bytes` (number): Size in bytes

**Returns:** `string` - Formatted size string

##### `extractPageRange(text, startPage, endPage)`
Extracts text from a specific page range.

**Parameters:**
- `text` (string): Full PDF text
- `startPage` (number): Starting page
- `endPage` (number): Ending page

**Returns:** `string` - Text from specified range

### `textUtils.js`

Utility functions for text processing.

#### Functions

##### `countWords(text)`
Counts words in text.

**Parameters:**
- `text` (string): Text to analyze

**Returns:** `number` - Word count

##### `countCharacters(text)`
Counts characters in text.

**Parameters:**
- `text` (string): Text to analyze

**Returns:** `number` - Character count

##### `highlightCurrentWord(text, wordIndex)`
Highlights the current word being spoken.

**Parameters:**
- `text` (string): Full text
- `wordIndex` (number): Index of current word

**Returns:** `string` - HTML with highlighted word

##### `cleanText(text)`
Removes unwanted characters and formatting.

**Parameters:**
- `text` (string): Text to clean

**Returns:** `string` - Cleaned text

## Web Speech API Integration

### Browser Support

The app uses the Web Speech API with the following browser support:

- **Chrome**: Full support
- **Firefox**: Limited support
- **Safari**: Partial support
- **Edge**: Full support

### Event Handling

The speech synthesis events are handled as follows:

```javascript
utterance.onstart = () => {
  // Speech started
};

utterance.onend = () => {
  // Speech ended
};

utterance.onerror = (event) => {
  // Handle error
  console.error('Speech error:', event.error);
};

utterance.onpause = () => {
  // Speech paused
};

utterance.onresume = () => {
  // Speech resumed
};

utterance.onboundary = (event) => {
  // Word boundary reached
  // Update progress indicator
};
```

### Voice Selection

```javascript
// Get available voices
const voices = speechSynthesis.getVoices();

// Filter by language
const englishVoices = voices.filter(voice => 
  voice.lang.startsWith('en')
);

// Select preferred voice
const preferredVoice = englishVoices.find(voice => 
  voice.name.includes('Google')
) || englishVoices[0];
```

## Error Handling

### Common Error Types

#### Speech Synthesis Errors

- `not-allowed`: User denied permission
- `audio-busy`: Audio system is busy
- `audio-hardware`: Audio hardware error
- `network`: Network error
- `synthesis-failed`: Speech synthesis failed
- `synthesis-unavailable`: Speech synthesis not available

#### PDF Processing Errors

- `invalid-pdf`: Invalid PDF file
- `corrupted-pdf`: Corrupted PDF file
- `password-protected`: Password-protected PDF
- `no-text-content`: PDF contains no extractable text
- `file-too-large`: File size exceeds limit

### Error Handling Examples

```javascript
// Speech error handling
try {
  await speechService.speak(text);
} catch (error) {
  switch (error.type) {
    case 'not-allowed':
      showMessage('Please allow microphone access');
      break;
    case 'synthesis-failed':
      showMessage('Speech synthesis failed. Please try again.');
      break;
    default:
      showMessage('An error occurred during speech synthesis');
  }
}

// PDF error handling
try {
  const text = await pdfService.extractText(file);
} catch (error) {
  switch (error.type) {
    case 'invalid-pdf':
      showMessage('Please select a valid PDF file');
      break;
    case 'file-too-large':
      showMessage('File is too large. Please choose a smaller file.');
      break;
    default:
      showMessage('Failed to process PDF file');
  }
}
```

## Rate Limiting

### Speech Synthesis

The browser may impose rate limits on speech synthesis:

- Maximum utterance length: ~32,767 characters
- Concurrent utterances: Usually 1
- Queue length: Browser-dependent

### PDF Processing

- Maximum file size: 10MB (configurable)
- Processing timeout: 30 seconds
- Maximum pages: 500 (configurable)

## Performance Considerations

### Speech Synthesis

- Chunk large texts for better performance
- Use appropriate speech rates (0.5-2.0)
- Cancel previous utterances before starting new ones
- Monitor memory usage for long texts

### PDF Processing

- Process PDFs in chunks for large files
- Use web workers for heavy processing
- Implement progress indicators
- Cache processed results when possible

## Testing

### Unit Tests

```javascript
// Example test for speech service
import { speechService } from '../services/speechService';

describe('speechService', () => {
  test('should start speech synthesis', async () => {
    const mockUtterance = jest.fn();
    global.SpeechSynthesisUtterance = mockUtterance;
    
    await speechService.speak('Hello world');
    
    expect(mockUtterance).toHaveBeenCalledWith('Hello world');
  });
});
```

### Integration Tests

```javascript
// Example integration test
import { render, fireEvent, waitFor } from '@testing-library/react';
import TextToSpeechApp from '../App';

test('should speak text when button is clicked', async () => {
  const { getByText, getByPlaceholderText } = render(<TextToSpeechApp />);
  
  const input = getByPlaceholderText('Enter text to speak');
  const button = getByText('Speak');
  
  fireEvent.change(input, { target: { value: 'Hello world' } });
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(speechSynthesis.speak).toHaveBeenCalled();
  });
});
```

## API Versioning

Current API version: `1.0.0`

Future versions will maintain backward compatibility and follow semantic versioning principles.

## Support

For API-related questions or issues:

1. Check the [GitHub Issues](https://github.com/thetruesammyjay/text-to-speech-app/issues)
2. Review the test files for usage examples
3. Consult the source code documentation
4. Create a new issue if needed

---

*This API documentation is maintained alongside the codebase and updated with each release.*