/**
 * Theme switcher component for toggling between light and dark modes
 */

import React from 'react';
import type { Theme } from '../../types';
import { SunIcon, MoonIcon } from '../Icons';

interface ThemeSwitcherProps {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Button component for switching between light and dark themes
 */
export const ThemeSwitcher = ({ theme, toggleTheme }: ThemeSwitcherProps) => {
  const isLightMode = theme === 'light';
  const ariaLabel = `Activate ${isLightMode ? 'dark' : 'light'} mode`;
  
  return (
    <button 
      className="theme-switcher" 
      onClick={toggleTheme} 
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {isLightMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
