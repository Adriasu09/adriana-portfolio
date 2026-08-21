---
name: api-security
description: Harden the contact API route and the Next.js security configuration. Use when touching src/app/api/, adding rate limiting, configuring security headers in next.config.ts, reviewing environment variables, handling errors on the server, or auditing what gets logged.
---

# API Security

Scope: this project has one API route (`src/app/api/contact/`) that receives a form and sends an email through Resend. The goal is a small, correct, defensible surface — not an enterprise security stack.

## Known problems to fix

1. Form data is written to the console. Remove it.
2. No rate limiting.
3. No origin validation.
4. No security headers in `next.config.ts`.
5. Internal error details may reach the client.

## Logging

**Never log personal data.** Not the email, not the name, not the message, not the whole request body — not even "temporarily for debugging". Logs on Vercel are readable, persist, and this is a public repo where anyone can see the `console.log` in the source.

What is fine to log: an event name, a status code, a duration, an error class. If a message is needed to debug, log an identifier, never content.

```ts
// no
console.log("Contact form submission:", body);

// yes
console.error("contact_email_failed", { code: error.name });
```

## Validation

Parse the body with the Zod schema from `src/lib/validations/` before anything else, and work from the parsed result — never from the raw body. Reject anything that fails with a 400 and a generic message. Enforce a maximum length on every string field so the message body cannot be used to send arbitrary payloads.

## Rate limiting

Limit by IP. Something in the order of 3-5 submissions per 10 minutes is plenty for a portfolio. Options, from simplest:

- In-memory `Map` with timestamps — trivial, no dependency, but resets on every cold start and does not work across serverless instances. Acceptable here if the trade-off is documented in a comment.
- Upstash Redis + `@upstash/ratelimit` — correct across instances, free tier, one dependency.

Return `429` with a generic message and a `Retry-After` header. Whichever option is chosen, write down in the PR why.

## Anti-spam

Use a **honeypot**: a hidden field that real users never fill and bots do. If it has a value, return a success response and silently drop the message. Zero bundle cost, zero privacy cost, zero impact on LCP.

Do not add a third-party CAPTCHA. It ships an external script, hurts the performance metrics that are this project's first priority, and is disproportionate for a contact form.

Optionally check the `Origin` header against the expected domain — cheap, though not a real defence on its own since it is client-controlled.

## Error handling

- Catch failures from Resend. Log server-side with no personal data, respond with a generic message.
- Never return a stack trace, a provider error message or an internal field name to the client.
- The client should be able to distinguish "your input was wrong" (400, show which field) from "something failed on our side" (500, show a retry message). The form must never end up in an ambiguous state.

## Security headers

Configure in `next.config.ts` via `headers()`:

- `Content-Security-Policy` — the hardest one to get right. Build it up incrementally, test in report-only mode first, and account for Next.js inline scripts and any embedded fonts or images.
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — deny camera, microphone, geolocation.
- `Strict-Transport-Security` — Vercel handles HTTPS, but set it explicitly.

**Verify the headers on the deployed site** with browser devtools or an online header scanner. A header that is configured but not served is worse than none, because it creates false confidence.

## Environment variables

- Only `RESEND_API_KEY` and whatever the refactor genuinely adds.
- `.env.example` lists keys with empty values and a comment on where to get each one. Never a real value.
- Server-only secrets must never be prefixed `NEXT_PUBLIC_`. Anything with that prefix ends up in the browser bundle.
- Document in the README which variables production needs.

## Definition of done

- No personal data in any log path.
- Rate limiting active and manually tested (fire the form repeatedly, confirm the 429).
- Honeypot in place and tested.
- Headers verified live on the deployed URL.
- Error responses carry no internal detail.
- A test covers the validation rejection path.
