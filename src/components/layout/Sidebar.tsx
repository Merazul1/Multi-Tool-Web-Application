import React from 'react';
import { 
  Home, 
  Grid, 
  CalendarClock, 
  SearchCheck, 
  Code2, 
  Type, 
  Image, 
  BarChart3, 
  BookOpen, 
  Heart,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useToolContext, MainTab } from '../../context/ToolContext';
import { TOOLS_LIST } from '../../data/toolsData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, favorites, openTool, setShowBlueprintModal } = useToolContext();

  const navItems: { id: MainTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'all-tools', label: 'All Tools', icon: <Grid className="w-4 h-4" />, badge: `${TOOLS_LIST.length}` },
    { id: 'time-hub', label: 'FailFlow Countdowns', icon: <CalendarClock className="w-4 h-4" />, badge: '$12K' },
    { id: 'seo-suite', label: 'AI SEO Studio', icon: <SearchCheck className="w-4 h-4" />, badge: 'Low Comp' },
    { id: 'code-tools', label: 'Code & Dev Utilities', icon: <Code2 className="w-4 h-4" /> },
    { id: 'text-tools', label: 'Text & Formatter', icon: <Type className="w-4 h-4" /> },
    { id: 'media-tools', label: 'Image & Banner Lab', icon: <Image className="w-4 h-4" /> },
    { id: 'analytics', label: 'Usage & Stats', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: MainTab) => {
    setActiveTab(tab);
    onClose();
  };

  const favoriteTools = TOOLS_LIST.filter(t => favorites.includes(t.id));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-16 md:top-24.5 z-30
        h-[calc(100vh-4rem)] md:h-[calc(100vh-6.2rem)]
        w-64 shrink-0 bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-800
        transition-transform duration-300 ease-in-out
        flex flex-col justify-between overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigation
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : item.badge === '$12K'
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Access Favorites */}
          {favoriteTools.length > 0 && (
            <div>
              <div className="px-2 mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                  Pinned Tools
                </span>
                <span className="text-[10px]">{favoriteTools.length}</span>
              </div>
              <div className="space-y-1">
                {favoriteTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      openTool(tool.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left truncate cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="truncate">{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Highlight Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-blue-200/60 dark:border-blue-900/50">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Niche Strategy</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5">
              Target low-competition programmatic search keywords like FailFlow to generate $12K/month.
            </p>
            <button
              onClick={() => {
                setShowBlueprintModal(true);
                onClose();
              }}
              className="w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Read Blueprint</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Data Stored</span>
          </div>
          <span className="font-mono text-[10px]">v2.4.0</span>
        </div>
      </aside>
    </>
  );
};
