# RareScore Launch Build

Launch-ready RareScore site with Stripe checkout, Resend email delivery, PDF/PNG certificate generation, quiz engine, share flow, FAQ, contact, privacy, terms, SEO foundations, conversion popup, and paid Fresh Question Set upsells.

Required Vercel environment variables:
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_PRICE_ID
- RESEND_API_KEY
- CERTIFICATE_FROM_EMAIL
- CERTIFICATE_REPLY_TO_EMAIL
- NEXT_PUBLIC_SITE_URL

Optional Vercel environment variables:
- STRIPE_RETAKE_PRICE_ID
- STRIPE_BUNDLE_PRICE_ID

The retake and bundle price IDs are already included in code as fallbacks.


Physical certificate price IDs:
- STRIPE_PRINTED_CERTIFICATE_PRICE_ID = price_1TWa08CKNlbY3tg4oCEnrb4q
- STRIPE_FRAMED_CERTIFICATE_PRICE_ID = price_1TWa1BCKNlbY3tg4PRT71Lqe

Printed and framed certificate checkout collects shipping address and uses free 3–5 business day shipping.


Locked certificate preview images:
- /public/rarescore-certificate-preview.png
- /public/rarescore-framed-certificate-preview.png

The pre-purchase preview is intentionally blurred and watermarked. Browsers cannot reliably block screenshots, so the best protection is blur + watermark + full-resolution unlock after payment.
