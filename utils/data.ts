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

export const teamMembers2: TeamMember[] = [
  {
    id: 1,
    name: "Ashok Uttamchandani",
    department: "Management",
    designation: "Founder",
    image: "/assets/teams/ashok-rocky.webp",
    phone: "+97144476644",
    email: "info@rockyrealestate.com",
    whatsapp: "97144476644",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 2,
    name: "Kiran Uttamchandani",
    department: "Management",
    designation: "Director",
    image: "/assets/teams/kiran-rocky.webp",
    phone: "+97144476644",
    email: "info@rockyrealestate.com",
    whatsapp: "97144476644",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 3,
    name: "Nitin Ramchandani",
    department: "Management",
    designation: "CEO",
    image: "/assets/teams/nitin-rocky.webp",
    phone: "+97144476644",
    email: "info@rockyrealestate.com",
    whatsapp: "97144476644",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 4,
    name: "Suraj Rajshekar",
    department: "Management",
    designation: "General Manager",
    image: "/assets/teams/suraj-rocky.webp",
    phone: "+97144476644",
    email: "info@rockyrealestate.com",
    whatsapp: "97144476644",
    // path: "/our-team/omar-hassan",
  },
  {
    id: 5,
    name: "Gizem Oksuz",
    department: "Management",
    designation: "Head of Operations",
    image: "/assets/teams/gizem-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 6,
    name: "Wasif Aftab",
    department: "Property Consultant",
    designation: "Secondary Team Leader",
    image: "/assets/teams/secondary/wasif-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 7,
    name: "Manali Galani",
    department: "Off Plan",
    designation: "Off Plan Team Leader",
    image: "/assets/teams/offplan/manali-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 8,
    name: "Ruqaiya Said",
    department: "Property Management",
    designation: "Head of Property Management",
    image: "/assets/teams/pm/ruqaiya-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 9,
    name: "Czarina Tanggap",
    department: "CRM",
    designation: "Head of CRM",
    image: "/assets/teams/crm/czrina.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 10,
    name: "Mariam Al Madamgha",
    department: "marketing",
    designation: "Marketing Manager",
    image: "/assets/teams/marketing/mariam.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 11,
    name: "Qasim Khan",
    department: "Data & AI",
    designation: "Data Science & AI Manager",
    image: "/assets/teams/analytics/qasim-rocky1.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 12,
    name: "Revathy Ravi",
    department: "Finance",
    designation: "Accountant",
    image: "/assets/teams/accountant/revathy.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 13,
    name: "Perhat Atayev",
    department: "Telesales",
    designation: "Senior Telesales",
    image: "/assets/teams/telesales/perhat-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 14,
    name: "Klaurish Yageanne",
    department: "HR Department",
    designation: "HR Generalist",
    image: "/assets/teams/hr/klaurish.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 15,
    name: "Fathimath Liana",
    department: "HR Department",
    designation: "Recruitment Specialist",
    image: "/assets/teams/hr/liana-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 16,
    name: "Mary Joy Omisol",
    department: "CRM",
    designation: "Administrative Coordinator",
    image: "/assets/teams/crm/meryjoy-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 17,
    name: "Angelo Rance",
    department: "CRM",
    designation: "Listing Coordinator",
    image: "/assets/teams/crm/rance-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 18,
    name: "Catherine Zarceno",
    department: "CRM",
    designation: "Receptionist",
    image: "/assets/teams/crm/catherin.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 19,
    name: "Nishitha Rachel",
    department: "Marketing",
    designation: "Content Writer",
    image: "/assets/teams/marketing/nishita.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 20,
    name: "Mohamed Naziq",
    department: "Marketing",
    designation: "Graphic Designer",
    image: "/assets/teams/marketing/naziq-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 21,
    name: "Muhammed Rufaid",
    department: "Marketing",
    designation: "Web Developer",
    image: "/assets/teams/marketing/rufaid-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 22,
    name: "Ahsan Ali",
    department: "Marketing",
    designation: "Photographer",
    image: "/assets/teams/marketing/ahsan-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 23,
    name: "Shaheen Mahmood",
    department: "Marketing",
    designation: "Videographer & Editor",
    image: "/assets/teams/marketing/shaheen-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 24,
    name: "Janhelva Caranto",
    department: "Property Management",
    designation: "Property Management Executive",
    image: "/assets/teams/pm/jan.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 25,
    name: "Sherifa Azmi",
    department: "Property Management",
    designation: "Property Management & Leasing Executive",
    image: "/assets/teams/pm/sherifa1-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  
  {
    id: 27,
    name: "Gabriela Viricimo",
    department: "Telesales",
    designation: "Telesales",
    image: "/assets/teams/telesales/gabriala-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 28,
    name: "Mahri Berdiyeva",
    department: "Telesales",
    designation: "Telesales",
    image: "/assets/teams/telesales/mahri-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 29,
    name: "Ali Ahmad",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "",
    phone: "+97144476644",
    email: "info@rockyrealestate.com",
    whatsapp: "97144476644",
    path: "/dubaisouth/agents/ali-ahmad",
    languages: ["English", "Arabic", "Urdu"],
    businessCardPdf: "/assets/businesscard/ali-ahmad.pdf",
    experience: [
      "Ali Ahmad is a Senior Property Consultant at Rocky Real Estate with a strong focus on Dubai South communities, off-plan investments, and residential sales across the wider UAE market.",
      "He works closely with buyers, sellers, and investors to identify opportunities aligned with their goals — from first-home purchases to portfolio growth — and guides clients through every stage with clear, practical advice.",
      "Known for his market knowledge and responsive approach, Ali helps clients navigate viewings, negotiations, and handover with confidence.",
    ],
  },
  {
    id: 30,
    name: "Anand Kutty",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/anand.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 31,
    name: "Bhavesh Magnani",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/bhavesh-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 32,
    name: "Jyotika Ronghangpal",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/jyothika1-rocky.webp",
    phone: "+971507772451",
    email: "jyotika@rockyrealestate.com",
    whatsapp: "971507772451",
    path: "/dubaisouth/agents/jyotika-ronghangpal",
    languages: ["English", "Hindi", "Assamese", "Bengali"],
    businessCardPdf: "/assets/businesscard/jyotika.pdf",
    experience: [
      "Jyotika Ronghangpal is a Senior Property Consultant at Rocky Real Estate, specializing in off-plan leasing and sales across established and emerging communities in Business Bay and Dubai Sports City.",
      "She supports clients with tailored property searches, market insights, and end-to-end transaction support, helping them find the right fit for their lifestyle and budget.",
      "With a client-first approach and deep familiarity with Dubai's off-plan market, Jyotika delivers a smooth and transparent experience, from the first inquiry to handover.",
    ],
  },
  {
    id: 33,
    name: "K.N Wadhwa",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 34,
    name: "Kaleem Pasha",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/kaleem-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 35,
    name: "Nadeem Riaz",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/nadeem-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 36,
    name: "Salma Siraj",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/salma-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 37,
    name: "Suleman Akhtar",
    department: "Property Consultant",
    designation: "Senior Property Consultant",
    image: "/assets/teams/secondary/suleman1-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },

  {
    id: 38,
    name: "Ahmed Fawzy",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/ahmedfawzy1-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 39,
    name: "Aldo Carlo Raffo",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/aldo-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 40,
    name: "Felicia Elorm",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/felicia-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 42,
    name: "Marien Fernando",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/marien-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 43,
    name: "Mohamed Ameen",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/ameen-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 44,
    name: "Muhammed Ali",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/muhammadali-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 45,
    name: "Muhammed Rizwan",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/rizwan1.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 46,
    name: "Novnath Patil",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/patil-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 48,
    name: "Rajesh Pattiyil",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/rajesh-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 49,
    name: "Shabeer Basheer",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/shabeerbasheer1.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 50,
    name: "Shabbir Ahmed",
    department: "Property Consultant",
    designation: "Property Consultant",
    image: "/assets/teams/secondary/shabeerahmed-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 51,
    name: "Ann Wanjiku",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/ann1-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 52,
    name: "Mahul Sanjoyal",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/mahul-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 53,
    name: "Amit Anand Kalebag",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/amit1-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 54,
    name: "Abdullah Mahouk",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/abdulla-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 55,
    name: "Ziad Elsayed",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/ziad-rocky.webp",
    // path: "/our-team/sarah-johnson",
  },
  {
    id: 56,
    name: "Milad Khakijavan",
    department: "Off Plan",
    designation: "Off Plan Property Consultant",
    image: "/assets/teams/offplan/milad.webp",
    // path: "/our-team/sarah-johnson",
  },
];

export const dubaiSouthAgents: TeamMember[] = [29, 32]
  .map((id) => teamMembers2.find((m) => m.id === id))
  .filter((m): m is TeamMember => m != null);

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
    title: "Freehold vs Leasehold Property in Dubai: Everything You Need to Know",
    category: "Insights",
    description:
      "A guide for foreign investors and expatriates on freehold and leasehold property in Dubai—ownership rights, pros and cons, and how to choose the right option for your goals.",
    image:
      "/assets/blogs/leaseholdproperty2.webp",
    path: "/blog/freehold-vs-leasehold-dubai",
    content: [
      {
        type: "paragraph",
        text: "If you are a foreign investor or an expatriate in Dubai looking to invest, here is a guide on what to look out for before you begin the process.",
      },
      {
        type: "paragraph",
        text: "Each form of ownership, whether freehold or leasehold, offers different outcomes and benefits. Let us explore them.",
      },
      { type: "heading2", text: "Property ownership for foreigners in Dubai" },
      {
        type: "paragraph",
        text: "Dubai remains one of the most investor-friendly cities in the world, where expatriates and foreigners can legally purchase property in government-approved zones.",
      },
      {
        type: "paragraph",
        text: "In 2026, foreign buyers can purchase either a freehold property in approved freehold areas or a leasehold property in selected communities in Dubai.",
      },
      {
        type: "paragraph",
        text: "While expatriates and foreigners can invest in and buy property, their ownership rights will differ significantly.",
      },
      { type: "heading2", text: "What is a Leasehold Property?" },
      {
        type: "paragraph",
        text: "A leasehold property is one where a buyer has usage rights for a fixed period, usually up to 99 years. However, there are a few pros and cons when you choose a leasehold property.",
      },
      { type: "heading3", text: "The pros" },
      {
        type: "list",
        items: [
          "Leasehold properties are more affordable, especially for first-time investors, due to their low entry prices.",
          "As a foreigner, you have access to additional locations where freehold ownership is not permitted.",
          "There is also the possibility of a lease renewal, subject to the agreed-upon terms and conditions.",
          "You will not have to worry about major repairs, as they are often handled by the landlord or freeholder.",
        ],
      },
      { type: "heading3", text: "The cons" },
      {
        type: "list",
        items: [
          "Any and all renovations, modifications, and alterations typically require written approval from the freeholder.",
          "You have no land ownership, just usage rights.",
          "There are limitations to your long-term investment, as capital appreciation may be lower than with freehold ownership.",
          "There is limited flexibility for alterations or subleasing.",
        ],
      },
      { type: "heading2", text: "What is a Freehold Property?" },
      {
        type: "paragraph",
        text: "Introduced in 2002, a freehold property is where you are provided full ownership of the property and the land it stands on, indefinitely. The owners are given complete control over the transfer, sale, lease, or occupation of the property at any time.",
      },
      {
        type: "paragraph",
        text: "Since its introduction, Dubai has experienced rapid growth in its real estate market and has become a preferred destination for investors worldwide.",
      },
      { type: "heading3", text: "The pros" },
      {
        type: "list",
        items: [
          "A higher investment potential where you get stronger rental yields and capital appreciation.",
          "You get complete ownership rights over the property and land.",
          "Whether or not you have a registered will, the property can be passed on to heirs.",
          "You also have complete freedom to resell, occupy, or lease the property without restrictions.",
          "You can purchase property remotely, without residing in the UAE.",
          [
            "Investors may qualify for ",
            { text: "UAE residency visas", href: "/blog/private-contemporary-home" },
            ", either the 2-year renewable visa or the 10-year Golden Visa.",
          ],
        ],
      },
      { type: "heading3", text: "The cons" },
      {
        type: "list",
        items: [
          "As an owner, you will be responsible for all maintenance, structural repairs, and service charges.",
          "The restrictions on approved freehold communities still apply to foreign owners.",
        ],
      },
      { type: "heading2", text: "Which property do you choose?" },
      {
        type: "paragraph",
        text: "The choice between a leasehold property and a freehold property depends on your investment goals.",
      },
      {
        type: "paragraph",
        text: "If you want a shorter-term occupancy, lower upfront investment, or reduced maintenance responsibility, then leasehold properties are the best option for you.",
      },
      {
        type: "paragraph",
        text: "However, if you plan on long-term ownership where you seek capital appreciation, want eligibility for UAE residency, or want a property that you can rent or resell without restrictions, then freehold properties are the perfect choice for you.",
      },
      {
        type: "paragraph",
        text: "At Rocky Real Estate, our experienced advisors will guide you through every stage, from finding the right community for you to securing the best deal.",
      },
      {
        type: "paragraph",
        text: "Speak to our experts today to explore freehold and leasehold properties tailored to your goals.",
      },
    ],
  },
  {
    id: 3,
    title: "5 Ways to Summer-Proof Your Home in Dubai",
    category: "Residential",
    description:
      "With Dubai’s summer heat and humidity on the way, protect your home while you travel—HVAC settings, insulation, DEWA-friendly habits, and exterior upkeep.",
    image:
      "/assets/blogs/summerhome.webp",
    path: "/blog/summer-proof-home-dubai",
    content: [
      {
        type: "paragraph",
        text: "With summer approaching quickly in Dubai, residents are doing everything they can to avoid the harsh heat. From sunscreens to umbrellas and hats, we stock up on everything that can help us.",
      },
      {
        type: "paragraph",
        text: "But what about your home?",
      },
      {
        type: "paragraph",
        text: "Your home can face several issues during the summer, because of the heat and humidity, especially if you are traveling. Here are five things you must do to summer-proof your home.",
      },
      { type: "heading2", text: "Air Conditioning and HVAC Optimization" },
      {
        type: "paragraph",
        text: "Turning off the air conditioner at home is the one thing we make sure to do before heading out on vacation. But that’s exactly what we shouldn’t do during summer, experts say.",
      },
      {
        type: "paragraph",
        text: "Instead, set your air conditioner’s thermostat to 24°C and on auto mode. This is to balance airflow and prevent humidity and mold from forming indoors. Additionally, ensure you service your air conditioner monthly.",
      },
      { type: "heading2", text: "Energy efficiency" },
      {
        type: "paragraph",
        text: "To save energy efficiently during the summer, choose sustainable living options like LED lights instead of incandescent bulbs, and turn off all appliances (except the refrigerator) when not being used.",
      },
      {
        type: "paragraph",
        text: "Dubai Electricity and Water Authority (DEWA) also advises residents to turn off the water supply to all appliances (washing machine, dishwasher, etc.) before traveling.",
      },
      { type: "heading2", text: "Insulate your property to block heat" },
      {
        type: "paragraph",
        text: "If you want to maintain a comfortable indoor temperature, you should properly and carefully insulate your home.",
      },
      {
        type: "paragraph",
        text: "This includes drawing blackout curtains/blinds during the day, using weatherstripping to seal gaps in doors and windows, and installing UV-reflective film on your windows, which helps reduce solar heat gain. Additionally, to reduce indoor humidity, get a humidifier.",
      },
      { type: "heading2", text: "Preventive maintenance" },
      {
        type: "paragraph",
        text: "A lot of damage can go unnoticed during the summer, which is why you should do the following to prevent future structural maintenance.",
      },
      {
        type: "paragraph",
        text: "Make sure to inspect your roofs, water tanks, pipes, etc., for cracks and leaks, and repair them before they worsen from direct sunlight exposure. Additionally, use high-quality UV-resistant covers and coatings for your outdoor furniture.",
      },
      { type: "heading2", text: "Garden and exterior maintenance" },
      {
        type: "paragraph",
        text: "Ensure your pretty garden, big or small, is well-maintained as well. Water them early in the morning or late in the evening, and install shade sails to help retain moisture.",
      },
      {
        type: "paragraph",
        text: "Additionally, it is advised to plant only heat-tolerant plants to reduce water consumption.",
      },
      {
        type: "paragraph",
        text: "So this summer, don't just protect yourself but make sure to use these tips and tricks to protect your home from the scorching heat that’s approaching, and in return get a reduced electricity (DEWA) bill.",
      },
    ],
  },
  {
    id: 4,
    title: "2026 Q1 Awards: Celebrating the people driving our success",
    category: "Company",
    description:
      "Rocky Real Estate's Q1 2026 awards—recognizing Wasif Aftab, Perhat Atayev, and Ahmed Fawzy for outstanding contributions after a record-breaking year in Dubai real estate.",
    image: "/assets/blogs/Q1-Awards.webp",
    path: "/blog/2026-q1-awards",
    content: [
      {
        type: "paragraph",
        text: "2025 ended on a high note in the real estate market with over AED 682.49 billion in total real estate transactions across sales, leasing, and services, according to Dubai Land Department (DLD) data.",
      },
      {
        type: "paragraph",
        text: "And at Rocky Real Estate, that momentum continued into the first quarter of 2026, with agents and admin team members generating profits for the company. At the company's Q1 awards, we celebrated the following members for their hard work.",
      },
      { type: "heading2", text: "Q1 2026 award winners" },
      {
        type: "list",
        items: [
          "Wasif Aftab - Manager of the Quarter",
          "Perhat Atayev - Admin of the Quarter",
          "Ahmed Fawzy - Rising Agent of the Quarter",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Buying Property in Dubai as a Foreigner: Step-by-Step Guide",
    category: "Insights",
    description:
      "A clear 7-step guide for foreigners buying property in Dubai—from freehold zones and finances to RERA brokers, MOU, NOC, DLD transfer, and closing costs.",
    image: "/assets/blogs/buy-property.webp",
    path: "/blog/buying-property-dubai-foreigner",
    content: [
      {
        type: "paragraph",
        text: "Purchasing a property in Dubai, as a foreigner, might seem like a daunting process. But we're here to make it simple.",
      },
      {
        type: "paragraph",
        text: "The first thing to know is that buying a property in Dubai as a foreigner is quite simple: you do not need to be a UAE resident, and you can obtain 100% freehold ownership in designated zones.",
      },
      {
        type: "paragraph",
        text: "We are here to break it down into 7 simple steps.",
      },
      {
        type: "heading2",
        text: "Choose the property type and location",
      },
      {
        type: "paragraph",
        text: "Foreigners, whether residing in the UAE or outside, can buy a property in Dubai in designated freehold zones. In addition to choosing the location, the buyer will need to decide whether to purchase an off-plan or ready property before beginning the process.",
      },
      {
        type: "paragraph",
        text: "Note: Off-plan properties offer more flexible payment terms compared to ready properties.",
      },
      {
        type: "paragraph",
        text: "There are over 60 areas in the freehold zone. Some of the key locations for foreigners include: Downtown Dubai, Dubai Marina, Jumeirah Village Circle (JVC), Business Bay, Palm Jumeirah, DIFC, Arabian Ranches, and more.",
      },
      { type: "heading2", text: "Finances and documents" },
      {
        type: "paragraph",
        text: "Once you decide on the type of property and location, get your finances and paperwork in order.",
      },
      {
        type: "paragraph",
        text: "If you're a cash buyer, the required documents will include a valid passport and proof of funds (e.g., bank statements).",
      },
      {
        type: "paragraph",
        text: "If you're a pre-approved buyer, you will need to obtain a \"mortgage in principle\" from a UAE bank to showcase your exact buying budget.",
      },
      {
        type: "paragraph",
        text: "And if you're a mortgaged buyer, the most common type, you will need a minimum monthly salary of AED 15,000, along with a valid passport, a credit report, and proof of income.",
      },
      { type: "heading2", text: "Hire a RERA-registered broker" },
      {
        type: "paragraph",
        text: "To proceed, it is absolutely necessary to hire a Real Estate Regulatory Authority (RERA)-registered agent or broker to ensure compliance with official regulations and access only verified listings.",
      },
      {
        type: "paragraph",
        text: "To verify agents, you can use the official Dubai REST Application.",
      },
      {
        type: "heading2",
        text: "Make an offer and sign the Memorandum of Understanding (MOU)",
      },
      {
        type: "paragraph",
        text: "The next step is to make an offer to the seller once you find your desired property. Then you can sign the Memorandum of Understanding (MOU), also known as Form F, which outlines all the terms of the sale.",
      },
      {
        type: "paragraph",
        text: "At this stage of the process, you will need to pay a security deposit, typically 10% of the purchase price.",
      },
      { type: "heading2", text: "Apply for the NOC" },
      {
        type: "paragraph",
        text: "The next step is to apply for a No Objection Certificate (NOC) from the developer. Doing this confirms that there are no mortgages, utility bills, or outstanding service fees on the property.",
      },
      {
        type: "paragraph",
        text: "The NOC process lasts a few days and costs up to AED 5,000.",
      },
      {
        type: "heading2",
        text: "Transfer ownership at the Dubai Land Department (DLD)",
      },
      {
        type: "paragraph",
        text: "To complete the transfer of ownership, both parties have to visit the Dubai Land Department (DLD) or an authorized Registration Trustee office.",
      },
      {
        type: "paragraph",
        text: "The documents required for this process include your original passport, a signed MOU, an approved NOC, and cheques for the remaining property balance and closing fees.",
      },
      {
        type: "heading2",
        text: "Pay closing costs and receive the title deed",
      },
      {
        type: "paragraph",
        text: "Upon successful transfer of funds at the DLD office, the title deed will be issued under your name, making you the owner of the property.",
      },
      {
        type: "paragraph",
        text: "However, it is important to budget for the closing costs. They include:",
      },
      {
        type: "list",
        items: [
          "DLD transfer fee - Usually 4% of the property purchase price",
          "Agency fee - 2% of the property purchase price + 5% VAT",
          "Mortgage fees (if applicable)",
          "Registration trustee fee, which ranges from AED 2,000 to AED 4,000.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Living in Dubai South: Everything you need to know",
    category: "Insights",
    description:
      "A guide to Dubai South—location, connectivity, residential communities, lifestyle amenities, and why investors, families, and professionals are choosing this master-planned city.",
    image: "/assets/blogs/dubai-south-azziz.webp",
    path: "/blog/living-in-dubai-south",
    content: [
      {
        type: "paragraph",
        text: "One of the most popular places to live, Dubai South, continues to grow rapidly. The fully integrated city is built around business, aviation, logistics, and modern living.",
      },
      {
        type: "paragraph",
        text: "Dubai South offers affordable homes, excellent connectivity, and strong long-term growth prospects. Here's everything you need to know about the master-planned city if you're an investor, first-time buyer, or family looking for a community.",
      },
      { type: "heading2", text: "About Dubai South" },
      {
        type: "paragraph",
        text: "Formerly known as Dubai World Central, Dubai South is a master-planned city spanning approximately 145 square kilometers in southern Dubai. The community was created to support the city's long-term vision for aviation, economic growth, residential expansion, and trade.",
      },
      {
        type: "paragraph",
        text: "Dubai South is built around Al Maktoum International Airport, the world's largest airport upon completion. Developed by Dubai South Properties, this community offers a range of commercial, residential, and leisure spaces and stands out for its smart city initiatives, creating a \"city within a city\".",
      },
      { type: "heading2", text: "Location and Connectivity" },
      {
        type: "paragraph",
        text: "There are several reasons why Dubai South continues to be a favorite among investors and residents in Dubai, one of which is its strategic location.",
      },
      {
        type: "paragraph",
        text: "Dubai South serves as a strategic link between Dubai and Abu Dhabi, providing access to major highways, including Emirates Road (E611) and Sheik Mohammed Bin Zayed Road (E311).",
      },
      {
        type: "paragraph",
        text: "Other locations include:",
      },
      {
        type: "list",
        items: [
          "Al Maktoum International Airport",
          "Expo City Dubai",
          "Palm Jebel Ali",
          "Dubai Parks and Resorts",
          "Dubai Marina",
          "Dubai Industrial City",
          "Jebel Ali Port",
          "Downtown Dubai",
        ],
      },
      { type: "heading2", text: "Residential Communities in Dubai South" },
      {
        type: "paragraph",
        text: "Villas to apartments and more, Dubai South offers a variety of housing options for residents in Dubai to suit different budgets and lifestyles. Some of the most popular communities include:",
      },
      { type: "heading3", text: "Expo City Dubai" },
      {
        type: "paragraph",
        text: "Located in Dubai South, Expo City Dubai is one of the biggest urban destinations in the city. An evolving sustainable city, Expo City Dubai, offers townhouses, apartments, parks, community facilities, retail outlets, and more. Suitable for both investors and end-users.",
      },
      { type: "heading3", text: "Emaar South" },
      {
        type: "paragraph",
        text: "One of the most established communities in Dubai South, Emaar South is popular among long-term residents and families seeking a suburban lifestyle. Emaar South features villas, apartments, and townhouses surrounded by an 18-hole golf course and parks.",
      },
      { type: "heading2", text: "Lifestyle Amenities" },
      {
        type: "paragraph",
        text: "Residents in Dubai South can enjoy world-class amenities, in a less congested and quieter environment, which includes:",
      },
      {
        type: "list",
        items: [
          "Community parks and green spaces",
          "Spacious apartments, villas, and townhouses",
          "Retail centers",
          "Schools and nurseries",
          "Fitness and sports centers",
          "Healthcare facilities",
          "Dining and retail",
        ],
      },
      { type: "heading2", text: "Who should invest in Dubai South?" },
      {
        type: "paragraph",
        text: "Whether you're an investor, a first-time buyer, or a professional, Dubai South is ideal for you.",
      },
      {
        type: "paragraph",
        text: "For families, Dubai South offers spacious homes with a growing range of educational and recreational amenities.",
      },
      {
        type: "paragraph",
        text: "For professionals, Dubai South offers a convenient living option close to your workplace, with major employment hubs nearby, including business districts, aviation, logistics, and more.",
      },
      {
        type: "paragraph",
        text: "And because of the infrastructure in Dubai South, investors are drawn in. With major projects including the Al Maktoum International Airport expansion, residential development, and more, Dubai South is ideal for investors looking at long-term growth.",
      },
      { type: "heading2", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Dubai South is not any other community in Dubai; it is one of the key components of Dubai's future growth strategy.",
      },
      {
        type: "paragraph",
        text: "With a perfect combination of connectivity, affordability, lifestyle, and future growth potential, Dubai South is becoming a preferred destination for investors and residents alike.",
      },
      {
        type: "paragraph",
        text: "So, if you're looking for a community that offers convenience and opportunities, Dubai South is a perfect location to consider.",
      },
    ],
  },
  // {
  //   id: 4,
  //   title: "Luxurious 3BHK at The Residence Marina Gate 2, Dubai Marina",
  //   category: "Residential",
  //   description:
  //     "A fully furnished 1,809 sq. ft. 3BHK at The Residence Marina Gate 2 in Dubai Marina—pool, sauna, steam room, gym, and minutes from Dubai Marina Mall and Marina Beach.",
  //   image: "/assets/common/rent.webp",
  //   // video: "https://youtu.be/G0oA5D3G9-U?si=Z9S_mG18k4hA32vS",
  //   path: "/blog/luxurious-3bhk-residence-marina-gate-2-dubai-marina",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "Step into a completely furnished, luxurious 3BHK apartment at The Residence Marina Gate 2, Dubai Marina.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Located in the heart of Dubai, the 1,809 sq. ft. apartment offers several top-notch amenities, including a swimming pool, sauna and steam room, gymnasium, and more.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Minutes away from Dubai Marina Mall and Marina Beach, this is the perfect location.",
  //     },
  //     {
  //       type: "list",
  //       items: [
  //         [
  //           "Want to rent it? Contact us at +971 4 447 6644 or ",
  //           { text: "rent it here", href: "/properties/rent/in-dubai/RO-R-03024" },
  //           ".",
  //         ],
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Buying Property in Dubai as a Foreigner: Step-by-Step Guide",
  //   category: "Insights",
  //   description:
  //     "A clear 7-step guide for foreigners buying property in Dubai—from freehold zones and finances to RERA brokers, MOU, NOC, DLD transfer, and closing costs.",
  //   image: "/assets/common/buy.webp",
  //   path: "/blog/buying-property-dubai-foreigner",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "Purchasing a property in Dubai, as a foreigner, might seem like a daunting process. But we’re here to make it simple.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "The first thing to know is that buying a property in Dubai as a foreigner is quite simple: you do not need to be a UAE resident, and you can obtain 100% freehold ownership in designated zones.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "We are here to break it down into 7 simple steps.",
  //     },
  //     {
  //       type: "heading2",
  //       text: "1. Choose the property type and location",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Foreigners, whether residing in the UAE or outside, can buy a property in Dubai in designated freehold zones. In addition to choosing the location, the buyer will need to decide whether to purchase an off-plan or ready property before beginning the process.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Note: Off-plan properties offer more flexible payment terms compared to ready properties.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "There are over 60 areas in the freehold zone. Some of the key locations for foreigners include: Downtown Dubai, Dubai Marina, Jumeirah Village Circle (JVC), Business Bay, Palm Jumeirah, DIFC, Arabian Ranches, and more.",
  //     },
  //     { type: "heading2", text: "2. Finances and documents" },
  //     {
  //       type: "paragraph",
  //       text: "Once you decide on the type of property and location, get your finances and paperwork in order.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "If you’re a cash buyer, the required documents will include a valid passport and proof of funds (e.g., bank statements).",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "If you’re a pre-approved buyer, you will need to obtain a “mortgage in principle” from a UAE bank to showcase your exact buying budget.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "And if you’re a mortgaged buyer, the most common type, you will need a minimum monthly salary of AED 15,000, along with a valid passport, a credit report, and proof of income.",
  //     },
  //     { type: "heading2", text: "3. Hire a RERA-registered broker" },
  //     {
  //       type: "paragraph",
  //       text: "To proceed, it is absolutely necessary to hire a Real Estate Regulatory Authority (RERA)-registered agent or broker to ensure compliance with official regulations and access only verified listings.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "To verify agents, you can use the official Dubai REST Application.",
  //     },
  //     {
  //       type: "heading2",
  //       text: "4. Make an offer and sign the Memorandum of Understanding (MOU)",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "The next step is to make an offer to the seller once you find your desired property. Then you can sign the Memorandum of Understanding (MOU), also known as Form F, which outlines all the terms of the sale.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "At this stage of the process, you will need to pay a security deposit, typically 10% of the purchase price.",
  //     },
  //     { type: "heading2", text: "5. Apply for the NOC" },
  //     {
  //       type: "paragraph",
  //       text: "The next step is to apply for a No Objection Certificate (NOC) from the developer. Doing this confirms that there are no mortgages, utility bills, or outstanding service fees on the property.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "The NOC process lasts a few days and costs up to AED 5,000.",
  //     },
  //     {
  //       type: "heading2",
  //       text: "6. Transfer ownership at the Dubai Land Department (DLD)",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "To complete the transfer of ownership, both parties have to visit the Dubai Land Department (DLD) or an authorized Registration Trustee office.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "The documents required for this process include your original passport, signed MOU, approved NOC, the cheques for the remaining property balance, and the closing fees.",
  //     },
  //     {
  //       type: "heading2",
  //       text: "7. Pay closing costs and receive the title deed",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "Upon successful transfer of funds at the DLD office, the title deed will be issued under your name, making you the owner of the property.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "However, it is important to budget for the closing costs. They include:",
  //     },
  //     {
  //       type: "list",
  //       items: [
  //         "DLD transfer fee — Usually 4% of the property purchase price",
  //         "Agency fee — 2% of the property purchase price + 5% VAT",
  //         "Mortgage fees (if applicable)",
  //         "Registration trustee fee, which ranges from AED 2,000 to AED 4,000",
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "2026 Q1 Awards: Celebrating the people driving our success",
  //   category: "Company",
  //   description:
  //     "Rocky Real Estate’s Q1 2026 awards—recognizing Wasif Aftab, Perhat Atayev, and Ahmed Fawzy for outstanding contributions after a record-breaking year in Dubai real estate.",
  //   image: "/assets/common/awards.webp",
  //   path: "/blog/2026-q1-awards",
  //   content: [
  //     {
  //       type: "paragraph",
  //       text: "2025 ended on a high note in the real estate market with over AED 682.49 billion in total real estate transactions across sales, leasing, and services, according to Dubai Land Department (DLD) data.",
  //     },
  //     {
  //       type: "paragraph",
  //       text: "And at Rocky Real Estate, that momentum continued into the first quarter of 2026, with agents and admin team members generating profits for the company. At the company's Q1 awards, we celebrated the following members for their hard work.",
  //     },
  //     { type: "heading2", text: "Q1 2026 award winners" },
  //     {
  //       type: "list",
  //       items: [
  //         "Wasif Aftab — Manager of the Quarter",
  //         "Perhat Atayev — Admin of the Quarter",
  //         "Ahmed Fawzy — Rising Agent of the Quarter",
  //       ],
  //     },
  //   ],
  // },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Very good Residential Tower in DSO, good amenities and excellent facility management. Highly recommended.",
    author: "Sana Nazarudeen",
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
      "When I rented a flat from Rocky, I visited their office to sign the contract and was assisted by Suchitra. She was very informative, and the entire process went smoothly. I would definitely recommend her if you’re planning to visit the Rocky office.",
    author: "Praveen Kizhakekara",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "We had a great experience working with Aldo Raffo during our move to Dubai. My wife was pregnant at the time, and we were relocating the day before the regional conflict escalated, so it was a particularly stressful period for us. Aldo was calm, reliable, and genuinely supportive throughout the entire process. What stood out most was the amount of time and effort he put in to understand what we were actually looking for, rather than just trying to close a deal. He personally drove us to multiple viewings across different areas of Dubai, gave honest advice on each option, and was always available to help with questions or paperwork along the way. He has a strong knowledge of both the rental and off-plan markets, but more importantly, he approaches the job professionally and with a lot of patience. We never felt pressured, and by the end of the process we felt confident we'd found the right place for our situation. I'd comfortably recommend Aldo to anyone looking for a dependable and knowledgeable real estate agent in Dubai.",
    author: "David O'Neill",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "I had an excellent experience working with Felicia Elorm from Rocky during my rental process. She was highly professional, responsive, and supportive throughout every stage of the journey. What stood out most was her commitment to ensuring that everything was handled efficiently, making my move-in experience simple and hassle-free. She was always available to answer questions, provide guidance, and address any concerns promptly.",
    author: "odame God'spower",
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
    image: "/assets/services/property-management.webp",
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
    image: "/assets/services/inspection.webp",
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
    image: "/assets/services/brokerage.webp",
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
    image: "/assets/services/mortgage.webp",
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
    image: "/assets/services/listing-marketing.webp",
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
    image: "/assets/services/aftersales-support.webp",
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
    subTitle: "Property Consultant – Secondary Market",
    department: "Sales",
    location: "Dubai",
    jobType: "Full-time",
    workMode: "On-site",
    company: "Rocky Real Estate",
    postedAt: "6 days ago",
    applicants: 50,

    description:
      "Already working in Dubai real estate but not getting enough quality leads, marketing support, or exclusive inventory?\n\nJoin one of Dubai’s most established real estate companies.\n\nFor over 50 years, Rocky Real Estate has been a trusted name in Dubai’s property market, helping clients buy, sell, lease, and invest with confidence.\n\nAs we continue to expand our Secondary Market division, we’re looking for ambitious and experienced Property Consultants ready to elevate their real estate career with a company that invests in its people, properties, and long-term success.\n\nIf you’re looking for more than just a brokerage — one that provides quality leads, exclusive inventory, professional marketing, and a strong support system — we’d love to hear from you.\n\nThe Opportunity\n\nAt Rocky Real Estate, you’ll have access to the tools and support needed to focus on what you do best: closing deals and building lasting client relationships.\n\nYour Success Starts Here\n\nApply now and become part of Rocky Real Estate’s next chapter of growth.",

    responsibilities: [
      "Manage residential and commercial sales and leasing transactions across Dubai’s secondary market",
      "Build and maintain relationships with buyers, sellers, landlords, tenants, and investors",
      "Conduct property viewings and provide expert market advice to clients",
      "Negotiate offers and manage transactions from inquiry to closing",
      "Follow up on company-generated leads and develop your own client network",
      "Stay informed about market trends, pricing movements, and community developments",
      "Consistently achieve individual sales and leasing targets",
    ],

    requirements: [
      "Minimum 1 year of experience in Dubai real estate",
      "Strong understanding of the secondary property market",
      "Excellent communication, negotiation, and relationship-building skills",
      "Self-motivated and target-driven mindset",
      "UAE driving license preferred",
      "RERA certification is an advantage",
      "Fluency in additional languages is a plus",
    ],

    benefits: [
      "One of the highest investments in property portals for maximum lead exposure",
      "Exclusive property inventory across key Dubai communities",
      "100% TruCheck listings",
      "Trusted client database built over 50 years in the market",
      "Dedicated telesales support to assist with lead generation",
      "Professional in-house marketing team",
      "Professional photography and content support",
      "Monthly incentive and recognition programs",
      "Administrative and operational support",
      "Collaborative and growth-oriented work environment",
      "Employment visa provided upon successful transaction closure",
    ],

    applyEmail: "recruitment@rockyrealestate.com",
    phone: "+971 50 211 3797",
    // applyPath: "/careers/apply?job=property consultant"
  }
];

export const developers: Developer[] = [
  {
    id: 1,
    name: "Binghatti",
    logo: "/assets/developers/logos/binghatti.webp",
    path: "/off-plan-properties/developers/binghatti",
  },
  {
    id: 2,
    name: "Azizi",
    logo: "/assets/developers/logos/azizi.webp",
    path: "/off-plan-properties/developers/azizi",
  },
  {
    id: 3,
    name: "Emaar",
    logo: "/assets/developers/logos/emaar.webp",
    path: "/off-plan-properties/developers/emaar",
  },
  {
    id: 4,
    name: "Nakheel",
    logo: "/assets/developers/logos/nakheel.webp",
    path: "/off-plan-properties/developers/nakheel",
  },
  {
    id: 5,
    name: "Dubai Properties",
    logo: "/assets/developers/logos/dubai_properties.webp",
    path: "/off-plan-properties/developers/dubai-properties",
  },
  {
    id: 6,
    name: "Meraas",
    logo: "/assets/developers/logos/meraas.webp",
    path: "/off-plan-properties/developers/meraas",
  },
  {
    id: 7,
    name: "Damac",
    logo: "/assets/developers/logos/damac.webp",
    path: "/off-plan-properties/developers/damac",
  },
  {
    id: 8,
    name: "Danube Properties",
    logo: "/assets/developers/logos/danube.webp",
    path: "/off-plan-properties/developers/danube-properties",
  },
  {
    id: 9,
    name: "IRTH Group",
    logo: "/assets/developers/logos/irth.webp",
    path: "/off-plan-properties/developers/irth-group",
  },
  {
    id: 10,
    name: "Arada",
    logo: "/assets/developers/logos/arada.webp",
    path: "/off-plan-properties/developers/arada",
  },
  {
    id: 11,
    name: "Viva Developement",
    logo: "/assets/developers/logos/viva.webp",
    path: "/off-plan-properties/developers/viva",
  },
  {
    id: 12,
    name: "Tarrad Developement",
    logo: "/assets/developers/logos/tarrad.webp",
    path: "/off-plan-properties/developers/tarrad",
  },
  {
    id: 13,
    name: "Meraki Developers",
    logo: "/assets/developers/logos/meraki.webp",
    path: "/off-plan-properties/developers/meraki",
  },
  {
    id: 14,
    name: "Leos",
    logo: "/assets/developers/logos/leos.webp",
    path: "/off-plan-properties/developers/leos",
  },

];


export const projects: Project[] = [
  {
    id: "emaar",
    title: "Emaar Properties",
    description:
      "Developers behind the tallest building in the world, Burj Khalifa, Emaar has redefined the Dubai skyline with its iconic landmarks, be it master communities or internationally recognized properties.",
    imageUrl:
      "/assets/developers/featured/emaar/emaar1.webp",
    imageAlt: "Emaar cultural pavilion with timber shell architecture",
    caption: "Emaar Properties — Dubai, 2022",
  },
  {
    id: "binghatti",
    title: "Binghatti",
    description:
      "Recognized for its bold and unique architecture, Binghatti continues to develop masterpieces across Dubai, including the most-awaited Mercedes-Benz Places.",
    imageUrl:
      "/assets/developers/featured/binghatti/binghatti1.avif",
    imageAlt: "Binghatti mixed-use high-rise with geometric facade",
    caption: "Binghatti Residences — Dubai, 2023",
  },
  {
    id: "damac",
    title: "DAMAC Properties",
    description:
      "One of the most prominent developers in the region, DAMAC Properties, combines luxury living with architectural masterpieces and branded collaborations.",
    imageUrl:
      "/assets/developers/featured/damac/damac1.webp",
    imageAlt: "Biophilic innovation campus with central green valley",
    caption: "Meridian Innovation Campus — Tech Precinct, 2024",
  },
  {
    id: "meraas",
    title: "Meraas",
    description:
      "Offering residents a dynamic lifestyle in Dubai, Meraas continues to develop master waterfront communities and beachfront residences across the city.",
    imageUrl:
      "/assets/developers/featured/meraas/meraas1.webp",
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
  binghatti: {
    heroImage: "/assets/developers/featured/binghatti/binghatti1.avif",
    showcaseImage: "/assets/developers/featured/binghatti/binghatti2.avif",
    about: {
      heading: "About Binghatti",
      intro:
        "Bold architecture, value-driven luxury, and more—that's what Binghatti stands for. And these identifiable projects have made them one of Dubai's most prolific developers.",
      body:
        "Highly attractive to both homeowners and investors, their properties are a blend of stunning design and practical layouts. Be it high-profile branded residences or affordable luxury, they continue to redefine the real estate market.\n\nBut what truly sets them apart? Let's explore.",
    },
    whoIs: {
      heading: "Who is Binghatti?",
      description: `Founded in 2008 by Dr. Hussain Binghatti, Binghatti Developers is a part of the wider Binghatti Holding, which includes construction, hospitality, and real estate.

The vision for this empire was to always deliver architecturally distinctive developments without compromising on design. And today, Binghatti is recognized as one of Dubai's largest private developers with dozens of projects across the Dubai skyline in Downtown Dubai, Business Bay, JVC, and more.

Their accessible, functional, and investment-driven developments, with bold designs, contrasting colors, and geometric patterns, have made the developers' buildings the most recognizable in the city.`,
    },
    whyChoose: {
      heading: "Why Choose Binghatti?",
      points: [
        "Competitive pricing, all while maintaining a luxury look, is one of the main reasons Binghatti is the one for you.",
        "Binghatti properties stand out in high-demand areas, which support resale value and strong rental yields.",
        "Their proven track record of delivering dozens of completed projects across the city and global partnerships with brands like Bugatti and Mercedes-Benz elevate their brand to the ultra-luxury status.",
      ],
    },
  },
  azizi: {
    heroImage: "/assets/developers/featured/azizi/azizi1.webp",
    showcaseImage: "/assets/developers/featured/azizi/azizi2.webp",
    about: {
      heading: "About Azizi Developments",
      intro:
        "One of the reasons for Dubai's exquisite residential landscape is Azizi Developments. They have shaped the city's skyline through scale, accessibility, and strategic locations.",
      body:
        "Azizi Developments has become a household name among investors and end users in the city, known for its value-driven homes, affordability, and excellent quality. They continue to play a significant role in Dubai by making real estate reliable, investment-friendly, and attainable.\n\nBe it their centrally located projects or communities, every design is intended to meet the needs of today's urban lifestyle.\n\nBut what makes Azizi Developments one of the most trusted developers in the city? Let's explore.",
    },
    whoIs: {
      heading: "Who is Azizi?",
      description: `Founded in 2007 by Mirwais Azizi, Azizi Developments is a leading private real estate developer in Dubai. Formed as part of the larger Azizi Group, the company spans multiple industries, including trading, banking, and energy.

The group's vision has always been to deliver high-quality homes at competitive prices. They continue to see the vision through while maintaining complete transparency, timely delivery, and strong after-sales support to their clients.

With thousands of residential units across Dubai, Azizi continues to develop mixed-use and large-scale projects in prime locations, including Al Furjan, Downtown Jebel Ali, Palm Jumeirah, Dubai South, MBR City, and Dubai Healthcare City.`,
    },
    whyChoose: {
      heading: "Why Choose Azizi?",
      points: [
        "Azizi offers value-driven pricing at prime locations in Dubai, ideal for new home owners and investors.",
        "Located across Dubai, Azizi developments have properties in areas with strong demand and robust infrastructure, such as Dubai South and Palm Jumeirah.",
        "Azizi properties are desirable and highly appealing to tenants, offering affordable pricing, efficient layouts, and community-focused living.",
        "Over the years, Azizi has built trust through its consistency and timely delivery, having completed thousands of units and is currently working on large-scale projects.",
        "Catering to a broad audience, Azizi ensures resale demand and liquidity for families, investors, and international buyers.",
      ],
    },
  },
  emaar: {
    heroImage: "/assets/developers/featured/emaar/emaar1.webp",
    showcaseImage: "/assets/developers/featured/emaar/emaar2.avif",
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
  nakheel: {
    heroImage: "/assets/developers/featured/nakheel/nakheel1.webp",
    showcaseImage: "/assets/developers/featured/nakheel/nakheel2.webp",
    about: {
      heading: "About Nakheel Properties",
      intro:
        "A government-owned master developer, Nakheel Properties, has redefined the city's coastline with its properties.",
      body:
        "A key member of the Dubai Holding Group, Nakheel Properties, is known for its iconic, world-famous properties, including Palm Jumeirah. While the developers have individual properties across the city, they are known for creating islands and huge master communities, housing hundreds of thousands of residents.\n\nBut what makes them the masters of Dubai's coastline? Let's explore.",
    },
    whoIs: {
      heading: "Who is Nakheel?",
      description: `Founded in 2003 and managed by HH Sheikh Ahmed bin Saeed Al Maktoum, Nakheel Properties was established to expand Dubai's shoreline.

Nakheel Properties' portfolio covers over 15,000 hectares of land and is home to over 700,000 people. In addition to residential properties, Nakheel owns and operates major retail hotspots, including Dragon Mart, Ibn Battuta Mall, and more. Their portfolio also extends to hotels, community centers, beach clubs, and more.

In 2024, Nakheel Properties was rebranded and integrated into Dubai Holding, where mega projects like Palm Jebel Ali and Dubai Islands were re-launched.`,
    },
    whyChoose: {
      heading: "Why Choose Nakheel?",
      points: [
        "If you want private beaches or panoramic sea views, Nakheel's developments are the undisputed leaders of beachfront and island living.",
        "Over the last two decades, Nakheel Properties recorded a record-breaking value appreciation, especially at The Palm.",
        "Almost all Nakheel master communities feature malls, schools, medical facilities, and more.",
        "As Nakheel is part of Dubai Holding, residents can expect a high level of security and trust, especially for international investors.",
        "Nakheel offers entry points for every type of buyer, be it a budget-friendly apartment in International City or a luxurious villa on the Palm.",
      ],
    },
  },
  "dubai-properties": {
    heroImage: "/assets/developers/featured/dubaiproperties/dubaiproperties1.webp",
    showcaseImage: "/assets/developers/featured/dubaiproperties/dubaiproperties2.webp",
    about: {
      heading: "About Dubai Properties",
      intro:
        "Dubai Properties, part of the larger Dubai Holding, is a major contributor to Dubai's development.",
      body:
        "With properties that cater to families, investors, and professionals, Dubai Properties focuses on building communities and a convenient lifestyle, while emphasizing practical living.\n\nHow did they become one of the most influential developers in the city? Let's explore.",
    },
    whoIs: {
      heading: "Who is Dubai Properties?",
      description: `Established in 2002, Dubai Properties has grown into a master developer and is responsible for some of Dubai's most recognizable properties.

The developers, operating under Dubai Holding, focus on redefining the modern lifestyle in the city. Their developments include residential, commercial, office, and hospitality properties, all located in prime locations across Dubai.`,
    },
    whyChoose: {
      heading: "Why Choose Dubai Properties?",
      points: [
        "With Dubai Properties, you get a wide range of properties, including residential, commercial, and more that cater to affordable and mid-luxury markets alike.",
        "The perfect place for families, professionals, and investors.",
        "A master community focused on comfortable, urban living with access to parks, lifestyle amenities, retail outlets, and more.",
        "Properties located in prime locations across Dubai.",
        "And most importantly, they are backed by one of Dubai's most trusted and prestigious companies, Dubai Holding.",
      ],
    },
  },
  meraas: {
    heroImage: "/assets/developers/featured/meraas/meraas1.webp",
    showcaseImage: "/assets/developers/featured/meraas/meraas2.webp",
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
    heroImage: "/assets/developers/featured/damac/damac1.webp",
    showcaseImage: "/assets/developers/featured/damac/damac3.webp",
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
  "danube-properties": {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/emaar-featured.webp",
    about: {
      heading: "About Danube Properties",
      intro:
        "Part of the larger Danube Group, Danube Properties is one of the biggest developers in the region. Known for its affordable luxury homes, Danube Properties has made a strong impact in the Dubai real estate market.",
      body:
        "The developers offer flexible payment plans, making it more accessible to first-time homebuyers and middle-income investors, both locally and internationally.\n\nHowever, what makes them one of the fastest-growing developers in the country? Let's explore.",
    },
    whoIs: {
      heading: "Who is Danube Properties?",
      description: `Established in 2014, Danube Group and its real estate arm, Danube Properties, were founded by Rizwan Sajan.

Danube Properties has delivered several successful projects in prime locations across Dubai and continues to grow in the rapidly evolving market. They are known for their affordable pricing and innovative post-handover payment plans.`,
    },
    whyChoose: {
      heading: "Why Choose Danube Properties?",
      points: [
        "Developments are located in prime locations across the country.",
        "Timely project delivery.",
        "Affordable and value-driven properties across Dubai.",
        "Ideal for first-time buyers seeking flexible post-handover payment plans.",
      ],
    },
  },
  "irth-group": {
    heroImage: "/assets/developers/Irth1.webp",
    showcaseImage: "/assets/developers/Irth1.webp",
    about: {
      heading: "About IRTH Group",
      intro:
        "IRTH Group, an emerging developer in Dubai, is redefining the landscape through its design-led, modern residential developments.",
      body:
        "With a focus on architectural quality, an elevated lifestyle, and more, IRTH Group develops thoughtfully planned, exclusive communities. Located strategically throughout Dubai, they aim to offer refined, practical living spaces for residents.\n\nBut what makes them one of the most promising developers right now? Let's explore.",
    },
    whoIs: {
      heading: "Who is IRTH Group?",
      description: `IRTH Group was established as a privately held real estate investment and development company, focusing on mixed-use and residential projects across Dubai.

The developers place significant focus on delivering contemporary architecture, high-quality construction, and a community that caters to modern homeowners and investors alike. IRTH Group also combine their expertise in development, investment, and asset management to deliver developments.

Their projects are also strategically located in prime areas in Dubai and offer long-term growth potential, accessibility, and more.`,
    },
    whyChoose: {
      heading: "Why Choose IRTH Group?",
      points: [
        "The company's developments are designed for comfort, sustainability, and long-term value.",
        "Branded residential communities perfect for investors and homeowners alike.",
        "Aim to deliver high-quality developments with contemporary architecture.",
        "Strategically located in prime districts across Dubai.",
      ],
    },
  },
  arada: {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/meraas.webp",
    about: {
      heading: "About Arada",
      intro:
        "A rising developer in the region, Arada is known for creating modern master communities focusing on wellness and urban living.",
      body:
        "The developers integrate retail, education, and entertainment in their residential spaces, redefining community living in the UAE, one development at a time.\n\nBut what makes them one of the most innovative developers in the UAE? Let's explore.",
    },
    whoIs: {
      heading: "Who is Arada?",
      description: `Arada was founded by Prince Khaled bin Alwaleed Al Saud and Sultan bin Ahmed Al Qasimi in 2017, with a vision to deliver community-focused and design-led developments in the region.

Arada has not only focused on Sharjah, where it is headquartered, but has quickly expanded across the UAE with communities that combine retail, commercial, residential, and more. Their developments focus on smart-home and sustainability-focused environments, which are perfect for professionals, investors, and families alike.`,
    },
    whyChoose: {
      heading: "Why Choose Arada?",
      points: [
        "Modern master communities focused on wellness and urban living.",
        "Integrated retail, education, and entertainment within residential developments.",
        "Smart-home and sustainability-focused environments across the UAE.",
        "Ideal for professionals, investors, and families seeking community-focused living.",
      ],
    },
  },
  viva: {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/emaar-featured.webp",
    about: {
      heading: "About Viva Development",
      intro:
        "Another emerging development in the UAE, Viva Development, creates communities that combine residential, lifestyle, and retail.",
      body:
        "The developer aims to deliver projects emphasizing sustainable urban planning, modern design, and contemporary architecture, ideal for professionals, families, and investors alike.\n\nBut what makes them a rapidly growing developer? Let's explore.",
    },
    whoIs: {
      heading: "Who is Viva Development?",
      description: `Viva Development operates as part of a broader real estate and lifestyle group with decades of experience in place-making and property development across the UAE.

With a portfolio spanning millions of square feet of real estate, the group has expanded beyond development into retail and lifestyle sectors, reflecting a vision centered on improving quality of life through integrated communities. (Viva City)

The developer focuses on delivering contemporary residential projects that prioritize accessibility, efficient design, and community-focused living while supporting Dubai's evolving urban growth.`,
    },
    whyChoose: {
      heading: "Why Choose Viva Development?",
      points: [
        "Focus on community-oriented and lifestyle-driven developments.",
        "Modern architectural design combined with practical layouts.",
        "Integration of residential, retail, and lifestyle components.",
        "Commitment to enhancing everyday living experiences.",
        "Growing developer with expanding real estate and lifestyle portfolio.",
      ],
    },
  },
  tarrad: {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/emaar-featured.webp",
    about: {
      heading: "About Tarrad Development",
      intro:
        "Tarrad Development is a quickly emerging developer in the UAE that focuses on redefining modern living across Dubai.",
      body:
        "Designed and recognized for their growing portfolio, Tarrad Developments aims to deliver projects that combine practical urban living with quality construction. With projects that include Mackerel Tower, Celesto Tower 1, Celesto Tower 2, and the upcoming Celesto Series, Tarrad Developments offers \"quality and innovation in every square foot.\"\n\nBut what makes them a promising name in the real estate market? Let's explore.",
    },
    whoIs: {
      heading: "Who is Tarrad Development?",
      description: `Founded in 2020 in the UAE, Tarrad Development is a privately held real estate development company with properties across the UAE, China, Iraq, and Turkey.

The developers design spaces for residents who seek functionality, elegance, and investment in one place. They prioritize strategic locations and practical pricing to attract investors and end users to their fully furnished, smart homes and waterfront master communities.

The developers continue to redefine excellence in Dubai's luxury real estate market as they craft architectural masterpieces.`,
    },
    whyChoose: {
      heading: "Why Choose Tarrad Developments?",
      points: [
        "Strategic locations and practical pricing.",
        "Suitable for investors and end users alike.",
        "Luxury living with smart, fully furnished homes and waterfront communities.",
        "Architectural masterpieces with efficient layouts designed for urban lifestyles.",
      ],
    },
  },
  meraki: {
    heroImage: "/assets/developers/featured/citywalk-featured.webp",
    showcaseImage: "/assets/developers/featured/emaar-featured.webp",
    about: {
      heading: "About Meraki",
      intro:
        "An award-winning developer, Meraki Developers focuses on delivering premium design-led residential and commercial spaces.",
      body:
        "With a focus on quality over quantity, Meraki has crafted a portfolio that emphasizes thoughtful planning, well-being, and long-term value, making it one of the most trusted emerging developers in Dubai.\n\nBut what makes them stand out among other developers in Dubai? Let's explore.",
    },
    whoIs: {
      heading: "Who is Meraki?",
      description: `Part of the larger Meraki Group, Meraki Developers was introduced in 2015 in the UAE. The privately owned real estate development company joined the vast market with one vision - to develop boutique residential communities to blend design excellence and functionality.

Strategically located across Dubai, Meraki Developers continue to deliver projects suitable for investors, families, and young professionals alike.`,
    },
    whyChoose: {
      heading: "Why Choose Meraki?",
      points: [
        "Design-led developments perfect for investors, families, and professionals.",
        "Strategic locations with growth potential.",
        "Boutique residential communities for more urban, modern living.",
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
    page?.heroImage ?? project?.imageUrl ?? "/assets/developers/featured/emaar/emaar1.webp";
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
