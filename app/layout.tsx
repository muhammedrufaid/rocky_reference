import type { Metadata } from "next";
import "./globals.css";
import { fontDubai } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Rocky Real Estate - 5 Decades of Real Estate Excellence",
  description:
    "Rocky Real Estate is a trusted Dubai property company with over 50 years of experience in sales, leasing, and property management across residential and commercial assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontDubai.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
