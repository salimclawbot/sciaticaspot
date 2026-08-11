import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sciaticaspot.com";
  const redirectingSlugs = new Set(["best-sciatica-pain-relief-exercises-2026", "best-sitting-position-for-sciatica", "best-sleeping-positions-for-sciatica"]);
  const slugs = getAllSlugs().filter((slug) => !redirectingSlugs.has(slug));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...slugs.map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: new Date() })),
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date() },
  ];
}
