import { Header, Footer } from "../components/Site";

export const metadata = {
  title: "Terms of Use",
  description: "RareScore terms of use for tests, results, digital certificates, payments, and refund policy.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <main>
      <Header />
      <section className="pageHero legalPage">
        <div className="sectionKicker">Terms of Use</div>
        <h1>Terms of Use</h1>
        <p>RareScore tests are for entertainment and self-discovery. Certificates are issued by RareScore and represent your result on the RareScore platform.</p>
      </section>
      <section className="legalCopy">
        <h2>Use of the website</h2>
        <p>RareScore provides quiz experiences, results, and optional digital certificates. By using the site, you agree to use it lawfully and responsibly.</p>
        <h2>Self-discovery and entertainment</h2>
        <p>RareScore tests are not medical, clinical, legal, employment, school admission, or professional evaluations. The IQ Test is an IQ-style entertainment estimate and is not a professionally administered IQ exam.</p>
        <h2>Certificates</h2>
        <p>The Official RareScore Certificate is a digital certificate issued by RareScore. It includes the name entered by the user, test name, score, result title, certificate ID, and issue date. Users are responsible for entering the correct certificate name and email before checkout.</p>
        <h2>Payments and delivery</h2>
        <p>Payments are processed through Stripe. After payment confirmation, the certificate can be downloaded as PDF and PNG, and a copy may be sent to the email entered before checkout.</p>
        <h2>Refund policy</h2>
        <p>Because certificates are generated digitally and delivered instantly, purchases are not refundable once the digital certificate is generated.</p>
        <h2>Contact</h2>
        <p>Questions can be sent to hello.myrarescore@gmail.com.</p>
      </section>
      <Footer />
    </main>
  );
}
