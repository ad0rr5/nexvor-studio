/**
 * Footer component with comprehensive links and information
 */

import React from 'react';
import type { Page } from '../../types';

interface FooterProps {
  setPage?: (page: Page) => void;
}

/**
 * Social media links configuration
 */
const SOCIAL_LINKS = [
  { 
    href: 'https://github.com/ad0rr5/nexvor-studio', 
    label: 'GitHub', 
    icon: '🔗',
    description: 'Kaynak Kod'
  },
  { 
    href: 'https://discord.gg/nexvor', 
    label: 'Discord', 
    icon: '💬',
    description: 'Topluluk'
  },
  { 
    href: 'https://twitter.com/nexvorstudio', 
    label: 'Twitter', 
    icon: '🐦',
    description: 'Güncellemeler'
  },
  { 
    href: 'mailto:info@nexvor.studio', 
    label: 'Email', 
    icon: '📧',
    description: 'İletişim'
  },
];

/**
 * Quick links configuration
 */
const QUICK_LINKS = [
  { label: 'Ana Sayfa', page: 'home' as Page },
  { label: 'Araçlar', page: 'tools' as Page },
  { label: 'Oyunlar', page: 'games' as Page },
  { label: 'Hakkımızda', page: 'about' as Page },
];

/**
 * Project links configuration
 */
const PROJECT_LINKS = [
  { 
    label: 'Renk Paleti Oluşturucu', 
    href: './apps/nexvor-palette.html',
    description: 'AI destekli renk paleti aracı'
  },
  { 
    label: 'QR Kod Oluşturucu', 
    href: './apps/nexvor-qr-fixed.html',
    description: '6 format destekli QR generator'
  },
  { 
    label: 'Dosya Dönüştürücü', 
    href: './apps/nexvor-pdf-to-png.html',
    description: 'Universal format converter'
  },
  { 
    label: 'Typing Speed Test', 
    href: './apps/nexvor-typing-test-v2.html',
    description: '10FastFingers tarzı test'
  },
];

export const Footer = ({ setPage }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  const handlePageClick = (page: Page) => {
    if (setPage) {
      setPage(page);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="app-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-text">Nexvor Studio</span>
              <span className="footer-logo-tagline">Geleceğin Teknoloji Liderleri</span>
            </div>
            <p className="footer-description">
              Modern web araçları ve yaratıcı oyunlarla dijital dünyada fark yaratıyoruz. 
              Kullanıcı deneyimini ön planda tutarak, teknolojinin gücünü herkes için erişilebilir kılıyoruz.
            </p>
            <div className="footer-stats">
              <div className="footer-stat">
                <span className="footer-stat-number">4</span>
                <span className="footer-stat-label">Aktif Araç</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">95+</span>
                <span className="footer-stat-label">Performance Score</span>
              </div>
              <div className="footer-stat">
                <span className="footer-stat-number">2025</span>
                <span className="footer-stat-label">Kuruluş Yılı</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Hızlı Erişim</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map(({ label, page }) => (
                <li key={page}>
                  <button 
                    onClick={() => handlePageClick(page)}
                    className="footer-link"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="footer-section">
            <h3 className="footer-section-title">Popüler Araçlar</h3>
            <ul className="footer-links">
              {PROJECT_LINKS.map(({ label, href, description }) => (
                <li key={label}>
                  <a 
                    href={href}
                    className="footer-link"
                    title={description}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="footer-section">
            <h3 className="footer-section-title">Bağlantılar</h3>
            <div className="footer-social">
              {SOCIAL_LINKS.map(({ href, label, icon, description }) => (
                <a 
                  key={label}
                  href={href}
                  className="footer-social-link"
                  aria-label={label}
                  title={description}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer-social-icon">{icon}</span>
                  <span className="footer-social-text">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} Nexvor Studio. Tüm hakları saklıdır.</p>
            <p className="footer-version">v2.0 - Modern Web Toolkit</p>
          </div>
          <div className="footer-bottom-right">
            <span className="footer-tech-stack">
              React + TypeScript + Vite
            </span>
            <span className="footer-performance">
              ⚡ 285kB Bundle • 🚀 95+ Score
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
