import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Upload, 
  Sliders, 
  RefreshCw,
  Palette
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

interface BannerPreset {
  name: string;
  width: number;
  height: number;
}

const PRESETS: BannerPreset[] = [
  { name: 'OpenGraph (1200x630)', width: 1200, height: 630 },
  { name: 'Twitter Card (1200x675)', width: 1200, height: 675 },
  { name: 'Square (1080x1080)', width: 1080, height: 1080 },
  { name: 'Blog Header (800x420)', width: 800, height: 420 },
];

const GRADIENTS = [
  { name: 'Indigo Flow', colors: ['#4f46e5', '#3b82f6', '#06b6d4'] },
  { name: 'Sunset Glow', colors: ['#e11d48', '#f97316', '#fbbf24'] },
  { name: 'Emerald Cyber', colors: ['#059669', '#10b981', '#14b8a6'] },
  { name: 'Dark Velvet', colors: ['#0f172a', '#1e293b', '#334155'] },
  { name: 'Deep Purple', colors: ['#581c87', '#7c3aed', '#a855f7'] },
];

export const ImageGeneratorTool: React.FC = () => {
  const { recordToolAction } = useToolContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Banner State
  const [title, setTitle] = useState('Build Fast. Rank Higher.');
  const [subtitle, setSubtitle] = useState('Free client-side web tools for founders & marketers');
  const [badgeText, setBadgeText] = useState('TOOLVERSE 2.0');
  const [brandText, setBrandText] = useState('yourtool.com');
  const [selectedPreset, setSelectedPreset] = useState<BannerPreset>(PRESETS[0]);
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);

  // Base64 Converter State
  const [base64Result, setBase64Result] = useState<string>('');
  const [base64Size, setBase64Size] = useState<string>('');
  const [base64Copied, setBase64Copied] = useState(false);
  const [activeTab, setActiveTab] = useState<'banner' | 'base64'>('banner');

  // Redraw Canvas whenever parameters change
  useEffect(() => {
    if (activeTab !== 'banner') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = selectedPreset;
    canvas.width = width;
    canvas.height = height;

    // Draw Gradient Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, selectedGradient.colors[0]);
    grad.addColorStop(0.5, selectedGradient.colors[1]);
    grad.addColorStop(1, selectedGradient.colors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative circle glows
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(width - 150, 150, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100, height - 100, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw Badge Pill
    const badgePadX = 24;
    const badgePadY = 10;
    const badgeFont = 'bold 22px system-ui, sans-serif';
    ctx.font = badgeFont;
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeW = badgeMetrics.width + badgePadX * 2;
    const badgeH = 44;
    const badgeX = 80;
    const badgeY = 80;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 22);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(badgeText, badgeX + badgePadX, badgeY + 30);

    // Draw Title (wrap lines if long)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.fillText(title, 80, 260);

    // Draw Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '32px system-ui, sans-serif';
    ctx.fillText(subtitle, 80, 340);

    // Bottom Bar (Brand / Watermark)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(80, height - 120, width - 160, 2);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(brandText, 80, height - 70);
  }, [title, subtitle, badgeText, brandText, selectedPreset, selectedGradient, activeTab]);

  const handleDownloadBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `toolverse-banner-${selectedPreset.width}x${selectedPreset.height}.png`;
    a.click();
    recordToolAction('image-generator', 3);
  };

  // Base64 file handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBase64Size(`${(file.size / 1024).toFixed(1)} KB`);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setBase64Result(result);
      recordToolAction('image-generator', 2);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyBase64 = () => {
    if (!base64Result) return;
    navigator.clipboard.writeText(base64Result);
    setBase64Copied(true);
    setTimeout(() => setBase64Copied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-800">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Social Banner & OG Image Generator
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                Hi-Res Canvas
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate 1200x630 social preview graphics and convert images to Base64 in your browser.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('banner')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'banner' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Banner Studio
          </button>
          <button
            onClick={() => setActiveTab('base64')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'base64' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Base64 Converter
          </button>
        </div>
      </div>

      {activeTab === 'banner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Banner Customization
            </h3>

            {/* Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Size Preset</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPreset(p)}
                    className={`p-2 rounded-xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                      selectedPreset.name === p.name
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient themes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Gradient Theme</label>
              <div className="flex items-center gap-2">
                {GRADIENTS.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGradient(g)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      selectedGradient.name === g.name ? 'scale-110 border-blue-600' : 'border-transparent'
                    }`}
                    style={{ background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})` }}
                    title={g.name}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline Text</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subtitle / Pitch</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Badge & Brand */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category Badge</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand URL</label>
                <input
                  type="text"
                  value={brandText}
                  onChange={(e) => setBrandText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleDownloadBanner}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Hi-Res PNG ({selectedPreset.width}x{selectedPreset.height})</span>
            </button>
          </div>

          {/* Canvas Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
              <span>Live Canvas Preview ({selectedPreset.width} × {selectedPreset.height})</span>
            </div>
            <div className="w-full overflow-hidden rounded-xl shadow-2xl border border-white/20">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'base64' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center hover:border-blue-500 transition-colors">
            <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Select or Drop an Image
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-sm mx-auto">
              PNG, JPG, SVG, WebP, or GIF up to 5MB. Converts instantly to clean Base64 data URI string.
            </p>
            <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors inline-block">
              Browse Files
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {base64Result && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Data URI Output ({base64Size})
                </span>
                <button
                  onClick={handleCopyBase64}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 text-xs cursor-pointer"
                >
                  {base64Copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{base64Copied ? 'Copied' : 'Copy Base64'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={base64Result}
                rows={5}
                className="w-full p-3 font-mono text-[11px] bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
