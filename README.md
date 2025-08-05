# IPAC27 Website

Official website for IPAC27 - the 18th International Particle Accelerator Conference.

## Overview

This website serves as the central hub for information about IPAC27, providing conference details, registration information, scientific program, and resources for attendees. Built with modern web technologies to provide a fast, accessible, and professional experience.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with intuitive navigation
- **Performance Optimized**: Fast loading times and smooth interactions
- **Accessibility**: Built with web accessibility standards in mind
- **SEO Friendly**: Optimized for search engines

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator with modern developer experience
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Fonts**: Inter and Poppins from Google Fonts
- **Hosting**: Ready for deployment to any static hosting service

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.astro # Site navigation
│   └── Footer.astro     # Site footer
├── layouts/
│   └── Layout.astro     # Base page layout
├── pages/               # Website pages
│   ├── index.astro      # Homepage
│   ├── about.astro      # About the conference
│   ├── registration.astro # Registration information
│   ├── contact.astro    # Contact information
│   ├── program.astro    # Scientific program
│   ├── authors.astro    # Author guidelines
│   ├── travel.astro     # Travel information
│   └── sponsors.astro   # Sponsorship opportunities
└── assets/              # Static assets (images, icons)
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:4321`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Content Management

### Key Pages

1. **Homepage** (`/`) - Conference overview, countdown, key dates, latest updates
2. **About** (`/about`) - Detailed conference information and scope
3. **Registration** (`/registration`) - Registration categories and information
4. **Contact** (`/contact`) - Contact forms and committee information
5. **Program** (`/program`) - Scientific program details (coming soon)
6. **Authors** (`/authors`) - Abstract submission guidelines (coming soon)
7. **Travel** (`/travel`) - Travel and accommodation information (coming soon)
8. **Sponsors** (`/sponsors`) - Sponsorship opportunities (coming soon)

### Updating Content

- Page content is stored in the respective `.astro` files in the `src/pages/` directory
- Shared components like navigation and footer are in `src/components/`
- Styling is handled through Tailwind CSS classes
- Global styles and configuration are in `tailwind.config.mjs`

## Design System

### Colors

- **Primary**: Blue palette (#3b82f6, #2563eb, #1d4ed8)
- **Accent**: Light blue palette (#0ea5e9, #0284c7, #0369a1)
- **Text**: Gray palette for content hierarchy

### Typography

- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Font Weights**: 300, 400, 500, 600, 700

### Components

- Responsive navigation with mobile menu
- Card-based layouts for content sections
- Form elements with consistent styling
- Button variants for different actions
- Countdown timer with live updates

## Deployment

This project is ready for deployment to various static hosting services:

### Netlify
```bash
npm run build
# Deploy the `dist/` folder
```

### Vercel
```bash
npm run build
# Deploy the `dist/` folder
```

### GitHub Pages
```bash
npm run build
# Deploy the `dist/` folder to gh-pages branch
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions about the website or technical issues:

- **Email**: info@ipac27.org
- **Technical Issues**: Contact the web development team

---

Built with ❤️ for the IPAC27 conference and the global accelerator community.
