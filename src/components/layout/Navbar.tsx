import React from 'react';
import { 
  Wrench, 
  Search, 
  Sun, 
  Moon, 
  Lock, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    darkMode, 
    toggleDarkMode, 
    setShowBlueprintModal, 
    closeTool, 
    activeToolId 
  } = useToolContext();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs">
      {/* Top Browser URL Bar Mockup (directly from Screenshot 1 & 2) */}
      <div className="hidden md:flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
          </div>
          <button 
            onClick={() => closeTool()}
            disabled={!activeToolId}
            className={`p-1 rounded-md transition-colors ${activeToolId ? 'hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200' : 'opacity-40 cursor-not-allowed'}`}
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-md text-slate-400 cursor-not-allowed">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar center */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md w-96 max-w-md shadow-2xs">
          <Lock className="w-3 h-3 text-emerald-500" />
          <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-medium tracking-tight">
            https://yourtool.com<span className="text-blue-600 dark:text-blue-400">{activeToolId ? `/#/${activeToolId}` : ''}</span>
          </span>
          <span className="ml-auto text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded font-mono font-semibold">
            SSL ACTIVE
          </span>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">100% Client-Side • 0ms Latency</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => closeTool()}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                ToolVerse
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                  v2.4
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Free Business & Web Utilities
              </span>
            </div>
          </button>
        </div>

        {/* Global Live Search */}
        <div className="flex-1 max-w-lg mx-2 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (minifier, countdown, meta tags, text)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Blueprint Pill ($12K/Month Breakdown button) */}
          <button
            onClick={() => setShowBlueprintModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 rounded-lg transition-all shadow-xs cursor-pointer group"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">$12K/Mo Blueprint</span>
            <span className="inline md:hidden">$12K Case</span>
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
