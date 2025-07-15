/**
 * src/utils/pdfUtils.js
 *
 * Utility functions related to PDF processing,
 * complementing the usePDFReader hook.
 */

import { MAX_FILE_SIZE } from './constants';

/**
 * Validates a PDF file based on its type and size.
 * @param {File} file - The file object to validate.
 * @returns {string | null} An error message if validation fails, otherwise null.
 */
export const validatePdfFile = (file) => {
  if (!file) {
    return "No file selected.";
  }
  if (file.type !== 'application/pdf') {
    return "Invalid file type. Please upload a PDF file.";
  }
  if (file.size > MAX_FILE_SIZE) {
    const maxSizeMB = MAX_FILE_SIZE / (1024 * 1024);
    return `File size exceeds the limit of ${maxSizeMB}MB.`;
  }
  return null; // No error
};

/**
 * Parses a string of page ranges (e.g., "1-3, 5, 7-9") into an array of unique page numbers.
 * @param {string} pageRangeString - The string representing page ranges.
 * @param {number} totalPages - The total number of pages in the PDF.
 * @returns {Array<number>} An array of unique, sorted page numbers.
 */
export const parsePageRanges = (pageRangeString, totalPages) => {
  const pageNumbers = new Set();
  const parts = pageRangeString.split(',').map(part => part.trim());

  parts.forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            pageNumbers.add(i);
          }
        }
      }
    } else {
      const pageNum = Number(part);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        pageNumbers.add(pageNum);
      }
    }
  });

  return Array.from(pageNumbers).sort((a, b) => a - b);
};