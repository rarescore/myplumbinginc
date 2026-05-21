import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components/Site";
import { articles, getArticle } from "../../lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://myrarescore.com/blog/${article.slug}`,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "RareScore" },
    publisher: { "@type": "Organization", name: "RareScore" },
    mainEntityOfPage: `https://myrarescore.com/blog/${article.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main>
      <Header />
      <article className="articlePage">
        <div className="articleMeta">
          <Link href="/blog">← Blog</Link>
          <span>{article.category}</span>
          <span>{article.readTime}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="articleIntro">{article.intro}</p>

        <div className="articleCtaTop">
          <div>
            <strong>Ready to try it?</strong>
            <span>Start free and get your score instantly.</span>
          </div>
          <Link className="goldButton" href={article.ctaHref}>{article.ctaLabel} <span>→</span></Link>
        </div>

        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <section className="articleFaq">
          <h2>Quick answers</h2>
          {article.faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <div className="articleBottomCta">
          <h2>Take a RareScore test</h2>
          <p>Choose the IQ Test, Morality Test, or Are You Rare test. First attempts are free.</p>
          <Link className="goldButton" href="/tests">Choose a Test <span>→</span></Link>
        </div>
      </article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
