/**
 * Reusable UI components
 */

import React from 'react';
import { useIntersectionObserver } from '../../hooks';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that adds fade-in animation when element enters viewport
 */
export const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });
  
  return (
    <div ref={ref} className={`section-fade-in ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Loading spinner component with consistent styling
 */
export const LoadingSpinner = () => (
  <div className="loading-container" style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    fontSize: '18px',
    color: 'var(--text-secondary)'
  }}>
    <div>📡 Veriler yükleniyor...</div>
  </div>
);

interface ErrorMessageProps {
  message: string;
}

/**
 * Error message component with consistent styling
 */
export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="error-container" style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    fontSize: '18px',
    color: 'var(--accent-color)',
    textAlign: 'center'
  }}>
    <div>⚠️ {message}</div>
  </div>
);
