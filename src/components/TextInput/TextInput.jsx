import React from 'react';
import './TextInput.css'; 

/**
 * TextInput Component
 * Allows users to type or paste text for speech conversion.
 * Will include features like character/word count and auto-save.
 *
 * @param {object} props - Component props.
 * @param {string} props.text - The current text content.
 * @param {function} props.onTextChange - Callback function when text changes.
 * @param {number} [props.maxCharacters] - Optional maximum character limit.
 */
const TextInput = ({ text, onTextChange, maxCharacters }) => {
  const characterCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="text-input-container">
      <textarea
        className="text-input-textarea"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        maxLength={maxCharacters}
        rows={10}
      ></textarea>
      <div className="text-input-info">
        <span>Characters: {characterCount}</span>
        <span>Words: {wordCount}</span>
        {maxCharacters && (
          <span>Max: {maxCharacters}</span>
        )}
      </div>
      {/* Future features: Auto-save indicator, Import from clipboard button */}
    </div>
  );
};

export default TextInput;