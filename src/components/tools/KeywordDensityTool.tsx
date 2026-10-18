import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Filter, 
  FileText,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could',
  'did', 'do', 'does', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has',
  'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into',
  'is', 'it', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should',
  'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'won\'t', 'would', 'you', 'your', 'yours'
]);

export const KeywordDensityTool: React.FC = () => {
  const { recordToolAction } = useToolContext();
  const [content, setContent] = useState<string>(`Building a tool website is one of the most profitable online business models in 2026. A utility tool website solves immediate user problems like calculating dates, formatting text, minifying code, and previewing SEO meta tags.

Because tool websites satisfy high search intent, they rank easily on Google search results with low competition. You don't need expensive server infrastructure. Modern web tools execute client-side in the user's browser, allowing you to monetize millions of page views with Google AdSense, affiliate links, and premium subscriptions.`);

  const [filterStopWords, setFilterStopWords] = useState(true);
  const [activeNgram, setActiveNgram] = useState<1 | 2 | 3>(1);

  // Analysis calculations
  const analysis = useMemo(() => {
    if (!content.trim()) {
      return { totalWords: 0, uniqueWords: 0, ngrams: [], readingEase: 100, stuffingRisk: false };
    }

    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const totalWords = words.length;
    if (totalWords === 0) {
      return { totalWords: 0, uniqueWords: 0, ngrams: [], readingEase: 100, stuffingRisk: false };
    }

    // Generate N-Grams
    const counts: Record<string, number> = {};
    for (let i = 0; i <= words.length - activeNgram; i++) {
      const slice = words.slice(i, i + activeNgram);
      if (filterStopWords && activeNgram === 1 && STOP_WORDS.has(slice[0])) {
        continue;
      }
      const phrase = slice.join(' ');
      counts[phrase] = (counts[phrase] || 0) + 1;
    }

    const sorted = Object.entries(counts)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: ((count / totalWords) * (activeNgram === 1 ? 100 : 100 * activeNgram)).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Reading Ease (Flesch formula approx)
    const sentences = Math.max(1, (content.match(/[\.\!\?]+/g) || []).length);
    const avgWordsPerSentence = totalWords / sentences;
    const readingEase = Math.round(Math.min(100, Math.max(20, 206.835 - 1.015 * avgWordsPerSentence - 30)));

    const stuffingRisk = sorted.some(item => parseFloat(item.density) > 3.8);

    return {
      totalWords,
      uniqueWords: new Set(words).size,
      ngrams: sorted,
      readingEase,
      stuffingRisk
    };
  }, [content, filterStopWords, activeNgram]);

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
              Keyword Density & Content Analyzer
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                SEO Audit
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audit 1, 2, and 3-word phrase frequency, detect keyword stuffing, and check readability.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setFilterStopWords(!filterStopWords);
              recordToolAction('keyword-density', 1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              filterStopWords 
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Stop Words: {filterStopWords ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-500" />
                Article / Page Content
              </span>
              <span>{analysis.totalWords} words • {analysis.uniqueWords} unique</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste article, blog post, or webpage copy to analyze keyword density..."
              className="w-full h-80 p-5 font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-transparent resize-y focus:outline-none leading-relaxed"
            />
          </div>

          {/* Readability & Safety Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Flesch Reading Ease</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {analysis.readingEase} / 100
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {analysis.readingEase > 70 ? 'Very Easy to Read' : analysis.readingEase > 50 ? 'Standard Readability' : 'Complex Text'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Keyword Stuffing Risk</div>
              <div className="flex items-center gap-2 mt-1">
                {analysis.stuffingRisk ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-bold text-amber-600">High Density Detected</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">Optimal (Safe)</span>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-1">Target range: 1.5% - 2.5%</div>
            </div>
          </div>
        </div>

        {/* N-Gram Density Results (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Phrase Length</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              {([1, 2, 3] as const).map(n => (
                <button
                  key={n}
                  onClick={() => setActiveNgram(n)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    activeNgram === n ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-400'
                  }`}
                >
                  {n}-Word
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
            {analysis.ngrams.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">No phrases found for selected filters.</p>
            ) : (
              analysis.ngrams.map((item, idx) => {
                const densityVal = parseFloat(item.density);
                const isOver = densityVal > 3.5;

                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {item.phrase}
                      </span>
                      <span className="font-mono text-slate-500">
                        {item.count}x (<strong className={isOver ? 'text-rose-500' : 'text-blue-600 dark:text-blue-400'}>{item.density}%</strong>)
                      </span>
                    </div>
                    {/* Visual Density Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isOver ? 'bg-rose-500' : 'bg-blue-600'}`}
                        style={{ width: `${Math.min(100, densityVal * 20)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
