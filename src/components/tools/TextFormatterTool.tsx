import React, { useState } from 'react';
import { 
  Type, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Sparkles, 
  Clock, 
  AlignLeft, 
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

export const TextFormatterTool: React.FC = () => {
  const { recordToolAction } = useToolContext();
  const [text, setText] = useState<string>(`Welcome to ToolVerse! This powerful text formatter helps content creators, developers, and writers quickly clean, transform, and analyze their copy.

Try converting to UPPERCASE, Title Case, camelCase, or strip duplicate lines with a single click. Every operation happens instantly right in your browser.`);
  const [copied, setCopied] = useState(false);

  // Transformations
  const toUpperCase = () => {
    setText(text.toUpperCase());
    recordToolAction('text-formatter', 1);
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
    recordToolAction('text-formatter', 1);
  };

  const toTitleCase = () => {
    const formatted = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
    setText(formatted);
    recordToolAction('text-formatter', 1);
  };

  const toSentenceCase = () => {
    const formatted = text
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    setText(formatted);
    recordToolAction('text-formatter', 1);
  };

  const toCamelCase = () => {
    const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    if (!words) return;
    const formatted = words.map((w, i) => 
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    ).join('');
    setText(formatted);
    recordToolAction('text-formatter', 1);
  };

  const toSnakeCase = () => {
    const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    if (!words) return;
    setText(words.map(w => w.toLowerCase()).join('_'));
    recordToolAction('text-formatter', 1);
  };

  const toKebabCase = () => {
    const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    if (!words) return;
    setText(words.map(w => w.toLowerCase()).join('-'));
    recordToolAction('text-formatter', 1);
  };

  const removeExtraSpaces = () => {
    setText(text.replace(/[ \t]+/g, ' ').trim());
    recordToolAction('text-formatter', 1);
  };

  const removeEmptyLines = () => {
    setText(text.split('\n').filter(line => line.trim() !== '').join('\n'));
    recordToolAction('text-formatter', 1);
  };

  const removeDuplicateLines = () => {
    const lines = text.split('\n');
    setText(Array.from(new Set(lines)).join('\n'));
    recordToolAction('text-formatter', 2);
  };

  const stripHtml = () => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    setText(doc.body.textContent || '');
    recordToolAction('text-formatter', 1);
  };

  const sortLinesAz = () => {
    const lines = text.split('\n');
    setText(lines.sort((a, b) => a.localeCompare(b)).join('\n'));
    recordToolAction('text-formatter', 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Text Stats
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, '').length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split('\n').length : 0;
  const sentenceCount = text.trim() ? (text.match(/[\.\!\?]+/g) || []).length || 1 : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const speakingTimeMinutes = Math.ceil(wordCount / 130);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <Type className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Text Formatter & Case Converter
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                10+ Converters
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transform case formats, purge blank or duplicate lines, and compute reading speeds.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy All'}</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!text}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer disabled:opacity-40"
            title="Download .txt"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setText('')}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Text Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Words</div>
          <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">{wordCount}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Characters</div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{charCount}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">No Spaces</div>
          <div className="text-xl font-extrabold text-slate-700 dark:text-slate-300 mt-0.5">{charCountNoSpaces}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Lines</div>
          <div className="text-xl font-extrabold text-slate-700 dark:text-slate-300 mt-0.5">{lineCount}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Reading Time</div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{readingTimeMinutes}m</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Speaking Time</div>
          <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">{speakingTimeMinutes}m</div>
        </div>
      </div>

      {/* Format Buttons Palette */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
          <span>Case Converters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={toUpperCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            UPPERCASE
          </button>
          <button onClick={toLowerCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            lowercase
          </button>
          <button onClick={toTitleCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            Title Case
          </button>
          <button onClick={toSentenceCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            Sentence case
          </button>
          <button onClick={toCamelCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            camelCase
          </button>
          <button onClick={toSnakeCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            snake_case
          </button>
          <button onClick={toKebabCase} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer">
            kebab-case
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
          <span>Cleaning & Line Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={removeExtraSpaces} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer">
            Remove Extra Spaces
          </button>
          <button onClick={removeEmptyLines} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer">
            Remove Blank Lines
          </button>
          <button onClick={removeDuplicateLines} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer">
            Deduplicate Lines
          </button>
          <button onClick={stripHtml} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer">
            Strip HTML Tags
          </button>
          <button onClick={sortLinesAz} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer">
            Sort Lines A-Z
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-500" />
            Editor Content
          </span>
          <span>Click any button above to apply transformations immediately</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-80 p-5 font-sans text-sm text-slate-800 dark:text-slate-200 bg-transparent resize-y focus:outline-none leading-relaxed"
        />
      </div>
    </div>
  );
};
