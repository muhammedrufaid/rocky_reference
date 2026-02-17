export const navigationData = [
  { id: 1, title: "Buy", path: "/buy" },
  { id: 2, title: "Rent", path: "/rent" },
  // { id: 3, title: "Sell", path: "/sell" },
  { id: 4, title: "Off Plan", path: "/off-plan" },
  // { id: 5, title: "Areas", path: "/areas" },
  { id: 6, title: "Agents", path: "/agents" },
  // { id: 7, title: "About", path: "/about" },
  { id: 8, title: "Contact", path: "/contact" },
  { id: 9, title: "More", path: "" },
];

export const searchTabs = ["Buy", "Rent", "Sell"] as const;

export const categoryOptions: Record<string, string[]> = {
  Buy: ["Residential", "Commercial", "Offplan"],
  Rent: ["Residential", "Commercial"],
  Sell: ["Residential", "Commercial", "Offplan"],
};
