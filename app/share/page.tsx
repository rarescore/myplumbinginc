import Link from "next/link";
import { Header, Footer } from "../components/Site";

export const metadata = {
  title: "Share RareScore | Screenshots, Captions, and Social Posts",
  description: "RareScore share page with Reddit post ideas, captions, and pages to share.",
  alternates: { canonical: "/share" },
};

const posts = [
  { title: "Reddit feedback post", text: "I built a free quiz site with an IQ-style test, morality test, and “Are You Rare?” personality test. Does this quiz screen feel trustworthy enough to finish?" },
  { title: "TikTok hook", text: "I made a test that tells you how rare your personality is. I thought it would be easy, but some answers are weirdly accurate." },
  { title: "Pinterest caption", text: "Take a free IQ-style, morality, or rarity test and reveal your RareScore instantly." },
];

export default function SharePage() {
  return (
    <main>
      <Header />
      <section className="pageHero">
        <div className="sectionKicker">Share RareScore</div>
        <h1>Ready-to-use captions and links.</h1>
        <p>Use this page for Reddit, TikTok, Pinterest, outreach, and backlinks.</p>
      </section>
      <section className="shareGrid">
        {posts.map((post) => (
          <div className="shareCard" key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </div>
        ))}
      </section>
      <section className="pressAssets">
        <h2>Best pages to share</h2>
        <div className="seoLinks">
          <Link href="/iq-test">Free IQ Test</Link>
          <Link href="/are-you-rare">Are You Rare Test</Link>
          <Link href="/morality-test">Morality Test</Link>
          <Link href="/blog/free-iq-test">IQ Test Article</Link>
          <Link href="/blog/what-makes-someone-rare">Rarity Article</Link>
          <Link href="/press">Press Kit</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
