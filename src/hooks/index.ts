/**
 * Custom hooks for application state and effects
 */

import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { validateProjectData, sanitizeText } from '../utils/security';

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
 * Hook for loading project data from JSON files
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
        
        const [gamesData, toolsData] = await Promise.all([
          loadJSONData('/data/games.json'),
          loadJSONData('/data/tools.json')
        ]);
        
        setGames(gamesData);
        setTools(toolsData);
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
 * Utility function to load JSON data from a given path with security validation
 */
const loadJSONData = async (path: string): Promise<Project[]> => {
  try {
    // Validate path to prevent directory traversal attacks
    if (!path || typeof path !== 'string' || path.includes('..') || path.includes('\\')) {
      throw new Error('Invalid file path');
    }
    
    // Only allow specific data files from the data directory
    const allowedPaths = ['/data/games.json', '/data/tools.json'];
    if (!allowedPaths.includes(path)) {
      throw new Error('Unauthorized file access');
    }
    
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate that response is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format: expected array');
    }
    
    // Validate and sanitize each project object
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
  } catch (error) {
    console.error(`Error loading data from ${path}:`, error);
    return [];
  }
};
