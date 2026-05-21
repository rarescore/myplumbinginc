import Link from "next/link";
import { Header, Footer, BrandShield } from "../components/Site";

export const metadata = {
  title: "Press and Media Kit | RareScore",
  description: "RareScore press kit with description, screenshots, contact information, and copy-paste media text.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <main>
      <Header />
      <section className="pressHero">
        <BrandShield className="shieldMark intro" />
        <div>
          <div className="sectionKicker">Press Kit</div>
          <h1>Share RareScore with your audience.</h1>
          <p>RareScore is a free quiz platform with an IQ-style test, a Morality Test, and an Are You Rare personality test. Users get an instant score and can optionally unlock a digital, printed, or framed certificate.</p>
          <div className="heroActions">
            <Link className="goldButton" href="/tests">Try RareScore <span>→</span></Link>
            <a className="ghostButton" href="mailto:hello.myrarescore@gmail.com">Contact</a>
          </div>
        </div>
      </section>

      <section className="pressGrid">
        <div className="pressCard"><h2>Short description</h2><p>RareScore helps users discover how they think, decide, and stand out through free online tests.</p></div>
        <div className="pressCard"><h2>Copy-paste blurb</h2><p>RareScore is a free self-discovery quiz platform featuring an IQ-style test, Morality Test, and Are You Rare personality test. Users get scores instantly and can optionally unlock an Official RareScore Certificate.</p></div>
        <div className="pressCard"><h2>Contact</h2><p>Email: hello.myrarescore@gmail.com</p><p>For screenshots, partnership inquiries, support, or coverage requests.</p></div>
      </section>

      <section className="pressAssets">
        <h2>Useful pages to link</h2>
        <div className="seoLinks">
          <Link href="/">Homepage</Link>
          <Link href="/iq-test">IQ Test</Link>
          <Link href="/are-you-rare">Are You Rare</Link>
          <Link href="/morality-test">Morality Test</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/share">Share Assets</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
