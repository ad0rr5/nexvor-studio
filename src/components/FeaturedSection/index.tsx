/**
 * Featured projects section component
 */

import React from 'react';
import type { Project } from '../../types';
import { AnimatedSection } from '../UI';
import { ProjectCard } from '../ProjectCard';

interface FeaturedSectionProps {
  id: string;
  title: string;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const FeaturedSection = ({ id, title, projects, onProjectClick }: FeaturedSectionProps) => {
  return (
    <section id={id} className="featured-section">
      <div className="container">
        <AnimatedSection>
          <h2 className="section-title">{title}</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <AnimatedSection key={project.id}>
                <ProjectCard 
                  project={project} 
                  onClick={() => onProjectClick(project)}
                />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
