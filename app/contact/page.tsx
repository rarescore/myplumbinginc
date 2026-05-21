import { Header, Footer } from "../components/Site";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact RareScore Support", description: "Contact RareScore for certificate support, quiz issues, delivery questions, press, or partnerships.", alternates: { canonical: "/contact" } };
export default function ContactPage(){return <main><Header/><section className="pageHero compactHero"><div className="sectionKicker">Contact RareScore</div><h1>Tell us what happened. We’ll route it from here.</h1><p>Use the form for certificate delivery, payment questions, quiz bugs, press, partnerships, or general support.</p></section><ContactForm/><Footer/></main>}
