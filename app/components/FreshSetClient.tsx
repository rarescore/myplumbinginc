"use client";

import { useEffect, useMemo, useState } from "react";
import { getMeta, RouteQuizId, scoreLabelForRoute } from "../lib/quizMeta";

export default function FreshSetClient() {
  const [testRoute, setTestRoute] = useState<RouteQuizId>("rare");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [bundleMode, setBundleMode] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const test = params.get("test") as RouteQuizId | null;
    const mode = params.get("bundle") === "1";
    if (test && ["rare", "logic", "morality"].includes(test)) setTestRoute(test);
    setBundleMode(mode);

    const raw = localStorage.getItem("rarescore:lastResult");
    if (raw) setLastResult(JSON.parse(raw));
  }, []);

  const meta = useMemo(() => getMeta(testRoute), [testRoute]);
  const scoreLabel = scoreLabelForRoute(testRoute);

  async function checkout() {
    if (!email.includes("@")) return;
    setLoading(true);
    localStorage.setItem("rarescore:lastEmail", email);
    localStorage.setItem("rarescore:freshSetTest", testRoute);

    const result = lastResult?.result || {};
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purchaseType: bundleMode ? "bundle" : "freshRetake",
        name: "RareScore User",
        email,
        certificateId: `RS-${Date.now()}`,
        testTitle: meta.title,
        score: result.score || "Fresh Set",
        resultTitle: result.title || "Fresh Question Set",
        testRoute,
        scoreLabel,
      }),
    });

    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else setLoading(false);
  }

  return (
    <main className="certificatePage">
      <section className="freshSetPage">
        <div className="sectionKicker">Fresh 30 Question Set</div>
        <h1>{bundleMode ? "Get the bundle." : "Try a fresh version."}</h1>
        <p>
          Unlock a new 30-question version of the {meta.title}. The second set is slightly more advanced, more visual, and built to help you compare whether your score stays consistent.
        </p>

        <div className="freshValueGrid">
          <div><strong>New questions</strong><span>Not an instant reset of the same quiz.</span></div>
          <div><strong>Advanced feel</strong><span>Slightly harder without feeling impossible.</span></div>
          <div><strong>Compare results</strong><span>See how your second score lines up with the first.</span></div>
        </div>

        <label>Email for checkout</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="textAnswer" />

        <button className="goldButton" onClick={checkout} disabled={loading || !email.includes("@")}>
          {loading ? "Opening Checkout..." : bundleMode ? "Get Bundle for $12.99" : "Unlock Fresh Set for $5.99"}
          <span>→</span>
        </button>

        <a className="ghostButton" href="/results">Back to result</a>
      </section>
    </main>
  );
}
