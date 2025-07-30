import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';

// Define the available themes based on your CSS structure
const themes = ['light', 'dark']; // Only light and dark for this specific CSS example

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Initialize theme from localStorage or OS preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.includes(savedTheme)) {
      return savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'; // Set to dark if OS prefers dark and no saved theme
    }
    return 'light'; // Default to light
  });

  // Effect to update the data-theme attribute on the document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme); // Persist theme
  }, [currentTheme]);

  // Function to set a specific theme
  const setTheme = useCallback((themeName) => {
    if (themes.includes(themeName)) {
      setCurrentTheme(themeName);
    } else {
      console.warn(`Theme "${themeName}" is not a recognized theme.`);
    }
  }, []);

  // Function to cycle through themes (for a single toggle button)
  const cycleTheme = useCallback(() => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [currentTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, cycleTheme, themes }}>
      <div className='h-screen flex flex-col'>
        <Navbar currentTheme={currentTheme} cycleTheme={cycleTheme} />
        <div className='flex-1 bg-surface mt-14'>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};