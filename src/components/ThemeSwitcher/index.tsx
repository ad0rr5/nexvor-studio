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
  const [isChanging, setIsChanging] = React.useState(false);
  const isLightMode = theme === 'light';
  const ariaLabel = `Activate ${isLightMode ? 'dark' : 'light'} mode`;
  
  const handleToggle = () => {
    setIsChanging(true);
    toggleTheme();
    
    // Animasyon tamamlandıktan sonra class'ı kaldır
    setTimeout(() => {
      setIsChanging(false);
    }, 600);
  };
  
  return (
    <button 
      className={`theme-switcher ${isChanging ? 'changing' : ''}`}
      onClick={handleToggle} 
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {isLightMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
