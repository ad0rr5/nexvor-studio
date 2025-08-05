/**
 * Main navigation header component
 */

import React, { useState, useEffect } from 'react';
import type { Theme, Page } from '../../types';
import { MenuIcon, CloseIcon } from '../Icons';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { toggleBodyScroll } from '../../utils';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  page: Page;
  setPage: (page: Page) => void;
  onSearchOpen?: () => void;
}

/**
 * Navigation menu items configuration
 */
const MENU_ITEMS = [
  { key: 'home' as Page, label: 'Ana Sayfa' },
  { key: 'games' as Page, label: 'Oyunlar' },
  { key: 'tools' as Page, label: 'Araçlar' },
  { key: 'about' as Page, label: 'Hakkımızda' },
];

export const Header = ({ theme, toggleTheme, page, setPage, onSearchOpen }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu and prevent body scroll when menu state changes
  useEffect(() => {
    toggleBodyScroll(menuOpen);
    return () => toggleBodyScroll(false);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  const handleNavClick = (targetPage: Page) => {
    setPage(targetPage);
    setMenuOpen(false);
  };

  const handleLogoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    handleNavClick('home');
  };

  return (
    <header className="app-header">
      <div className="container header-content">
        <div className="logo">
          <a href="#" onClick={handleLogoClick}>
            <img 
              src="https://i.hizliresim.com/k5rhilk.jpeg?_gl=1*1noivgx*_ga*MTYxODg5OTcwNS4xNzU0MjMyOTc2*_ga_M9ZRXYS2YN*czE3NTQyMzI5NzUkbzEkZzEkdDE3NTQyMzI5ODgkajQ3JGwwJGgw" 
              alt="Nexvor Studio Logo" 
              className="logo-image"
            />
            <span className="logo-text">Nexvor Studio</span>
          </a>
        </div>
        
        {/* Search Button */}
        {onSearchOpen && (
          <button 
            className="search-trigger"
            onClick={onSearchOpen}
            aria-label="Arama yap"
            title="Arama (Ctrl+K)"
          >
            <span className="search-trigger-icon">🔍</span>
            <span className="search-trigger-text">Ara...</span>
            <kbd className="search-trigger-shortcut">⌘K</kbd>
          </button>
        )}

        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            {MENU_ITEMS.map(({ key, label }) => (
              <li key={key}>
                <button 
                  onClick={() => handleNavClick(key)} 
                  className={page === key ? 'active' : ''}
                  aria-current={page === key ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </li>
          </ul>
        </nav>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMenu} 
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
};
