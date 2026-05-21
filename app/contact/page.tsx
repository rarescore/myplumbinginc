import { Header, Footer } from "../components/Site";

export const metadata = {
  title: "Contact RareScore",
  description: "Contact RareScore for support, certificate questions, delivery help, or general inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="pageHero">
        <div className="sectionKicker">Contact</div>
        <h1>Need help with RareScore?</h1>
        <p>For certificate questions, support, or general inquiries, contact us below.</p>
      </section>
      <section className="contactCard">
        <h2>Contact us</h2>
        <p>Email: hello.myrarescore@gmail.com</p>
        <p>For certificate support, include the certificate ID, email used at checkout, test name, and a screenshot of the issue if possible.</p>
        <a className="goldButton" href="mailto:hello.myrarescore@gmail.com">Email RareScore <span>→</span></a>
      </section>
      <Footer />
    </main>
  );
}
