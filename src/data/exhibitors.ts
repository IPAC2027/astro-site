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
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
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
  // Add more exhibitors as they register
  {
    id: "ieee-npss",
    name: "IEEE NPSS",
    logo: "/logos/IEEE_NPSS_Logo.png",
    website: "https://ieee-npss.org/",
    description: "Professional organization advancing nuclear and plasma sciences technology",
    category: "Professional Organizations",
    tier: "platinum",
    booth: "A101",
    featured: true
  },
  {
    id: "aps",
    name: "American Physical Society",
    logo: "/logos/APS_logo.svg",
    website: "https://www.aps.org/",
    description: "Leading physics society promoting physics research and education",
    category: "Professional Organizations",
    tier: "platinum",
    booth: "A102",
    featured: true
  },
  {
    id: "frib",
    name: "FRIB",
    logo: "/logos/FRIB_logo_white.png",
    website: "https://frib.msu.edu/",
    description: "Facility for Rare Isotope Beams - State-of-the-art nuclear science research facility",
    category: "Research Facilities",
    tier: "gold",
    booth: "B201",
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