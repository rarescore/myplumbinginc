import Link from "next/link";
import { Header, Footer, BrandShield } from "../components/Site";

export const metadata = {
  title: "Free IQ Test | RareScore IQ-Style Score",
  description: "Take the RareScore IQ Test for a fast IQ-style score using patterns, number logic, spatial reasoning, focus, and problem solving.",
  alternates: { canonical: "/iq-test" },
};

export default function Page() {
  return (
    <main>
      <Header />
      <section className="testIntroPage">
        <div className="introText">
          <div className="sectionKicker">About 10–12 minutes</div>
          <h1>IQ Test</h1>
          <p>Challenge your pattern recognition, focus, number logic, visual reasoning, and problem solving with a fast, interactive IQ-style test. Your score is shown instantly when you finish.</p>
          <div className="introBullets">
            <span>30 questions</span>
            <span>Instant IQ-style score</span>
            <span>No sign up to start</span>
            <span>Certificate optional after result</span>
          </div>
          <Link className="goldButton" href="/quiz/logic">Start IQ Test <span>→</span></Link>
        </div>
        <div className="introVisual"><BrandShield className="shieldMark intro" /></div>
      </section>
      <section className="methodCopy">
        <h2>What this IQ Test looks at</h2>
        <ul>
          <li>Pattern recognition</li>
          <li>Number sequences</li>
          <li>Visual and spatial reasoning</li>
          <li>Deductive logic and fast thinking</li>
        </ul>
        <p className="smallLegal">This is a RareScore IQ-style estimate for self-discovery and entertainment. It is not a clinical or professionally administered IQ exam.</p>
      </section>
      <Footer />
    </main>
  );
}
