import Link from "next/link";
import { Header, Footer, BrandShield } from "../components/Site";

export const metadata = {
  title: "Are You Rare? | RareScore Rarity Test",
  description: "Take the RareScore Rarity Test to see how uncommon your personality, choices, instincts, and originality really are.",
  alternates: { canonical: "/are-you-rare" },
};

export default function Page() {
  return (
    <main>
      <Header />
      <section className="testIntroPage">
        <div className="introText">
          <div className="sectionKicker">About 7–9 minutes</div>
          <h1>Are You Rare?</h1>
          <p>See how uncommon your personality, choices, and instincts really are. This test is designed to feel fast, personal, and curiosity driven.</p>
          <div className="introBullets">
            <span>Instant score</span>
            <span>No sign up to start</span>
            <span>Certificate optional after result</span>
          </div>
          <Link className="goldButton" href="/quiz/rare">Start Rarity Test <span>→</span></Link>
        </div>
        <div className="introVisual"><BrandShield className="shieldMark intro" /></div>
      </section>
      <section className="methodCopy">
        <h2>What this test looks at</h2>
        <ul>
          <li>Originality and unusual associations</li>
          <li>Independence and comfort being hard to define</li>
          <li>Emotional depth and instinctive pattern reading</li>
          <li>How often your answers break common response patterns</li>
        </ul>
      </section>
      <Footer />
    </main>
  );
}
