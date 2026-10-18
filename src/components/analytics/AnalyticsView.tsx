import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';
import { TOOLS_LIST } from '../../data/toolsData';

export const AnalyticsView: React.FC = () => {
  const { analytics, openTool } = useToolContext();

  const recentToolItems = TOOLS_LIST.filter(t => analytics.recentTools.includes(t.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Usage & Productivity Analytics
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Local Only
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal telemetry on operations completed, estimated hours saved, and tool access frequency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Server Storage</span>
        </div>
      </div>

      {/* 3 Big Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Actions Performed</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
            {analytics.totalActionsCount}
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Minifications, conversions & calculations</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Time Saved</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
            {analytics.estimatedMinutesSaved} mins
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span>{(analytics.estimatedMinutesSaved / 60).toFixed(1)} hours of manual busywork avoided</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Unique Tools Explored</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400 font-mono">
            {analytics.toolsUsedCount} / {TOOLS_LIST.length}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            <span>{Math.round((analytics.toolsUsedCount / TOOLS_LIST.length) * 100)}% of suite utilized</span>
          </div>
        </div>
      </div>

      {/* Recently Used Tools */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Recently Active Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentToolItems.map(tool => (
            <div
              key={tool.id}
              onClick={() => openTool(tool.id)}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {tool.tagline}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
