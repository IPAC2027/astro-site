# Banner Text Configuration Guide

This guide explains how to customize the banner text that appears on each submenu page of the IPAC'27 website using markdown frontmatter.

## Overview

Each submenu page can display custom text on the right side of the banner section with proper right-alignment and margin. The banner text is now defined directly in the markdown files located in `src/content/[section]/` folders, making it easy for content managers to customize without touching any code.

## How Banner Text Works

The banner text appears in the right section of the page banner, styled with:
- Right-aligned text
- Margin to the right edge
- Semi-transparent white color
- Large, prominent font size (2xl-3xl)
- Semi-bold font weight

## Customizing Banner Text

### Markdown Frontmatter Configuration

To customize banner text for any submenu page, edit the corresponding markdown file in `src/content/[section]/[page].md` and add or modify the `bannerText` field in the frontmatter:

```yaml
---
title: "Page Title"
description: "Page description"
bannerText: "Custom Banner Text"
---
```

### Example Files and Locations

| Page | Markdown File | Current Banner Text |
|------|---------------|-------------------|
| `/about/welcome` | `src/content/about/welcome.md` | "Welcome" |
| `/about/committee` | `src/content/about/committee.md` | "Committee" |
| `/about/npss-aps` | `src/content/about/npss-aps.md` | "NPSS-APS" |
| `/program/scientific-program` | `src/content/program/scientific-program.md` | "Scientific Program" |
| `/registration/conference-registration` | `src/content/registration/conference-registration.md` | "Conference Registration" |
| `/exhibitors/opportunities` | `src/content/exhibitors/opportunities.md` | "Opportunities" |

### Live Example

To change the banner text for the Welcome page:

1. Open `src/content/about/welcome.md`
2. Modify the frontmatter:
   ```yaml
   ---
   title: "Welcome to IPAC'27"
   description: "Welcome message from the conference organizers"
   bannerText: "Welcome to Detroit!"
   ---
   ```
3. Save the file
4. The change will be reflected immediately on the website

## Technical Implementation

### Content Collections

The system uses Astro's content collections feature with a configuration file at `src/content.config.ts` that defines the schema for each content section:

```typescript
const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    bannerText: z.string().optional(),
  }),
});
```

### Page Integration

Each page template loads content from the markdown file using Astro's `getEntry()` function:

```astro
---
import { getEntry } from 'astro:content';

const entry = await getEntry('about', 'welcome');
---

<ContentLayout 
  title={entry.data.title} 
  description={entry.data.description}
  bannerText={entry.data.bannerText || "Default Text"}
>
```

## Benefits of Markdown-Based Configuration

1. **Content Manager Friendly**: No need to edit code files - just modify markdown frontmatter
2. **Version Control**: All content changes are tracked in git
3. **Hot Reloading**: Changes are immediately visible during development
4. **Consistent Structure**: All pages use the same frontmatter format
5. **Easy Maintenance**: Content and presentation are properly separated

## Adding Banner Text to New Pages

When creating new submenu pages:

1. **Create the markdown file** in the appropriate `src/content/[section]/` folder
2. **Include frontmatter** with title, description, and bannerText fields:
   ```yaml
   ---
   title: "New Page Title"
   description: "Page description"
   bannerText: "Custom Banner"
   ---
   ```
3. **Create the page template** that loads from the content collection
4. The banner text will automatically appear on the page

## Default Behavior

If no `bannerText` is provided in the markdown frontmatter:
- The page template can provide a fallback default
- For example: `bannerText={entry.data.bannerText || "Default Text"}`

## Best Practices

1. **Keep it concise**: Banner text should be 1-3 words for optimal visual impact
2. **Match the page purpose**: Use text that clearly identifies the page content
3. **Consistent naming**: Use consistent terminology across related pages
4. **Consider mobile**: Shorter text works better on smaller screens
5. **Use quotes**: Always wrap bannerText values in quotes in the YAML frontmatter

## File Structure

```
src/content/
├── about/
│   ├── welcome.md          (bannerText: "Welcome")
│   ├── committee.md        (bannerText: "Committee")
│   └── npss-aps.md        (bannerText: "NPSS-APS")
├── program/
│   └── scientific-program.md  (bannerText: "Scientific Program")
├── registration/
│   └── conference-registration.md  (bannerText: "Conference Registration")
└── exhibitors/
    └── opportunities.md     (bannerText: "Opportunities")
```

## Troubleshooting

**Banner text not appearing?**
- Check that the `bannerText` field is properly defined in the markdown frontmatter
- Ensure the YAML syntax is correct (proper indentation, quotes)
- Verify the markdown file is in the correct content collection folder

**Changes not reflecting?**
- Save the markdown file and refresh the browser
- Check the development server console for any errors
- Ensure the content collection is properly configured in `src/content.config.ts`
