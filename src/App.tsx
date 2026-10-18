import React, { useState } from 'react';
import { 
  Navbar 
} from './components/layout/Navbar';
import { 
  Sidebar 
} from './components/layout/Sidebar';
import { 
  HeroBanner 
} from './components/home/HeroBanner';
import { 
  FailFlowLiveWidget 
} from './components/home/FailFlowLiveWidget';
import { 
  ToolCard 
} from './components/home/ToolCard';
import { 
  CodeMinifierTool 
} from './components/tools/CodeMinifierTool';
import { 
  TextFormatterTool 
} from './components/tools/TextFormatterTool';
import { 
  CountdownCalculatorTool 
} from './components/tools/CountdownCalculatorTool';
import { 
  AiSeoTool 
} from './components/tools/AiSeoTool';
import { 
  KeywordDensityTool 
} from './components/tools/KeywordDensityTool';
import { 
  RobotsSitemapTool 
} from './components/tools/RobotsSitemapTool';
import { 
  ImageGeneratorTool 
} from './components/tools/ImageGeneratorTool';
import { 
  SlugGeneratorTool 
} from './components/tools/SlugGeneratorTool';
import { 
  AnalyticsView 
} from './components/analytics/AnalyticsView';
import { 
  BlueprintModal 
} from './components/modals/BlueprintModal';
import { 
  useToolContext 
} from './context/ToolContext';
import { 
  TOOLS_LIST 
} from './data/toolsData';
import { 
  ToolCategory 
} from './types';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ExternalLink 
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    activeTab, 
    activeToolId, 
    closeTool, 
    searchQuery, 
    setShowBlueprintModal 
  } = useToolContext();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');

  // Filter tools based on search and category
  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeToolObj = TOOLS_LIST.find(t => t.id === activeToolId);

  // Render active individual tool
  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'code-minifier': return <CodeMinifierTool />;
      case 'text-formatter': return <TextFormatterTool />;
      case 'countdown-calculator': return <CountdownCalculatorTool />;
      case 'ai-seo-previewer': return <AiSeoTool />;
      case 'keyword-density': return <KeywordDensityTool />;
      case 'robots-sitemap': return <RobotsSitemapTool />;
      case 'image-generator': return <ImageGeneratorTool />;
      case 'slug-generator': return <SlugGeneratorTool />;
      default: return <CodeMinifierTool />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Browser Bar & Navbar */}
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Active Tool View */}
          {activeToolId ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Breadcrumb Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={closeTool}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Dashboard</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="capitalize">{activeToolObj?.category}</span>
                  <span>/</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{activeToolObj?.name}</span>
                </div>
              </div>

              {renderActiveTool()}
            </div>
          ) : (
            <>
              {/* Tab: Home */}
              {activeTab === 'home' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Hero Banner (Matching Screenshot 1) */}
                  <HeroBanner 
                    selectedCategory={selectedCategory} 
                    onSelectCategory={setSelectedCategory} 
                  />

                  {/* FailFlow Live Countdown Widget (Matching Screenshot 2) */}
                  <FailFlowLiveWidget />

                  {/* Featured Tools Directory */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          All Utilities & Micro-Tools
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Instant, lightweight tools engineered for high search volume & zero server load.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 self-start sm:self-auto">
                        Showing {filteredTools.length} of {TOOLS_LIST.length} tools
                      </span>
                    </div>

                    {filteredTools.length === 0 ? (
                      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                        <Sparkles className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No tools found matching your search</h4>
                        <p className="text-xs text-slate-400 mt-1">Try clearing filters or searching for "minifier", "countdown", or "seo".</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredTools.map(tool => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: All Tools Directory */}
              {activeTab === 'all-tools' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                        Complete Tools Catalog
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Explore every client-side tool in the ToolVerse collection.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TOOLS_LIST.map(tool => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Time Hub (Direct FailFlow view) */}
              {activeTab === 'time-hub' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <FailFlowLiveWidget />
                  <CountdownCalculatorTool />
                </div>
              )}

              {/* Tab: AI SEO Suite */}
              {activeTab === 'seo-suite' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <AiSeoTool />
                  <KeywordDensityTool />
                </div>
              )}

              {/* Tab: Code Tools */}
              {activeTab === 'code-tools' && (
                <div className="animate-in fade-in duration-200">
                  <CodeMinifierTool />
                </div>
              )}

              {/* Tab: Text Tools */}
              {activeTab === 'text-tools' && (
                <div className="animate-in fade-in duration-200">
                  <TextFormatterTool />
                </div>
              )}

              {/* Tab: Media Tools */}
              {activeTab === 'media-tools' && (
                <div className="animate-in fade-in duration-200">
                  <ImageGeneratorTool />
                </div>
              )}

              {/* Tab: Analytics */}
              {activeTab === 'analytics' && (
                <div className="animate-in fade-in duration-200">
                  <AnalyticsView />
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 pb-12 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">ToolVerse Platform</span>
              <span>•</span>
              <span>Inspired by @ghulam_ali_seo & FailFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowBlueprintModal(true)}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                $12K/Mo Case Study
              </button>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Client-Side Privacy
              </span>
            </div>
          </footer>
        </main>
      </div>

      {/* Blueprint Strategy Modal */}
      <BlueprintModal />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
