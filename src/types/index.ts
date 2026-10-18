export type ToolCategory = 'all' | 'code' | 'text' | 'time' | 'seo' | 'media';

export interface ToolMetadata {
  id: string;
  name: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  icon: string;
  badge?: 'Popular' | 'New' | '$12K Niche' | 'Client-Side' | 'SEO Favorite';
  monthlySearches?: string;
  competition?: 'Very Low' | 'Low' | 'Medium';
  revenuePotential?: string;
  featured?: boolean;
}

export interface CountdownItem {
  id: string;
  title: string;
  targetDate: string; // ISO string
  category: 'holiday' | 'custom' | 'personal';
  iconEmoji?: string;
}

export interface ToolAnalytics {
  toolsUsedCount: number;
  totalActionsCount: number;
  estimatedMinutesSaved: number;
  recentTools: string[];
}
