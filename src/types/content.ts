// Type definitions for content system
// Used by ContentRenderer and live markdown loader

export interface ContentBlock {
  type: 'text' | 'title' | 'subtitle' | 'list' | 'highlight' | 'warning' | 'success' | 'info' | 'card' | 'grid' | 'button' | 'status';
  content: string | string[] | ContentGrid;
  className?: string;
  url?: string;
  buttonText?: string;
  status?: 'coming-soon' | 'available' | 'closed';
}

export interface ContentGrid {
  columns: number;
  items: Array<{
    title: string;
    content: string;
    icon?: string;
  }>;
}

export interface PageContent {
  title: string;
  description?: string;
  bannerText?: string;
  blocks: ContentBlock[];
}
