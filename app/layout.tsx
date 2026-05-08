import type { Metadata } from "next";
import "./globals.css";
import { fontDubai } from "@/lib/fonts";
import Script from "next/script";
import { getSiteUrl, toAbsoluteUrl } from "@/utils/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);
const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

export const metadata: Metadata = {
  metadataBase,
  title: "Rocky Real Estate - 5 Decades of Real Estate Excellence",
  description:
    "Rocky Real Estate is a trusted Dubai property company with over 50 years of experience in sales, leasing, and property management across residential and commercial assets.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Rocky Real Estate - 5 Decades of Real Estate Excellence",
    description:
      "Rocky Real Estate is a trusted Dubai property company with over 50 years of experience in sales, leasing, and property management across residential and commercial assets.",
    siteName: "Rocky Real Estate",
    locale: "en_AE",
    images: [
      {
        url: toAbsoluteUrl("/assets/common/Rocky-Logo-Original.svg", siteUrl),
        alt: "Rocky Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocky Real Estate - 5 Decades of Real Estate Excellence",
    description:
      "Rocky Real Estate is a trusted Dubai property company with over 50 years of experience in sales, leasing, and property management across residential and commercial assets.",
    images: [toAbsoluteUrl("/assets/common/Rocky-Logo-Original.svg", siteUrl)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Rocky Real Estate",
    url: siteUrl,
    logo: toAbsoluteUrl("/assets/common/Rocky-Logo-Original.svg", siteUrl),
    email: "info@rockyrealestate.com",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rocky Real Estate",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "Rocky Real Estate",
      url: siteUrl,
    },
  };

  const combinedSchema = [organizationSchema, websiteSchema];

  return (
    <html lang="en" className={fontDubai.variable} suppressHydrationWarning>
      <head>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}

        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
