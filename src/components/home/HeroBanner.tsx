import React from 'react';
import { Search, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

interface HeroBannerProps {
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ selectedCategory, onSelectCategory }) => {
  const { searchQuery, setSearchQuery } = useToolContext();

  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'code', label: 'Code Minifiers' },
    { id: 'text', label: 'Text Formatters' },
    { id: 'time', label: 'Date & Countdowns' },
    { id: 'seo', label: 'AI SEO & SERP' },
    { id: 'media', label: 'Image & OG' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-600 via-indigo-600 to-indigo-700 text-white p-6 sm:p-10 shadow-xl shadow-blue-500/10">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>High-Utility Micro Tools Suite</span>
          <span className="hidden sm:inline-block text-white/40">•</span>
          <span className="hidden sm:inline-block text-emerald-300">Fast & Zero-Config</span>
        </div>

        {/* Title from Screenshot 1 */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Powerful Tools for Your Business
        </h1>

        <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto leading-relaxed">
          Clean, compress, calculate, and optimize your web assets in seconds. All utilities execute locally in your browser for absolute data privacy.
        </p>

        {/* Search bar from Screenshot 1 */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-2xl border border-white/20 dark:border-slate-800">
            <div className="pl-3.5 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a tool (e.g. minifier, countdown, meta tags)..."
              className="flex-1 px-3 py-2.5 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button
              onClick={() => {}}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer
                ${selectedCategory === cat.id
                  ? 'bg-white text-blue-700 font-semibold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Feature Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-blue-100/80">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Instant Execution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-300"></span>
            <span>No Account Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
