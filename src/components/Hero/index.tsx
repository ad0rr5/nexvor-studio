/**
 * Hero section component for the home page
 */

import React from 'react';
import type { Page } from '../../types';
import { AnimatedSection } from '../UI';

interface HeroProps {
  setPage: (page: Page) => void;
}

export const Hero = ({ setPage }: HeroProps) => {
  const handleExploreClick = () => {
    setPage('games');
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        <AnimatedSection>
          <h1 className="hero-title">Gelecek Burada Başlıyor</h1>
          <p className="hero-subtitle">
            Yaratıcı oyunlar ve kullanışlı araçlarla fikirlerinizi hayata geçiriyoruz.
          </p>
          <button 
            onClick={handleExploreClick} 
            className="cta-button"
          >
            Projeleri Keşfet
          </button>
        </AnimatedSection>
      </div>
      <div className="hero-bg" aria-hidden="true"></div>
    </section>
  );
};
