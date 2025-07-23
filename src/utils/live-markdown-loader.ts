// Live markdown content loader for IPAC'27 website
// This function loads and parses markdown files at runtime to reflect changes

import { readFileSync } from 'fs';
import { join } from 'path';
import type { ContentBlock, ContentGrid, PageContent } from '../types/content.ts';

// Parse markdown content into content blocks
function parseMarkdownToBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (!line) {
      i++;
      continue;
    }
    
    // Handle custom directives
    if (line.startsWith(':::')) {
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
        
        i = endIndex + 1;
        continue;
      }
    }
    
    // Handle markdown headers
    if (line.startsWith('# ')) {
      blocks.push({ type: 'title', content: line.substring(2) });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'subtitle', content: line.substring(3) });
    } else if (line.startsWith('### ')) {
      blocks.push({ type: 'subtitle', content: line.substring(4) });
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

// Parse a specific directive
function parseDirective(type: string, content: string, props: Record<string, string>): ContentBlock | null {
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
    
    case 'collapsible':
      // Check if the content contains nested directives
      const trimmedContent = content.trim();
      const nestedBlocks = parseMarkdownToBlocks(trimmedContent);
      
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
      return null;
  }
}

// Parse grid directive
function parseGridDirective(content: string, props: Record<string, string>): ContentBlock {
  const columns = parseInt(props.columns) || 2;
  const items: Array<{ title: string; content: string; icon?: string }> = [];
  
  // Split content by lines and parse each card
  const lines = content.split('\n');
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line.startsWith(':::card')) {
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
          title: cardProps.title || '',
          content: cardContent.trim(),
          icon: cardProps.icon
        });
        
        // Don't increment i here as we might be at the start of the next card
        continue;
      }
    }
    
    i++;
  }
  
  return {
    type: 'grid',
    content: { columns, items }
  };
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)/s);
  
  if (!frontmatterMatch) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = frontmatterMatch[1];
  const body = frontmatterMatch[2];
  
  // Simple YAML parser for frontmatter
  const frontmatter: Record<string, any> = {};
  frontmatterText.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
    if (match) {
      frontmatter[match[1]] = match[2];
    }
  });

  return { frontmatter, body };
}

// Load and parse a markdown file
export function loadPageContent(pageId: string): PageContent | null {
  try {
    const filePath = join(process.cwd(), 'src', 'content', `${pageId}.md`);
    const fileContent = readFileSync(filePath, 'utf-8');
    
    const { frontmatter, body } = parseFrontmatter(fileContent);
    const blocks = parseMarkdownToBlocks(body);
    
    return {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      bannerText: frontmatter.bannerText || '',
      blocks
    };
  } catch (error) {
    console.error(`Error loading page content for ${pageId}:`, error);
    return null;
  }
}
