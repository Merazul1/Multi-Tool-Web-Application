import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  Sparkles, 
  Clock, 
  Flame, 
  ArrowRight, 
  Calendar,
  Hourglass
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

export const FailFlowLiveWidget: React.FC = () => {
  const { openTool, setShowBlueprintModal } = useToolContext();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Time calculations
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 1. Today's progress: percentage of 24h passed
  const todaySecondsPassed = hours * 3600 + minutes * 60 + seconds;
  const todayPercent = ((todaySecondsPassed / 86400) * 100).toFixed(1);

  // 2. Month's progress
  const currentDayOfMonth = now.getDate();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthPercent = ((currentDayOfMonth / daysInMonth) * 100).toFixed(1);
  const monthName = now.toLocaleString('default', { month: 'long' });

  // 3. Year's progress
  const startOfYear = new Date(year, 0, 1);
  const diffTime = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;
  const yearPercent = ((dayOfYear / daysInYear) * 100).toFixed(1);
  const currentWeek = Math.ceil(dayOfYear / 7);
  const weeksLeft = 52 - currentWeek;

  // Format live full date string
  const formattedDateTime = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header section with FailFlow $12K/mo badge from Screenshot 2 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              <Flame className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              FailFlow Case Study • $12K/Month
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300">
              Domain Rating: 17
            </span>
            <span className="text-xs text-slate-400">Zero Server Cost</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Count down to anything.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Live day-and-week countdowns, plus fast calculators for the days, weeks, and durations between any two dates.
          </p>
        </div>

        {/* Live Clock Card */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 shadow-md min-w-[280px]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Live Local Time
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="font-mono text-xl font-bold tracking-tight text-white">
            {formattedTime}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {formattedDateTime}
          </div>
        </div>
      </div>

      {/* Live Time Progress Bars (from top-right of FailFlow screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Today's Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span>TODAY</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">{todayPercent}% complete</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${todayPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex justify-between">
            <span>{hours}h {minutes}m elapsed</span>
            <span>{23 - hours}h remaining</span>
          </div>
        </div>

        {/* Month Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span className="uppercase">{monthName}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">Day {currentDayOfMonth} of {daysInMonth}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${monthPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex justify-between">
            <span>{monthPercent}% of month</span>
            <span>{daysInMonth - currentDayOfMonth} days left</span>
          </div>
        </div>

        {/* Year Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <span>YEAR {year}</span>
            <span className="text-purple-600 dark:text-purple-400 font-mono">Week {currentWeek} of 52</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${yearPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 flex justify-between">
            <span>{yearPercent}% passed</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">{weeksLeft} weeks left</span>
          </div>
        </div>
      </div>

      {/* 4 Micro Calculator Cards (matching Screenshot 2 directly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        {/* Weeks Until Any Date */}
        <button
          onClick={() => openTool('countdown-calculator')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <CalendarClock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            Weeks Until Any Date
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pick any future date and see remaining weeks and precision days.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mt-3">
            <span>Open Tool</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Days Until Any Date */}
        <button
          onClick={() => openTool('countdown-calculator')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
            Days Until Any Date
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Live days countdown with hours, minutes, and seconds.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-3">
            <span>Open Tool</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Date Duration */}
        <button
          onClick={() => openTool('countdown-calculator')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Hourglass className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
            Date Duration
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calculate business days, total weeks, and months between two dates.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mt-3">
            <span>Open Tool</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Weeks Left in Year */}
        <button
          onClick={() => openTool('countdown-calculator')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
            Weeks Left in {year}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track annual milestones with live holiday countdown cards.
          </p>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mt-3">
            <span>Open Tool</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Blueprint CTA bar */}
      <div className="mt-5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-blue-700 dark:text-blue-400">SEO Strategy Note:</span>
          <span>FailFlow ranks for over 120,000 keyword permutations like "weeks until christmas" and "how many days until [date]".</span>
        </div>
        <button 
          onClick={() => setShowBlueprintModal(true)}
          className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0 cursor-pointer"
        >
          View Full Breakdown →
        </button>
      </div>
    </div>
  );
};
