"use client";

import { useEffect, useMemo, useState } from "react";
import { certificateSvg } from "../lib/certificateClient";
import { scoreLabelForRoute, RouteQuizId } from "../lib/quizMeta";

export default function CertificateClient() {
  const [data, setData] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCertificateType, setSelectedCertificateType] = useState<"certificate" | "printedCertificate" | "framedCertificate">("certificate");
  const [error, setError] = useState("");
  const [showScreenshotNotice, setShowScreenshotNotice] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("rarescore:lastResult");
    if (raw) setData(JSON.parse(raw));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "PrintScreen" || ((e.metaKey || e.ctrlKey) && e.shiftKey && ["3", "4", "5", "s", "S"].includes(e.key))) {
        setShowScreenshotNotice(true);
        window.setTimeout(() => setShowScreenshotNotice(false), 2600);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const certId = useMemo(() => {
    if (!data) return "RS-PREVIEW";
    const num = Math.abs((data.completedAt || "").split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0));
    return `RS-${new Date(data.completedAt).getFullYear()}-${String(num).padStart(6, "0")}`;
  }, [data]);

  async function checkout(purchaseType: "certificate" | "printedCertificate" | "framedCertificate" = selectedCertificateType) {
    const params = new URLSearchParams(window.location.search);
    const isBundle = params.get("bundle") === "1";
    const finalPurchaseType = isBundle ? "bundle" : purchaseType;
    setError("");
    if (!name.trim()) return setError("Enter the name for the certificate.");
    if (!email.includes("@")) return setError("Enter a valid email for certificate delivery.");
    if (!data) return;

    setLoading(true);

    localStorage.setItem("rarescore:certificateInfo", JSON.stringify({
      name,
      email,
      certificateId: certId,
      testTitle: data.testTitle,
      score: data.result.score,
      resultTitle: data.result.title,
      testRoute: data.testRoute,
      completedAt: data.completedAt,
      scoreLabel,
      purchaseType: finalPurchaseType,
    }));

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        certificateId: certId,
        testTitle: data.testTitle,
        score: data.result.score,
        resultTitle: data.result.title,
        testRoute: data.testRoute,
        scoreLabel,
        purchaseType: finalPurchaseType,
      }),
    });

    const json = await res.json();
    if (!res.ok || !json.url) {
      setLoading(false);
      setError(json.error || "Checkout could not start.");
      return;
    }

    window.location.href = json.url;
  }

  if (!data) {
    return (
      <main className="resultPage">
        <section className="resultCard">
          <div className="sectionKicker">Certificate preview</div>
          <h2>Complete a test first.</h2>
          <p>Your certificate preview appears after your result.</p>
          <a className="goldButton" href="/tests">Start Free Test <span>→</span></a>
        </section>
      </main>
    );
  }

  const result = data.result;
  const scoreLabel = scoreLabelForRoute(data.testRoute as RouteQuizId);

  return (
    <main className="certificatePage">
      <section className="certificateLayout">
        <div className="certificateForm">
          <div className="sectionKicker">Official RareScore Certificate</div>
          <h1>Make your result official.</h1>
          <p>Your score is free. Choose a digital certificate, a high-quality printed certificate, or a framed certificate shipped to your address.</p>

          <div className="priceLine large"><s>$19.99</s><strong>Digital from $9.99</strong></div>

          <label>Name on certificate</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />

          <label>Email for delivery</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

          {error && <p className="formError">{error}</p>}

          <div className="certificateChoiceGrid">
            <button className="goldButton" onClick={() => checkout("certificate")} disabled={loading}>
              <span>Digital PDF + PNG</span>
              <strong>$9.99</strong>
            </button>
            <button className="ghostButton premiumChoice" onClick={() => checkout("printedCertificate")} disabled={loading}>
              <span>Printed Certificate</span>
              <strong>$29.99</strong>
              <small>Free shipping • 3–5 business days</small>
            </button>
            <button className="ghostButton premiumChoice" onClick={() => checkout("framedCertificate")} disabled={loading}>
              <span>Framed Certificate</span>
              <strong>$59.99</strong>
              <small>Free shipping • 3–5 business days</small>
            </button>
          </div>
          <a className="ghostButton" href="/results">Back to result</a>
        </div>

        <div className="certificatePreview livePreview">
          <div
            className={selectedCertificateType === "framedCertificate" ? "previewImageWrap framedPreview" : "previewImageWrap"}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={selectedCertificateType === "framedCertificate" ? "/rarescore-framed-certificate-preview.png" : "/rarescore-certificate-preview.png"}
              alt={selectedCertificateType === "framedCertificate" ? "Blurred framed RareScore certificate preview" : "Blurred RareScore certificate preview"}
              className="lockedCertificatePreview"
              draggable={false}
            />
            <div className="previewLockOverlay">
              <div className="miniBadge inlineBadge">Locked Preview</div>
              <strong>{selectedCertificateType === "framedCertificate" ? "Framed certificate preview" : "Official certificate preview"}</strong>
              <span>{selectedCertificateType === "framedCertificate" ? "Full framed certificate unlocks after checkout." : "Full-resolution PDF and PNG unlock after checkout."}</span>
            </div>
          </div>
          <p className="previewNote">
            {selectedCertificateType === "framedCertificate"
              ? "Framed certificate orders collect shipping details at checkout. Free shipping: 3–5 business days."
              : selectedCertificateType === "printedCertificate"
              ? "Printed certificate orders collect shipping details at checkout. Free shipping: 3–5 business days."
              : "Digital PDF and PNG unlock after checkout."}
          </p>
          {showScreenshotNotice && (
            <div className="screenshotNotice">Preview is locked. Purchase to access the full certificate file.</div>
          )}
        </div>
      </section>
    </main>
  );
}
