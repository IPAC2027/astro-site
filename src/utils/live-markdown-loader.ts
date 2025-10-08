// Live markdown content loader for IPAC'27 website
// This function loads and parses markdown files at runtime to reflect changes

import { readFileSync } from 'fs';
import { join } from 'path';
import type { 
  ContentBlock, 
  ContentGrid, 
  PageContent, 
  ContentLoadResult,
  ContentLoadError,
  MarkdownParseConfig
} from '../types/content.ts';

/**
 * Default configuration for markdown parsing
 */
const DEFAULT_PARSE_CONFIG: MarkdownParseConfig = {
  allowDirectives: true,
  parseInlineFormatting: true,
  maxNestingLevel: 3
};

/**
 * Create a structured error object for content loading failures
 */
function createContentError(message: string, code?: string, originalError?: Error): ContentLoadError {
  return {
    message,
    code,
    originalError
  };
}

/**
 * Log error with context information
 */
function logError(context: string, error: Error | string, pageId?: string): void {
  const errorMessage = error instanceof Error ? error.message : error;
  const stackTrace = error instanceof Error ? error.stack : undefined;
  
  console.error(`[ContentLoader] ${context}${pageId ? ` (${pageId})` : ''}:`, errorMessage);
  if (stackTrace) {
    console.error('Stack trace:', stackTrace);
  }
}

/**
 * Parse markdown content into content blocks with improved error handling
 * @param content - Raw markdown content to parse
 * @param config - Configuration options for parsing
 * @returns Array of parsed content blocks
 */
function parseMarkdownToBlocks(content: string, config: MarkdownParseConfig = DEFAULT_PARSE_CONFIG): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  try {
    const lines = content.split('\n');
    let i = 0;
    
    while (i < lines.length) {
      try {
        const line = lines[i].trim();
        
        if (!line) {
          i++;
          continue;
        }
        
        // Skip standalone closing directive markers
        if (line === ':::') {
          i++;
          continue;
        }
        
        // Handle custom directives if enabled
        if (config.allowDirectives && line.startsWith(':::')) {
          const directiveMatch = line.match(/^:::(\w+)(?:\{([^}]*)\})?/);
          if (directiveMatch) {
            const [, directiveType, propsString] = directiveMatch;
            const props = parseDirectiveProps(propsString || '');
            
            // Find the end of the directive - handle nested directives for grid
            let endIndex = i + 1;
            let content = '';
            let nestingLevel = 0;
            
            while (endIndex < lines.length) {
              const currentLine = lines[endIndex].trim();
              
              // Check if this is a closing directive
              if (currentLine === ':::') {
                if (nestingLevel === 0) {
                  // This is the closing tag for our directive
                  break;
                } else {
                  // This closes a nested directive
                  nestingLevel--;
                  content += lines[endIndex] + '\n';
                }
              } else if (currentLine.startsWith(':::')) {
                // Any new directive starts - increase nesting level
                nestingLevel++;
                if (nestingLevel > (config.maxNestingLevel || 3)) {
                  logError('Maximum nesting level exceeded', `Level: ${nestingLevel}`);
                  break;
                }
                content += lines[endIndex] + '\n';
              } else {
                content += lines[endIndex] + '\n';
              }
              
              endIndex++;
            }
            
            const block = parseDirective(directiveType, content.trim(), props);
            if (block) {
              blocks.push(block);
            }
            
            i = endIndex + 1; // Skip the closing ::: line
            continue;
          }
        }
        
        // Handle markdown headers
        if (line.startsWith('# ')) {
          blocks.push({ type: 'title', content: line.substring(2) });
        } else if (line.startsWith('## ')) {
          blocks.push({ type: 'subtitle', content: line.substring(3) });
        } else if (line.startsWith('### ')) {
          blocks.push({ type: 'subsubtitle', content: line.substring(4) });
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
          // Handle markdown lists - collect consecutive list items
          const listItems: string[] = [];
          
          // Add the current line
          listItems.push(line.substring(2).trim());
          
          // Look ahead to collect consecutive list items
          let nextIndex = i + 1;
          while (nextIndex < lines.length) {
            const nextLine = lines[nextIndex].trim();
            if (nextLine.startsWith('* ') || nextLine.startsWith('- ')) {
              listItems.push(nextLine.substring(2).trim());
              nextIndex++;
            } else if (nextLine === '') {
              // Skip empty lines between list items
              nextIndex++;
            } else {
              // End of list
              break;
            }
          }
          
          blocks.push({ type: 'list', content: listItems });
          i = nextIndex - 1; // -1 because the main loop will increment
        } else {
          // Regular text
          blocks.push({ type: 'text', content: line });
        }
        
        i++;
      } catch (blockError) {
        logError('Error parsing content block', blockError as Error);
        // Skip problematic block and continue
        i++;
      }
    }
  } catch (error) {
    logError('Error parsing markdown content', error as Error);
    // Return at least a basic error block
    blocks.push({
      type: 'warning',
      content: 'Error parsing content. Please check the markdown format.'
    });
  }
  
  return blocks;
}

// Parse directive properties
function parseDirectiveProps(propsString: string): Record<string, string> {
  const props: Record<string, string> = {};
  if (!propsString) return props;
  
  // Use a more sophisticated parsing approach for both quoted and unquoted values
  const regex = /(\w+)=(?:"([^"]*)"|(\w+))/g;
  let match;
  
  while ((match = regex.exec(propsString)) !== null) {
    const [, key, quotedValue, unquotedValue] = match;
    props[key] = quotedValue || unquotedValue;
  }
  
  return props;
}

/**
 * Parse a specific directive with improved error handling
 * @param type - The directive type (e.g., 'warning', 'grid', 'collapsible')
 * @param content - The content inside the directive
 * @param props - Parsed properties from the directive
 * @returns Parsed content block or null if parsing fails
 */
function parseDirective(type: string, content: string, props: Record<string, string>): ContentBlock | null {
  try {
    switch (type) {
      case 'warning':
        return { type: 'warning', content: content.trim() };
      
      case 'info':
        return { type: 'info', content: content.trim() };
      
      case 'success':
        return { type: 'success', content: content.trim() };
      
      case 'highlight':
        return { type: 'highlight', content: content.trim() };
      
      case 'grid':
        return parseGridDirective(content, props);
      
      case 'card':
        return {
          type: 'card',
          content: content.trim(),
          className: props.title || ''
        };
      
      case 'button':
        return {
          type: 'button',
          content: props.text || content.trim(),
          url: props.url || '#',
          buttonText: props.text || content.trim()
        };
      
      case 'status':
        return {
          type: 'status',
          content: content.trim(),
          status: (props.type as any) || 'coming-soon'
        };
      
      case 'collapsible':
        // Check if the content contains nested directives
        const trimmedContent = content.trim();
        const nestedBlocks = parseMarkdownToBlocks(trimmedContent, { allowDirectives: true, parseInlineFormatting: true, maxNestingLevel: 2 });
        
        return {
          type: 'collapsible',
          content: {
            title: props.title || 'Click to expand',
            content: trimmedContent,
            isOpen: props.open === 'true',
            nestedBlocks: nestedBlocks.length > 0 ? nestedBlocks : undefined
          }
        };
      
      default:
        logError('Unknown directive type', type);
        return null;
    }
  } catch (error) {
    logError(`Error parsing ${type} directive`, error as Error);
    return {
      type: 'warning',
      content: `Error parsing ${type} directive. Please check the syntax.`
    };
  }
}

/**
 * Parse grid directive with improved error handling
 * @param content - Grid content to parse
 * @param props - Grid properties including columns
 * @returns Grid content block
 */
function parseGridDirective(content: string, props: Record<string, string>): ContentBlock {
  try {
    const columns = parseInt(props.columns) || 2;
    
    // Validate column count
    if (columns < 1 || columns > 4) {
      logError('Invalid column count for grid', `Columns: ${columns}`);
      return {
        type: 'warning',
        content: 'Grid column count must be between 1 and 4'
      };
    }
    
    const items: Array<{ title: string; content: string; icon?: string }> = [];
    
    // Split content by lines and parse each card
    const lines = content.split('\n');
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i].trim();
      
      if (line.startsWith(':::card')) {
        try {
          // Parse card directive
          const cardMatch = line.match(/^:::card\{([^}]*)\}/);
          if (cardMatch) {
            const cardProps = parseDirectiveProps(cardMatch[1]);
            
            // Find the content until the next :::card or end
            let cardContent = '';
            i++;
            while (i < lines.length) {
              const nextLine = lines[i].trim();
              if (nextLine.startsWith(':::card') || nextLine === ':::') {
                break;
              }
              if (nextLine) {
                cardContent += nextLine + '\n';
              }
              i++;
            }
            
            items.push({
              title: cardProps.title || 'Untitled Card',
              content: cardContent.trim(),
              icon: cardProps.icon
            });
            
            // Don't increment i here as we might be at the start of the next card
            continue;
          }
        } catch (cardError) {
          logError('Error parsing grid card', cardError as Error);
          // Skip this card and continue
        }
      } else if (line.startsWith('### ')) {
        // Handle markdown headers as cards when no explicit card directives are used
        const title = line.substring(4).trim();
        let cardContent = '';
        i++;
        
        // Collect content until next header or end
        while (i < lines.length) {
          const nextLine = lines[i].trim();
          if (nextLine.startsWith('### ') || nextLine.startsWith(':::')) {
            break;
          }
          if (nextLine) {
            cardContent += nextLine + '\n';
          }
          i++;
        }
        
        if (title) {
          items.push({
            title,
            content: cardContent.trim(),
            icon: undefined
          });
        }
        continue;
      }
      
      i++;
    }
    
    if (items.length === 0) {
      logError('No valid cards found in grid directive', content);
      return {
        type: 'warning',
        content: 'No valid cards found in grid'
      };
    }
    
    return {
      type: 'grid',
      content: { columns, items }
    };
  } catch (error) {
    logError('Error parsing grid directive', error as Error);
    return {
      type: 'warning',
      content: 'Error parsing grid content'
    };
  }
}

/**
 * Parse frontmatter from markdown content with error handling
 * @param content - Raw markdown content with potential frontmatter
 * @returns Object with parsed frontmatter and body content
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  try {
    const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)/s);
    
    if (!frontmatterMatch) {
      return { frontmatter: {}, body: content };
    }

    const frontmatterText = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    
    // Simple YAML parser for frontmatter
    const frontmatter: Record<string, any> = {};
    
    try {
      frontmatterText.split('\n').forEach(line => {
        const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
        if (match) {
          frontmatter[match[1]] = match[2];
        }
      });
    } catch (yamlError) {
      logError('Error parsing YAML frontmatter', yamlError as Error);
    }

    return { frontmatter, body };
  } catch (error) {
    logError('Error parsing frontmatter', error as Error);
    return { frontmatter: {}, body: content };
  }
}

/**
 * Load and parse a markdown file with comprehensive error handling
 * @param pageId - The page identifier (e.g., 'about/welcome')
 * @returns Page content or null if loading fails
 */
export function loadPageContent(pageId: string): PageContent | null {
  try {
    // Validate input
    if (!pageId || typeof pageId !== 'string') {
      logError('Invalid pageId provided', pageId);
      return null;
    }
    
    // Sanitize pageId to prevent directory traversal
    const sanitizedPageId = pageId.replace(/\.\.\//g, '').replace(/^\//, '');
    
    const filePath = join(process.cwd(), 'src', 'content', `${sanitizedPageId}.md`);
    
    let fileContent: string;
    try {
      fileContent = readFileSync(filePath, 'utf-8');
    } catch (fileError) {
      const error = fileError as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        logError('Content file not found', filePath, pageId);
      } else if (error.code === 'EACCES') {
        logError('Permission denied reading content file', filePath, pageId);
      } else {
        logError('Error reading content file', error, pageId);
      }
      return null;
    }
    
    const { frontmatter, body } = parseFrontmatter(fileContent);
    const blocks = parseMarkdownToBlocks(body);
    
    // Validate required fields
    const title = frontmatter.title || 'Untitled';
    if (!title.trim()) {
      logError('Content file has empty title', pageId);
    }
    
    return {
      title,
      description: frontmatter.description || '',
      bannerText: frontmatter.bannerText || '',
      blocks
    };
  } catch (error) {
    logError('Unexpected error loading page content', error as Error, pageId);
    return null;
  }
}

/**
 * Load page content with result type for better error handling
 * @param pageId - The page identifier
 * @returns Result object with success status and data or error
 */
export function loadPageContentSafe(pageId: string): ContentLoadResult {
  try {
    const content = loadPageContent(pageId);
    if (content) {
      return { success: true, data: content };
    } else {
      return {
        success: false,
        error: createContentError(`Failed to load content for page: ${pageId}`, 'CONTENT_LOAD_FAILED')
      };
    }
  } catch (error) {
    return {
      success: false,
      error: createContentError(
        `Unexpected error loading page: ${pageId}`,
        'UNEXPECTED_ERROR',
        error as Error
      )
    };
  }
}
