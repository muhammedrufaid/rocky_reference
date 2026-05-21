import type { MetadataRoute } from "next";
import {
  blogPosts,
  developers,
  getDeveloperSlugFromPath,
  openPositions,
  services,
  teamMembers2,
} from "@/utils/data";
import { getTeamMemberSlug } from "@/utils/selectors";
import { getSiteUrl } from "@/utils/seo";
import { slugFromPath, slugify } from "@/utils/slugify";

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/who-we-are`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${baseUrl}/properties/buy/in-dubai`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties/rent/in-dubai`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/off-plan-properties/in-dubai`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/off-plan-properties/developers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${baseUrl}/sell-your-property`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/achievements`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${slugFromPath(post.path)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const careerRoutes: MetadataRoute.Sitemap = openPositions.map((job) => ({
    url: `${baseUrl}/careers/${slugify(job.title)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers2.map((member) => ({
    url: `${baseUrl}/our-team/${getTeamMemberSlug(member)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const developerRoutes: MetadataRoute.Sitemap = developers.map((dev) => ({
    url: `${baseUrl}/off-plan-properties/developers/${getDeveloperSlugFromPath(dev.path)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...careerRoutes,
    ...teamRoutes,
    ...developerRoutes,
  ];
}
