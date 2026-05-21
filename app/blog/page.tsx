import Link from "next/link";
import { Header, Footer } from "../components/Site";
import { articles } from "../lib/articles";

export const metadata = {
  title: "RareScore Blog | IQ, Morality, Rarity, and Online Tests",
  description: "Guides about IQ-style tests, morality tests, rarity tests, online quiz design, digital certificates, and self-discovery.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main>
      <Header />
      <section className="pageHero">
        <div className="sectionKicker">RareScore Blog</div>
        <h1>Articles that help people discover RareScore.</h1>
        <p>Use these pages for SEO, Reddit posts, outreach, and backlinks.</p>
      </section>
      <section className="blogGrid">
        {articles.map((article) => (
          <Link href={`/blog/${article.slug}`} className="blogCard" key={article.slug}>
            <span>{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <small>{article.readTime}</small>
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  );
}
