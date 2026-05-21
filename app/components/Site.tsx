import Link from "next/link";
import { quizMeta, RouteQuizId } from "../lib/quizMeta";

export function BrandShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="shieldFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a2290" />
          <stop offset="58%" stopColor="#24103c" />
          <stop offset="100%" stopColor="#0b0713" />
        </linearGradient>
        <linearGradient id="shieldGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff2ad" />
          <stop offset="45%" stopColor="#d8b04b" />
          <stop offset="100%" stopColor="#c89222" />
        </linearGradient>
      </defs>
      <path d="M110 8 C129 21, 163 27, 198 30 L198 142 C198 190, 164 222, 110 250 C56 222, 22 190, 22 142 L22 30 C57 27, 91 21, 110 8 Z" fill="url(#shieldFill)" stroke="url(#shieldGold)" strokeWidth="9" />
      <path d="M110 28 C126 38, 155 42, 181 45 L181 138 C181 176, 154 204, 110 228 C66 204, 39 176, 39 138 L39 45 C65 42, 94 38, 110 28 Z" fill="none" stroke="url(#shieldGold)" strokeWidth="3.5" opacity="0.92" />
      <text x="106" y="142" textAnchor="middle" fontFamily="Georgia, serif" fontSize="112" fill="url(#shieldGold)">R</text>
      <path d="M120 175 L95 152 L82 165 L120 205 L165 127 L152 117 Z" fill="url(#shieldGold)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logoLockup" aria-label="RareScore home">
<BrandShield className="shieldMark mini" />
      <div className="wordmark">
        <strong>Rare<span>Score</span></strong>
      </div>
    </Link>
  );
}

export function Header() {
  return (
    <header className="siteHeader">
      <Logo />
      <nav className="desktopNav" aria-label="Main navigation">
        <Link href="/tests">Tests</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#how">How It Works</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/press">Press</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link href="/tests" className="topCta">Start Free Test <span aria-hidden="true">→</span></Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Free scores. Optional certificates. No account required.</p><small className="footerEmail">hello.myrarescore@gmail.com</small>
      </div>
      <div className="footerLinks">
        <Link href="/tests">Tests</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">Support</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}


function TestVisualIcon({ id }: { id: RouteQuizId }) {
  if (id === "logic") {
    return (
      <svg viewBox="0 0 120 120" className="testSvgIcon brainIcon" aria-hidden="true">
        <path d="M46 22c-11 0-20 8-21 19-9 3-15 12-15 23 0 14 10 25 23 25h6v-15h-6c-5 0-9-4-9-9 0-4 3-8 7-9l8-2v-9c0-5 4-9 9-9 3 0 6 2 8 4l5 7 6-6c2-2 5-4 8-4 6 0 10 4 10 10v7l7 2c5 1 8 5 8 10 0 6-5 11-11 11h-7v14h7c14 0 25-11 25-25 0-11-7-21-17-24-2-12-12-21-24-21-6 0-11 2-16 5-5-4-12-6-20-6Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round"/>
        <path d="M45 42v48M62 36v58M79 45v44M35 58h54M40 73h42" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    );
  }

  if (id === "rare") {
    return (
      <svg viewBox="0 0 120 120" className="testSvgIcon fingerprintIcon" aria-hidden="true">
        <path d="M30 52c0-18 13-32 31-32s31 13 31 31" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M22 68c0-25 16-43 39-43s39 18 39 43" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".85"/>
        <path d="M35 73c0-19 9-33 26-33s26 14 26 33" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M48 90c-4-8-6-16-6-25 0-12 7-20 19-20s19 8 19 20c0 10 2 19 7 27" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M59 97c-5-11-8-22-8-34 0-6 4-10 10-10s10 4 10 10c0 14 3 25 9 35" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <path d="M68 102c-4-9-6-19-6-33" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="testSvgIcon scalesIcon" aria-hidden="true">
      <path d="M60 18v78M32 96h56M45 32h30M60 32l-28 14M60 32l28 14" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <path d="M20 48h28l-14 28-14-28ZM72 48h28L86 76 72 48Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M18 78h32M70 78h32" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
}

export function TestCard({ id, featured = false }: { id: RouteQuizId; featured?: boolean }) {
  const test = quizMeta[id];
  return (
    <Link href={test.url} className={`testCard ${id} ${featured ? "featuredCard" : ""}`}>
      {featured && <div className="miniBadge">Featured</div>}
      <div className="testIcon"><TestVisualIcon id={id} /></div>
      <div>
        <span className="cardEyebrow">{test.eyebrow}</span>
        <h3>{test.title}</h3>
        <p>{test.description}</p>
        <div className="metaRow">
          <span>⏱ {test.time}</span>
          <span>Quick test</span>
          <span>Instant score</span>
        </div>
      </div>
      <div className="cardAction">{test.cta} <span>→</span></div>
    </Link>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="howSection">
      <div className="sectionKicker">How it works</div>
      <h2 className="sectionTitle">Result first. Certificate second.</h2>
      <div className="howGrid">
        <div><b>1</b><strong>Choose a test</strong><p>Pick the test that interests you most.</p></div>
        <div><b>2</b><strong>Answer quick questions</strong><p>One focused question per screen.</p></div>
        <div><b>3</b><strong>Get your score instantly</strong><p>Your score is visible for free.</p></div>
        <div><b>4</b><strong>Unlock your certificate</strong><p>Only if you want to save or share it.</p></div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="trustStrip">
      <div><span>▣</span><strong>Private</strong><small>No sign up to start</small></div>
      <div><span>⚡</span><strong>Instant results</strong><small>Your score appears immediately</small></div>
      <div><span>◈</span><strong>Mobile first</strong><small>Built for fast quiz taking</small></div>
      <div><span>◎</span><strong>Optional certificate</strong><small>Available after your result</small></div>
    </section>
  );
}
