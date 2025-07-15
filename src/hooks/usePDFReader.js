import { useState, useCallback, useEffect } from 'react';
// Import PDF.js worker and document for basic setup
// NOTE: You might need to configure webpack or your build tool to copy
// pdfjs-dist/build/pdf.worker.min.js to your public path.
// For Create React App, this often works out of the box if imported correctly.
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Set the worker source for PDF.js
// This path might need adjustment based on your deployment strategy.
// For CRA, it often resolves correctly if pdf.worker.min.js is in node_modules/pdfjs-dist/build
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * usePDFReader Hook
 * Handles reading and extracting text from PDF files using PDF.js.
 *
 * @returns {object} An object containing:
 * - {string} pdfText: The extracted text from the PDF.
 * - {boolean} isLoadingPdf: True if PDF is currently being processed.
 * - {string | null} pdfError: Error message if PDF processing fails.
 * - {function} extractTextFromPdf: Function to initiate PDF text extraction.
 * - {function} clearPdfData: Function to clear extracted text and errors.
 */
const usePDFReader = () => {
  const [pdfText, setPdfText] = useState('');
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  /**
   * Extracts text from a given PDF file.
   * @param {File} file - The PDF File object to process.
   * @param {Array<number>} [pageNumbers] - Optional array of page numbers to extract text from.
   * If not provided, extracts from all pages.
   */
  const extractTextFromPdf = useCallback(async (file, pageNumbers = []) => {
    if (!file) {
      setPdfError("No file provided.");
      return;
    }
    if (file.type !== 'application/pdf') {
      setPdfError("Invalid file type. Please upload a PDF file.");
      return;
    }

    setIsLoadingPdf(true);
    setPdfError(null);
    setPdfText(''); // Clear previous text

    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let extractedText = '';
      const totalPages = pdfDocument.numPages;

      // Determine which pages to process
      const pagesToProcess = pageNumbers.length > 0
        ? pageNumbers.filter(pageNum => pageNum >= 1 && pageNum <= totalPages)
        : Array.from({ length: totalPages }, (_, i) => i + 1); // All pages

      for (const pageNum of pagesToProcess) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageString = textContent.items.map(item => item.str).join(' ');
        extractedText += pageString + '\n\n'; // Add newline between pages
      }

      setPdfText(extractedText.trim()); // Trim any leading/trailing whitespace
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setPdfError(`Failed to process PDF: ${error.message || 'Unknown error'}`);
      setPdfText('');
    } finally {
      setIsLoadingPdf(false);
    }
  }, []);

  /**
   * Clears the extracted PDF text and any associated errors.
   */
  const clearPdfData = useCallback(() => {
    setPdfText('');
    setPdfError(null);
    setIsLoadingPdf(false);
  }, []);

  // You might want to add a cleanup effect if the component unmounts while loading
  // or if there's a need to cancel ongoing PDF processing.
  // For now, the `finally` block handles state reset.

  return {
    pdfText,
    isLoadingPdf,
    pdfError,
    extractTextFromPdf,
    clearPdfData,
  };
};

export default usePDFReader;