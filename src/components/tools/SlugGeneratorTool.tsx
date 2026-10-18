import React, { useState, useMemo } from 'react';
import { 
  Link2, 
  Copy, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'
]);

export const SlugGeneratorTool: React.FC = () => {
  const { recordToolAction } = useToolContext();
  const [inputTitle, setInputTitle] = useState('How to Build a $12,000/Month Tool Website in 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState<number>(60);
  const [copied, setCopied] = useState(false);

  const generatedSlug = useMemo(() => {
    if (!inputTitle.trim()) return '';

    let text = inputTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // strip accents

    if (removeNumbers) {
      text = text.replace(/[0-9]/g, '');
    }

    let words = text
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    if (removeStopWords) {
      words = words.filter(w => !STOP_WORDS.has(w));
    }

    let slug = words.join(separator);
    if (maxLength > 0 && slug.length > maxLength) {
      slug = slug.substring(0, maxLength).replace(new RegExp(`\\${separator}+$`), '');
    }
    return slug;
  }, [inputTitle, separator, removeStopWords, removeNumbers, maxLength]);

  const handleCopy = () => {
    if (!generatedSlug) return;
    navigator.clipboard.writeText(generatedSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    recordToolAction('slug-generator', 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              SEO URL Slug Optimizer
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Permalink Polish
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clean, compact, and stop-word optimized permalinks for top search engine rankings.
            </p>
          </div>
        </div>

        <button
          onClick={() => setInputTitle('Best Free Online Utilities & Productivity Tools for Creators')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Load Example</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input & Options (6 cols) */}
        <div className="lg:col-span-6 space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Input Headline or Article Title
            </label>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Slug Rules</div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">Word Delimiter</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setSeparator('-')}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer ${separator === '-' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs' : 'text-slate-400'}`}
                >
                  Hyphen (-)
                </button>
                <button
                  onClick={() => setSeparator('_')}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer ${separator === '_' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-2xs' : 'text-slate-400'}`}
                >
                  Underscore (_)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">Strip Stop Words ("a", "the", "in", "with")</span>
              <button
                onClick={() => setRemoveStopWords(!removeStopWords)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${removeStopWords ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${removeStopWords ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">Remove Digits & Numbers</span>
              <button
                onClick={() => setRemoveNumbers(!removeNumbers)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${removeNumbers ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${removeNumbers ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span>Maximum Length: {maxLength} chars</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Output & URL Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Generated Permalink
              </span>
              <span className="font-mono text-xs text-slate-400">{generatedSlug.length} characters</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 font-mono text-sm text-blue-600 dark:text-blue-400 break-all select-all font-semibold">
              {generatedSlug || 'your-slug-here'}
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Clean Slug'}</span>
            </button>

            {/* URL simulator */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 mb-1">Live URL Preview</div>
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 truncate">
                https://yourtool.com/tools/<span className="text-blue-600 dark:text-blue-400 font-bold">{generatedSlug}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
