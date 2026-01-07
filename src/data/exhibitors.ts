export interface Sponsor {
  name: string;
  logo: string;
  link: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  description?: string;
}

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

// Sponsors organized by tier
export const sponsors: Sponsor[] = [
  // Platinum Sponsors
  {
    name: "IEEE NPSS",
    logo: "/logos/IEEE_NPSS_Logo.png",
    link: "https://ieee-npss.org/",
    tier: "platinum",
    description: "IEEE Nuclear & Plasma Sciences Society - Leading professional organization for accelerator science"
  },
  {
    name: "American Physical Society",
    logo: "/logos/APS_logo.svg",
    link: "https://www.aps.org/",
    tier: "platinum",
    description: "American Physical Society - Advancing and diffusing the knowledge of physics"
  },
  
  // Gold Sponsors
  {
    name: "FRIB",
    logo: "/FRIB_logo.png",
    link: "https://frib.msu.edu/",
    tier: "gold",
    description: "Facility for Rare Isotope Beams - User facility for nuclear science"
  }
];

// Exhibitors and Industry Partners
export const exhibitors: Exhibitor[] = [
  // Diamond Tier
  {
    id: "diamond-1",
    name: "Diamond Exhibitor 1",
    logo: "/images/logos/exhibitors/diamond/sample_1.jpg",
    website: "#",
    description: "Diamond tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "diamond",
    booth: "D101",
    featured: true
  },
  {
    id: "diamond-2",
    name: "Diamond Exhibitor 2",
    logo: "/images/logos/exhibitors/diamond/sample_5.jpg",
    website: "#",
    description: "Diamond tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "diamond",
    booth: "D102",
    featured: true
  },
  
  // Platinum Tier
  {
    id: "platinum-1",
    name: "Platinum Exhibitor 1",
    logo: "/images/logos/exhibitors/platinum/sample_2.jpg",
    website: "#",
    description: "Platinum tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "platinum",
    booth: "P101",
    featured: true
  },
  {
    id: "platinum-2",
    name: "Platinum Exhibitor 2",
    logo: "/images/logos/exhibitors/platinum/sample_6.jpg",
    website: "#",
    description: "Platinum tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "platinum",
    booth: "P102",
    featured: true
  },
  
  // Gold Tier
  {
    id: "gold-1",
    name: "Gold Exhibitor 1",
    logo: "/images/logos/exhibitors/gold/sample_3.png",
    website: "#",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "G101",
    featured: true
  },
  {
    id: "gold-2",
    name: "Gold Exhibitor 2",
    logo: "/images/logos/exhibitors/gold/sample_4.png",
    website: "#",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "G102",
    featured: true
  },
  {
    id: "gold-3",
    name: "Gold Exhibitor 3",
    logo: "/images/logos/exhibitors/gold/sample_7.jpg",
    website: "#",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "G103",
    featured: true
  },
  {
    id: "gold-4",
    name: "Gold Exhibitor 4",
    logo: "/images/logos/exhibitors/gold/sample_8.jpg",
    website: "http://frib.msu.edu/",
    description: "Gold tier exhibitor - placeholder",
    category: "Industry Partner",
    tier: "gold",
    booth: "G104",
    featured: true
  }
];

// Helper functions
export const getSponsorsByTier = (tier: Sponsor['tier']) => {
  return sponsors.filter(sponsor => sponsor.tier === tier);
};

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

// Sponsor tiers information
export const sponsorTiers = {
  platinum: {
    name: "Platinum",
    color: "#E5E7EB",
    benefits: [
      "Premium booth location",
      "Logo on all conference materials",
      "Speaking opportunity",
      "VIP reception access"
    ]
  },
  gold: {
    name: "Gold",
    color: "#F59E0B",
    benefits: [
      "Exhibition booth",
      "Logo on website and program",
      "Networking reception access"
    ]
  },
  silver: {
    name: "Silver",
    color: "#6B7280",
    benefits: [
      "Exhibition space",
      "Logo on website",
      "Conference proceedings"
    ]
  },
  bronze: {
    name: "Bronze",
    color: "#CD7C2F",
    benefits: [
      "Listing on website",
      "Conference proceedings"
    ]
  }
};