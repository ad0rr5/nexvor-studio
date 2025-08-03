/**
 * About section component for home page
 */

import React from 'react';
import type { Page } from '../../types';
import { AnimatedSection } from '../UI';

interface AboutSectionProps {
  setPage: (page: Page) => void;
}

export const AboutSection = ({ setPage }: AboutSectionProps) => {
  const handleReadMoreClick = () => {
    setPage('about');
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">Biz Kimiz?</h2>
          <p className="about-text">
            2025 yılında henüz lise çağında olan 4 genç girişimci tarafından kurulan Nexvor Studio, 
            teknolojiye olan tutkuyla doğdu. Yaşımız küçük ama hayallerimiz büyük! Oyun geliştirme 
            ve pratik dijital çözümler üretme konusundaki kararlılığımızla, geleceğin teknoloji 
            dünyasında iz bırakmayı hedefliyoruz.
          </p>
          <button 
            onClick={handleReadMoreClick} 
            className="cta-button secondary"
          >
            Hikayemizin Devamı
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};
