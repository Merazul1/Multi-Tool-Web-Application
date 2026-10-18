import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToolAnalytics } from '../types';

export type MainTab = 
  | 'home' 
  | 'all-tools' 
  | 'time-hub' 
  | 'seo-suite' 
  | 'code-tools' 
  | 'text-tools' 
  | 'media-tools' 
  | 'analytics' 
  | 'blueprint';

interface ToolContextType {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  activeToolId: string | null;
  openTool: (toolId: string) => void;
  closeTool: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  analytics: ToolAnalytics;
  recordToolAction: (toolId: string, minutesSaved?: number) => void;
  showBlueprintModal: boolean;
  setShowBlueprintModal: (show: boolean) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<MainTab>('home');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);

  // Favorites in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('toolverse_favorites');
      return saved ? JSON.parse(saved) : ['countdown-calculator', 'code-minifier', 'text-formatter', 'ai-seo-previewer'];
    } catch {
      return ['countdown-calculator', 'code-minifier', 'text-formatter', 'ai-seo-previewer'];
    }
  });

  // Dark mode in localStorage / classList
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('toolverse_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Analytics
  const [analytics, setAnalytics] = useState<ToolAnalytics>(() => {
    try {
      const saved = localStorage.getItem('toolverse_analytics');
      return saved ? JSON.parse(saved) : {
        toolsUsedCount: 4,
        totalActionsCount: 18,
        estimatedMinutesSaved: 54,
        recentTools: ['countdown-calculator', 'code-minifier', 'ai-seo-previewer']
      };
    } catch {
      return {
        toolsUsedCount: 4,
        totalActionsCount: 18,
        estimatedMinutesSaved: 54,
        recentTools: ['countdown-calculator', 'code-minifier', 'ai-seo-previewer']
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('toolverse_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('toolverse_theme', darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('toolverse_analytics', JSON.stringify(analytics));
    } catch (e) {
      console.error(e);
    }
  }, [analytics]);

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const openTool = (toolId: string) => {
    setActiveToolId(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    recordToolAction(toolId, 2);
  };

  const closeTool = () => {
    setActiveToolId(null);
  };

  const setActiveTab = (tab: MainTab) => {
    setActiveTabState(tab);
    setActiveToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recordToolAction = (toolId: string, minutesSaved = 3) => {
    setAnalytics(prev => {
      const recent = [toolId, ...prev.recentTools.filter(id => id !== toolId)].slice(0, 6);
      return {
        toolsUsedCount: Array.from(new Set([...prev.recentTools, toolId])).length,
        totalActionsCount: prev.totalActionsCount + 1,
        estimatedMinutesSaved: prev.estimatedMinutesSaved + minutesSaved,
        recentTools: recent
      };
    });
  };

  return (
    <ToolContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeToolId,
        openTool,
        closeTool,
        searchQuery,
        setSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        darkMode,
        toggleDarkMode,
        analytics,
        recordToolAction,
        showBlueprintModal,
        setShowBlueprintModal,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
};
