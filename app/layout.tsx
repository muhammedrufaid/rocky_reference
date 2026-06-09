import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDubai } from "@/lib/fonts";
import Script from "next/script";
import { getSiteUrl, toAbsoluteUrl } from "@/utils/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ContactWidget from "@/components/layout/ContactWidget";

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);
const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

export const metadata: Metadata = {
  metadataBase,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <ContactWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
