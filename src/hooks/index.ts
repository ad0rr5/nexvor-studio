/**
 * Custom hooks for application state and effects
 */

import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { validateProjectData, sanitizeText } from '../utils/security';
import { gamesData, toolsData } from '../data';

/**
 * Hook for managing intersection observer with lazy loading and staggered animations
 */
export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Add staggered animation to children
        const children = entry.target.querySelectorAll('.project-card, .section-fade-in');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible] as const;
};

/**
 * Hook for scroll progress indicator
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled * 100);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress;
};

/**
 * Hook for smooth page transitions
 */
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  return { isTransitioning, transitionTo };
};

/**
 * Hook for floating background elements
 */
export const useFloatingElements = () => {
  useEffect(() => {
    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 15 + 's';
      element.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      const container = document.querySelector('.floating-elements');
      if (container) {
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 20000);
      }
    };

    // Create floating elements periodically
    const interval = setInterval(createFloatingElement, 3000);
    
    // Create initial elements
    for (let i = 0; i < 5; i++) {
      setTimeout(createFloatingElement, i * 1000);
    }

    return () => clearInterval(interval);
  }, []);
};

/**
 * Hook for mouse parallax effect
 */
export const useMouseParallax = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.project-card');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - cardCenterX) * 0.01;
        const deltaY = (e.clientY - cardCenterY) * 0.01;
        
        (card as HTMLElement).style.transform = `
          translateX(${deltaX}px) 
          translateY(${deltaY}px) 
          rotateX(${deltaY * 0.5}deg) 
          rotateY(${deltaX * 0.5}deg)
        `;
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = '';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

/**
 * Hook for global search functionality
 */
export const useGlobalSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // Forward slash to open search (like GitHub)
      if (e.key === '/' && !isSearchOpen) {
        // Don't trigger if user is typing in an input
        const activeElement = document.activeElement;
        if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return {
    isSearchOpen,
    openSearch,
    closeSearch
  };
};

/**
 * Hook for loading project data from static imports
 */
export const useProjectData = () => {
  const [games, setGames] = useState<Project[]>([]);
  const [tools, setTools] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Validate and sanitize imported data
        const processedGames = processProjectData(gamesData);
        const processedTools = processProjectData(toolsData);
        
        setGames(processedGames);
        setTools(processedTools);
      } catch (err) {
        console.error('Error loading project data:', err);
        setError('Veri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { games, tools, loading, error };
};

/**
 * Process and validate project data
 */
const processProjectData = (data: Project[]): Project[] => {
  const validatedProjects: Project[] = [];
  
  for (const item of data) {
    if (validateProjectData(item)) {
      // Sanitize text fields to prevent XSS
      const sanitizedProject: Project = {
        ...item,
        title: sanitizeText(item.title),
        description: sanitizeText(item.description),
        icon: sanitizeText(item.icon),
        detailedDescription: item.detailedDescription ? sanitizeText(item.detailedDescription) : undefined,
        features: item.features ? item.features.map((feature: string) => sanitizeText(feature)) : undefined,
        link: item.link ? item.link : undefined // URL validation will be done at component level
      };
      validatedProjects.push(sanitizedProject);
    } else {
      console.warn('Invalid project data detected and filtered out:', item);
    }
  }
  
  return validatedProjects;
};
