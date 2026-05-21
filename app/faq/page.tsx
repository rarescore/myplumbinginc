import { Header, Footer } from "../components/Site";

export const metadata = {
  title: "RareScore FAQ | Tests, Scores, and Certificates",
  description: "Learn how RareScore tests work, what the IQ Test, Morality Test, and Rarity Test measure, and how the Official RareScore Certificate is delivered.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  ["What is RareScore?", "RareScore is a self-discovery quiz platform built around personality, IQ-style logic, morality, and rarity-style scoring."],
  ["What does Are You Rare measure?", "It looks at originality, independence, social perception, instinct patterns, emotional associations, and how often your choices differ from common response patterns."],
  ["What does the IQ Test measure?", "It focuses on pattern recognition, visual reasoning, number sequences, attention, analogies, deductive logic, and problem-solving style."],
  ["Is the IQ Test a clinical IQ test?", "No. It is a RareScore IQ-style estimate for entertainment and self-discovery. It is not a clinical or professionally administered IQ exam."],
  ["What does the Morality Test measure?", "It explores loyalty, fairness, empathy, honesty, responsibility, courage, rule respect, independence, and pressure-based decision making."],
  ["Do I need an account?", "No. You can start a test without creating an account."],
  ["Is the certificate required?", "No. Your score is free. The Official RareScore Certificate is optional after completion."],
  ["Why does the certificate cost money if the score is free?", "The score is free. The certificate is a personalized digital file generated for saving, printing, downloading, and sharing."],
  ["What comes on the certificate?", "Your name, test name, score label, score, result type, certificate ID, issue date, RareScore branding, and Score Verification Department signature."],
  ["Can I use the certificate on social media?", "Yes. The certificate includes a PNG version that is easier to share, text, or post."],
  ["Can I retake a test?", "Your first attempt is free. A Fresh 30 Question Set is available as a paid second version with new questions and a second result to compare."],
  ["What is the Fresh 30 Question Set?", "It is a fresh, slightly more advanced version of the selected test with a different 30-question bank, new patterns, and a second score to compare against your first result."],
  ["What is the bundle?", "The bundle includes the Official RareScore Digital Certificate plus access to a Fresh 30 Question Set."],
  ["Will my score be saved?", "Your result is stored locally in your browser after you finish. If you clear browser data or switch devices, you may need to retake the test."],
  ["When do I see the certificate option?", "Only after the quiz is complete and your score is visible."],
  ["How is the certificate delivered?", "After payment confirmation, you can download PDF and PNG files instantly, and a copy is emailed to the email address entered before checkout."],
  ["What if I do not receive my certificate email?", "Check spam first. If it is missing, email hello.myrarescore@gmail.com with the certificate ID, checkout email, and test name."],
  ["What is the refund policy?", "Because the certificate is generated digitally and delivered instantly, purchases are not refundable once the digital certificate is generated."],
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main>
      <Header />
      <section className="pageHero">
        <div className="sectionKicker">FAQ</div>
        <h1>How RareScore works.</h1>
        <p>Clear answers before you start, share, or unlock a certificate.</p>
      </section>
      <section className="faqList">
        {faqs.map(([q, a]) => (
          <div className="faqItem" key={q}>
            <h2>{q}</h2>
            <p>{a}</p>
          </div>
        ))}
      </section>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
