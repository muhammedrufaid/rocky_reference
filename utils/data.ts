export interface OffPlanProject {
  id: number;
  title: string;
  developer: string;
  location: string;
  priceFrom: string;
  image: string;
  path: string;
  completionYear?: string;
}

export interface Property {
  id: number;
  title: string;
  type: "Buy" | "Rent";
  location: string;
  price: string;
  image: string;
  path: string;
  beds?: number;
  baths?: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  path: string;
}

export interface Developer {
  id: number;
  name: string;
  logo: string;
  path?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  department: string;
  image: string;
  path?: string;
}


export const featuredOffPlanProjects: OffPlanProject[] = [
  {
    id: 1,
    title: "Grand Polo Club & Resort",
    developer: "Emaar",
    location: "Dubailand",
    priceFrom: "AED 5,100,000",
    image: "/assets/offplan/grand_polo_by_emaar.webp",
    path: "/off-plan/marina-heights",
    completionYear: "2027",
  },
  {
    id: 2,
    title: "Avarra by Palace",
    developer: "Emaar",
    location: "Business Bay",
    priceFrom: "AED 2,700,000",
    image: "/assets/offplan/avarra_by.webp",
    path: "/off-plan/creek-beach-residences",
    completionYear: "2026",
  },
  {
    id: 3,
    title: "Artistry One Residences at d3",
    developer: "Select Group",
    location: "Dubai Design District (d3)",
    priceFrom: "AED 2,300,000",
    image: "/assets/offplan/artistry_one.webp",
    path: "/off-plan/sobha-one",
    completionYear: "2028",
  },
  {
    id: 4,
    title: "DIFC Residences",
    developer: "Nakheel",
    location: "DIFC",
    priceFrom: "AED 2,920,000",
    image: "/assets/offplan/difc_zabeel_district_residential.webp",
    path: "/off-plan/the-palm-tower",
    completionYear: "2029",
  },
];

export const featuredProperties: Property[] = [
  {
    id: 1,
    title: "Luxury Marina Apartment",
    type: "Buy",
    location: "Dubai Marina",
    price: "AED 4,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    path: "/buy/marina-luxury-apartment",
    beds: 3,
    baths: 3,
  },
  {
    id: 2,
    title: "Modern Villa with Private Pool",
    type: "Buy",
    location: "Palm Jumeirah",
    price: "AED 12,500,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    path: "/buy/palm-villa",
    beds: 5,
    baths: 6,
  },
  {
    id: 3,
    title: "Downtown View Apartment",
    type: "Rent",
    location: "Downtown Dubai",
    price: "AED 185,000/year",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    path: "/rent/downtown-apartment",
    beds: 2,
    baths: 2,
  },
  {
    id: 4,
    title: "Grand Polo Club & Resort",
    type: "Buy",
    location: "Dubailand",
    price: "AED 5,100,000",
    image: "/assets/offplan/grand_polo_by_emaar.webp",
    path: "/off-plan/marina-heights",
    beds: 4,
    baths: 4,
  },
  {
    id: 5,
    title: "JBR Beachfront Studio",
    type: "Rent",
    location: "JBR",
    price: "AED 95,000/year",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    path: "/rent/jbr-studio",
    beds: 1,
    baths: 1,
  },
  {
    id: 6,
    title: "Business Bay Penthouse",
    type: "Buy",
    location: "Business Bay",
    price: "AED 8,900,000",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop",
    path: "/buy/business-bay-penthouse",
    beds: 4,
    baths: 5,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ahmed Al-Maktoum",
    department: "Directors",
    image: "/assets/teams/team1.png",
    path: "/our-team/ahmed-al-maktoum",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    department: "Finance",
    image: "/assets/teams/team2.png",
    path: "/our-team/sarah-johnson",
  },
  {
    id: 3,
    name: "Omar Hassan",
    department: "Sales",
    image: "/assets/teams/team3.jpg",
    path: "/our-team/omar-hassan",
  },
  {
    id: 4,
    name: "Elena Vasquez",
    department: "Leasing",
    image: "/assets/teams/team4.jpg",
    path: "/our-team/elena-vasquez",
  },
  {
    id: 5,
    name: "Michael Chen",
    department: "Property Management",
    image: "/assets/teams/team5.jpg",
    path: "/our-team/michael-chen",
  },
  {
    id: 6,
    name: "Priya Sharma",
    department: "Marketing",
    image: "/assets/teams/team6.jpg",
    path: "/our-team/priya-sharma",
  },
  {
    id: 7,
    name: "James Al-Rashid",
    department: "Directors",
    image: "/assets/teams/team7.png",
    path: "/our-team/james-al-rashid",
  },
  {
    id: 8,
    name: "Fatima Al-Nahyan",
    department: "Finance",
    image: "/assets/teams/team8.jpg",
    path: "/our-team/fatima-al-nahyan",
  },
  {
    id: 9,
    name: "David Williams",
    department: "Sales",
    image: "/assets/teams/team9.jpg",
    path: "/our-team/david-williams",
  },
  {
    id: 10,
    name: "Aisha Patel",
    department: "Leasing",
    image: "/assets/teams/team10.png",
    path: "/our-team/aisha-patel",
  },
  {
    id:11,
    name: "Fatima Al-Nahyan",
    department: "Finance",
    image: "/assets/teams/team8.jpg",
    path: "/our-team/fatima-al-nahyan",
  },
  {
    id: 12,
    name: "David Williams",
    department: "Sales",
    image: "/assets/teams/team9.jpg",
    path: "/our-team/david-williams",
  },
  {
    id: 13,
    name: "Aisha Patel",
    department: "Leasing",
    image: "/assets/teams/team10.png",
    path: "/our-team/aisha-patel",
  },
];

export const navigationData = [
  { id: 1, title: "Buy", path: "/buy" },
  { id: 2, title: "Rent", path: "/rent" },
  { id: 3, title: "Off Plan", path: "/off-plan" },
  { id: 4, title: "Services", path: "/services" },
  { id: 5, title: "Contact", path: "/contact" },
  { id: 6, title: "More", path: "" },
  // { id: 7, title: "Agents", path: "/agents" },
];

export const moreDropdownItems = [
  { id: 1, title: "Careers", path: "/careers" },
  { id: 2, title: "Who We Are", path: "/who-we-are" },
  { id: 3, title: "Our Story", path: "/our-story" },
  { id: 4, title: "Our Team", path: "/our-team" },
  { id: 5, title: "Why Choose Us", path: "/why-choose-us" },
];

// ... rest (searchTabs, categoryOptions)

export const searchTabs = ["Buy", "Rent"] as const;

export const categoryOptions: Record<string, string[]> = {
  Buy: ["Residential", "Commercial", "Offplan"],
  Rent: ["Residential", "Commercial"],
  // Sell: ["Residential", "Commercial", "Offplan"],
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Private Contemporary Home Balancing Openness",
    category: "Residential",
    description:
      "Explore how modern architecture blends indoor and outdoor spaces seamlessly, creating light-filled interiors that feel both private and expansive.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop",
    path: "/blog/private-contemporary-home",
  },
  {
    id: 2,
    title: "Contemporary Home Private Balancing Openness",
    category: "Commercial",
    description:
      "Discover design principles that bring natural materials and clean lines together for a timeless kitchen that serves as the heart of the home.",
    image:
      "https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg",
    path: "/blog/contemporary-home-private",
  },
  {
    id: 3,
    title: "Balancing Private Contemporary Home Openness",
    category: "Luxury",
    description:
      "From floor-to-ceiling windows to thoughtful zoning, learn how top architects achieve the perfect balance between openness and intimacy.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    path: "/blog/balancing-private-contemporary",
  },
  {
    id: 4,
    title: "Dubai Real Estate Market Insights: What to Expect in 2026",
    category: "Residential",
    description:
      "Stay ahead of the curve with our expert analysis of the Dubai real estate market trends, predictions, and opportunities for 2026.",
    image:
      "https://images.pexels.com/photos/10514386/pexels-photo-10514386.jpeg",
    path: "/blog/dubai-real-estate-market-insights",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Rocky made finding our dream home seamless. Their attention to detail and market knowledge exceeded our expectations. Highly recommend for anyone serious about Dubai real estate.",
    author: "Sarah Mitchell",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Professional, responsive, and genuinely invested in our needs. From the first viewing to the final handover, the entire experience was flawless.",
    author: "James Al-Rashid",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The best real estate agency we've worked with. Their off-plan expertise helped us secure a great investment. Trustworthy and transparent throughout.",
    author: "Elena Vasquez",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Outstanding service from start to finish. The team understood exactly what we were looking for and delivered beyond our expectations.",
    author: "Michael Chen",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Rocky's market insights and professional approach made our property search stress-free. We couldn't be happier with our new home.",
    author: "Priya Sharma",
    rating: 5,
  },
];

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  id: number;
  icon: "expertise" | "transparency" | "support" | "market" | "end-to-end";
  title: string;
  description: string;
}

export const whyChooseAgentsData: WhyChooseItem[] = [
  {
    id: 1,
    icon: "expertise",
    title: "Dubai Specialists",
    description: "Our agents live and breathe Dubai's property market. From Marina to Palm Jumeirah, we know every neighbourhood, price trend, and hidden opportunity.",
  },
  {
    id: 2,
    icon: "transparency",
    title: "Personalised, One-on-One Service",
    description: "You get a dedicated agent who learns your needs, budget, and timeline. No generic scripts — just tailored guidance for your property journey.",
  },
  {
    id: 3,
    icon: "support",
    title: "Bilingual & Multi-Cultural Team",
    description: "We communicate fluently in English, Arabic, and more. Our diverse team understands the needs of international buyers and local residents alike.",
  },
  {
    id: 4,
    icon: "market",
    title: "Licensed & RERA-Compliant",
    description: "Every Rocky agent is fully licensed and adheres to RERA regulations. You get professional, accountable service you can trust.",
  },
  {
    id: 5,
    icon: "end-to-end",
    title: "From Viewing to Keys",
    description: "We guide you through viewings, negotiations, paperwork, and handover. Your agent stays with you until you have the keys in hand.",
  },
];

export const whyChooseServicesData: WhyChooseItem[] = [
  {
    id: 1,
    icon: "expertise",
    title: "Deep Dubai Market Knowledge",
    description: "Our team brings decades of combined experience in Dubai's real estate market, from off-plan to resale.",
  },
  {
    id: 2,
    icon: "transparency",
    title: "Transparent & Honest Service",
    description: "Clear communication, no hidden fees, and straightforward advice at every step of your journey.",
  },
  {
    id: 3,
    icon: "support",
    title: "End-to-End Support",
    description: "From paperwork to handover and beyond — we stay with you even after the deal is done.",
  },
  {
    id: 4,
    icon: "market",
    title: "Data-Driven Advisory",
    description: "Investment decisions backed by market intelligence, trends, and strategic insights.",
  },
  {
    id: 5,
    icon: "end-to-end",
    title: "Dedicated Client Relationship",
    description: "A single point of contact who understands your needs and delivers personalised solutions.",
  },
];

export const services: Service[] = [
  
  
  {
    id: 1,
    title: "Property Management",
    description: "End-to-end property management services to maximise your returns while ensuring excellent property condition.",
  },
  {
    id: 2,
    title: "Professional Inspection",
    description: "Professional Inspections arranged to identify and solve defects before the official handover.",
  },
  {
    id: 3,
    title: "Brokerage",
    description: "Practical, data-driven advice to help you buy, sell, or lease a property.",
  },
  {
    id: 4,
    title: "Mortgage",
    description: "We work with trusted banking partners and mortgage advisors to get you the best deals.",
  },
  {
    id: 5,
    title: "Property Listing & Marketing",
    description: "We ensure your property is marketed effectively on real estate portals, social media platforms, and more.",
  },
  {
    id: 6,
    title: "After Sales Support",
    description: "Paperwork to handover, we manage everything for our clients, even after the sale is done.",
  },
];

export const developers: Developer[] = [
  {
    id: 1,
    name: "Majid Al Futtaim",
    logo: "/assets/developers/01.png",
    path: "/developers/majid-al-futtaim",
  },
  {
    id: 2,
    name: "Damac Properties",
    logo: "/assets/developers/02.png",
    path: "/developers/damac",
  },
  {
    id: 3,
    name: "Meraas",
    logo: "/assets/developers/03.png",
    path: "/developers/meraas",
  },
  {
    id: 4,
    name: "Sobha Realty",
    logo: "/assets/developers/04.png",
    path: "/developers/sobha",
  },
  {
    id: 5,
    name: "Emaar Properties",
    logo: "/assets/developers/05.png",
    path: "/developers/emaar",
  },
  {
    id: 6,
    name: "Ellington Properties",
    logo: "/assets/developers/06.webp",
    path: "/developers/ellington",
  },
  {
    id: 7,
    name: "Danube Properties",
    logo: "/assets/developers/07.webp",
    path: "/developers/danube",
  },
  {
    id: 8,
    name: "Nakheel",
    logo: "/assets/developers/08.webp",
    path: "/developers/nakheel",
  },
  {
    id: 9,
    name: "Select Group",
    logo: "/assets/developers/09.webp",
    path: "/developers/select-group",
  },
];
