export interface Exhibitor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description: string;
  category: string;
  tier: 'diamond' | 'platinum' | 'gold';
  contact?: {
    email?: string;
    phone?: string;
  };
  booth?: string;
  featured?: boolean;
}

// Exhibitors and Industry Partners
export const exhibitors: Exhibitor[] = [
  // Diamond Tier
  {
    id: "diamond-1",
    name: "Your Logo Here",
    logo: "/images/logos/exhibitors/diamond/sample_1.jpg",
    website: "#",
    description: "Diamond tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "diamond",
    booth: "TBD",
    featured: true
  },
  // {
  //   id: "diamond-2",
  //   name: "Your Logo Here",
  //   logo: "/images/logos/exhibitors/diamond/sample_5.jpg",
  //   website: "#",
  //   description: "Diamond tier exhibitor - placeholder",
  //   category: "Industry Partner",
  //   tier: "diamond",
  //   booth: "TBD",
  //   featured: true
  // },
  
  // Platinum Tier
  {
    id: "platinum-1",
    name: "Your Logo Here",
    logo: "/images/logos/exhibitors/platinum/sample_2.jpg",
    website: "#",
    description: "Platinum tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "platinum",
    booth: "TBD",
    featured: true
  },
  // {
  //   id: "platinum-2",
  //   name: "Your Logo Here",
  //   logo: "/images/logos/exhibitors/platinum/sample_6.jpg",
  //   website: "#",
  //   description: "Platinum tier exhibitor - placeholder",
  //   category: "Industry Partner",
  //   tier: "platinum",
  //   booth: "TBD",
  //   featured: true
  // },
  
  // Gold Tier
  {
    id: "gold-001",
    name: "Dimtel, Inc.",
    logo: "/images/logos/exhibitors/gold/dimtel.jpg",
    website: "https://www.dimtel.com/",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "C11",
    featured: true
  },
  {
    id: "gold-002",
    name: "Tesla Group",
    logo: "/images/logos/exhibitors/gold/TESLA_logo.jpg",
    website: "http://www.tesla.co.uk",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "C28",
    featured: true
  },
  {
    id: "gold-003",
    name: "Dean Technology, Inc.",
    logo: "/images/logos/exhibitors/gold/Dean-Logo.png",
    website: "https://www.deantechnology.com/",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "C51",
    featured: true
  },
  {
    id: "gold-004",
    name: "DANFYSIK A/S",
    logo: "/images/logos/exhibitors/gold/Danfysik.png",
    website: "https://www.danfysik.com/en/",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "C27",
    featured: true
  },
];

// Helper functions
export const getExhibitorsByTier = (tier: Exhibitor['tier']) => {
  return exhibitors.filter(exhibitor => exhibitor.tier === tier);
};

export const getExhibitorsByCategory = (category: string) => {
  return exhibitors.filter(exhibitor => exhibitor.category === category);
};

export const getFeaturedExhibitors = () => {
  return exhibitors.filter(exhibitor => exhibitor.featured);
};

export const getExhibitorCategories = () => {
  return [...new Set(exhibitors.map(exhibitor => exhibitor.category))];
};