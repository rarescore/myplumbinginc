import { Header, Footer } from "../components/Site";

export const metadata = {
  title: "Privacy Policy",
  description: "RareScore privacy policy covering local quiz results, Stripe payments, Resend email delivery, and certificate information.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <main>
      <Header />
      <section className="pageHero legalPage">
        <div className="sectionKicker">Privacy Policy</div>
        <h1>Privacy Policy</h1>
        <p>RareScore is designed so users can start tests without creating an account.</p>
      </section>
      <section className="legalCopy">
        <h2>Information we collect</h2>
        <p>When you take a test, answers may be stored locally in your browser to calculate and display your result. When you choose to purchase a certificate, we collect the name entered for the certificate and the email address used for delivery.</p>
        <h2>Payments</h2>
        <p>Payments are processed by Stripe. RareScore does not store full card numbers or full payment card details.</p>
        <h2>Email delivery</h2>
        <p>Certificate emails are sent through Resend using the email address you provide at checkout. Public support is available at hello.myrarescore@gmail.com.</p>
        <h2>Certificates</h2>
        <p>Certificate files are generated using the name, test result, score, result type, certificate ID, and issue date connected to the completed quiz result.</p>
        <h2>Local storage</h2>
        <p>RareScore may use browser local storage to remember the last completed test result on the same device. Clearing browser data may remove the saved result.</p>
        <h2>Contact</h2>
        <p>Questions can be sent to hello.myrarescore@gmail.com.</p>
      </section>
      <Footer />
    </main>
  );
}
