"use client";

import { useEffect, useMemo, useState } from "react";
import { certificateSvg, downloadDataUrl, generateCertificateFiles } from "../lib/certificateClient";
import { generateAnalysisPdf } from "../lib/analysisReport";

export default function SuccessClient() {
  const [status, setStatus] = useState("Verifying payment...");
  const [paid, setPaid] = useState(false);
  const [certInfo, setCertInfo] = useState<any>(null);
  const [files, setFiles] = useState<any>(null);
  const [emailStatus, setEmailStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function run() {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");
        if (!sessionId) throw new Error("Missing Stripe session ID.");

        const verify = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        const verifyJson = await verify.json();
        if (!verify.ok || !verifyJson.paid) throw new Error(verifyJson.error || "Payment not confirmed.");

        const local = localStorage.getItem("rarescore:certificateInfo");
        const localInfo = local ? JSON.parse(local) : {};
        const metadata = verifyJson.metadata || {};
        const info = {
          name: localInfo.name || metadata.name,
          email: localInfo.email || metadata.email || verifyJson.customerEmail,
          certificateId: localInfo.certificateId || metadata.certificateId,
          testTitle: localInfo.testTitle || metadata.testTitle,
          score: localInfo.score || metadata.score,
          resultTitle: localInfo.resultTitle || metadata.resultTitle,
          dateIssued: new Date().toLocaleDateString(),
          siteUrl: window.location.origin,
          scoreLabel: localInfo.scoreLabel || metadata.scoreLabel || "Score",
          purchaseType: metadata.purchaseType || localInfo.purchaseType || "certificate",
          testRoute: metadata.testRoute || localInfo.testRoute || "rare",
        };

        setCertInfo(info);
        setPaid(true);
        setStatus("Payment confirmed. Building your certificate...");

        const analysisInput = localInfo.analysisInfo || { name: info.name, testRoute: info.testRoute, testTitle: info.testTitle, score: info.score, resultTitle: info.resultTitle };
        const analysisGenerated = generateAnalysisPdf({ ...analysisInput, name: info.name });
        const generated = await generateCertificateFiles(info);
        setFiles({ ...generated, analysisPdfDataUrl: analysisGenerated.pdfDataUrl, analysisPdfBase64: analysisGenerated.pdfBase64 });
        setStatus("Your certificate is ready.");

        const sentKey = `rarescore:emailSent:${sessionId}`;
        if (!localStorage.getItem(sentKey)) {
          setEmailStatus("Sending email copy...");
          const emailRes = await fetch("/api/email-certificate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...info,
              sessionId,
              pdfBase64: generated.pdfBase64,
              pngBase64: generated.pngBase64,
              analysisPdfBase64: analysisGenerated.pdfBase64,
            }),
          });
          if (emailRes.ok) {
            localStorage.setItem(sentKey, "1");
            setEmailStatus("Email copy sent.");
          } else {
            const err = await emailRes.json().catch(() => ({}));
            setEmailStatus(err.error || "Email could not be sent. You can still download your files here.");
          }
        } else {
          setEmailStatus("Email copy already sent.");
        }
      } catch (e: any) {
        setError(e.message || "Something went wrong.");
        setStatus("Payment verification failed.");
      }
    }

    run();
  }, []);

  const svgPreview = useMemo(() => {
    if (!certInfo) return "";
    return certificateSvg(certInfo);
  }, [certInfo]);

  if (error) {
    return (
      <main className="resultPage">
        <section className="resultCard">
          <div className="sectionKicker">Checkout issue</div>
          <h2>{status}</h2>
          <p>{error}</p>
          <a href="/certificate" className="goldButton">Return to Certificate Page</a>
        </section>
      </main>
    );
  }

  return (
    <main className="successPage">
      <section className="successGrid">
        <div className="successActions">
          <div className="sectionKicker">Thank you</div>
          <h1>Your Official RareScore Certificate is ready.</h1>
          <p>{status}</p>
          {certInfo?.purchaseType === "printedCertificate" && <p className="shippingNote">Your printed certificate order was received. Free shipping: 3–5 business days.</p>}
          {certInfo?.purchaseType === "framedCertificate" && <p className="shippingNote">Your framed certificate order was received. Free shipping: 3–5 business days.</p>}
          <p className="muted">{emailStatus}</p>

          <div className="downloadButtons">
            <button
              className="goldButton"
              disabled={!files}
              onClick={() => downloadDataUrl(files.pdfDataUrl, "Official-RareScore-Certificate.pdf")}
            >
              Download Certificate PDF
            </button>
            <button
              className="ghostButton"
              disabled={!files}
              onClick={() => downloadDataUrl(files.pngDataUrl, "Official-RareScore-Certificate.png")}
            >
              Download PNG
            </button>
            <button
              className="ghostButton"
              disabled={!files?.analysisPdfDataUrl}
              onClick={() => downloadDataUrl(files.analysisPdfDataUrl, "RareScore-Full-Analysis.pdf")}
            >
              Download Analysis PDF
            </button>
            <button
              className="ghostButton"
              disabled={!files}
              onClick={() => navigator.share ? navigator.share({ title: "My RareScore Certificate", text: "I unlocked my Official RareScore Certificate.", url: window.location.origin }) : navigator.clipboard.writeText(window.location.origin)}
            >
              Share Certificate
            </button>
            {(certInfo?.purchaseType === "freshRetake" || certInfo?.purchaseType === "bundle") && (
              <a href={`/quiz/${certInfo.testRoute === "logic" ? "logic" : certInfo.testRoute === "morality" ? "morality" : "rare"}?fresh=1`} className="goldButton">
                Start Fresh Question Set
              </a>
            )}
            <a href="/" className="ghostButton">Return Home</a>
          </div>
        </div>

        <div className="successPreview">
          {svgPreview ? (
            <div dangerouslySetInnerHTML={{ __html: svgPreview }} />
          ) : (
            <div className="loadingCert">Building certificate...</div>
          )}
        </div>
      </section>
    </main>
  );
}
