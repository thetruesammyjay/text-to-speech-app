import React, { useRef, useState } from 'react';
import './PDFUpload.css'; 
import LoadingSpinner from '../common/LoadingSpinner'; 

/**
 * PDFUpload Component
 * Handles PDF file selection, drag & drop, and displays processing status.
 *
 * @param {object} props - Component props.
 * @param {function} props.onFileSelect - Callback function when a file is selected.
 * @param {boolean} props.isLoading - Indicates if PDF processing is in progress.
 * @param {string} [props.errorMessage] - Error message to display if file processing fails.
 */
const PDFUpload = ({ onFileSelect, isLoading, errorMessage }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="pdf-upload-container">
      <div
        className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current.click()}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p className="drop-zone-text">Drag & Drop PDF here or click to upload</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Future features: Progress indicator, file size validation */}
    </div>
  );
};

export default PDFUpload;