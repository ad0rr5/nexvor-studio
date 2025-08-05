/**
 * Global Search Modal Component
 * Ctrl+K ile açılan gelişmiş arama sistemi
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Project, Page } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: Project[];
  tools: Project[];
  onProjectClick: (project: Project) => void;
  setPage: (page: Page) => void;
}

interface SearchResult {
  type: 'tool' | 'game' | 'page' | 'recent' | 'action';
  title: string;
  description: string;
  icon: string;
  action: () => void;
  category: string;
}

const PAGES: Array<{title: string, description: string, icon: string, page: Page}> = [
  { title: 'Ana Sayfa', description: 'Nexvor Studio ana sayfası', icon: '🏠', page: 'home' },
  { title: 'Araçlar', description: 'Tüm geliştirici araçları', icon: '🛠️', page: 'tools' },
  { title: 'Oyunlar', description: 'Eğlenceli browser oyunları', icon: '🎮', page: 'games' },
  { title: 'Hakkımızda', description: 'Nexvor Studio hakkında', icon: 'ℹ️', page: 'about' },
];

const QUICK_ACTIONS = [
  { title: 'Tema Değiştir', description: 'Dark/Light tema geçişi', icon: '🌙', action: 'theme' },
  { title: 'GitHub', description: 'Kaynak koda git', icon: '🔗', action: 'github' },
  { title: 'Geri Bildirim', description: 'Öneri ve şikayetler', icon: '📧', action: 'feedback' },
];

export const SearchModal = ({ 
  isOpen, 
  onClose, 
  games, 
  tools, 
  onProjectClick, 
  setPage 
}: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nexvor-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fuzzy search implementation
  const fuzzyMatch = (text: string, query: string): number => {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    if (textLower.includes(queryLower)) {
      return textLower.indexOf(queryLower) === 0 ? 100 : 80;
    }
    
    let score = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        score += 1;
        queryIndex++;
      }
    }
    
    return queryIndex === queryLower.length ? score * 10 : 0;
  };

  // Generate search results
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      // Show recent searches and quick actions when no query
      const recent = recentSearches.slice(0, 3).map(search => ({
        type: 'recent' as const,
        title: search,
        description: 'Son aramalardan',
        icon: '🕒',
        action: () => setQuery(search),
        category: 'Son Aramalar'
      }));

      const quickActions = QUICK_ACTIONS.map(action => ({
        type: 'action' as const,
        title: action.title,
        description: action.description,
        icon: action.icon,
        action: () => handleQuickAction(action.action),
        category: 'Hızlı İşlemler'
      }));

      return [...recent, ...quickActions];
    }

    const results: SearchResult[] = [];

    // Search in tools
    tools.forEach(tool => {
      const titleScore = fuzzyMatch(tool.title, query);
      const descScore = fuzzyMatch(tool.description, query);
      const maxScore = Math.max(titleScore, descScore);
      
      if (maxScore > 0) {
        results.push({
          type: 'tool',
          title: tool.title,
          description: tool.description,
          icon: tool.icon,
          action: () => {
            onProjectClick(tool);
            addToRecentSearches(query);
            onClose();
          },
          category: 'Araçlar'
        });
      }
    });

    // Search in games
    games.forEach(game => {
      if (game.title === 'YAKINDA OYUNLAR EKLENECEK') return;
      
      const titleScore = fuzzyMatch(game.title, query);
      const descScore = fuzzyMatch(game.description, query);
      const maxScore = Math.max(titleScore, descScore);
      
      if (maxScore > 0) {
        results.push({
          type: 'game',
          title: game.title,
          description: game.description,
          icon: game.icon,
          action: () => {
            onProjectClick(game);
            addToRecentSearches(query);
            onClose();
          },
          category: 'Oyunlar'
        });
      }
    });

    // Search in pages
    PAGES.forEach(page => {
      const titleScore = fuzzyMatch(page.title, query);
      const descScore = fuzzyMatch(page.description, query);
      const maxScore = Math.max(titleScore, descScore);
      
      if (maxScore > 0) {
        results.push({
          type: 'page',
          title: page.title,
          description: page.description,
          icon: page.icon,
          action: () => {
            setPage(page.page);
            addToRecentSearches(query);
            onClose();
          },
          category: 'Sayfalar'
        });
      }
    });

    return results.slice(0, 8); // Limit results
  }, [query, tools, games, recentSearches, onProjectClick, setPage, onClose]);

  const addToRecentSearches = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('nexvor-recent-searches', JSON.stringify(updated));
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'theme':
        // Theme toggle will be handled by parent
        document.querySelector('.theme-switcher')?.dispatchEvent(new Event('click'));
        break;
      case 'github':
        window.open('https://github.com/ad0rr5/nexvor-studio', '_blank');
        break;
      case 'feedback':
        window.open('mailto:info@nexvor.studio?subject=Nexvor Studio Geri Bildirim', '_blank');
        break;
    }
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            searchResults[selectedIndex].action();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, searchResults, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    searchResults.forEach(result => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [searchResults]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        {/* Search Header */}
        <div className="search-header">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Araçlar, oyunlar ve sayfalar arasında ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <kbd className="search-shortcut">ESC</kbd>
          </div>
        </div>

        {/* Search Results */}
        <div className="search-results" ref={resultsRef}>
          {Object.entries(groupedResults).map(([category, results]) => (
            <div key={category} className="search-category">
              <div className="search-category-title">{category}</div>
              {results.map((result, index) => {
                const globalIndex = searchResults.indexOf(result);
                return (
                  <div
                    key={`${result.type}-${result.title}`}
                    className={`search-result ${globalIndex === selectedIndex ? 'selected' : ''}`}
                    onClick={result.action}
                  >
                    <span className="search-result-icon">{result.icon}</span>
                    <div className="search-result-content">
                      <div className="search-result-title">{result.title}</div>
                      <div className="search-result-description">{result.description}</div>
                    </div>
                    <span className="search-result-type">{result.type}</span>
                  </div>
                );
              })}
            </div>
          ))}

          {searchResults.length === 0 && query && (
            <div className="search-no-results">
              <span className="search-no-results-icon">🔍</span>
              <div className="search-no-results-text">
                <div>Sonuç bulunamadı</div>
                <div>"{query}" için herhangi bir sonuç bulunamadı</div>
              </div>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="search-footer">
          <div className="search-shortcuts">
            <kbd>↑↓</kbd> Gezin
            <kbd>Enter</kbd> Seç
            <kbd>ESC</kbd> Kapat
          </div>
        </div>
      </div>
    </div>
  );
};