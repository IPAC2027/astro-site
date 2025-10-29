import { exhibitors } from './exhibitors';

export const homeContent = {
  hero: {
    title: "IPAC' 27",
    subtitle: "18th International Particle Accelerator Conference",
    backgroundImage: "/detroit_skyline_night.jpg", // You can change this to your desired image
    conferenceDetails: {
      dates: "May 23-28, 2027",
      location: "Detroit, MI",
      venue: "Huntington Place"
    },
    callToAction: {
      primary: {
        text: "Register Starting November 2026",
        href: "/registration/conference-registration"
      },
      secondary: {
        text: "Learn More",
        href: "/about/welcome"
      }
    }
  },
  
  countdown: {
    title: "Countdown to IPAC'27",
    targetDate: "2027-05-23T09:00:00"
  },
  
  importantDates: {
    title: "Important Dates",
    subtitle: "",
    dates: [
      {
        period: "Oct 2026",
        title: "Abstract Submission Opens",
        description: "",
        colorScheme: "primary-accent"
      },
      {
        period: "Nov 2026",
        title: "Early Registration Opens",
        description: "",
        colorScheme: "accent-primary"
      },
      {
        period: "Dec 2026",
        title: "Abstract Submission Deadline",
        description: "",
        colorScheme: "primary-accent"
      },
      {
        period: "March 2027",
        title: "Early Registration Ends",
        description: "",
        colorScheme: "accent-primary"
      },
    {
        period: "April 2027",
        title: "Final Registration",
        description: "",
        colorScheme: "primary-accent"
      }      

    ],
    conferenceStart: {
      date: "May 23, 2027",
      title: "🎉 Conference Begins!",
      colorScheme: "conference-start"
    }
  },
  
  about: {
    title: "About IPAC' 27",
    description: [
      "The International Particle Accelerator Conference (IPAC) is the premier global forum for presenting and discussing the latest developments in particle accelerator science and technology.",
      "IPAC' 27 will bring together accelerator physicists, engineers, and industry professionals from around the world to share groundbreaking research, innovative technologies, and collaborative opportunities that advance the field of particle acceleration."
    ],
    learnMoreLink: {
      text: "Learn more about IPAC27",
      href: "/about"
    },
    chairWelcome: {
      message: "We are excited to welcome you to IPAC' 27 in Detroit, Michigan, where innovation meets collaboration. This conference represents the pinnacle of accelerator science, bringing together brilliant minds to shape the future of particle accelerator science, technology, and their applications.",
      chair: {
        name: "Prof. Wei, Jie",
        title: "Conference Chair",
        institution: "FRIB & Michigan State University",
        image: "/images/chair-placeholder.jpg"
      }
    }
  },
  
  globalImpact: {
    title: "Join the Annual Gathering of International Accelerator Experts",
    subtitle: "",
    description: "",
    stats: {
      years: 18,
      expectedAttendees: 1200,
      countries: 40,
      presentations: 800
    },
    statsLabels: {
      years: "Years of Excellence",
      expectedAttendees: "Expected Attendees",
      countries: "Countries Represented",
      presentations: "Scientific Presentations"
    }
  },
  
  programHighlights: {
    title: "Conference Programs",
    subtitle: "Explore cutting-edge research across multiple scientific tracks and technical sessions",
    tracks: [
      {
        title: "Accelerator Science",
        description: "Novel advancements in:",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        highlights: [
          "Accelerator design",
          "Beam dynamics & EM fields",
          "Novel acceleration methods", 
          "Particle sources",
          "AI/ML applications"
        ],
        link: "/program/scientific-program",
        color: "blue"
      },
      {
        title: "Accelerator Technology",
        description: "Latest developments in:",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        highlights: [
          "Superconducting magnets",
          "RF systems & cavities",
          "Vacuum technology",
          "Instrumentations",
          "Control systems"
        ],
        link: "/program/scientific-program",
        color: "cyan"
      },
      {
        title: "Student Program",
        description: "For students, early career researchers, and educational initiatives",
        icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
        highlights: [
          "Student poster sessions",
          "Career development",
          "Poster Awards"
        ],
        link: "/program/student-program",
        color: "green"
      }, 
      {
        title: "Awards & Recognitions",
        description: "Join us to recognize and celebrate excellence in accelerator science and technology",
        icon: "M6 9V2h12v7c0 2.21-1.79 4-4 4v3h2a1 1 0 110 2H8a1 1 0 110-2h2v-3c-2.21 0-4-1.79-4-4zm2-5v5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V4H8z",
        highlights: [
          "Awards ceremony",
          "Awardee presentations",
        ],
        link: "/program/scientific-program",
        color: "orange"
      },
    ]
  },
  
  community: {
    title: "Connect the Global Accelerator Community",
    subtitle: "Interact with researchers, institutions, and industry leaders worldwide",
    stats: {
      communities: 25,
      institutions: 100,
      industries: 100
    },
    statsLabels: {
      communities: "On-going Projects",
      institutions: "Leading Institutions",
      industries: "Exhibition Spots"
    },
    statsDescriptions: {
      communities: "Worldwide investments",
      institutions: "Universities & labs",
      industries: "For business partners"
    },
    sponsorsTitle: "IPAC' 27 Exhibitors",
    sponsors: exhibitors,
    sponsorCta: {
      title: "Become a Exhibitor",
      description: "Join us to expand business opportunities and support the future of particle accelerator science",
      buttons: {
        primary: {
          text: "Exhibitor Opportunities",
          href: "/exhibitors/opportunities"
        },
        secondary: {
          text: "Contact Us",
          href: "/contact"
        }
      }
    }
  },  
  news: {
    title: "Latest Updates",
    subtitle: "Stay informed about IPAC27 developments",
    articles: [
      {
        date: "January 15, 2025",
        title: "IPAC27 Website Launched",
        excerpt: "We're excited to announce the launch of the official IPAC27 website. Stay tuned for important updates about the conference.",
        link: "#"
      },
      {
        date: "Coming Soon",
        title: "Call for Abstracts",
        excerpt: "Details about abstract submission guidelines and deadlines will be announced in the coming months.",
        link: "#"
      },
      {
        date: "Coming Soon",
        title: "Venue Announcement",
        excerpt: "The host city and venue for IPAC27 will be announced soon. Subscribe to our updates to be the first to know.",
        link: "#"
      }
    ]
  }
};
