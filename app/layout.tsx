import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dubai = localFont({
  src: [
    {
      path: "../public/font/Dubai-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/Dubai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Dubai-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/Dubai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className={`${dubai.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
