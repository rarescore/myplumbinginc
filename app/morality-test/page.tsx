import Link from "next/link";
import { Header, Footer, BrandShield } from "../components/Site";

export const metadata = {
  title: "Morality Test | RareScore",
  description: "Take the RareScore Morality Test to explore fairness, loyalty, empathy, honesty, and decisions under pressure.",
  alternates: { canonical: "/morality-test" },
};

export default function Page() {
  return (
    <main>
      <Header />
      <section className="testIntroPage">
        <div className="introText">
          <div className="sectionKicker">About 7–9 minutes</div>
          <h1>Morality Test</h1>
          <p>What do your choices say about who you are when nobody is watching? Explore your values under pressure.</p>
          <div className="introBullets">
            <span>Instant score</span>
            <span>No sign up to start</span>
            <span>Certificate optional after result</span>
          </div>
          <Link className="goldButton" href="/quiz/morality">Start Morality Test <span>→</span></Link>
        </div>
        <div className="introVisual"><BrandShield className="shieldMark intro" /></div>
      </section>
      <section className="methodCopy">
        <h2>What this test looks at</h2>
        <ul>
          <li>Fairness and justice</li>
          <li>Empathy and loyalty</li>
          <li>Honesty and responsibility</li>
          <li>Rule respect, independence, and practical judgment</li>
        </ul>
      </section>
      <Footer />
    </main>
  );
}
