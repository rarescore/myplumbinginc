export const STRIPE_PRICE_IDS = {
  certificate: process.env.STRIPE_PRICE_ID || "price_1TWS1GCKNlbY3tg4oJJ9eMo5",
  freshRetake: process.env.STRIPE_RETAKE_PRICE_ID || "price_1TWYzZCKNlbY3tg4J05908js",
  bundle: process.env.STRIPE_BUNDLE_PRICE_ID || "price_1TWZ06CKNlbY3tg4kEn4vnpJ",
  printedCertificate: process.env.STRIPE_PRINTED_CERTIFICATE_PRICE_ID || "price_1TWa08CKNlbY3tg4oCEnrb4q",
  framedCertificate: process.env.STRIPE_FRAMED_CERTIFICATE_PRICE_ID || "price_1TWa1BCKNlbY3tg4PRT71Lqe",
};

export type PurchaseType = keyof typeof STRIPE_PRICE_IDS;

export function isPhysicalPurchase(type: string) {
  return type === "printedCertificate" || type === "framedCertificate";
}
