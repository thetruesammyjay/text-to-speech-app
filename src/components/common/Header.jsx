import React from 'react';
import './Header.css'; // Import the CSS for styling

/**
 * Header Component
 * Displays the application title and a theme toggle button.
 * It also manages the theme state using localStorage.
 */
const Header = () => {
  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the user's theme preference
  };

  // Effect to apply the saved theme on component mount
  React.useEffect(() => {
    // Retrieve the theme from localStorage, default to 'light' if not found
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <header className="header">
      <div className="header-container">
        {/* Application title */}
        <h1 className="header-title">AGM Text-to-Speech App</h1>
        {/* Button to toggle the theme */}
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
  );
};

export default Header;