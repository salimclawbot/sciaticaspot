import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  date: string;
  dateModified: string;
  category: string;
  author: string;
  faqSchema?: Record<string, unknown> | null;
  articleSchema?: Record<string, unknown> | null;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function parseJsonField(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "string") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function processContent(raw: string): string {
  let processed = raw;
  processed = processed.replace(/^#\s+.*\n+/, "");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]\((.*?)\)/g, "[$2](/$1)");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]/g, "[$1](/$1)");
  return processed;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const content = processContent(parsed.content);
  const result = await remark().use(html, { sanitize: false }).process(content);

  const title = (data.title as string) || slug;
  const description = (data.meta_description as string) || "Air purifier guide article.";
  const author = (data.author as string) || "Dr. Alex Chen";
  const date = (data.datePublished as string) || "2026-03-10";
  const dateModified = (data.dateModified as string) || date;
  const category = "Guide";

  const excerptMatch = parsed.content.match(/\*\*(.*?)\*\*/);
  const excerpt = excerptMatch ? excerptMatch[1].trim() : description;

  return {
    slug,
    title,
    description,
    excerpt,
    content,
    htmlContent: result.toString(),
    date,
    dateModified,
    category,
    author,
    faqSchema: parseJsonField(data.faq_schema),
    articleSchema: parseJsonField(data.article_schema),
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));
  return articles.filter(Boolean) as Article[];
}
