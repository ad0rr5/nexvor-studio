/**
 * Project card component for displaying project information
 */

import React from 'react';
import type { Project } from '../../types';
import { escapeHtml } from '../../utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const handleClick = () => {
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  // Escape HTML to prevent XSS attacks
  const safeTitle = escapeHtml(project.title);
  const safeDescription = escapeHtml(project.description);
  const safeIcon = escapeHtml(project.icon);

  return (
    <div 
      className="project-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${safeTitle} hakkında daha fazla bilgi`}
    >
      <div className="project-card-icon" aria-hidden="true">
        {safeIcon}
      </div>
      <h3 
        className="project-card-title"
        dangerouslySetInnerHTML={{ __html: safeTitle }}
      />
      <p 
        className="project-card-description"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      />
      <button 
        className="project-card-link"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        Daha Fazla Bilgi &rarr;
      </button>
    </div>
  );
};
