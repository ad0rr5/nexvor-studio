/**
 * Modal component for displaying detailed project information
 */

import React, { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { toggleBodyScroll, createEscapeHandler, validateURL, escapeHtml } from '../../utils';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ANIMATION_DURATION = 300;

export const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle modal open/close state
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setIsClosing(false);
      toggleBodyScroll(true);
    } else {
      toggleBodyScroll(false);
    }

    return () => toggleBodyScroll(false);
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = createEscapeHandler(handleClose);

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setMounted(false);
      setIsClosing(false);
      onClose();
    }, ANIMATION_DURATION);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!mounted || !project) return null;

  return (
    <div
      className={`modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleOverlayClick}
      style={{ pointerEvents: isClosing ? 'none' : 'auto' }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Modalı kapat"
        >
          ×
        </button>

        <ModalHeader project={project} />
        <ModalBody project={project} />
        <ModalFooter project={project} onLinkClick={handleLinkClick} />
      </div>
    </div>
  );
};

const ModalHeader = ({ project }: { project: Project }) => (
  <div className="modal-header">
    <div className="modal-icon" aria-hidden="true">
      {project.icon}
    </div>
    <h2 id="modal-title">{project.title}</h2>
  </div>
);

const ModalBody = ({ project }: { project: Project }) => (
  <div className="modal-body">
    <p id="modal-description" className="modal-description">
      {project.detailedDescription || project.description}
    </p>

    {project.features && project.features.length > 0 && (
      <div className="modal-features">
        <h3>Özellikler:</h3>
        <ul>
          {project.features.map((feature, index) => (
            <li
              key={index}
              style={{ animationDelay: `${0.7 + index * 0.1}s` }}
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

interface ModalFooterProps {
  project: Project;
  onLinkClick: (event: React.MouseEvent) => void;
}

const ModalFooter = ({ project, onLinkClick }: ModalFooterProps) => {
  // Validate and sanitize the link before rendering
  const safeLink = project.link ? validateURL(project.link) : null;

  const handleSecureClick = (e: React.MouseEvent) => {
    onLinkClick(e);
    if (safeLink && safeLink !== '#') {
      // Ensure the link opens in a secure context
      const newWindow = window.open(safeLink, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        newWindow.opener = null;
      }
    }
    e.preventDefault();
    return false;
  };

  // Determine button text based on project type
  const getButtonText = () => {
    return '🚀 Projeye Git';
  };

  return (
    <div className="modal-footer">
      {safeLink && safeLink !== '#' && (
        <a
          href={safeLink}
          target="_blank"
          rel="noopener noreferrer nofollow" // Added nofollow for additional security
          className="modal-link-btn"
          onClick={handleSecureClick}
        >
          {getButtonText()}
        </a>
      )}
    </div>
  );
};
