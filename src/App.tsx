/**
 * Main application component
 * 
 * This is the root component that manages application state and renders the main layout.
 * It handles theme switching, page navigation, and project modal interactions.
 */

import React, { useState, useEffect } from 'react';
import type { Theme, Page, Project } from './types';
import { useProjectData } from './hooks';
import { getInitialTheme, applyTheme, scrollToTop } from './utils';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { HomePage, AllProjectsPage, AboutPage } from './components/Pages';

export const App = () => {
  // Theme management
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  // Page navigation
  const [page, setPage] = useState<Page>('home');
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data loading
  const { games, tools, loading, error } = useProjectData();

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  
  // Scroll to top when page changes
  useEffect(() => {
    scrollToTop();
  }, [page]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const renderPage = () => {
    switch (page) {
      case 'games':
        return (
          <AllProjectsPage 
            title="Tüm Oyunlar" 
            projects={games} 
            onProjectClick={handleProjectClick}
            loading={loading}
            error={error}
          />
        );
      
      case 'tools':
        return (
          <AllProjectsPage 
            title="Tüm Araçlar" 
            projects={tools} 
            onProjectClick={handleProjectClick}
            loading={loading}
            error={error}
          />
        );
      
      case 'about':
        return <AboutPage />;
      
      case 'home':
      default:
        return (
          <HomePage 
            setPage={setPage} 
            onProjectClick={handleProjectClick}
            games={games}
            tools={tools}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <>
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        page={page} 
        setPage={setPage} 
      />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
      
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};
