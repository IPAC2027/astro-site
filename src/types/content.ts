// Type definitions for content system
// Used by ContentRenderer and live markdown loader

/**
 * Represents different types of content blocks that can be rendered
 */
export type ContentBlockType = 
  | 'text' 
  | 'title' 
  | 'subtitle' 
  | 'subsubtitle' 
  | 'list' 
  | 'highlight' 
  | 'warning' 
  | 'success' 
  | 'info' 
  | 'card' 
  | 'grid' 
  | 'button' 
  | 'status' 
  | 'collapsible';

/**
 * Status options for status blocks
 */
export type StatusType = 'coming-soon' | 'available' | 'closed';

/**
 * Alert types for styled message blocks
 */
export type AlertType = 'highlight' | 'warning' | 'success' | 'info';

/**
 * Base interface for all content blocks
 */
export interface BaseContentBlock {
  type: ContentBlockType;
  className?: string;
}

/**
 * Content block for simple text, titles, and subtitles
 */
export interface TextContentBlock extends BaseContentBlock {
  type: 'text' | 'title' | 'subtitle' | 'subsubtitle';
  content: string;
}

/**
 * Content block for lists
 */
export interface ListContentBlock extends BaseContentBlock {
  type: 'list';
  content: string[];
}

/**
 * Content block for alert messages (highlight, warning, success, info)
 */
export interface AlertContentBlock extends BaseContentBlock {
  type: AlertType;
  content: string;
}

/**
 * Content block for grid layouts
 */
export interface GridContentBlock extends BaseContentBlock {
  type: 'grid';
  content: ContentGrid;
}

/**
 * Content block for collapsible sections
 */
export interface CollapsibleContentBlock extends BaseContentBlock {
  type: 'collapsible';
  content: CollapsibleContent;
}

/**
 * Content block for buttons
 */
export interface ButtonContentBlock extends BaseContentBlock {
  type: 'button';
  content: string;
  url?: string;
  buttonText?: string;
}

/**
 * Content block for status indicators
 */
export interface StatusContentBlock extends BaseContentBlock {
  type: 'status';
  content: string;
  status?: StatusType;
}

/**
 * Content block for simple cards
 */
export interface CardContentBlock extends BaseContentBlock {
  type: 'card';
  content: string;
}

/**
 * Union type of all possible content blocks
 */
export type ContentBlock = 
  | TextContentBlock
  | ListContentBlock
  | AlertContentBlock
  | GridContentBlock
  | CollapsibleContentBlock
  | ButtonContentBlock
  | StatusContentBlock
  | CardContentBlock;

/**
 * Configuration for grid layouts
 */
export interface ContentGrid {
  /** Number of columns in the grid (1-4) */
  columns: number;
  /** Array of grid items */
  items: GridItem[];
}

/**
 * Individual item in a grid layout
 */
export interface GridItem {
  /** Title of the grid item */
  title: string;
  /** Content of the grid item (supports markdown) */
  content: string;
  /** Optional icon (emoji or icon class) */
  icon?: string;
}

/**
 * Configuration for collapsible content sections
 */
export interface CollapsibleContent {
  /** Title shown in the collapsible header */
  title: string;
  /** Raw markdown content (when not using nested blocks) */
  content: string;
  /** Whether the section should be open by default */
  isOpen?: boolean;
  /** Nested content blocks for complex layouts */
  nestedBlocks?: ContentBlock[];
}

/**
 * Complete page content structure
 */
export interface PageContent {
  /** Page title */
  title: string;
  /** Optional page description for SEO */
  description?: string;
  /** Optional banner text displayed at the top */
  bannerText?: string;
  /** Array of content blocks that make up the page */
  blocks: ContentBlock[];
}

/**
 * Error result from content loading operations
 */
export interface ContentLoadError {
  /** Error message */
  message: string;
  /** Optional error code */
  code?: string;
  /** Original error object */
  originalError?: Error;
}

/**
 * Result type for content loading operations
 */
export type ContentLoadResult = {
  success: true;
  data: PageContent;
} | {
  success: false;
  error: ContentLoadError;
};

/**
 * Configuration for markdown parsing
 */
export interface MarkdownParseConfig {
  /** Whether to allow custom directives */
  allowDirectives?: boolean;
  /** Whether to parse inline markdown formatting */
  parseInlineFormatting?: boolean;
  /** Maximum nesting level for directives */
  maxNestingLevel?: number;
}
