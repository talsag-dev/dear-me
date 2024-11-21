import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ThemeContextType } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null); // Start with `null` until theme is loaded

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const validThemes = ['light', 'dark', 'joyful', 'forest', 'ocean'];

    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('light'); // Fallback to light if no valid theme is saved
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark', 'joyful', 'forest', 'ocean');
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
