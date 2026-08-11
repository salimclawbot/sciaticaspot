import { normalizeArticleHeadings as normalizeRenderedArticleHeadings } from "@/lib/article-copy";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs } from "@/lib/articles";
import SciaticaVideo from "@/components/SciaticaVideo";
import {
  buildKeywords,
  buildFaqSchema,
  getFaqItems,
  normalizeArticleHtml,
  normalizeMetaDescription,
  normalizeMetaTitle,
  type TocItem,
} from "@/lib/article-page-utils";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;
  return (
    <nav className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">Table of Contents</p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="hover:text-slate-900 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Not Found" };

  const title = normalizeMetaTitle(article.title);
  const description = normalizeMetaDescription(article.description);

  return {
    title,
    description,
    keywords: buildKeywords(article.title, article.category),
    alternates: { canonical: `https://sciaticaspot.com/${article.slug}` },
    openGraph: {
      title,
      description,
      url: `https://sciaticaspot.com/${article.slug}`,
      images: [{ url: "https://sciaticaspot.com/editorial-hero.png", width: 1200, height: 630, alt: title }],
      type: "article",
      siteName: "Sciatica Spot",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://sciaticaspot.com/editorial-hero.png"],
    },
  };
}

function renderVideoBySlug(slug: string) {
  switch (slug) {
    case "best-sciatica-pain-relief-exercises-2026":
      return <SciaticaVideo variant="exercises" />;
    case "sciatica-vs-piriformis-syndrome":
      return <SciaticaVideo variant="piriformis" />;
    case "best-seat-cushions-for-sciatica-2026":
      return <SciaticaVideo variant="cushions" />;
    default:
      return null;
  }
}

function FaqSection({ items, slug }: { items: { question: string; answer: string }[]; slug: string }) {
  if (!items.length) return null;
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-bold text-slate-900" id="faq">
        Frequently Asked Questions
      </h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <details key={`${slug}-${item.question}`} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
            <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: normalizeMetaTitle(article.title),
    description: normalizeMetaDescription(article.description),
    author: { "@type": "Organization", name: "Sciatica Spot Editorial Team" },
    publisher: {
      "@type": "Organization",
      name: "Sciatica Spot",
      logo: { "@type": "ImageObject", url: `https://sciaticaspot.com/editorial-hero.png` },
    },
    datePublished: article.date,
    dateModified: article.dateModified ?? article.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://sciaticaspot.com/${article.slug}` },
  };

  const faqSchemaItems = getFaqItems(article.faqSchema);
  const faqSchema = buildFaqSchema(faqSchemaItems);
  const faqItems = faqSchemaItems.map((item) => ({ question: item.question, answer: item.answer }));

  const { html, toc } = normalizeArticleHtml(normalizeRenderedArticleHeadings(article.htmlContent), article.title);
  const video = renderVideoBySlug(article.slug);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-2">
          {article.category || "Health Guide"}
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg text-gray-600">{article.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>By Sciatica Spot Editorial Team</span>
          <span>·</span>
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>
      <figure className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <img src="/editorial-hero.png" alt={article.title} className="aspect-[16/9] w-full object-cover" width="1536" height="864" fetchPriority="high" />
      </figure>


      <TableOfContents items={toc} />

      {video && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">30-Second Summary</h2>
          <div className="mt-4">{video}</div>
        </div>
      )}

      <div
        className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <FaqSection items={faqItems} slug={article.slug} />
    </article>
  );
}
