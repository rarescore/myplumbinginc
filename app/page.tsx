import Link from "next/link";
import { Header, Footer, TestCard, TrustStrip, HowItWorks, BrandShield } from "./components/Site";

export default function Home() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Official RareScore Certificate",
    description:
      "A personalized digital certificate for a completed RareScore test result, delivered as PDF and PNG after checkout.",
    brand: { "@type": "Brand", name: "RareScore" },
    offers: {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://myrarescore.com/certificate",
    },
  };

  return (
    <main>
      <Header />

      <section className="heroClean">
        <div className="heroCopy">
          <div className="softPill">Fast. Private. Revealing.</div>
          <h1>Find Out How <span>Rare</span> You Really Are</h1>
          <p>Take a free online IQ test, morality test, or rarity test and get your score instantly. No sign up needed to start.</p>

          <div className="heroPoints">
            <span>Private</span>
            <span>Instant results</span>
            <span>No sign up to start</span>
            <span>Optional certificate after your result</span>
          </div>

          <div className="heroActions">
            <Link href="/tests" className="goldButton">Start Free Test <span>→</span></Link>
            <Link href="#tests" className="ghostButton">Choose a Test</Link>
          </div>
        </div>

        <div className="heroMarkWrap" aria-hidden="true">
          <div className="heroGlow"></div>
          <BrandShield className="shieldMark hero" />
        </div>
      </section>

      <section id="tests" className="homeTests">
        <div className="featuredColumn">
          <TestCard id="rare" featured />
        </div>
        <div className="sideTests">
          <TestCard id="logic" />
          <TestCard id="morality" />
        </div>
      </section>

      <HowItWorks />

      <section className="seoStory">
        <div className="sectionKicker">What is RareScore?</div>
        <h2>Free self-discovery tests with instant results.</h2>
        <p>
          RareScore gives you a fast way to explore how you think, decide, and stand out. You can start with the IQ Test for pattern recognition and problem solving, the Morality Test for values and decision making, or the Are You Rare test for originality, instinct, and personality signals.
        </p>
        <p>
          Each test is designed to be quick, visual, and easy to complete on mobile. Your score appears for free after the quiz. If you want to save, print, or share your result, you can unlock an optional Official RareScore Certificate with your name, test result, score, certificate ID, and issue date.
        </p>
        <div className="seoLinks">
          <Link href="/iq-test">IQ Test</Link>
          <Link href="/morality-test">Morality Test</Link>
          <Link href="/are-you-rare">Rarity Test</Link>
          <Link href="/faq">How certificates work</Link>
        </div>
        <div className="popularSearches">
          <span>Popular:</span>
          <Link href="/iq-test">free IQ test</Link>
          <Link href="/are-you-rare">personality rarity test</Link>
          <Link href="/morality-test">morality test</Link>
          <Link href="/certificate">digital certificate</Link>
        </div>
      </section>

      <section className="softCertificate">
        <div>
          <h2>Your score is free.<br /><span>Your certificate is optional.</span></h2>
          <p>After your test, you can unlock an Official RareScore Certificate with your name, score, result type, certificate ID, and issue date.</p>
        </div>
        <Link href="/tests" className="ghostButton">Start with a free score <span>→</span></Link>
      </section>

      <TrustStrip />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </main>
  );
}
