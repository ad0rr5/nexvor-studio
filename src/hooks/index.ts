/**
 * Custom hooks for application state and effects
 */

import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { validateProjectData, sanitizeText } from '../utils/security';
import { gamesData, toolsData } from '../data';

/**
 * Hook for managing intersection observer with lazy loading
 */
export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
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
