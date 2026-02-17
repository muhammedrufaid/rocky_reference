// export const navigationData = [
//   { id: 1, title: "Buy", path: "/buy" },
//   { id: 2, title: "Rent", path: "/rent" },
//   // { id: 3, title: "Sell", path: "/sell" },
//   { id: 4, title: "Off Plan", path: "/off-plan" },
//   // { id: 5, title: "Areas", path: "/areas" },
//   { id: 6, title: "Agents", path: "/agents" },
//   // { id: 7, title: "About", path: "/about" },
//   { id: 8, title: "Contact", path: "/contact" },
//   { id: 9, title: "More", path: "" },
// ];

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

export const featuredOffPlanProjects: OffPlanProject[] = [
  {
    id: 1,
    title: "Marina Heights",
    developer: "Emaar Properties",
    location: "Dubai Marina",
    priceFrom: "AED 1.2M",
    image: "/assets/projects/marina-heights.jpg",
    path: "/off-plan/marina-heights",
    completionYear: "2027",
  },
  {
    id: 2,
    title: "Creek Beach Residences",
    developer: "Emaar Properties",
    location: "Dubai Creek Harbour",
    priceFrom: "AED 890K",
    image: "/assets/projects/creek-beach.jpg",
    path: "/off-plan/creek-beach-residences",
    completionYear: "2026",
  },
  {
    id: 3,
    title: "Sobha One",
    developer: "Sobha Realty",
    location: "Sobha Hartland",
    priceFrom: "AED 1.5M",
    image: "/assets/projects/sobha-one.jpg",
    path: "/off-plan/sobha-one",
    completionYear: "2028",
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

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  path: string;
}

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
];

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  rating: number;
}

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
