import jsPDF from "jspdf";

export type AnalysisInput = {
  name?: string;
  birthDate?: string;
  testRoute: "rare" | "logic" | "morality";
  testTitle: string;
  score: number | string;
  resultTitle: string;
  answers?: Record<string, any>;
};

export function lifePathNumber(date?: string) {
  if (!date) return null;
  const digits = date.replace(/\D/g, "").split("").map(Number);
  if (!digits.length) return null;
  let n = digits.reduce((a, b) => a + b, 0);
  while (n > 9 && ![11, 22, 33].includes(n)) n = String(n).split("").map(Number).reduce((a, b) => a + b, 0);
  return n;
}

const numberMeanings: Record<string, string> = {
  "1": "the Initiator: independent, direct, and uncomfortable waiting for permission",
  "2": "the Interpreter: sensitive to tone, timing, and the hidden emotional temperature of a room",
  "3": "the Signal Maker: expressive, associative, and drawn toward ideas that can be shared",
  "4": "the Builder: structured, practical, and more serious about proof than empty praise",
  "5": "the Pattern Breaker: restless, adaptive, and allergic to predictable routines",
  "6": "the Protector: responsible, loyal, and unusually affected by what feels unfair",
  "7": "the Analyst: private, observant, and drawn toward the rule behind the rule",
  "8": "the Strategist: ambitious, outcome-aware, and tuned to leverage, status, and control",
  "9": "the Synthesizer: intense, broad-minded, and pulled toward meaning more than simple wins",
  "11": "the Signal Reader: intuitive, high-sensitivity, and unusually responsive to subtle patterns",
  "22": "the Architect: visionary but practical, best when a big idea becomes a system",
  "33": "the Guide: expressive, protective, and motivated by impact on other people"
};

export function buildAnalysis(input: AnalysisInput) {
  const name = input.name?.trim() || "you";
  const life = lifePathNumber(input.birthDate);
  const lifeText = life ? numberMeanings[String(life)] : "a pattern that becomes clearer when your birth date is added";
  const base = input.testRoute === "logic"
    ? `Your result points toward a mind that wants structure before it accepts a conclusion. A score of ${input.score} with the ${input.resultTitle} profile may suggest fast rule-finding, pattern pressure, and a preference for problems that have a clean hidden mechanism.`
    : input.testRoute === "morality"
    ? `Your morality profile is not just a number. The ${input.resultTitle} pattern suggests that your choices are shaped by the values you protect first when fairness, loyalty, honesty, and care compete.`
    : `${name}, your RareScore result suggests an uncommon blend of instinct, independence, and self-definition. Your life path number is ${life || "still hidden"}, often described as ${lifeText}.`;
  const preview = input.testRoute === "rare"
    ? `${base} The first signal is that your result does not read as random. It points toward a personality that may notice patterns in people, timing, and opportunity before those patterns are easy to explain.`
    : `${base} The first signal is not the score alone. It is the pattern behind the answer choices: what you notice first, what you protect, and what you treat as proof.`;
  const locked = input.testRoute === "rare"
    ? [`Life path ${life || "number"} often reflects the way a person turns pressure into identity. In your case, the result leans toward a person who wants the freedom to define themselves without being flattened into a generic type.`, "Your strengths may show up as originality, fast association, and unusual self-awareness. Your shadow pattern may show up as impatience with normal explanations or frustration when other people do not catch the same signal.", "The future-facing interpretation is simple: the more you build systems around your instincts, the more your rarity becomes useful instead of merely interesting."]
    : input.testRoute === "morality"
    ? ["Your full morality analysis maps your strongest values, the value you may overuse under pressure, and the situation most likely to make you feel misunderstood.", "This profile is designed to feel like a mirror, not a verdict. It gives you language for why certain choices feel obvious to you and unreasonable to someone else.", "The certificate makes the result easier to save, print, or share without reducing it to a single score."]
    : ["Your full IQ-style analysis expands beyond the number into pattern speed, reflective control, visual reasoning, and how you appear to handle uncertainty.", "The strongest signal is the relationship between speed and caution: whether you jump to the rule quickly or wait until the pattern feels proven.", "The certificate and report turn the result into a polished record of the way you performed on this test style."];
  return { lifePath: life, lifeText, preview, locked };
}

export function generateAnalysisPdf(input: AnalysisInput) {
  const analysis = buildAnalysis(input);
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  const addPageBg = () => {
    pdf.setFillColor(11, 8, 22); pdf.rect(0,0,w,h,"F");
    pdf.setDrawColor(216,176,75); pdf.setLineWidth(2); pdf.rect(28,28,w-56,h-56);
    pdf.setDrawColor(90,60,140); pdf.setLineWidth(.6); pdf.rect(44,44,w-88,h-88);
  };
  const writeWrap = (text: string, x: number, y: number, size=12, color: [number,number,number]=[235,232,245]) => {
    pdf.setFont("times", "normal"); pdf.setFontSize(size); pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(text, w - x*2);
    pdf.text(lines, x, y);
    return y + lines.length * (size + 6);
  };
  addPageBg();
  pdf.setTextColor(216,176,75); pdf.setFont("times","bold"); pdf.setFontSize(14); pdf.text("OFFICIAL RARESCORE ANALYSIS", w/2, 82, {align:"center"});
  pdf.setTextColor(255,255,255); pdf.setFontSize(34); pdf.text("Personal Result Report", w/2, 138, {align:"center"});
  pdf.setFontSize(18); pdf.setTextColor(216,176,75); pdf.text(String(input.name || "RareScore User"), w/2, 178, {align:"center"});
  let y=230;
  y=writeWrap(analysis.preview, 70, y, 13);
  if (input.testRoute === "rare") {
    y+=18; pdf.setTextColor(216,176,75); pdf.setFont("times","bold"); pdf.setFontSize(18); pdf.text(`Life Path Number: ${analysis.lifePath || "Not provided"}`, 70, y); y+=34;
    y=writeWrap(`Numerology interpretation: ${analysis.lifeText}. This is an entertainment-style lens used to make the report feel more personal, not a factual prediction.`, 70, y, 13);
  }
  y+=16; pdf.setTextColor(216,176,75); pdf.setFont("times","bold"); pdf.setFontSize(18); pdf.text("Result Snapshot", 70, y); y+=28;
  y=writeWrap(`Test: ${input.testTitle}. Result: ${input.resultTitle}. Score/Profile: ${input.score}.`,70,y,13);
  pdf.addPage(); addPageBg(); y=88; pdf.setTextColor(255,255,255); pdf.setFont("times","bold"); pdf.setFontSize(28); pdf.text("Deeper Interpretation",70,y); y+=45;
  analysis.locked.forEach((p, idx)=>{ pdf.setTextColor(216,176,75); pdf.setFont("times","bold"); pdf.setFontSize(16); pdf.text(["Strength pattern","Shadow pattern","Future signal"][idx] || "Insight",70,y); y+=24; y=writeWrap(p,70,y,13); y+=20; });
  y+=10; pdf.setTextColor(216,176,75); pdf.setFontSize(14); pdf.text("RareScore • myrarescore.com", w/2, h-62, {align:"center"});
  const dataUrl = pdf.output("datauristring");
  return { pdfDataUrl: dataUrl, pdfBase64: dataUrl.split(",")[1] };
}
