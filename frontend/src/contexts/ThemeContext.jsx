import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('blockops_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // The `.dark` class is applied per-route (dashboard only) by ThemeRouteSync
    // in App.jsx, so the public marketing site stays light regardless of this
    // preference. Here we only persist the choice.
    try {
      localStorage.setItem('blockops_theme', dark ? 'dark' : 'light');
    } catch { /* ignore */ }
  }, [dark]);

  const toggle = () => setDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
