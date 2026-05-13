import type {
  BlogPost,
  Developer,
  DeveloperPageContent,
  DeveloperPagePayload,
  JobPosition,
  NavDropdown,
  NavLink,
  OffPlanProject,
  Project,
  Property,
  PropertyListing,
  Service,
  TeamMember,
  Testimonial,
  WhyChooseItem,
} from "./types";

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

const IMG = {
  marina: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  marina2: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  marina3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
  marina4: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
  villa2: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
  villa3: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=300&fit=crop",
  villa4: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop",
  downtown: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  downtown2: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
  downtown3: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop",
  downtown4: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop",
  jbr: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  jbr2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  jbr3: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  jbr4: "https://images.unsplash.com/photo-1580587771525-78b9dba3b4d4?w=400&h=300&fit=crop",
  penthouse: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
  penthouse2: "https://images.unsplash.com/photo-1613977257363-707ba308822f?w=400&h=300&fit=crop",
  penthouse3: "https://images.unsplash.com/photo-1600047509798-2d3633317c26?w=400&h=300&fit=crop",
  penthouse4: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
  dubailand: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  dubailand2: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  dubailand3: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
  dubailand4: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
};

export const propertyListings: PropertyListing[] = [
  {
    id: 1,
    title: "Unobstructed Views | Best For Price",
    type: "Buy",
    location: "11 Hills Park, Dubai Science Park, Dubai",
    price: "AED 730,000",
    path: "/buy/marina-luxury-apartment",
    images: [IMG.marina, IMG.marina2, IMG.marina3, IMG.marina4, IMG.marina2],
    beds: 1,
    baths: 2,
    area: 486,
    propertyType: "Apartment",
    agent: { name: "Paul Tredger", image: "/assets/teams/team1.png", language: "Speaks English", phone: "+971501234567", email: "paul@rocky.ae", whatsapp: "971501234567" },
    badge: "New",
  },
  {
    id: 2,
    title: "Modern Villa with Private Pool",
    type: "Buy",
    location: "Mediterranean Villas, Jumeirah Village Triangle, Dubai",
    price: "AED 12,450,000",
    path: "/buy/palm-villa",
    images: [IMG.villa, IMG.villa2, IMG.villa3, IMG.villa4],
    beds: 4,
    baths: 5,
    area: 4200,
    propertyType: "Villa",
    agent: { name: "Ahmed Al-Maktoum", image: "/assets/teams/team1.png", language: "Speaks Arabic & English", phone: "+971501234568", email: "ahmed@rocky.ae", whatsapp: "971501234568" },
  },
  {
    id: 3,
    title: "Downtown View Apartment",
    type: "Rent",
    location: "Downtown Dubai, Emaar Boulevard",
    price: "AED 185,000/year",
    path: "/rent/downtown-apartment",
    images: [IMG.downtown, IMG.downtown2, IMG.downtown3, IMG.downtown4],
    beds: 2,
    baths: 2,
    area: 1200,
    propertyType: "Apartment",
    agent: { name: "Sarah Johnson", image: "/assets/teams/team2.png", language: "Speaks English", phone: "+971501234569", email: "sarah@rocky.ae", whatsapp: "971501234569" },
  },
  {
    id: 4,
    title: "JBR Beachfront Studio",
    type: "Rent",
    location: "JBR, The Walk",
    price: "AED 95,000/year",
    path: "/rent/jbr-studio",
    images: [IMG.jbr, IMG.jbr2, IMG.jbr3, IMG.jbr4],
    beds: 1,
    baths: 1,
    area: 580,
    propertyType: "Studio",
    agent: { name: "Omar Hassan", image: "/assets/teams/team3.jpg", language: "Speaks English", phone: "+971501234570", email: "omar@rocky.ae", whatsapp: "971501234570" },
  },
  {
    id: 5,
    title: "Business Bay Penthouse",
    type: "Buy",
    location: "Business Bay, Dubai",
    price: "AED 8,900,000",
    path: "/buy/business-bay-penthouse",
    images: [IMG.penthouse, IMG.penthouse2, IMG.penthouse3, IMG.penthouse4],
    beds: 4,
    baths: 5,
    area: 3800,
    propertyType: "Penthouse",
    agent: { name: "Elena Vasquez", image: "/assets/teams/team4.jpg", language: "Speaks English & Spanish", phone: "+971501234571", email: "elena@rocky.ae", whatsapp: "971501234571" },
  },
  {
    id: 6,
    title: "Grand Polo Club & Resort",
    type: "Buy",
    location: "Dubailand",
    price: "AED 5,100,000",
    path: "/off-plan/marina-heights",
    images: [IMG.dubailand, IMG.dubailand2, IMG.dubailand3, IMG.dubailand4],
    beds: 4,
    baths: 4,
    area: 2800,
    propertyType: "Townhouse",
    agent: { name: "Michael Chen", image: "/assets/teams/team5.jpg", language: "Speaks English", phone: "+971501234572", email: "michael@rocky.ae", whatsapp: "971501234572" },
    badge: "Off Plan",
  },
];

export const teamMembers: TeamMember[] = [
  // {
  //   id: 1,
  //   name: "Navodya",
  //   department: "Directors",
  //   image: "/assets/teams/novodya.webp",
  //   // path: "/our-team/ahmed-al-maktoum",
  // },
  {
    id: 1,
    name: "Ashok Uttamchandani",
    department: "",
    designation: "Founder",
    image: "",
    // path: "/our-team/sarah-johnson",
  },

  {
    id: 2,
    name: "Kiran Uttamchandani",
    department: "",
    designation: "CEO",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 3,
    name: "Suraj Rajshekar",
    department: "",
    designation: "General Manager",
    image: "",
    // path: "/our-team/omar-hassan",
  },
  {
    id: 4,
    name: "GIZEM OKSUZ",
    department: "",
    designation: "HEAD OF OPERATIONS",
    image: "/assets/teams/gizem.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 5,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 6,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 7,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 8,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 9,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 10,
    name: "",
    department: "",
    designation: "",
    image: "",
    // path: "/our-team/sarah-johnson",
  },








  // {
  //   id: 6,
  //   name: "Ann",
  //   department: "Off Plan",
  //   designation: "Property Consultant",
  //   image: "/assets/teams/offplan_teams/ann.webp",
  //   // path: "/our-team/sarah-johnson",
  // },
  // {
  //   id: 7,
  //   name: "Amit",
  //   department: "Off Plan",
  //   designation: "Property Consultant",
  //   image: "/assets/teams/offplan_teams/amit2.webp",
  //   // path: "/our-team/sarah-johnson",
  // },
  // {
  //   id: 8,
  //   name: "Nevin",
  //   department: "Off Plan",
  //   designation: "Property Consultant",
  //   image: "/assets/teams/offplan_teams/nevin2.webp",
  //   // path: "/our-team/ahmed-al-maktoum",
  // },
  // {
  //   id: 9,
  //   name: "Mahul",
  //   department: "Off Plan",
  //   designation: "Property Consultant",
  //   image: "/assets/teams/offplan_teams/mahul2.webp",
  //   // path: "/our-team/sarah-johnson",
  // },
  // {
  //   id: 10,
  //   name: "Rufaid",
  //   department: "Marketing",
  //   designation: "Web Developer",
  //   image: "/assets/teams/rufaid.webp",
  //   // path: "/our-team/sarah-johnson",
  // },
  
];

export const navigationData: (NavLink | NavDropdown)[] = [
  { id: "1", title: "Buy", path: "/properties/buy/in-dubai" },
  { id: "2", title: "Rent", path: "/properties/rent/in-dubai" },
  { id: "3", title: "Commercial", path: "/properties/buy/in-dubai?type=Commercial%20Full%20Building%2CCommercial%20Land%2CLabour%20Camp%2COffice%2CRetail%2CShop%2CShowroom%2CWarehouse" },
  {
    id: "4",
    path: "/off-plan-properties/in-dubai",
    title: "Off Plan",
    type: "dropdown",
    children: [
      { id: "3-1", title: "Off-Plan Properties", path: "/off-plan-properties/in-dubai" },
      { id: "3-2", title: "Developers", path: "/off-plan-properties/developers" },
    ],
  },
  {
    id: "5",
    path: "/services",
    title: "Services",
    type: "dropdown",
    children: [
      // { id: "4-0", title: "All Services", path: "/services" },
      { id: "4-1", title: "Property Management", path: "/services/property-management" },
      { id: "4-2", title: "Professional Inspection", path: "/services/professional-inspection" },
      { id: "4-3", title: "Brokerage", path: "/services/brokerage" },
      { id: "4-4", title: "Mortgage", path: "/services/mortgage" },
      { id: "4-5", title: "Property Listing & Marketing", path: "/services/property-listing-marketing" },
      { id: "4-6", title: "After Sales Support", path: "/services/after-sales-support" },
    ],
  },
  { id: "6", title: "Contact", path: "/contact" },
  {
    id: "7",
    path: "/who-we-are",
    title: "About",
    type: "dropdown",
    children: [
      { id: "6-1", title: "Careers", path: "/careers" },
      { id: "6-2", title: "Who We Are", path: "/who-we-are" },
      // { id: "6-3", title: "Our Story", path: "/our-story" },
      { id: "6-4", title: "Our Team", path: "/our-team" },
      // { id: "6-5", title: "Why Choose Us", path: "/why-choose-us" },
      { id: "6-6", title: "Achievements", path: "/achievements" },
      { id: "6-7", title: "Blog", path: "/blog" },
    ],
  },
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
    title: "Dubai Updates Investor Visa: Key Information for You",
    category: "Insights",
    description:
      "In 2026, Dubai updated the property-linked investor visa: no minimum property value for sole owners, new rules for joint ownership, and a clearer framework from the DLD and GDRFA.",
    image:
      "/assets/blogs/Investorvisablog1.webp",
    path: "/blog/private-contemporary-home",
    content: [
      {
        type: "paragraph",
        text: "In 2026, Dubai changed the property-linked residency visa to make it easier for investors to get UAE residency.",
      },
      {
        type: "paragraph",
        text: "The Dubai Land Department (DLD) announced on its Cube digital platform that sole property owners no longer need to meet a minimum property value to apply for a two-year investor visa. According to Gulf News reports, there are also new rules for jointly owned properties.",
      },
      {
        type: "paragraph",
        text: "If you are an investor or buyer, here is what you need to know.",
      },
      { type: "heading2", text: "No minimum for sole ownership" },
      {
        type: "paragraph",
        text: "Before these changes, investors needed to invest at least AED 750,000 to qualify for the two-year property investor visa.",
      },
      {
        type: "paragraph",
        text: "Under the new rules, sole property owners no longer need to meet a minimum property value requirement, as long as the property is fully registered in their name.",
      },
      { type: "heading2", text: "New joint ownership threshold" },
      {
        type: "paragraph",
        text: "While the minimum was removed for sole owners, a new rule applies to joint property ownership.",
      },
      {
        type: "paragraph",
        text: "Each investor in a jointly owned property must now own at least AED 400,000 to qualify for the investor visa. Eligibility is checked for each person, not as a group.",
      },
      {
        type: "paragraph",
        text: "This rule ensures that each applicant has made a genuine investment, rather than splitting ownership into small shares to meet requirements.",
      },
      { type: "heading2", text: "Unified visa framework" },
      {
        type: "paragraph",
        text: "Starting in 2026, the main property-linked visas managed by the Dubai Land Department (DLD) and the General Directorate of Residency and Foreigners Affairs (GDRFA) include:",
      },
      { type: "heading3", text: "Two-Year Investor Visa" },
      {
        type: "list",
        items: [
          "This option suits entry-level investors.",
          "There is no minimum property value required for sole owners.",
          "For joint ownership, each investor must have at least AED 400,000 invested.",
          "The residency is renewable.",
        ],
      },
      { type: "heading3", text: "Five-Year Investor Visa" },
      {
        type: "list",
        items: [
          "You need a minimum property investment of AED 1 million.",
          "This visa is available for people aged 55 and above.",
          "The residency can be renewed.",
        ],
      },
      { type: "heading3", text: "Ten-Year Golden Visa" },
      {
        type: "list",
        items: [
          "A minimum property investment of AED 2 million is required.",
          "The investment can be in one property or several properties that together meet the required amount.",
          "This residency is also renewable.",
          "There is no minimum stay requirement outside the UAE.",
        ],
      },
      { type: "heading2", text: "What this means for Property Investors" },
      {
        type: "paragraph",
        text: "Investors inside and outside the UAE now have an easier path to residency. Smaller investments qualify, opening more long-term opportunities in the UAE.",
      },
      {
        type: "paragraph",
        text: "This update aims to boost activity in mid-market communities, studio and one-bedroom units, and new residential areas.",
      },
      {
        type: "paragraph",
        text: "Buyers should pay close attention to ownership structures since the rules for sole and joint ownership have changed.",
      },
      {
        type: "paragraph",
        text: "Dubai is working to make real estate investment more accessible and become a top destination for investors worldwide. The goal is to make long-term residency more attractive, attract global investors, and boost property market activity.",
      },
    ],
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
      "When I rented a flat from Rocky, I visited their office to sign the contract and was assisted by Suchitra. She was very informative, and the entire process went smoothly. I would definitely recommend her if you’re planning to visit the Rocky office.",
    author: "Praveen Kizhakekara",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "I’ve been dealing with Bhavesh for my investments and Anand for my rentals. Extremely professional individuals. You can immediately understand they put client first and the interaction is not transactional.",
    author: "Laurentiu Joita",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Very good Residential Tower in DSO, good amenities and excellent facility management. Highly recommended.",
    author: "Sana Nazarudeen",
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

export const whyChooseAgentsData: WhyChooseItem[] = [
  {
    id: 1,
    icon: "expertise",
    title: "Dubai Specialists",
    description: "Our agents live and breathe Dubai’s property market. Every price trend, neighborhood, hidden opportunity, and more – they know everything.",
  },
  {
    id: 2,
    icon: "transparency",
    title: "Personalized, One-on-One Service",
    description: "You get tailored guidance with a dedicated agent who learns all your needs and delivers a seamless property journey.",
  },
  {
    id: 3,
    icon: "support",
    title: "Bilingual & Multi-Cultural Team",
    description: "English, Arabic, French, Hindi, Urdu, and more. Our diverse team understands the needs of every client – whether local or international.",
  },
  {
    id: 4,
    icon: "market",
    title: "Licensed & RERA-Compliant",
    description: "At Rocky Real Estate, all the agents are fully licensed and adhere to RERA regulations. A professional agent you can trust.",
  },
  {
    id: 5,
    icon: "end-to-end",
    title: "From Viewing to Keys",
    description: "Our agents will guide you through your property journey, from paperwork to handover.",
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
    description: "paperwork to handover and beyond — we stay with you even after the deal is done.",
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
    slug: "property-management",
    title: "Property Management",
    image: "https://images.pexels.com/photos/7937684/pexels-photo-7937684.jpeg",
    icon: "property-management",
    description: "We handle every aspect of property management and keep your property in excellent condition to help you get the best returns.",
    overviewHeading: "Your Property, Professionally Managed",
    overview: [
      "Several challenges come up when owning an investment property, including tenant disputes, missed rent payments, and more.",
      "With our approach at Rocky Real Estate, you will not have to worry about such challenges. We offer property owners a seamless, efficient process by managing their properties professionally and transparently. Through this service, owners can manage their property, remain compliant, and maximise their profit potential.",
      "Whether you’re in Dubai or live abroad, we provide end-to-end property management services, ensuring a seamless, professional, and transparent process.",
    ],
    subservices: [
      { id: 1, title: "Tenant selection & screening", icon: "tenant-selection", description: "We first professionally promote your property, and then screen every prospective tenant to ensure financial stability and long-term occupancy." },
      { id: 2, title: "Rent & financial management", icon: "rent-financial", description: "Our seasoned team then manages all financial aspects, including rent collection, income tracking, consistent cash flow, and rental returns." },
      { id: 3, title: "Maintenance & repairs", icon: "maintenance-repairs", description: "Our trusted service providers resolve such requests once reported." },
      { id: 4, title: "Periodic inspections", icon: "periodic-inspections", description: "Inspections are scheduled and carried out to identify and resolve issues before they escalate proactively and to maintain high property standards." },
      { id: 5, title: "Legal compliance", icon: "legal-compliance", description: "Our experienced team then ensures that all safety and regulatory requirements comply with Dubai tenancy laws and Ejari registration." },
      { id: 6, title: "End of tenancy & evictions", icon: "end-tenancy", description: "Our team manages all closures, renewals, and professional evictions in accordance with legal procedures." },
      { id: 7, title: "Transparent reporting", icon: "transparent-reporting", description: "We provide complete transparency into your property’s performance at all times." },
    ],
  },
  {
    id: 2,
    slug: "professional-inspection",
    title: "Professional Inspection",
    image: "https://images.pexels.com/photos/7415041/pexels-photo-7415041.jpeg",
    icon: "professional-inspection",
    description: "Snagging or professional inspections are arranged to resolve any defects or unfinished work before the handover.",
    overviewHeading: "Protect Your Investment Before Handover",
    overview: [
      "New-build and off-plan properties are often delivered with minor defects that usually go unnoticed. ",
      "Our Professional Inspection or Property Snagging services are conducted to identify any defects or unfinished work in your newly renovated home before you purchase it – a thorough check before it’s officially your place.",
      "Painting defects to plumbing, and lights to floors, every single aspect is inspected, reported, and resolved before handover.",
    ],
    subservices: [
      { id: 1, title: "Detailed property inspection", icon: "detailed-inspection", description: "Fixtures, finishes, and every single part of the property are inspected to make sure nothing’s missing" },
      { id: 2, title: "Inspection report documentation", icon: "inspection-report", description: "A full report is then filed, including descriptions and photographic evidence, to identify all defects or incomplete work." },
      { id: 3, title: "Follow-up and developer coordination", icon: "follow-up-coordination", description: "Your developer then resolves all issues before the final handover" },
      { id: 4, title: "Post-completion verification", icon: "post-verification", description: "A second round of inspection is conducted to confirm that every issue is resolved to the highest standard." },
      { id: 5, title: "Tailored snagging for all property types", icon: "tailored-snagging", description: "Whether it’s an apartment, townhouse, or villa, our services are tailored to each property's unique requirements." },
    ],
  },
  {
    id: 3,
    slug: "brokerage",
    title: "Brokerage",
    image: "https://images.pexels.com/photos/7937328/pexels-photo-7937328.jpeg",
    icon: "brokerage",
    description: "We help you buy, sell, or lease a property with practical and data-driven advice",
    overviewHeading: "Expert Guidance Through Every Transaction",
    overview: [
      "At Rocky Real Estate, we aim to guide you to the right opportunities across commercial, residential, and investment real estate.",
      "We take the time to understand your vision, budget, and timeline and offer end-to-end support through our experienced, RERA-certified consultants. And every transaction is data-driven and fully transparent.",
    ],
    subservices: [
      { id: 1, title: "Understanding your vision:", icon: "understanding-vision", description: "We ensure that we understand your property goals and requirements." },
      { id: 2, title: "Smart Matching", icon: "smart-matching", description: "After a thorough screening, we connect you to the right buyers, tenants, or properties." },
      { id: 3, title: "Negotiation", icon: "negotiation", description: "Our experienced team works hard to negotiate and bring you the best terms." },
      { id: 4, title: "End-to-end management", icon: "end-to-end-management", description: "We manage every step, from paperwork to handover." },
    ],
  },
  {
    id: 4,
    slug: "mortgage",
    title: "Mortgage",
    image: "https://images.pexels.com/photos/8439700/pexels-photo-8439700.jpeg",
    icon: "mortgage",
    description: "We get you the best mortgage deals with help from our trusted banking partners and mortgage advisors.",
    overviewHeading: "Simplifying Your Path to Property Ownership",
    overview: [
      "Becoming a homeowner can be a stressful process if you don’t secure the right mortgage. At Rocky Real Estate, we simplify this process with our seasoned mortgage specialists, who offer personalised advice tailored to your financial goals.",
      "Selecting a suitable loan product to secure competitive interest rates and swift approvals, our experienced team will support your mortgage solutions at every stage of your property financing journey.",
    ],
    subservices: [
      { id: 1, title: "Mortgage pre-approval", icon: "pre-approval", description: "Before you begin your property search, we help establish your borrowing capacity and obtain pre-approval." },
      { id: 2, title: "Bank comparison & rate negotiation", icon: "bank-comparison", description: "Our advisors evaluate and compare mortgage options across leading UAE banks, in both fixed and variable rates, to secure the best terms for you." },
      { id: 3, title: "Loan approval management", icon: "loan-approval", description: "We ensure the property meets all lender requirements and that the approval process runs smoothly." },
      { id: 4, title: "Non-resident & expat mortgages", icon: "expat-mortgages", description: "Our experts give you specialised mortgage solutions, whether you’re an expat or non-resident buyer, all while it’s aligned with the criteria and regulatory standards." },
      { id: 5, title: "Financial guidance & budget planning", icon: "financial-guidance", description: "We deliver practical, straightforward advice tailored to your long-term investment goals, affordability, and lifestyle needs." },
      { id: 6, title: "Post-approval service", icon: "post-approval", description: "From loan disbursement to property registration and final handover, our team handles and provides end-to-end support." },
    ],
  },
  {
    id: 5,
    slug: "property-listing-marketing",
    title: "Property Listing & Marketing",
    image: "https://images.pexels.com/photos/8439700/pexels-photo-8439700.jpeg",
    icon: "property-listing-marketing",
    description: "We market your property effectively on real estate portals, social media platforms, and more.",
    overviewHeading: "Reaching the Right Buyers and Tenants",
    overview: [
      "At Rocky Real Estate, we do more than just list your property. We use the right combination of online visibility, an exclusive network, and digital media to ensure your property is marketed effectively.",
      "Without a customised approach and top-tier marketing services, we guarantee your property listing stands out and gets the best results, with less effort on your end.",
    ],
    subservices: [
      { id: 1, title: "Exposure on leading portals", icon: "exposure-portals", description: "Your property is listed on the UAE’s prominent real estate portals like Bayut, Property Finder, and more." },
      { id: 2, title: "Targeted social media campaigns", icon: "social-media", description: "Your listing is promoted through targeted advertising across social media platforms." },
      { id: 3, title: "Professional visual marketing", icon: "visual-marketing", description: "We create a strong first impression through high-quality photographs, drone visuals, virtual 3D tours, and more." },
      { id: 4, title: "SEO-optimised listing content", icon: "seo-listing", description: "We highlight your property's strengths through SEO friendly descriptions." },
      { id: 5, title: "Strategic market pricing", icon: "market-pricing", description: "We provide pricing strategies that are profit-driven and effective." },
      { id: 6, title: "Internal client network promotion", icon: "client-network", description: "Your property is introduced to our pre-screened database of investors, renters, and home buyers." },
    ],
  },
  {
    id: 6,
    slug: "after-sales-support",
    title: "After Sales Support",
    image: "https://images.pexels.com/photos/7414964/pexels-photo-7414964.jpeg",
    icon: "after-sales-support",
    description: "We manage everything from paperwork to handover, even after the sale is done.",
    overviewHeading: "Support That Continues After the Sale",
    overview: [
      "The moment you receive the keys is just the beginning of your property journey. But at Rocky Real Estate, our service extends beyond simply handing over the keys.",
      "Our team of experienced professionals, with extensive knowledge of property laws, registration processes, utility connections, and more, provides after-sales support. We remain available to assist with any queries that arise after handover, including future resale or rental considerations.",
    ],
    subservices: [
      { id: 1, title: "Title deed preparation & registration", icon: "title-deed", description: "We manage the registration and ownership process, ensuring everything is handled efficiently." },
      { id: 2, title: "Utility connection & registration", icon: "utility-connection", description: "We oversee all utility registrations, which include water, electricity, cooling, and internet, for a smooth transition." },
      { id: 3, title: "Property handover inspection", icon: "handover-inspection", description: "We conduct a thorough inspection to verify quality and resolve issues before handover." },
      { id: 4, title: "After-sales fit-outs coordination", icon: "fit-outs", description: "We connect you to trusted fit-out specialists and interior designers, to ensure your vision comes to life." },
      { id: 5, title: "Assistance with resale intentions", icon: "resale", description: "Should you consider resale, we manage legal formalities and connect you with potential buyers." },
    ],
  },
];

export const openPositions: JobPosition[] = [
  {
    id: 1,
    title: "Property Consultant",
    subTitle: "Property Consultant – Off-Plan & Secondary Market",
    department: "Sales",
    location: "Dubai",
    jobType: "Full-time",
    workMode: "On-site",
    company: "Rocky Real Estate",
    postedAt: "6 days ago",
    applicants: 50,

    description:
      "Rocky Real Estate is expanding, and we are looking for driven, results-oriented Property Consultants to join our high-performing team. With over 50 years of excellence in the Dubai real estate market, we provide the platform, support, and brand strength to help you succeed in both off-plan and secondary property sales.\n\nAt Rocky Real Estate, you focus on closing deals — we handle the rest.",

    responsibilities: [
      "Generate and manage client leads for off-plan and secondary properties",
      "Conduct property viewings and provide expert market advice",
      "Build and maintain strong client relationships",
      "Negotiate and close sales deals effectively",
      "Stay updated on market trends, pricing, and new project launches",
    ],

    requirements: [
      "Proven experience in Dubai real estate (off-plan and/or secondary preferred)",
      "Strong sales, negotiation, and communication skills",
      "Self-motivated with a target-driven mindset",
      "RERA certification is an advantage",
      "Ability to work independently while contributing to a team environment",
    ],

    benefits: [
      "Competitive commission structure with up to 75% commission for potential candidates",
      "Strong pipeline of qualified leads across off-plan and secondary markets",
      "Full 360° marketing support to boost your listings and visibility",
      "Dedicated back-office team to handle administration and documentation",
      "Guaranteed on-time commission payments",
      "Visa provided after first successful sale",
      "Access to premium developer inventories and exclusive listings",
    ],

    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
    // applyPath: "/careers/apply?job=property-consultant"
  },
  {
    id: 2,
    title: "Senior Property Consultant",
    subTitle: "Senior Consultant – Luxury & High-End Properties",
    department: "Sales",
    location: "Dubai, United Arab Emirates",
    jobType: "Full-time",
    workMode: "On-site",
    description:
      "Lead high-value property transactions in Dubai’s luxury real estate segment.",
    responsibilities: [
      "Manage high-net-worth client portfolios",
      "Close luxury property deals",
      "Mentor junior consultants",
      "Build strong developer relationships"
    ],
    requirements: [
      "3+ years Dubai real estate experience",
      "Proven track record in luxury sales",
      "Strong negotiation skills",
      "RERA certified"
    ],
    benefits: [
      "Higher commission slabs",
      "Exclusive luxury listings",
      "Priority lead allocation"
    ],
    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
  },

  {
    id: 3,
    title: "Real Estate Administrator",
    subTitle: "Admin Executive – Real Estate Operations",
    department: "Operations",
    location: "Dubai, United Arab Emirates",
    jobType: "Full-time",
    workMode: "On-site",
    company: "Rocky Real Estate",
    postedAt: "2 days ago",
    applicants: 15,
    description:
      "Support sales teams with documentation and transaction processing.",
    responsibilities: [
      "Prepare sales and lease documents",
      "Coordinate with developers and clients",
      "Maintain CRM data",
      "Handle listing updates"
    ],
    requirements: [
      "Experience in real estate admin preferred",
      "Strong organizational skills",
      "Attention to detail"
    ],
    benefits: [
      "Stable salary",
      "Career growth opportunities"
    ],
    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
  },

  {
    id: 4,
    title: "Digital Marketing Specialist",
    subTitle: "Real Estate Marketing Expert",
    department: "Marketing",
    location: "Dubai, United Arab Emirates",
    jobType: "Full-time",
    workMode: "Hybrid",
    company: "Rocky Real Estate",
    postedAt: "1 day ago",
    applicants: 20,
    description:
      "Drive digital campaigns and lead generation for property listings.",
    responsibilities: [
      "Manage social media campaigns",
      "Run Google & Meta ads",
      "Optimize SEO for listings",
      "Track campaign performance"
    ],
    requirements: [
      "2+ years digital marketing experience",
      "Experience in real estate preferred",
      "Knowledge of ad platforms"
    ],
    benefits: [
      "Performance bonuses",
      "Flexible work setup"
    ],
    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
  },

  {
    id: 5,
    title: "Leasing Consultant",
    subTitle: "Residential Leasing Specialist",
    department: "Leasing",
    location: "Dubai, United Arab Emirates",
    jobType: "Full-time",
    workMode: "On-site",
    company: "Rocky Real Estate",
    postedAt: "4 days ago",
    applicants: 18,
    description:
      "Assist clients in renting residential and commercial properties.",
    responsibilities: [
      "Handle rental inquiries",
      "Conduct property viewings",
      "Negotiate lease terms",
      "Close leasing deals"
    ],
    requirements: [
      "Leasing experience in Dubai",
      "Good communication skills",
      "RERA certification preferred"
    ],
    benefits: [
      "Commission on leases",
      "Marketing support"
    ],
    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
  },

  {
    id: 6,
    title: "CRM Coordinator",
    subTitle: "Customer Relationship Management Executive",
    department: "Support",
    location: "Dubai, United Arab Emirates",
    jobType: "Full-time",
    workMode: "On-site",
    company: "Rocky Real Estate",
    postedAt: "5 days ago",
    applicants: 10,
    description:
      "Manage and optimize CRM systems to support sales operations.",
    responsibilities: [
      "Maintain CRM data accuracy",
      "Generate sales reports",
      "Support lead distribution",
      "Train staff on CRM usage"
    ],
    requirements: [
      "CRM experience (HubSpot, Zoho, etc.)",
      "Analytical mindset",
      "Strong Excel skills"
    ],
    benefits: [
      "Stable role",
      "Growth in operations team"
    ],
    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
  },
];

export const developers: Developer[] = [
  {
    id: 1,
    name: "Damac",
    logo: "/assets/developers/Logos-01.webp",
    path: "/off-plan-properties/developers/damac",
  },
  {
    id: 2,
    name: "Emaar",
    logo: "/assets/developers/Logos-02.webp",
    path: "/off-plan-properties/developers/emaar",
  },
  {
    id: 3,
    name: "Ellington",
    logo: "/assets/developers/Logos-03.webp",
    path: "/off-plan-properties/developers/ellington",
  },
  {
    id: 4,
    name: "Sobha Realty",
    logo: "/assets/developers/Logos-04.webp",
    path: "/off-plan-properties/developers/sobha",
  },
  {
    id: 5,
    name: "Meraas",
    logo: "/assets/developers/Logos-05.webp",
    path: "/off-plan-properties/developers/meraas",
  },
  {
    id: 6,
    name: "Leos",
    logo: "/assets/developers/Logos-06.webp",
    path: "/off-plan-properties/developers/leos",
  },
  {
    id: 7,
    name: "Beyond",
    logo: "/assets/developers/Logos-07.webp",
    path: "/off-plan-properties/developers/beyond",
  },
  {
    id: 8,
    name: "BT Properties",
    logo: "/assets/developers/Logos-08.webp",
    path: "/off-plan-properties/developers/bt-properties",
  }
];


export const projects: Project[] = [
  {
    id: "emaar",
    title: "Emaar Properties",
    description:
      "Developers behind the tallest building in the world, Burj Khalifa, Emaar has redefined the Dubai skyline with its iconic landmarks, be it master communities or internationally recognized properties.",
    imageUrl:
      "/assets/developers/featured/emaar-hero.webp",
    imageAlt: "Emaar cultural pavilion with timber shell architecture",
    caption: "Emaar Properties — Dubai, 2022",
  },
  {
    id: "binghatti",
    title: "Binghatti",
    description:
      "Recognized for its bold and unique architecture, Binghatti continues to develop masterpieces across Dubai, including the most-awaited Mercedes-Benz Places.",
    imageUrl:
      "/assets/developers/featured/binghatti-featured.avif",
    imageAlt: "Binghatti mixed-use high-rise with geometric facade",
    caption: "Binghatti Residences — Dubai, 2023",
  },
  {
    id: "damac",
    title: "DAMAC Properties",
    description:
      "One of the most prominent developers in the region, DAMAC Properties, combines luxury living with architectural masterpieces and branded collaborations.",
    imageUrl:
      "/assets/developers/featured/damac.webp",
    imageAlt: "Biophilic innovation campus with central green valley",
    caption: "Meridian Innovation Campus — Tech Precinct, 2024",
  },
  {
    id: "meraas",
    title: "Meraas",
    description:
      "Offering residents a dynamic lifestyle in Dubai, Meraas continues to develop master waterfront communities and beachfront residences across the city.",
    imageUrl:
      "/assets/developers/featured/meraas.webp",
    imageAlt: "Hillside residence with rammed earth walls and green roof",
    caption: "Solstice Residence — Blue Mountains, 2021",
  }
];

// ─── Developer detail pages (`/off-plan-properties/developers/[developer]`) ───

export function getDeveloperSlugFromPath(path?: string) {
  return (path ?? "").split("/").filter(Boolean).pop() ?? "";
}

/** Per-route copy and imagery for developer pages. */
const DEVELOPER_PAGE_CONTENT: Record<string, DeveloperPageContent> = {
  emaar: {
    heroImage: "/assets/developers/featured/emaar-hero.webp",
    showcaseImage: "/assets/developers/featured/emaar-about.webp",
    about: {
      heading: "About Emaar Properties",
      intro:
        "The developers behind Burj Khalifa, the tallest tower in the world, Emaar Properties has redefined and transformed Dubai's skyline.",
      body:
        "Be it master communities or iconic landmarks, Emaar has earned international recognition. Designed to redefine modern living, Emaar has developed properties scattered across residential, retail, hospitality, entertainment, and more. But what makes them one of the biggest and most prestigious developers in the city? Let's explore.",
    },
    whoIs: {
      heading: "Who is Emaar?",
      description: `Founded in 1997 by Mohamed Alabbar, Emaar Properties is headquartered in Dubai and operates across several sectors.

Currently one of the largest real estate developers in the country, Emaar has now expanded internationally with properties in the Middle East, North America, Europe, North Africa, and Asia.

Emaar is known for its iconic landmarks across Dubai, including the Burj Khalifa, Dubai Mall, Dubai Hills Estate, and more, in prime locations such as Dubai Marina, Arabian Ranches, Emaar Beachfront, and more.`,
    },
    whyChoose: {
      heading: "Why Choose Emaar?",
      points: [
        "With Emaar Properties, you get a home in the most prestigious and prime locations in Dubai.",
        "You get premium quality, excellent design, and timely delivery.",
        "An elevated lifestyle where master communities offer schools, healthcare, retail, and more.",
        "Ideal for families, international buyers, and investors seeking long-term value.",
        "And, strong rental yields and resale demand.",
      ],
    },
  },
  meraas: {
    heroImage: "/assets/developers/featured/meraas.webp",
    showcaseImage: "/assets/developers/featured/citywalk-featured.webp",
    about: {
      heading: "About Meraas",
      intro:
        "Another major developer under Dubai Holding, Meraas, has shaped Dubai’s skyline and made it a lifestyle destination.",
      body:
        "From master waterfront districts to beachfront residences and more, Meraas has always focused on developments that offer residents a dynamic lifestyle through contemporary design.\n\nBut how did Meraas become one of the most influential developers in Dubai? Let’s explore.",
    },
    whoIs: {
      heading: "Who is Meraas?",
      description: `Established in 2007, Meraas, which operates under Dubai Holding, has developed several recognizable urban communities and lifestyle destinations across Dubai.

Meraas focuses on developing mixed-use properties with entertainment, residential, and retail components in prime locations across Dubai, including Jumeirah Bay Island, City Walk, La Mer, and Bluewaters Island.`,
    },
    whyChoose: {
      heading: "Why Choose Meraas?",
      points: [
        "Waterfront properties in prime locations across Dubai",
        "Reliable and strong brand credibility, backed by Dubai Holding",
        "Lifestyle destinations combining retail, residential, entertainment, and dining",
        "Perfect for residents and investors alike who seek a more modern, design-focused living experience",
      ],
    },
  },
  damac: {
    heroImage: "/assets/developers/featured/damac.webp",
    showcaseImage: "/assets/developers/featured/citywalk-featured.webp",
    about: {
      heading: "About DAMAC",
      intro:
        "One of the most prominent names in Dubai’s real estate market, DAMAC Properties, has played a significant role in redefining the city’s skyline.",
      body:
        "Known for their high-end developments, DAMAC Properties combines luxury living with architectural masterpieces and branded collaborations. As part of DAMAC Group, the developers focus on creating premium lifestyle experiences in Dubai and internationally. But what makes them one of the most recognized developers in the city? Let's explore.",
    },
    whoIs: {
      heading: "Who is DAMAC?",
      description: `Founded in 2002 by Hussain Sajwani, DAMAC Properties has grown into one of the largest luxury real estate developers.

Over the years, the developers have specialised in commercial, residential, and luxury properties in prime locations across Dubai, including Business Bay, Dubai Marina, DAMAC Hills, and DAMAC Hills 2.

With over 1,000 units, DAMAC continues to launch and develop master communities and residences.`,
    },
    whyChoose: {
      heading: "Why Choose DAMAC?",
      points: [
        "High-end and luxury properties in prime locations across Dubai.",
        "Wide range of properties for residents to choose from, including apartments, villas, and branded residences.",
        "Brand collaborations with global brands in the design, fashion, and hospitality fields.",
        "Perfect for investors seeking strong rental appeal and premium properties.",
      ],
    },
  },
  leos: {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/emaar-featured.webp",
    about: {
      heading: "About Leos",
      intro:
        "A renowned luxury property developer, Leos has created a strong presence in the UAE, the UK, and internationally.",
      body:
        "Known for blending European design with modern lifestyles, the developers have become experts in commercial, residential, and mixed-use real estate projects across Dubai. The developers also pride themselves on being completely transparent and trustworthy with businesses and individuals alike.\n\nBut what makes them one of the most promising developers in the city? Let’s explore.",
    },
    whoIs: {
      heading: "Who is Leos?",
      description: `Founded and led by Rui Liu, the developers expanded to the UAE in 2022 with their first development in Jumeirah Village Circle (JVC).

Leos, which began internationally, is now headquartered in Dubai, with architectural master developments throughout the city. The developers’ projects range from residential to commercial to mixed-use. They also pride themselves on being completely transparent, innovative, and trustworthy.`,
    },
    whyChoose: {
      heading: "Why Choose Leos?",
      points: [
        "Modern architectural design",
        "Innovative, contemporary, and smart living layouts in every development",
        "International developer with experience across the UAE and UK markets",
        "Modern European-inspired architectural design",
        "Lifestyle-focused projects with wellness and community amenities",
        "Strong emphasis on innovation, smart living, and contemporary layouts",
        "Attractive opportunities for investors seeking emerging developers with growth potential",
      ],
    },
  },
};

const DEVELOPER_PAGE_GENERIC_DESCRIPTION =
  "Explore off-plan projects by this developer in Dubai.";

export function getDeveloperPagePayload(slug: string): DeveloperPagePayload | null {
  const dev = developers.find((d) => getDeveloperSlugFromPath(d.path) === slug);
  const project = projects.find((p) => p.id === slug);
  if (!dev && !project) return null;

  const title = project?.title ?? dev?.name ?? slug;
  const description = project?.description ?? DEVELOPER_PAGE_GENERIC_DESCRIPTION;
  const page = DEVELOPER_PAGE_CONTENT[slug];

  const heroImage =
    page?.heroImage ?? project?.imageUrl ?? "/assets/developers/featured/emaar-hero.webp";
  const showcaseImage =
    page?.showcaseImage ?? project?.imageUrl ?? "/assets/developers/featured/emaar-about.webp";

  const displayName = dev?.name ?? title;
  const about = page?.about ?? {
    heading: `About ${displayName}`,
    intro: description.split(". ")[0] ? `${description.split(". ")[0]}.` : description,
    body: description.includes(". ")
      ? description.slice(description.indexOf(". ") + 2)
      : "",
  };

  const whoIs = page?.whoIs ?? {
    heading: `Who is ${displayName}?`,
    description: `${description}\n\n${DEVELOPER_PAGE_GENERIC_DESCRIPTION}`,
  };

  const whyChoose = page?.whyChoose ?? {
    heading: `Why Choose ${displayName}?`,
    points: [
      "Established Dubai developer with an active off-plan pipeline",
      "Locations aligned with connectivity, retail, and lifestyle demand",
      "Suited to end-users and investors seeking long-term market exposure",
      "Quality-focused product with strong community amenities",
      "Expert guidance helps you compare payment plans and handover timelines",
    ],
  };

  return {
    slug,
    title,
    description,
    heroImage,
    showcaseImage,
    showcaseImageAlt: `${title} — Dubai developments`,
    about,
    whoIs,
    whyChoose,
  };
}
