# SafeMCP

SafeMCP is a subscription-ready web app for an AI + MCP integration toolkit.

The product promise:

- Scan an existing web app.
- Find API routes and risky actions.
- Classify what an AI assistant can safely use.
- Generate a reviewable MCP adapter layer.
- Keep secret keys, admin actions, and private data out of the frontend.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Subscription Setup

This app uses Stripe Checkout for recurring subscriptions.

1. Create a Stripe account.
2. Create three recurring monthly prices in Stripe:
   - Starter
   - Builder
   - Studio
3. Copy `.env.example` to `.env.local`.
4. Fill these values:

```text
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_BUILDER=price_...
STRIPE_PRICE_STUDIO=price_...
```

5. Restart the dev server.
6. Click a Subscribe button.

Secrets must stay server-side. Do not put `STRIPE_SECRET_KEY` or `OPENAI_API_KEY` in client components.

## Project Submission Emails

SafeMCP can send an email when a user submits a project.

1. Create a Resend account or add the Resend integration in Vercel Marketplace.
2. Add these environment variables:

```text
RESEND_API_KEY=re_...
SUBMISSION_NOTIFY_EMAIL=you@example.com
RESEND_FROM_EMAIL=SafeMCP <onboarding@resend.dev>
```

For production, verify a sending domain in Resend and replace `RESEND_FROM_EMAIL` with your own domain address.

## Database Storage

Project submissions can be stored in Supabase Postgres.

Add these server-side environment variables:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

Create the table:

```sql
create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  project_url text not null,
  project_type text not null,
  goal text not null,
  stripe_session_id text not null,
  email_status text not null,
  status text not null default 'new'
);

alter table public.project_submissions enable row level security;
```

The app uses the Supabase service role key only on the server. Never expose it to client components.

## Deployment

Recommended path:

1. Push the project to GitHub.
2. Import it into Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Set `NEXT_PUBLIC_APP_URL` to the production domain.
5. Configure a Stripe webhook later when account provisioning is implemented.

## First Sellable MVP

Start as a productized service while the automation grows:

1. User subscribes.
2. User sends a GitHub repo or project zip privately.
3. You run the analyzer manually.
4. You deliver:
   - AI/MCP readiness report
   - safe endpoint list
   - generated MCP adapter scaffold
   - next-step implementation guide

Then automate these steps into the dashboard.

## Current Status

- Landing page: ready
- Pricing page: ready
- Stripe Checkout route: ready, requires env vars
- Success/cancel pages: ready
- Analyzer backend/dashboard: next milestone
