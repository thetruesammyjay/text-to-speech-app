/**
 * src/utils/textUtils.js
 *
 * Utility functions for text manipulation, such as cleaning,
 * counting, and potentially chunking for speech.
 */

/**
 * Counts the number of words in a given text string.
 * A word is defined as any sequence of non-whitespace characters.
 * @param {string} text - The input text string.
 * @returns {number} The number of words.
 */
export const countWords = (text) => {
  if (!text) return 0;
  // Trim leading/trailing whitespace, then split by one or more whitespace characters.
  // Filter Boolean removes any empty strings from the array (e.g., if there are multiple spaces).
  return text.trim().split(/\s+/).filter(Boolean).length;
};

/**
 * Counts the number of characters in a given text string.
 * @param {string} text - The input text string.
 * @returns {number} The number of characters.
 */
export const countCharacters = (text) => {
  if (!text) return 0;
  return text.length;
};

/**
 * Sanitizes text by removing potentially problematic characters or sequences
 * that might interfere with speech synthesis or display.
 * This is a basic example; more complex sanitization might be needed.
 * @param {string} text - The input text string.
 * @returns {string} The sanitized text.
 */
export const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  // Replace multiple newlines with a single one, trim whitespace
  return text.replace(/\n\s*\n/g, '\n\n').trim();
};

/**
 * Chunks a long text into smaller pieces suitable for speech synthesis.
 * Some browsers have limits on the length of text that can be passed to SpeechSynthesisUtterance.
 * This function attempts to split text by sentences or paragraphs.
 * @param {string} text - The long text to chunk.
 * @param {number} [maxChunkLength=200] - Maximum desired length for each chunk.
 * @returns {Array<string>} An array of text chunks.
 */
export const chunkText = (text, maxChunkLength = 200) => {
  if (!text) return [];
  const sanitizedText = sanitizeText(text);
  if (sanitizedText.length <= maxChunkLength) {
    return [sanitizedText];
  }

  const chunks = [];
  let currentText = sanitizedText;

  while (currentText.length > 0) {
    if (currentText.length <= maxChunkLength) {
      chunks.push(currentText);
      break;
    }

    // Try to find a natural break point (sentence end, paragraph end)
    let breakPoint = -1;

    // Look for sentence end within the maxChunkLength range
    const sentenceEndMatch = currentText.substring(0, maxChunkLength).match(/[\.\?\!]\s+["']?$/);
    if (sentenceEndMatch) {
      breakPoint = currentText.indexOf(sentenceEndMatch[0], sentenceEndMatch.index) + sentenceEndMatch[0].length;
    }

    // If no sentence end, look for paragraph end
    if (breakPoint === -1) {
      const paragraphEndMatch = currentText.substring(0, maxChunkLength).match(/\n\n/);
      if (paragraphEndMatch) {
        breakPoint = currentText.indexOf(paragraphEndMatch[0], paragraphEndMatch.index) + paragraphEndMatch[0].length;
      }
    }

    // If no natural break point found, just cut at maxChunkLength
    if (breakPoint === -1 || breakPoint > maxChunkLength) {
      breakPoint = maxChunkLength;
      // Try to avoid cutting words in half
      const lastSpace = currentText.substring(0, maxChunkLength).lastIndexOf(' ');
      if (lastSpace !== -1 && lastSpace > maxChunkLength * 0.8) { // Only if space is reasonably close to the end
        breakPoint = lastSpace;
      }
    }

    chunks.push(currentText.substring(0, breakPoint).trim());
    currentText = currentText.substring(breakPoint).trim();
  }

  return chunks.filter(chunk => chunk.length > 0);
};