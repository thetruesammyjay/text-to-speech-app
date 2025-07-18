/**
 * src/services/pdfService.js
 *
 * This service encapsulates the direct interaction with the PDF.js library
 * for loading PDF documents and extracting text content.
 */

// Import PDF.js worker and document for basic setup
// Ensure pdfjs-dist is installed: npm install pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Set the worker source for PDF.js
// IMPORTANT: This path assumes you have copied 'pdf.worker.min.js'
// from 'node_modules/pdfjs-dist/build/' into your 'public/' directory.
// Create React App will serve files from 'public/' directly.
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;


const pdfService = {
  /**
   * Extracts text content from a given PDF file.
   * @param {File} file - The PDF File object to process.
   * @param {Array<number>} [pageNumbers] - Optional array of page numbers to extract text from.
   * If not provided, extracts from all pages.
   * @returns {Promise<string>} A promise that resolves with the extracted text.
   * @throws {Error} If the file is not a PDF or processing fails.
   */
  extractText: async (file, pageNumbers = []) => {
    if (!file) {
      throw new Error("No file provided for PDF text extraction.");
    }
    if (file.type !== 'application/pdf') {
      throw new Error("Invalid file type. Only PDF files are supported.");
    }

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
        // Join text items, adding a space between them.
        // Consider adding more sophisticated layout reconstruction if needed.
        const pageString = textContent.items.map(item => item.str).join(' ');
        extractedText += pageString + '\n\n'; // Add newline between pages for readability
      }

      return extractedText.trim(); // Trim any leading/trailing whitespace
    } catch (error) {
      // Removed console.error as per ESLint 'no-console' rule.
      throw new Error(`Failed to extract text from PDF: ${error.message || 'Unknown error'}`);
    }
  },

  /**
   * Gets the total number of pages in a PDF file.
   * @param {File} file - The PDF File object.
   * @returns {Promise<number>} A promise that resolves with the total page count.
   * @throws {Error} If the file is not a PDF or processing fails.
   */
  getPageCount: async (file) => {
    if (!file) {
      throw new Error("No file provided to get page count.");
    }
    if (file.type !== 'application/pdf') {
      throw new Error("Invalid file type. Only PDF files are supported.");
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      return pdfDocument.numPages;
    } catch (error) {
      // Removed console.error as per ESLint 'no-console' rule.
      throw new Error(`Failed to get PDF page count: ${error.message || 'Unknown error'}`);
    }
  },
};

export default pdfService;
