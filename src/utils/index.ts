/**
 * Utility functions for theme and local storage management
 */

import type { Theme } from '../types';

/**
 * Get initial theme from localStorage or system preference
 */
export const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (storedTheme as Theme) || (systemPrefersDark ? 'dark' : 'light');
};

/**
 * Save theme to localStorage and apply to DOM
 */
export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Toggle body scroll for modal states
 */
export const toggleBodyScroll = (disable: boolean): void => {
  document.body.style.overflow = disable ? 'hidden' : 'unset';
};

/**
 * Create keyboard event handler for escape key
 */
export const createEscapeHandler = (callback: () => void) => {
  return (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback();
    }
  };
};

// Export security utilities
export * from './security';
