# Content Management Guide for IPAC'27 Website

This guide explains how the Markdown-based content system works to make it easy to add and update website content.

## Overview

The website now uses a **Markdown-based content system** with section banners that separates:
- **Styles**: Predefined CSS classes and components for consistent design
- **Structure**: Reusable layouts and components with section banners
- **Content**: Individual Markdown files for each page (easy to edit!)

Each submenu page now includes:
1. **Section Banner**: Prominent header with section title and description
2. **Sidebar Navigation**: Easy navigation within the section
3. **Main Content**: Your markdown content rendered with consistent styling

## File Structure

```
src/
├── content/
│   ├── about/
│   │   ├── welcome.md
│   │   ├── committee.md
│   │   ├── npss-aps.md
│   │   └── ...
│   ├── program/
│   │   ├── scientific-program.md
│   │   ├── invited-speakers.md
│   │   └── ...
│   ├── registration/
│   │   ├── conference-registration.md
│   │   └── ...
│   └── [other-sections]/
```

## Navigation Structure

The website uses a hierarchical navigation system:

### Main Menu Items (Dropdown Only)
These items serve as dropdown menus and do not have their own pages:
- **About** - Information about the conference
- **Program** - Scientific program and sessions  
- **Registration** - Registration and applications
- **Authors** - Paper submission and guidelines
- **Exhibitors** - Exhibition opportunities
- **Travel** - Venue and local information

### Standalone Pages
These items have their own pages:
- **Home** - Main landing page
- **Contact** - Contact information

### Submenu Pages
Each main section contains multiple submenu pages that are accessible through the dropdown navigation and have individual content pages with section banners.

## Page Structure

Each submenu page follows this structure:

1. **Section Banner**: 
   - Displays the section title (e.g., "About IPAC'27", "Scientific Program")
   - Shows a descriptive subtitle for context
   - Uses the same gradient styling as main section pages

2. **Content Area**:
   - Left sidebar with section navigation
   - Main content area with your Markdown content
   - Consistent styling and responsive design

### Banner Configuration

Banners are automatically configured for each section:

- **About**: "About IPAC'27" - Information about the conference
- **Program**: "Scientific Program" - Program and sessions
- **Registration**: "Registration" - Registration and applications  
- **Authors**: "For Authors" - Paper submission and guidelines
- **Exhibitors**: "Exhibition & Sponsorship" - Exhibition opportunities
- **Travel**: "Travel & Accommodation" - Venue and local information

## Markdown File Format

Each content file follows this structure:

```markdown
---
title: "Page Title"
description: "Optional page description for SEO"
---

# Main Page Title

Your content here using standard Markdown plus custom directives.

## Section Title

Regular markdown text, lists, etc.

:::highlight
Special highlighted content
:::
```

## Standard Markdown Elements

### Text and Headers
```markdown
# Main Title (converts to large title)
## Section Title (converts to medium title)  
### Subsection Title (converts to smaller title)

Regular paragraph text.

**Bold text** and *italic text* work normally.
```

### Lists
```markdown
- First item
- Second item  
- Third item
```

## Custom Directives

These special directives create styled content blocks:

### Alert Boxes
```markdown
:::highlight
Important information that stands out
:::

:::warning
Warning message with warning icon
:::

:::success
Success message with checkmark
:::

:::info
Information box with info icon
:::
```

### Cards and Grids
```markdown
:::grid{columns=2}
:::card{icon="📅" title="Conference Dates"}
May 23-28, 2027
:::

:::card{icon="📍" title="Location"}
Huntington Place, Detroit, MI, USA
:::
:::
```

For 3-column grids:
```markdown
:::grid{columns=3}
:::card{icon="🎤" title="Invited Talks"}
World-renowned experts will present the latest advances.
:::

:::card{icon="📊" title="Contributed Papers"}
Original research presentations from the community.
:::

:::card{icon="📋" title="Poster Sessions"}
Interactive sessions for detailed discussions.
:::
:::
```

### Status Badges
```markdown
:::status{type="coming-soon"}
Registration
:::

:::status{type="available"}
Program Schedule
:::

:::status{type="closed"}
Abstract Submission
:::
```

## Adding a New Page

### Step 1: Create the Markdown File

Create a new file in the appropriate section folder:
`src/content/[section]/[page-name].md`

Example: `src/content/travel/venue-information.md`

```markdown
---
title: "Venue Information"
description: "Details about the conference venue"
---

# Venue Information

:::highlight
IPAC'27 will be held at the Huntington Place in downtown Detroit.
:::

## About the Venue

Huntington Place is a state-of-the-art convention center located in the heart of Detroit's downtown district.

### Venue Features

- Over 700,000 square feet of exhibition space
- Modern conference facilities
- Convenient downtown location
- Easy access to hotels and restaurants

:::grid{columns=2}
:::card{icon="📍" title="Address"}
1 Washington Blvd, Detroit, MI 48226
:::

:::card{icon="🏢" title="Capacity"}
Over 700,000 square feet of exhibition space
:::
:::

:::info
Free WiFi is available throughout the venue for all conference attendees.
:::
```

### Step 2: Create the Page Component

Create the corresponding `.astro` file:
`src/pages/travel/venue-information.astro`

```astro
---
import ContentLayout from '../../layouts/ContentLayout.astro';
import ContentRenderer from '../../components/ContentRenderer.astro';
import { getPageContent } from '../../data/content.ts';

const pageContent = getPageContent('travel/venue-information');
if (!pageContent) {
  throw new Error('Page content not found');
}
---

<ContentLayout title={pageContent.title} description={pageContent.description}>
  <ContentRenderer blocks={pageContent.blocks} />
</ContentLayout>
```

### Step 3: Update the Content Loader

Add your new page to the content map in `src/utils/markdown-loader.ts`:

```typescript
// Add to the contentMap object
'travel/venue-information': {
  title: "Venue Information",
  description: "Details about the conference venue",
  blocks: [
    // Convert your markdown content to blocks
  ]
}
```

## Editing Existing Content

To edit existing content, simply:

1. **Find the Markdown file** in `src/content/[section]/[page].md`
2. **Edit the content** using Markdown and custom directives
3. **Save the file** - changes will appear automatically!

## Benefits of This System

✅ **Easy to Edit**: Non-technical users can edit Markdown files  
✅ **Version Control**: Each page is a separate file, easy to track changes  
✅ **Consistent Design**: All styling handled automatically  
✅ **Flexible**: Mix standard Markdown with custom styled components  
✅ **Maintainable**: Clear separation between content and code  
✅ **Portable**: Markdown files can be used in other systems if needed  

## Examples

### Simple Page
```markdown
---
title: "Code of Conduct"
description: "Conference code of conduct and policies"
---

# Code of Conduct

IPAC'27 is committed to providing a safe, inclusive, and welcoming environment for all participants.

## Our Standards

- Be respectful and professional
- Welcome diverse perspectives
- Use inclusive language
- Be constructive in discussions

:::warning
Violations of the code of conduct may result in removal from the conference.
:::

## Reporting Issues

If you experience or witness inappropriate behavior, please contact:
- Email: conduct@ipac27.org
- Phone: +1 (555) 123-4567

:::info
All reports will be handled confidentially and with respect for all parties involved.
:::
```

### Complex Page with Multiple Elements
```markdown
---
title: "Registration Fees"
description: "Conference registration fees and payment information"
---

# Registration Fees

:::warning
Early bird rates available until March 1, 2027!
:::

## Fee Structure

:::grid{columns=2}
:::card{title="Regular Registration"}
**Early Bird:** $850  
**Regular:** $950  
**On-site:** $1,050
:::

:::card{title="Student Registration"}
**Early Bird:** $425  
**Regular:** $525  
**On-site:** $625
:::

:::card{title="Industry Registration"}
**Early Bird:** $1,200  
**Regular:** $1,400  
**On-site:** $1,600
:::

:::card{title="One-Day Pass"}
**Any Day:** $300  
*Limited sessions access*
:::
:::

## What's Included

All registration types include:

- Access to scientific sessions
- Coffee breaks and lunches
- Welcome reception
- Conference proceedings
- WiFi access

:::highlight
Student registrations require proof of enrollment. Industry registrations include additional networking events.
:::

:::status{type="available"}
Registration Now Open
:::
```

This system makes it very easy for anyone to update content without needing to know HTML, CSS, or Astro!
