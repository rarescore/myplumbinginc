import { jsPDF } from "jspdf";

export type CertificatePayload = {
  name: string;
  email: string;
  testTitle: string;
  score: number | string;
  resultTitle: string;
  certificateId: string;
  dateIssued: string;
  siteUrl: string;
  scoreLabel?: string;
};

function escapeXml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function certificateSvg(data: CertificatePayload) {
  const name = escapeXml(data.name || "Your Name");
  const testTitle = escapeXml(data.testTitle);
  const resultTitle = escapeXml(data.resultTitle);
  const certId = escapeXml(data.certificateId);
  const date = escapeXml(data.dateIssued);
  const site = escapeXml(data.siteUrl.replace("https://", ""));
  const scoreLabel = escapeXml(data.scoreLabel || "Score");

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-label="Official RareScore Certificate">
    <defs>
      <radialGradient id="bg" cx="52%" cy="45%" r="70%">
        <stop offset="0%" stop-color="#24123f"/>
        <stop offset="55%" stop-color="#090812"/>
        <stop offset="100%" stop-color="#03040a"/>
      </radialGradient>
      <linearGradient id="gold" x1="0%" x2="100%">
        <stop offset="0%" stop-color="#fff2ad"/>
        <stop offset="45%" stop-color="#d8b04b"/>
        <stop offset="100%" stop-color="#a87419"/>
      </linearGradient>
      <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff0a3"/>
        <stop offset="35%" stop-color="#d8b04b"/>
        <stop offset="75%" stop-color="#8f6516"/>
        <stop offset="100%" stop-color="#ffe48a"/>
      </linearGradient>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000000" flood-opacity="0.45"/>
      </filter>
      <pattern id="microLines" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M0 40 C20 10, 60 70, 80 40" fill="none" stroke="#7b5ac8" stroke-opacity="0.08" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1600" height="1000" fill="url(#bg)"/>
    <rect width="1600" height="1000" fill="url(#microLines)" opacity="0.9"/>

    <rect x="34" y="28" width="1532" height="944" rx="18" fill="none" stroke="url(#gold)" stroke-width="7"/>
    <rect x="58" y="54" width="1484" height="892" rx="10" fill="none" stroke="#d8b04b" stroke-width="2" opacity="0.82"/>
    <rect x="85" y="82" width="1430" height="836" rx="8" fill="none" stroke="#d8b04b" stroke-width="1.4" opacity="0.42"/>

    <path d="M82 82 H250 C210 112 170 132 82 130 Z" fill="none" stroke="#d8b04b" stroke-width="3" opacity="0.75"/>
    <path d="M1518 82 H1350 C1390 112 1430 132 1518 130 Z" fill="none" stroke="#d8b04b" stroke-width="3" opacity="0.75"/>
    <path d="M82 918 H250 C210 888 170 868 82 870 Z" fill="none" stroke="#d8b04b" stroke-width="3" opacity="0.75"/>
    <path d="M1518 918 H1350 C1390 888 1430 868 1518 870 Z" fill="none" stroke="#d8b04b" stroke-width="3" opacity="0.75"/>

    <g transform="translate(704,78)" filter="url(#softShadow)">
      <path d="M96 0 C116 14 150 20 185 24 L185 126 C185 170 153 199 96 226 C39 199 7 170 7 126 L7 24 C42 20 76 14 96 0 Z" fill="#2b1456" stroke="url(#gold)" stroke-width="5"/>
      <path d="M96 25 C112 35 139 40 160 42 L160 120 C160 148 138 171 96 193 C54 171 32 148 32 120 L32 42 C53 40 80 35 96 25 Z" fill="none" stroke="#d8b04b" stroke-width="2.5" opacity="0.85"/>
      <text x="93" y="124" text-anchor="middle" font-family="Georgia" font-size="92" fill="url(#gold)">R</text>
      <path d="M108 154 L84 134 L74 146 L110 181 L153 107 L140 98 Z" fill="url(#gold)"/>
      <path d="M26 168 C55 158 137 158 166 168 L158 191 C125 181 67 181 34 191 Z" fill="url(#gold)" stroke="#7b5311" stroke-width="1"/>
      <text x="96" y="181" text-anchor="middle" font-family="Arial" font-size="16" font-weight="700" letter-spacing="5" fill="#24120b">RARESCORE</text>
    </g>

    <text x="800" y="318" text-anchor="middle" font-family="Arial" font-size="19" letter-spacing="11" fill="#d8b04b">OFFICIAL RARESCORE CERTIFICATE</text>
    <line x1="420" y1="333" x2="680" y2="333" stroke="#d8b04b" stroke-width="2" opacity="0.55"/>
    <line x1="920" y1="333" x2="1180" y2="333" stroke="#d8b04b" stroke-width="2" opacity="0.55"/>

    <text x="800" y="410" text-anchor="middle" font-family="Georgia" font-size="76" fill="#f7f3ea">Official RareScore Certificate</text>
    <text x="800" y="465" text-anchor="middle" font-family="Georgia" font-size="30" fill="#d8d2c7">This certifies that the person named below completed the RareScore assessment.</text>

    <path d="M520 500 H1080" stroke="#d8b04b" stroke-width="1.5" opacity="0.5"/>
    <text x="800" y="592" text-anchor="middle" font-family="Georgia" font-size="72" fill="url(#gold)">${name}</text>
    <path d="M455 625 H1145" stroke="#d8b04b" stroke-width="2" opacity="0.72"/>
    <path d="M770 625 C785 608, 815 608, 830 625 C815 642, 785 642, 770 625 Z" fill="none" stroke="#d8b04b" stroke-width="2"/>

    <text x="800" y="685" text-anchor="middle" font-family="Arial" font-size="28" fill="#f2eef7">Test: ${testTitle}</text>
    <text x="800" y="748" text-anchor="middle" font-family="Georgia" font-size="52" fill="#ffffff">${scoreLabel}: ${data.score}</text>
    <text x="800" y="798" text-anchor="middle" font-family="Arial" font-size="30" fill="#d8b04b">Result Type: ${resultTitle}</text>

    <text x="245" y="762" text-anchor="middle" font-family="Georgia" font-size="25" fill="#f2eef7">Score Verification Department</text>
    <line x1="112" y1="725" x2="378" y2="725" stroke="#d8b04b" stroke-width="2" opacity="0.72"/>
    <text x="245" y="798" text-anchor="middle" font-family="Arial" font-size="18" fill="#cfc7da">Authorized Signature</text>
    <text x="245" y="852" text-anchor="middle" font-family="Brush Script MT, Georgia" font-size="46" fill="#d8b04b">RareScore</text>

    <text x="800" y="862" text-anchor="middle" font-family="Arial" font-size="22" fill="#f2eef7">Certificate ID: ${certId}</text>
    <text x="800" y="898" text-anchor="middle" font-family="Arial" font-size="22" fill="#f2eef7">Date Issued: ${date}</text>
    <text x="800" y="940" text-anchor="middle" font-family="Arial" font-size="24" fill="#d8b04b">${site}</text>

    <g transform="translate(1190,665)" filter="url(#softShadow)">
      <circle cx="0" cy="0" r="126" fill="url(#sealGold)"/>
      <circle cx="0" cy="0" r="109" fill="none" stroke="#5e3b08" stroke-width="4"/>
      <circle cx="0" cy="0" r="72" fill="none" stroke="#5e3b08" stroke-width="3"/>
      <text x="0" y="-70" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" letter-spacing="5" fill="#3b2505">RARESCORE</text>
      <text x="0" y="91" text-anchor="middle" font-family="Arial" font-size="17" font-weight="700" letter-spacing="3" fill="#3b2505">OFFICIAL CERTIFICATE</text>
      <text x="0" y="-18" text-anchor="middle" font-family="Georgia" font-size="54" fill="#3b2505">R</text>
      <path d="M10 22 L-12 2 L-22 13 L10 45 L45 -18 L34 -27 Z" fill="#3b2505"/>
      <path d="M-55 28 C-28 50 28 50 55 28" fill="none" stroke="#3b2505" stroke-width="7"/>
      <path d="M-50 20 C-24 38 24 38 50 20" fill="none" stroke="#3b2505" stroke-width="4" opacity="0.7"/>
      <text x="-92" y="10" text-anchor="middle" font-family="Arial" font-size="24" fill="#3b2505">★</text>
      <text x="92" y="10" text-anchor="middle" font-family="Arial" font-size="24" fill="#3b2505">★</text>
    </g>
  </svg>`;
}

export async function svgToPngDataUrl(svg: string) {
  const img = new Image();
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Certificate image failed to load."));
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available.");
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  return canvas.toDataURL("image/png");
}

export async function generateCertificateFiles(data: CertificatePayload) {
  const svg = certificateSvg(data);
  const pngDataUrl = await svgToPngDataUrl(svg);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "letter",
  });

  pdf.addImage(pngDataUrl, "PNG", 0, 0, 792, 612);
  const pdfDataUrl = pdf.output("datauristring");

  return {
    svg,
    pngDataUrl,
    pdfDataUrl,
    pngBase64: pngDataUrl.split(",")[1],
    pdfBase64: pdfDataUrl.split(",")[1],
  };
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
