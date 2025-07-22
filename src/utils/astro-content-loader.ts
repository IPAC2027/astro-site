// Content loader using Astro's content collections
import { getEntry } from 'astro:content';
import type { PageContent } from '../types/content';

export async function getPageContentFromAstro(pageId: string): Promise<PageContent | null> {
  try {
    const [collection, slug] = pageId.split('/');
    
    if (!collection || !slug) {
      console.error(`Invalid pageId format: ${pageId}. Expected format: "collection/slug"`);
      return null;
    }

    // Use Astro's content collections to get the entry
    const entry = await getEntry(collection as any, slug);
    
    if (!entry) {
      console.error(`Content entry not found: ${pageId}`);
      return null;
    }

    // Parse the markdown content to blocks (simplified for now)
    const blocks = [
      { type: 'text' as const, content: 'Content from markdown file will be parsed here.' },
      { type: 'info' as const, content: 'This page content comes from the markdown file in src/content/' + pageId + '.md' }
    ];

    return {
      title: entry.data.title,
      description: entry.data.description,
      bannerText: entry.data.bannerText,
      blocks
    };
  } catch (error) {
    console.error(`Error loading content from Astro collections for ${pageId}:`, error);
    return null;
  }
}
