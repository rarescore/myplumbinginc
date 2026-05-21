"use client";

import { useEffect, useMemo, useState } from "react";
import { getMeta, RouteQuizId, scoreLabelForRoute } from "../lib/quizMeta";
import { buildAnalysis } from "../lib/analysisReport";

export default function ResultClient() {
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showCertPopup, setShowCertPopup] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string>("");

  useEffect(() => {
    const raw = localStorage.getItem("rarescore:lastResult");
    if (raw) {
      setData(JSON.parse(raw));
      const seenKey = "rarescore:certificatePopupSeen";
      if (!sessionStorage.getItem(seenKey)) {
        window.setTimeout(() => setShowCertPopup(true), 650);
        sessionStorage.setItem(seenKey, "1");
      }
    }
  }, []);

  const meta = useMemo(() => {
    if (!data) return null;
    return getMeta(data.testRoute as RouteQuizId);
  }, [data]);

  if (!data || !meta) {
    return (
      <main className="resultPage">
        <section className="resultCard">
          <div className="sectionKicker">No result found</div>
          <h2>Take a test first.</h2>
          <p>Your result will appear here after you complete a quiz.</p>
          <a className="goldButton" href="/tests">Start Free Test <span>→</span></a>
        </section>
      </main>
    );
  }

  const result = data.result;
  const label = scoreLabelForRoute(data.testRoute as RouteQuizId);
  const analysis = buildAnalysis({ name: data.participant?.name, birthDate: data.participant?.birthDate, testRoute: data.testRoute, testTitle: data.testTitle, score: result.score, resultTitle: result.title, answers: data.answers });
  const headline =
    data.testRoute === "logic"
      ? `Your IQ is ${result.score}`
      : data.testRoute === "morality"
      ? `Your morality profile is ${result.title}`
      : `Your RareScore is ${result.score}`;

  const shareText = meta.shareMessage(result.score, result.title);
  const shareUrl = `${window.location.origin}${meta.url}`;
  const encoded = encodeURIComponent(`${shareText} ${shareUrl}`);

  localStorage.setItem("rarescore:analysisInfo", JSON.stringify({ name: data.participant?.name, birthDate: data.participant?.birthDate, testRoute: data.testRoute, testTitle: data.testTitle, score: result.score, resultTitle: result.title, answers: data.answers }));

  async function copyShare() {
    await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }


  async function startCheckout(purchaseType: "freshRetake" | "bundle") {
    if (!data || !meta) return;
    setCheckoutLoading(purchaseType);

    const email = localStorage.getItem("rarescore:lastEmail") || "";
    const body = {
      purchaseType,
      name: "RareScore User",
      email: email || "customer@example.com",
      certificateId: `RS-${Date.now()}`,
      testTitle: meta.title,
      score: result.score,
      resultTitle: result.title,
      testRoute: data.testRoute,
      scoreLabel: label,
    };

    if (!email) {
      localStorage.setItem("rarescore:pendingPurchaseType", purchaseType);
      window.location.href = purchaseType === "bundle" ? "/certificate?bundle=1" : `/fresh-set?test=${data.testRoute}`;
      return;
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else setCheckoutLoading("");
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({ title: "My RareScore", text: shareText, url: shareUrl });
    } else {
      await copyShare();
    }
  }

  return (
    <main className="resultPage">
      <section className="resultCard wide">
        <div className="sectionKicker">Your result is ready</div>
        <div className="scoreHero">
          <h1>{result.score}</h1>
          <div>
            <h2>{headline}</h2>
            <p>Result type: {result.title}</p>{data.testRoute === "rare" && analysis.lifePath && <p className="muted">Life path number: {analysis.lifePath}</p>}
            {result.percentile && <p className="muted">Estimated percentile: {result.percentile}th</p>}
          </div>
        </div>

        <div className="certificateTeaser priorityOffer">
          <div>
            <div className="miniBadge inlineBadge">Official PDF + PNG</div>
            <h3>Make your result official.</h3>
            <p>Turn your {label} into an Official RareScore Certificate. Choose digital PDF + PNG, printed, or framed.</p>
            <div className="priceLine"><s>$19.99</s><strong>$9.99 today</strong></div>
          </div>
          <a className="goldButton" href="/certificate">Make My Result Official <span>→</span></a>
        </div>

        <p className="resultParagraph">{result.paragraph}</p>

        <div className="analysisPreviewCard">
          <div>
            <div className="miniBadge inlineBadge">Personal analysis preview</div>
            <h3>{data.testRoute === "rare" ? "Your rarity report is ready." : "Your deeper profile is ready."}</h3>
            <p>{analysis.preview}</p>
            <div className="lockedReportLines"><span></span><span></span><span></span></div>
          </div>
          <a className="goldButton" href="/certificate">Unlock Full Analysis + Certificate <span>→</span></a>
        </div>

        <div className="insightGrid">
          {result.insightCards.map((card: any) => (
            <div key={card.title} className="insightCard">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="sharePanel">
          <h3>Challenge a friend</h3>
          <p>Think they’ll score higher? Send them the same test.</p>
          <div className="resultButtons">
            <button className="ghostButton" onClick={nativeShare}>Share My Score</button>
            <a className="ghostButton" href={`sms:?&body=${encoded}`}>Text a Friend</a>
            <button className="ghostButton" onClick={copyShare}>{copied ? "Copied" : "Copy Result Link"}</button>
            <a className="ghostButton" href={meta.url}>Challenge a Friend</a>
          </div>
        </div>


        <div className="freshSetOffer">
          <div>
            <div className="miniBadge inlineBadge">Fresh 30 Question Set</div>
            <h3>Want to test your score again?</h3>
            <p>Unlock a fresh, slightly more advanced 30-question version of this test. New questions, new patterns, and a second score to compare.</p>
            <div className="offerGrid">
              <button className="ghostButton" onClick={() => startCheckout("freshRetake")} disabled={checkoutLoading === "freshRetake"}>
                {checkoutLoading === "freshRetake" ? "Opening..." : "Try Fresh Set"}
                <span>$5.99</span>
              </button>
              <button className="goldButton" onClick={() => startCheckout("bundle")} disabled={checkoutLoading === "bundle"}>
                {checkoutLoading === "bundle" ? "Opening..." : "Get Certificate + Fresh Set"}
                <span>$12.99</span>
              </button>
            </div>
          </div>
        </div>

        <div className="certificateTeaser finalOffer">
          <div>
            <h3>Save your result before you leave.</h3>
            <p>The certificate is optional, but it is the best version to download, print, save, or share.</p>
          </div>
          <a className="goldButton" href="/certificate">Unlock Certificate <span>→</span></a>
        </div>

        <div className="resultButtons">
          <a className="ghostButton" href="/tests">Try Another Test</a>
        </div>

        {showCertPopup && (
          <div className="certPopupOverlay" role="dialog" aria-modal="true" aria-label="Official RareScore Certificate offer">
            <div className="certPopup">
              <button className="popupClose" onClick={() => setShowCertPopup(false)} aria-label="Close certificate offer">×</button>
              <div className="crestMini popupLogo" aria-hidden="true"><span>R</span><i>✓</i></div>
              <div className="sectionKicker">Optional certificate</div>
              <h3>Make your result official.</h3>
              <p>Your score is free. Unlock the full analysis report plus your official PDF + PNG certificate with your name, result type, certificate ID, and issue date.</p>
              <div className="priceLine centeredPrice"><s>$19.99</s><strong>$9.99 today</strong></div>
              <a className="goldButton" href="/certificate">Purchase PDF Certificate <span>→</span></a>
              <div className="popupUpsellButtons">
                <button className="ghostButton" onClick={() => startCheckout("freshRetake")}>Fresh Set $5.99</button>
                <button className="ghostButton" onClick={() => startCheckout("bundle")}>Bundle $12.99</button>
              </div>
              <button className="ghostButton" onClick={() => setShowCertPopup(false)}>Keep Viewing My Score</button>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
