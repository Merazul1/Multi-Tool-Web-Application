import React from 'react';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Zap, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

export const BlueprintModal: React.FC = () => {
  const { showBlueprintModal, setShowBlueprintModal } = useToolContext();

  if (!showBlueprintModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setShowBlueprintModal(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Top Gradient Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shrink-0">
          <button
            onClick={() => setShowBlueprintModal(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-300" />
            <span>SEO Case Study & Revenue Breakdown</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            How "Boring" Tool Websites Make $12,000/Month
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            A step-by-step deconstruction of the FailFlow & AI SEO micro-utilities strategy highlighted in the reels by @ghulam_ali_seo.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Monthly Revenue</div>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">$12,000+</div>
              <div className="text-[10px] text-slate-400">Ads + Affiliates</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Domain Rating</div>
              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">DR 17</div>
              <div className="text-[10px] text-slate-400">Low authority needed</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Server Costs</div>
              <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">$0.00/mo</div>
              <div className="text-[10px] text-slate-400">100% Client-side JS</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Search Keywords</div>
              <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">140,000+</div>
              <div className="text-[10px] text-slate-400">Programmatic queries</div>
            </div>
          </div>

          {/* Section 1: The Secret Sauce */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              1. The Programmatic SEO Multiplier
            </h3>
            <p className="leading-relaxed">
              Sites like FailFlow don't write hundreds of manual articles. Instead, they use <strong>programmatic page templates</strong> targeting ultra-specific low-competition intent:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900 font-mono text-blue-800 dark:text-blue-300">
                • /weeks-until/christmas-2026<br/>
                • /weeks-until/summer<br/>
                • /days-until/thanksgiving
              </div>
              <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900 font-mono text-purple-800 dark:text-purple-300">
                • /tools/code-minifier/css<br/>
                • /tools/text-formatter/slug<br/>
                • /tools/meta-tag-generator
              </div>
            </div>
            <p className="leading-relaxed">
              Every single combination is an indexable landing page that satisfies search queries with 0 latency.
            </p>
          </div>

          {/* Section 2: Why Low Competition */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-500" />
              2. Why Niche Tools Beat Traditional Blogs
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>No AI Content Penalties:</strong> Google algorithms frequently penalize generic AI articles, but high-utility calculators and tools have high dwell time and zero bounce rate.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Natural Backlinks:</strong> Developers, bloggers, and students naturally link to utilities (e.g. GitHub repos, school bookmarks, Reddit threads).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Zero Server Overhead:</strong> Since every tool runs inside the visitor's browser (React + HTML5 Canvas + Web APIs), you can serve 2 million visits per month on free Vercel or Cloudflare hosting.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Revenue Streams */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              3. The $12K Monthly Revenue Breakdown
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold">Display Ad Networks (Mediavine / Raptive at $25 RPM)</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$7,500/mo</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
                <span className="font-semibold">Affiliate Partnerships (Cloud hosting, Semrush, VPNs)</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$3,200/mo</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold">Pro Supporter Pass / Ad-Free Micro SaaS</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">$1,300/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Strategy Source: @ghulam_ali_seo Case Study
          </span>
          <button
            onClick={() => setShowBlueprintModal(false)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Got It! Close
          </button>
        </div>
      </div>
    </div>
  );
};
