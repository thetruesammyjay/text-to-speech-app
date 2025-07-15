import React from 'react';
import './Footer.css'; // Import the CSS for styling

/**
 * Footer Component
 * Displays copyright information and attribution.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Copyright text with dynamic year and attribution */}
        <p>&copy; {new Date().getFullYear()} Text-to-Speech App. Built with ❤️ by Samuel Justin Ifiezibe.</p>
      </div>
    </footer>
  );
};

export default Footer;