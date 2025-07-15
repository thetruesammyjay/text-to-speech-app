import { useState, useEffect } from 'react';

/**
 * useLocalStorage Hook
 * A custom hook to persist state in localStorage.
 * It works similar to useState but stores the value in localStorage,
 * and retrieves it on initial render.
 *
 * @param {string} key - The key under which to store the value in localStorage.
 * @param {*} initialValue - The initial value to use if nothing is found in localStorage.
 * @returns {Array} A tuple [storedValue, setValue] similar to useState.
 */
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      // Allow storing functions or undefined, but only stringify actual data
      const valueToStore =
        typeof storedValue === 'function'
          ? storedValue(prev => prev) // If it's a function, call it with previous state
          : storedValue;

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Re-run effect if key or storedValue changes

  return [storedValue, setStoredValue];
};

export default useLocalStorage;