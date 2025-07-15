# Text-to-Speech App

A modern web application that converts text and PDF documents to speech using the Web Speech API.

## 🚀 Features

- **Text Input**: Type or paste text directly into the app
- **PDF Upload**: Upload PDF files and extract text automatically
- **Voice Controls**: Play, pause, stop, and adjust speech settings
- **Voice Selection**: Choose from available system voices
- **Speed & Pitch Control**: Customize speech rate and pitch
- **Progress Tracking**: Visual progress indicator during speech
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes

## 📁 Project Structure

```
text-to-speech-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── TextInput/
│   │   │   ├── TextInput.jsx
│   │   │   └── TextInput.css
│   │   ├── PDFUpload/
│   │   │   ├── PDFUpload.jsx
│   │   │   └── PDFUpload.css
│   │   ├── SpeechControls/
│   │   │   ├── SpeechControls.jsx
│   │   │   └── SpeechControls.css
│   │   ├── VoiceSettings/
│   │   │   ├── VoiceSettings.jsx
│   │   │   └── VoiceSettings.css
│   │   └── ProgressBar/
│   │       ├── ProgressBar.jsx
│   │       └── ProgressBar.css
│   ├── hooks/
│   │   ├── useSpeechSynthesis.js
│   │   ├── usePDFReader.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── speechUtils.js
│   │   ├── pdfUtils.js
│   │   ├── textUtils.js
│   │   └── constants.js
│   ├── services/
│   │   ├── speechService.js
│   │   └── pdfService.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── themes.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tests/
│   ├── components/
│   │   ├── TextInput.test.js
│   │   ├── PDFUpload.test.js
│   │   └── SpeechControls.test.js
│   ├── hooks/
│   │   ├── useSpeechSynthesis.test.js
│   │   └── usePDFReader.test.js
│   └── utils/
│       ├── speechUtils.test.js
│       └── pdfUtils.test.js
├── docs/
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Hooks
- **Styling**: CSS3 with CSS Variables for theming
- **PDF Processing**: PDF.js (Mozilla's PDF reader)
- **Speech**: Web Speech API (SpeechSynthesis)
- **Build Tool**: Create React App or Vite
- **Testing**: Jest + React Testing Library
- **Deployment**: Netlify, Vercel, or GitHub Pages

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with Web Speech API support

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thetruesammyjay/text-to-speech-app.git
cd text-to-speech-app
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "pdfjs-dist": "^3.11.174"
}
```

### Development Dependencies
```json
{
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^14.4.3",
  "jest": "^27.5.1"
}
```

## 🎯 Core Features Implementation

### 1. Text Input Component
- Rich text editor with formatting options
- Character count and word count
- Auto-save functionality
- Import from clipboard

### 2. PDF Upload Component
- Drag & drop file upload
- Progress indicator during processing
- Text extraction with page selection
- File size validation (max 10MB)

### 3. Speech Controls
- Play/Pause/Stop buttons
- Speed control (0.5x to 2x)
- Pitch adjustment
- Volume control
- Skip forward/backward

### 4. Voice Settings
- Voice selection dropdown
- Language detection
- Gender preference
- Voice preview

### 5. Progress Tracking
- Visual progress bar
- Current word highlighting
- Time remaining estimation
- Sentence-by-sentence navigation

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_NAME=Text-to-Speech App
REACT_APP_VERSION=1.0.0
REACT_APP_MAX_FILE_SIZE=10485760
REACT_APP_SUPPORTED_LANGUAGES=en,es,fr,de,it
```

### Browser Compatibility
- Chrome 33+
- Firefox 49+
- Safari 14.1+
- Edge 14+

**Note**: Web Speech API support varies by browser and platform.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component and utility function tests
- **Integration Tests**: Component interaction tests
- **E2E Tests**: Full user workflow tests (optional)

## 🎨 Styling Guidelines

### CSS Architecture
- **BEM Methodology**: Block, Element, Modifier naming convention
- **CSS Variables**: For consistent theming and easy customization
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 compliance

### Theme System
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --background-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
}

[data-theme="dark"] {
  --background-color: #1f2937;
  --text-color: #f9fafb;
  --border-color: #374151;
}
```

## 📱 PWA Features

The app includes Progressive Web App capabilities:
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices
- Local storage for user preferences

## 🔐 Security Considerations

- File upload validation and sanitization
- XSS prevention in text rendering
- Content Security Policy headers
- No sensitive data storage in localStorage

## 🚀 Deployment

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

## 📄 API Reference

### SpeechSynthesis Methods
```javascript
// Start speech
speechService.speak(text, options)

// Pause speech
speechService.pause()

// Resume speech
speechService.resume()

// Stop speech
speechService.stop()

// Get available voices
speechService.getVoices()
```

### PDF Processing
```javascript
// Extract text from PDF
pdfService.extractText(file)

// Get page count
pdfService.getPageCount(file)

// Extract text from specific pages
pdfService.extractTextFromPages(file, pageNumbers)
```

## 🐛 Known Issues

- Safari on iOS has limited voice selection
- Some browsers may not support all speech features
- Large PDF files may cause performance issues
- Voice quality varies by operating system

## 📊 Performance Optimization

- Lazy loading of PDF processing library
- Text chunking for large documents
- Debounced user inputs
- Efficient re-rendering with React.memo
- Service worker caching

## 🔄 Roadmap

- [ ] Cloud storage integration
- [ ] Multiple language support
- [ ] Voice cloning capabilities
- [ ] Batch processing
- [ ] Audio export functionality
- [ ] Advanced text formatting
- [ ] Bookmarks and favorites
- [ ] User accounts and sync

## 📞 Support

For support, please:
1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/thetruesammyjay/text-to-speech-app/issues)
3. Create a new issue if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mozilla PDF.js team for the PDF processing library
- Web Speech API contributors
- React community for excellent tooling
- All contributors who help improve this project

---

**Built with ❤️ by sammyjayisthename**