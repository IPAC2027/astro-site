// Centralized navigation configuration for IPAC'27
// This file defines the navigation structure used by both dropdown and sidebar navigation

export interface NavigationItem {
  name: string;
  href: string;
}

export interface NavigationSection {
  name: string;
  href?: string; // Only for sections that have their own page
  submenu: NavigationItem[];
}

export const navigationConfig: NavigationSection[] = [
  {
    name: 'About',
    submenu: [
      { name: 'Welcome', href: '/about/welcome' },
      { name: 'Committee', href: '/about/committee' },
      { name: 'NPSS-APS', href: '/about/npss-aps' },
      { name: 'Code of Conduct', href: '/about/code-of-conduct' },
      { name: 'Conference Logo', href: '/about/conference-logo' },
      { name: 'Conference Poster', href: '/about/conference-poster' },
      { name: 'Mobile App', href: '/about/mobile-app' },
      { name: 'Health and Safety', href: '/about/health-and-safety' },
      { name: 'Q&A', href: '/about/q-and-a' }
    ]
  },
  {
    name: 'Program',
    submenu: [
      { name: 'Scientific Program', href: '/program/scientific-program' },
      { name: 'Synoptic Table', href: '/program/synoptic-table' },
      { name: 'Invited Speakers', href: '/program/invited-speakers' },
      { name: 'Satellite Events', href: '/program/satellite-events' },
      { name: 'Student Program', href: '/program/student-program' },
      { name: 'Accelerator Prizes', href: '/program/accelerator-prizes' },
      { name: 'Social Program', href: '/program/social-program' }
    ]
  },
  {
    name: 'Registration',
    submenu: [
      { name: 'Conference Registration', href: '/registration/conference-registration' },
      { name: 'Student Grant Application', href: '/registration/student-grant' },
      { name: 'FRIB Tour', href: '/registration/frib-tour' }
    ]
  },
  {
    name: 'Authors',
    submenu: [
      { name: 'Abstract Submission', href: '/authors/abstract-submission' },
      { name: 'Classifications', href: '/authors/classification' },
      { name: 'Paper Preparation', href: '/authors/paper-preparation' },
      { name: 'Speaker Guidelines', href: '/authors/speaker-guidelines' },
      { name: 'Poster Preparation', href: '/authors/poster-preparation' },
      { name: 'Message from PRAB', href: '/authors/message-from-prab' }
    ]
  },
  {
    name: 'Exhibitors',
    submenu: [
      { name: 'Exhibition Opportunities', href: '/exhibitors/opportunities' },
      { name: 'Exhibition Registration', href: '/exhibitors/exhibition-registration' },
      { name: 'Ongoing Accelerator Projects', href: '/exhibitors/ongoing-projects' },
      { name: 'Logistics', href: '/exhibitors/logistics' }
    ]
  },
  {
    name: 'Travel',
    submenu: [
      { name: 'Venue Information', href: '/travel/venue-information' },
      { name: 'Accommodation', href: '/travel/accommodation' },
      { name: 'Getting to Detroit', href: '/travel/transportation' },
      { name: 'Things to Do', href: '/travel/things-to-do' },
      { name: 'Visa Information', href: '/travel/visa-information' }
    ]
  }
];

// Helper function to get section config by key
export function getSectionConfig(sectionKey: string) {
  return navigationConfig.find(section => 
    section.name.toLowerCase() === sectionKey
  );
}

// Helper function to get navigation items for a specific section
export function getSectionItems(sectionKey: string): NavigationItem[] {
  const section = getSectionConfig(sectionKey);
  return section?.submenu || [];
}

// Helper function to get previous and next pages within a section
export function getPrevNextPages(currentPath: string): { prev: NavigationItem | null; next: NavigationItem | null } {
  // Find which section this path belongs to
  const pathParts = currentPath.split('/').filter(Boolean);
  const sectionKey = pathParts[0];
  
  const section = getSectionConfig(sectionKey);
  if (!section) {
    return { prev: null, next: null };
  }
  
  const items = section.submenu;
  const currentIndex = items.findIndex(item => item.href === currentPath);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex < items.length - 1 ? items[currentIndex + 1] : null
  };
}
