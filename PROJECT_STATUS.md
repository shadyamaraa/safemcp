# SafeMCP Project Status

Last updated: 2026-06-01

## Current Product

SafeMCP is a subscription-ready web app for selling an AI + MCP integration service.

The current offer:

- Existing app review
- AI/MCP readiness report
- Safe endpoint classification
- MCP adapter scaffold planning
- Manual delivery first, automation later

## Current Live Flow

1. User opens the SafeMCP landing page.
2. User chooses a subscription plan.
3. Stripe Checkout handles payment.
4. After successful payment, Stripe redirects to `/submit?session_id=...`.
5. `/submit` verifies the Stripe Checkout session.
6. If the session is paid or the subscription is active/trialing, the project submission form appears.
7. User submits:
   - contact email
   - project/repository URL
   - project type
   - AI/MCP goal
8. App sends an email notification if Resend is configured.
9. User sees `/submit/thanks` with the submitted details and an email-draft fallback.

Direct access to `/submit` without a valid paid session now shows `Subscribe first`.

## Implemented

### Web App

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Landing page
- Workflow section
- Pricing cards
- Success and cancel pages
- Responsive UI
- Production build passes

### Stripe Subscription

- Stripe Checkout route at `/api/checkout`
- Recurring subscription mode
- Three plan env vars:
  - `STRIPE_PRICE_STARTER`
  - `STRIPE_PRICE_BUILDER`
  - `STRIPE_PRICE_STUDIO`
- Server-only Stripe secret handling through `STRIPE_SECRET_KEY`
- Successful checkout redirects to `/submit?session_id={CHECKOUT_SESSION_ID}`

### Project Submission

- `/submit` page
- Stripe session verification before showing the form
- Hidden `sessionId` passed into the form
- Server action re-checks paid session before accepting submission
- `/submit/thanks` confirmation page
- `/submit/thanks` shows submitted goal details
- `/submit/thanks` includes an email-draft fallback when notification delivery needs manual follow-up

### Email Notification

- Resend SDK installed
- `sendProjectSubmissionEmail` helper added
- Submission emails include:
  - contact email
  - project URL
  - project type
  - user goal
- If Resend is not configured, submission still completes with a warning message.

### GitHub And Vercel

- Code pushed to:
  - `shadyamaraa/safemcp`
  - `shadyamaraa/safemcpserver`
- Vercel is connected to:
  - `shadyamaraa/safemcpserver`
- Important: deploy changes must be pushed to `safemcpserver/main`.

## Important Environment Variables

### Required For Payments

```text
NEXT_PUBLIC_APP_URL=https://safemcpserver.vercel.app
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_BUILDER=price_...
STRIPE_PRICE_STUDIO=price_...
```

### Required For Email Notifications

```text
RESEND_API_KEY=re_...
SUBMISSION_NOTIFY_EMAIL=you@example.com
RESEND_FROM_EMAIL=SafeMCP <onboarding@resend.dev>
```

For production, verify a real sending domain in Resend and replace `RESEND_FROM_EMAIL`.

## Verified

- `npm run lint` passes.
- `npm run build` passes.
- Stripe Checkout creates sessions.
- `/success` redirects to `/submit`.
- `/submit` blocks unpaid/direct access.
- `/submit` shows form after valid checkout session.
- `/submit/thanks` renders submitted project details.

## Current Limitations

- No user accounts yet.
- No customer dashboard yet.
- No database yet.
- Submission data is not persisted.
- Email notification depends on Resend env vars.
- No Stripe webhook handling yet.
- No automatic entitlement tracking beyond checking the checkout session.
- Analyzer/generator is not reintroduced into this clean app yet.

## Next Work

### 1. Configure Resend In Production

- Add `RESEND_API_KEY` in Vercel.
- Add `SUBMISSION_NOTIFY_EMAIL`.
- Add `RESEND_FROM_EMAIL`.
- Test project submission email.

### 2. Add Stripe Webhook

Create a webhook route for events:

- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Purpose:

- record paid customers
- track active/canceled subscriptions
- prepare account/dashboard access

### 3. Add Database

Recommended first database:

- Supabase Postgres

Initial tables:

- `customers`
- `subscriptions`
- `project_submissions`

Submission should be stored instead of only shown on the thanks page.

### 4. Add Authentication

Recommended options:

- Clerk
- Supabase Auth
- NextAuth/Auth.js

Goal:

- customer logs in
- sees their submissions
- sees subscription status
- downloads generated reports/adapters later

### 5. Reintroduce Generic Analyzer

Rebuild the previous analyzer as a clean generic module:

- no booking-specific default naming
- no MTBogd-specific references
- domain profiles:
  - generic
  - booking
  - ecommerce
  - CRM
  - custom JSON config

MVP analyzer output:

- detected routes
- risk classification
- sensitive data hints
- recommended MCP tools
- beginner next steps

### 6. Add MCP Adapter Generator

Generate adapter projects from approved endpoints:

- read-only tools first
- write tools only with explicit confirmation
- privacy filter
- auth/session scope
- audit log hooks

### 7. Build Customer Dashboard

Dashboard features:

- submit project
- view submission status
- upload repo metadata
- view generated report
- download MCP adapter scaffold
- manage subscription

### 8. Add Domain And Branding

Current app can run on Vercel default domain.

Later:

- buy custom domain
- add verified Resend sender domain
- add production Stripe mode
- update `NEXT_PUBLIC_APP_URL`

## Operating Notes

- Keep all secret keys server-side only.
- Never expose `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, or future `OPENAI_API_KEY` in client components.
- Vercel production deploy must use the same env vars as local.
- If payment redirect seems stale, check that Vercel is deploying `shadyamaraa/safemcpserver` and not another repo.
- If `/submit` does not show the form after payment, confirm that the URL includes `session_id=cs_...` and that the Stripe key matches the mode used to create the session.

## Useful Commands

```bash
npm run lint
npm run build
git status --short --branch
git push vercel main
```

If local `master` has new work and Vercel deploys `main`:

```bash
git branch -f main master
git push vercel main --force-with-lease
```
