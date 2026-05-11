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

/** Featured developer timeline entries (off-plan showcase). */
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  caption: string;
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

export interface PropertyListing {
  id: number;
  title: string;
  propertyTitle?: string;
  towerName?: string;
  subLocality?: string;
  type: "Buy" | "Rent";
  location: string;
  price: string;
  path: string;
  images: string[];
  beds?: number;
  baths?: number;
  area?: number;
  propertySize?: string | number;
  propertySizeUnit?: string;
  propertyType?: "Apartment" | "Penthouse" | "Villa" | "Townhouse" | "Duplex" | "Studio";
  agent?: {
    name: string;
    image: string;
    language?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  badge?: "Off Plan" | "New";
}

export interface PropertyFilters {
  listingType: "rent" | "buy";
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  searchQuery?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  rating: number;
}

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  path: string;
  /** When set, the article page renders structured body copy instead of the placeholder. */
  content?: BlogContentBlock[];
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
  designation?: string;
  image: string;
  path?: string;
}

export interface JobPosition {
  id: number;
  title: string;
  subTitle?: string;
  department: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract";
  workMode?: "On-site" | "Remote" | "Hybrid";
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  company?: string;
  postedAt?: string;
  applicants?: number;
  applyPath?: string;
  applyEmail?: string;
  phone?: string;
}

export type NavLink = { id: string; path: string; title: string };

export type NavDropdown = {
  id: string;
  path: string;
  title: string;
  type: "dropdown";
  children: NavLink[];
};

export interface SubService {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  subservices: SubService[];
  overviewHeading?: string;
  overview?: string[];
}

export interface WhyChooseItem {
  id: number;
  icon: "expertise" | "transparency" | "support" | "market" | "end-to-end";
  title: string;
  description: string;
}
