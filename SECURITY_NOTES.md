# RareScore Security Notes

Implemented:
- Stripe secret key is server-side only.
- Checkout uses server API route.
- Payment verification uses Stripe Checkout Session.
- Certificate email route now requires a paid Stripe session ID.
- Certificate email must match the paid Stripe customer email.
- API inputs are sanitized and length-limited.
- Base64 attachment size/type checks added.
- Generic API errors prevent leaking stack traces.
- Physical certificate products collect shipping through Stripe Checkout.
- Security headers added:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()
  - Cross-Origin-Opener-Policy: same-origin

Still recommended after launch:
- Enable Vercel/Cloudflare bot protection or WAF if traffic grows.
- Add Stripe webhooks for fulfillment records.
- Add order database if you need a permanent admin panel.
- Monitor Resend and Stripe dashboards for abuse.
- Rotate any secret keys that were ever pasted into chat or screenshots.
