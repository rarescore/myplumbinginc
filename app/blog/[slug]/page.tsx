import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components/Site";
import { articles, getArticle } from "../../lib/articles";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { title: article.title, description: article.description, url: `https://myrarescore.com/blog/${article.slug}`, type: "article", images: [{ url: article.image, width: 1400, height: 850, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.category === article.category && item.slug !== article.slug).slice(0, 3);
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: `https://myrarescore.com${article.image}`, datePublished: article.date, dateModified: article.date, author: { "@type": "Organization", name: "RareScore", url: "https://myrarescore.com" }, publisher: { "@type": "Organization", name: "RareScore", url: "https://myrarescore.com" }, mainEntityOfPage: `https://myrarescore.com/blog/${article.slug}`, citation: article.references.map((ref) => ref.url) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://myrarescore.com" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://myrarescore.com/blog" }, { "@type": "ListItem", position: 3, name: article.title, item: `https://myrarescore.com/blog/${article.slug}` }] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: article.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  return (
    <main>
      <Header />
      <article className="articlePage polishedArticle">
        <div className="articleMeta"><Link href="/blog">← RareScore Journal</Link><span>{article.category}</span><span>{article.readTime}</span></div>
        <h1>{article.title}</h1>
        <p className="articleIntro">{article.intro}</p>
        <img className="articleHeroImage" src={article.image} alt={article.imageAlt} loading="eager" />
        <div className="articleCtaTop"><div><strong>Curious where you stand?</strong><span>Start free. Get the result first. Make it official only if it feels worth saving.</span></div><Link className="goldButton" href={article.ctaHref}>{article.ctaLabel} <span>→</span></Link></div>
        {article.sections.map((section, index) => (
          <section key={section.heading} className={index % 2 ? "articleSplit" : undefined}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <section className="researchBox"><h2>Research notes</h2><p>These sources are included for context. RareScore is an entertainment and self-discovery product, not a clinical assessment.</p><div className="referenceGrid">{article.references.map((ref) => <a href={ref.url} target="_blank" rel="noopener noreferrer" key={ref.url}><strong>{ref.label}</strong><span>{ref.title}</span><small>{ref.note}</small></a>)}</div></section>
        <section className="articleFaq"><h2>Quick answers</h2>{article.faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
        {related.length > 0 && <section className="relatedArticles"><h2>Related RareScore guides</h2><div className="relatedGrid">{related.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><img src={item.image} alt={item.imageAlt} loading="lazy" /><strong>{item.title}</strong></Link>)}</div></section>}
        <div className="articleBottomCta"><h2>Take a RareScore test</h2><p>Choose the free IQ Test, free Morality Test, or Are You Rare test. Your first result is free. Certificates and full analysis reports are optional after the result.</p><Link className="goldButton" href="/tests">Choose a Test <span>→</span></Link></div>
      </article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
