import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  FileCode, 
  Sparkles, 
  Zap, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

type CodeType = 'javascript' | 'css' | 'html' | 'json';

export const CodeMinifierTool: React.FC = () => {
  const { recordToolAction } = useToolContext();
  const [codeType, setCodeType] = useState<CodeType>('javascript');
  const [inputCode, setInputCode] = useState<string>(`// Sample JavaScript Code
function calculateDiscount(originalPrice, discountPercentage) {
  /* Validate parameters */
  if (originalPrice <= 0 || discountPercentage < 0) {
    console.error("Invalid arguments provided");
    return 0;
  }

  // Calculate final saving
  const savings = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - savings;

  return {
    savings: savings.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
    timestamp: new Date().toISOString()
  };
}

// Example usage
const productDeal = calculateDiscount(150, 20);
console.log("Calculated Deal:", productDeal);`);

  const [outputCode, setOutputCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'minify' | 'beautify'>('minify');

  // Format samples
  const samplePresets: Record<CodeType, string> = {
    javascript: `// Advanced JavaScript Utility
function generateToken(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars.charAt(randomIndex);
  }
  return token;
}

console.log("Token Generated:", generateToken(32));`,
    css: `/* Global Website Theme */
:root {
  --primary-color: #2563eb;
  --secondary-color: #4f46e5;
  --font-family: 'Inter', sans-serif;
}

.card-container {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
}`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>ToolVerse Page</title>
    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <main class="container">
      <h1>Welcome to ToolVerse</h1>
      <p>Instant client-side tools for web developers and businesses.</p>
    </main>
  </body>
</html>`,
    json: `{
  "appName": "ToolVerse",
  "version": "2.4.0",
  "features": [
    "Code Minifier",
    "Text Formatter",
    "FailFlow Countdowns",
    "AI SEO Previewer"
  ],
  "settings": {
    "offlineSupport": true,
    "darkMode": true,
    "maxHistory": 50
  }
}`
  };

  const handleMinify = () => {
    setActiveTab('minify');
    if (!inputCode.trim()) {
      setOutputCode('');
      return;
    }

    try {
      let minified = '';
      if (codeType === 'json') {
        const parsed = JSON.parse(inputCode);
        minified = JSON.stringify(parsed);
      } else if (codeType === 'css') {
        minified = inputCode
          .replace(/\/\*[\s\S]*?\*\//g, '') // strip comments
          .replace(/\s+/g, ' ') // collapse whitespaces
          .replace(/\s*([\{\}:;,])\s*/g, '$1') // remove spaces around symbols
          .replace(/;\}/g, '}') // remove trailing semicolon
          .trim();
      } else if (codeType === 'html') {
        minified = inputCode
          .replace(/<!--[\s\S]*?-->/g, '') // remove comments
          .replace(/\s+/g, ' ') // collapse spaces
          .replace(/> </g, '><') // remove spaces between tags
          .trim();
      } else {
        // javascript
        minified = inputCode
          .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
          .replace(/\/\/[^\n\r]*/g, '') // remove single-line comments
          .replace(/\s+/g, ' ') // collapse spaces
          .replace(/\s*([=+\-*\/%{}();:,<>!&|])\s*/g, '$1')
          .trim();
      }
      setOutputCode(minified);
      recordToolAction('code-minifier', 5);
    } catch (err: any) {
      setOutputCode(`// Error parsing code:\n${err.message}`);
    }
  };

  const handleBeautify = () => {
    setActiveTab('beautify');
    if (!inputCode.trim()) {
      setOutputCode('');
      return;
    }

    try {
      if (codeType === 'json') {
        const parsed = JSON.parse(inputCode);
        setOutputCode(JSON.stringify(parsed, null, 2));
      } else if (codeType === 'css') {
        // Simple beautifier for CSS
        const cleaned = inputCode.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ');
        const formatted = cleaned
          .replace(/\{/g, ' {\n  ')
          .replace(/;/g, ';\n  ')
          .replace(/\s*\}/g, '\n}\n\n')
          .trim();
        setOutputCode(formatted);
      } else if (codeType === 'html') {
        // Simple HTML indenter
        let formatted = '';
        const reg = /(>)(<)(\/*)/g;
        let xml = inputCode.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach(node => {
          let indent = 0;
          if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
          } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) pad -= 1;
          } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
          } else {
            indent = 0;
          }
          formatted += '  '.repeat(pad) + node + '\n';
          pad += indent;
        });
        setOutputCode(formatted.trim());
      } else {
        // Basic JS beautify (indent blocks)
        const lines = inputCode.split('\n');
        let indent = 0;
        const formatted = lines.map(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('}') || trimmed.startsWith(']')) indent = Math.max(0, indent - 1);
          const indented = '  '.repeat(indent) + trimmed;
          if (trimmed.endsWith('{') || trimmed.endsWith('[')) indent++;
          return indented;
        }).join('\n');
        setOutputCode(formatted);
      }
      recordToolAction('code-minifier', 3);
    } catch (err: any) {
      setOutputCode(`// Error beautifying code:\n${err.message}`);
    }
  };

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const extensions: Record<CodeType, string> = {
      javascript: 'min.js',
      css: 'min.css',
      html: 'min.html',
      json: 'min.json',
    };
    const blob = new Blob([outputCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolverse-${activeTab}.${extensions[codeType]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Metrics
  const originalBytes = new Blob([inputCode]).size;
  const outputBytes = new Blob([outputCode]).size;
  const reduction = originalBytes > 0 && outputBytes > 0 
    ? Math.max(0, Math.round(((originalBytes - outputBytes) / originalBytes) * 100)) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Code Minifier & Beautifier
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Multi-Language
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Eliminate unnecessary bytes, whitespace, and comments to supercharge page load speed.
            </p>
          </div>
        </div>

        {/* Language selector chips */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['javascript', 'css', 'html', 'json'] as CodeType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setCodeType(type);
                setInputCode(samplePresets[type]);
                setOutputCode('');
              }}
              className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-lg transition-all cursor-pointer ${
                codeType === type
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {type === 'javascript' ? 'JS' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinify}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'minify'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify Code</span>
          </button>
          <button
            onClick={handleBeautify}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'beautify'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Beautify / Format</span>
          </button>
          <button
            onClick={() => {
              setInputCode(samplePresets[codeType]);
              setOutputCode('');
            }}
            className="px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Sample</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInputCode('');
              setOutputCode('');
            }}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split Code View: Input and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Box */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-blue-500" />
              Source Code ({codeType.toUpperCase()})
            </span>
            <span className="font-mono text-slate-400">
              {originalBytes > 1024 ? `${(originalBytes / 1024).toFixed(2)} KB` : `${originalBytes} B`} • {inputCode.split('\n').length} lines
            </span>
          </div>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={`Paste your ${codeType} code here...`}
            className="w-full h-96 p-4 font-mono text-xs text-slate-800 dark:text-slate-200 bg-transparent resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>

        {/* Output Box */}
        <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500" />
                {activeTab === 'minify' ? 'Minified Result' : 'Formatted Result'}
              </span>
              {reduction > 0 && activeTab === 'minify' && (
                <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  -{reduction}% Saved
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                disabled={!outputCode}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!outputCode}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={outputCode}
            placeholder="Click 'Minify Code' or 'Beautify' above to process your script..."
            className="w-full h-96 p-4 font-mono text-xs text-emerald-800 dark:text-emerald-300 bg-slate-50/50 dark:bg-slate-950/50 resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
