import React from 'react';
import { 
  Code2, 
  Type, 
  CalendarClock, 
  SearchCheck, 
  BarChart3, 
  Bot, 
  Image, 
  Link2, 
  Heart, 
  ArrowRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { ToolMetadata } from '../../types';
import { useToolContext } from '../../context/ToolContext';

interface ToolCardProps {
  tool: ToolMetadata;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { openTool, isFavorite, toggleFavorite } = useToolContext();
  const favorited = isFavorite(tool.id);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Type': return <Type className="w-5 h-5" />;
      case 'CalendarClock': return <CalendarClock className="w-5 h-5" />;
      case 'SearchCheck': return <SearchCheck className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Link2': return <Link2 className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'code': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
      case 'text': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
      case 'time': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800';
      case 'seo': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
      case 'media': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Card Header: Icon, Category Badge, Favorite button */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${getCategoryColor(tool.category)}`}>
              {renderIcon(tool.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {tool.category}
                </span>
                {tool.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    tool.badge === '$12K Niche'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-bold'
                      : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Tagline & Description */}
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1.5">
          {tool.tagline}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>

        {/* SEO Opportunity Stats (connecting to Screenshot 3 & 4) */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Vol: <strong className="text-slate-700 dark:text-slate-300">{tool.monthlySearches}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Niche: <strong className="text-emerald-600 dark:text-emerald-400">{tool.revenuePotential}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Instant / Local
        </span>
        <button
          onClick={() => openTool(tool.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer group-hover:bg-blue-600 group-hover:text-white"
        >
          <span>Launch</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
