import { Header, Footer, TestCard } from "../components/Site";

export const metadata = {
  title: "RareScore Tests | IQ Test, Morality Test, and Rarity Test",
  description: "Choose from the RareScore IQ Test, Rarity Test, or Morality Test. Start free, get your score instantly, and unlock an optional certificate after your result.",
  alternates: { canonical: "/tests" },
};

export default function TestsPage() {
  return (
    <main>
      <Header />
      <section className="pageHero">
        <div className="sectionKicker">Choose your test</div>
        <h1>Start with the test that pulls you in.</h1>
        <p>No sign up needed. Your result appears instantly after completion.</p>
      </section>
      <section className="testsGridPage">
        <TestCard id="rare" featured />
        <TestCard id="logic" />
        <TestCard id="morality" />
      </section>
      <section className="comparisonSection">
        <h2>Which RareScore test should you take?</h2>
        <div className="comparisonGrid">
          <div><strong>Are You Rare?</strong><span>Measures originality, instinct, and how uncommon your choices feel.</span><small>Best for personality curiosity.</small></div>
          <div><strong>IQ Test</strong><span>Measures pattern recognition, number logic, spatial reasoning, and focus.</span><small>Best for problem solving.</small></div>
          <div><strong>Morality Test</strong><span>Measures fairness, loyalty, empathy, honesty, and decisions under pressure.</span><small>Best for values and judgment.</small></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
