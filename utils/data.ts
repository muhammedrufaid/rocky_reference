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

export const navigationData = [
  { id: 1, title: "Buy", path: "/buy" },
  { id: 2, title: "Rent", path: "/rent" },
  { id: 4, title: "Off Plan", path: "/off-plan" },
  // { id: 6, title: "Agents", path: "/agents" },
  { id: 8, title: "Contact", path: "/contact" },
  { id: 9, title: "More", path: "" },
];

export const moreDropdownItems = [
  { id: 1, title: "Careers", path: "/careers" },
  { id: 2, title: "Who We Are", path: "/who-we-are" },
  { id: 3, title: "Our Story", path: "/our-story" },
  { id: 4, title: "Our Team", path: "/our-team" },
  { id: 5, title: "Why Choose Us", path: "/why-choose-us" },
];

// ... rest (searchTabs, categoryOptions)

export const searchTabs = ["Buy", "Rent", "Sell"] as const;

export const categoryOptions: Record<string, string[]> = {
  Buy: ["Residential", "Commercial", "Offplan"],
  Rent: ["Residential", "Commercial"],
  Sell: ["Residential", "Commercial", "Offplan"],
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
