/**
 * Footer component with social links and copyright
 */

import React from 'react';

/**
 * Social media links configuration
 */
const SOCIAL_LINKS = [
  { href: '#', label: 'Twitter', text: 'T' },
  { href: '#', label: 'Discord', text: 'D' },
  { href: '#', label: 'Instagram', text: 'I' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <p>&copy; {currentYear} Nexvor Studio. Tüm hakları saklıdır.</p>
        <div className="social-links">
          {SOCIAL_LINKS.map(({ href, label, text }) => (
            <a 
              key={label}
              href={href} 
              aria-label={label}
              title={label}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
