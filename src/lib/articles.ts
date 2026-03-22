import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

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

function extractSchemaField(raw: string, fieldName: string): string | null {
  // Extract schema fields using regex before YAML parsing (handles apostrophes in JSON)
  const match = raw.match(new RegExp(`^${fieldName}:\s*'([\s\S]*?)'\s*$`, "m"));
  if (match) return match[1].replace(/''/g, "'");
  const matchDQ = raw.match(new RegExp(`^${fieldName}:\s*"([\s\S]*?)"\s*$`, "m"));
  if (matchDQ) return matchDQ[1];
  // literal block scalar
  const matchBlock = raw.match(new RegExp(`^${fieldName}:\s*[|>]-?\n(([\s\S]*?)(?=\n\S|$))`, "m"));
  if (matchBlock) return matchBlock[1].replace(/^  /gm, "").trim();
  return null;
}

function stripSchemaFields(raw: string): string {
  // Remove schema fields before gray-matter parsing
  let result = raw;
  result = result.replace(/^faq_schema:.*$/m, "faq_schema: null");
  result = result.replace(/^article_schema:.*$/m, "article_schema: null");
  return result;
}

function parseJsonField(value: string | null): Record<string, unknown> | null {
  if (!value) return null;
  try { return JSON.parse(value); } catch { return null; }
}

function processContent(raw: string): string {
  let processed = raw;
  // Strip heading ID syntax {#...}
  processed = processed.replace(/\{#[^}]+\}/g, "");
  processed = processed.trimStart().replace(/^#\s+.*\n+/, "");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]\((.*?)\)/g, "[$2](/$1)");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]/g, "[$1](/$1)");
  return processed;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  
  // Extract schemas before YAML parsing
  const faqSchemaStr = extractSchemaField(raw, "faq_schema");
  const articleSchemaStr = extractSchemaField(raw, "article_schema");
  
  // Strip schemas for safe gray-matter parsing
  const safeRaw = stripSchemaFields(raw);
  
  // Use manual frontmatter extraction to avoid gray-matter YAML issues
  const fmMatch = safeRaw.match(/^---\n([\s\S]*?)\n---/);
  let data: Record<string, string> = {};
  let bodyContent = safeRaw;
  
  if (fmMatch) {
    bodyContent = safeRaw.slice(fmMatch[0].length);
    for (const line of fmMatch[1].split("\n")) {
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
        data[key] = val;
      }
    }
  }

  const content = processContent(bodyContent);
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content);

  const title = data.title || slug;
  const description = data.meta_description || `${title} article.`;
  const author = data.author || "Expert Author";
  const date = data.date || "2026-03-12";

  return {
    slug,
    title,
    description,
    excerpt: content.slice(0, 200),
    content,
    htmlContent: result.toString(),
    date,
    dateModified: date,
    category: data.category || "Guide",
    author,
    faqSchema: parseJsonField(faqSchemaStr),
    articleSchema: parseJsonField(articleSchemaStr),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));
  return articles.filter(Boolean) as Article[];
}
