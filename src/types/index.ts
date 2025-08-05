/**
 * Type definitions for the application
 */

export type Theme = 'light' | 'dark';
export type Page = 'home' | 'games' | 'tools' | 'about';

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  detailedDescription?: string;
  features?: string[];
  link?: string;
}
