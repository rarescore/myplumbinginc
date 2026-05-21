import Link from "next/link";
import { Header, Footer } from "../components/Site";
import { articles, articleCategories } from "../lib/articles";

export const metadata = {
  title: "RareScore Journal | Free IQ Test, Morality Test, Rarity Test, and Psychology",
  description: "Premium RareScore articles about intelligence, morality, rarity, self-perception, online scores, certificates, and why people want to know where they stand.",
  keywords: ["free IQ test", "free morality test", "are you rare test", "RareScore", "personality test", "Dunning Kruger effect"],
  alternates: { canonical: "/blog" },
  openGraph: { title: "RareScore Journal", description: "Psychology, scores, identity, and the strange need to know where you stand.", url: "https://myrarescore.com/blog", type: "website" },
};

export default function BlogPage() {
  const featured = articles.slice(0, 4);
  const rest = articles.slice(4);
  return (
    <main>
      <Header />
      <section className="pageHero editorialHero compactHero">
        <div className="sectionKicker">RareScore Journal</div>
        <h1>Psychology, scores, identity, and the strange need to know where you stand.</h1>
        <p>Research-backed and curiosity-driven reads for people who like free IQ tests, moral dilemmas, rare traits, and results that feel worth saving.</p>
        <div className="popularSearches">{articleCategories.map((category) => <span key={category}>{category}</span>)}</div>
      </section>
      <section className="featuredArticleGrid polishedBlogGrid">
        {featured.map((article) => <ArticleCard article={article} featured key={article.slug} />)}
      </section>
      <section className="blogGrid editorialGrid polishedBlogGrid">
        {rest.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </section>
      <Footer />
    </main>
  );
}

function ArticleCard({ article, featured = false }: { article: any; featured?: boolean }) {
  return (
    <Link href={`/blog/${article.slug}`} className={featured ? "featuredArticleCard" : "blogCard withImage"}>
      <div className="articleThumb"><img src={article.image} alt={article.imageAlt} loading="lazy" /></div>
      <div className="articleCardBody">
        <div className="cardTopline"><span>{article.category}</span><small>{article.readTime}</small></div>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
    </Link>
  );
}
