import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Code2,
  FileSearch,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    priceIdEnv: "STRIPE_PRICE_STARTER",
    description: "For solo builders validating one app.",
    features: ["5 project scans", "Risk report", "Read-only MCP scaffold", "Email support"],
  },
  {
    name: "Builder",
    price: "$49",
    priceIdEnv: "STRIPE_PRICE_BUILDER",
    description: "For shipping AI adapters across client projects.",
    features: ["50 project scans", "Domain profiles", "MCP adapter generator", "Priority support"],
    featured: true,
  },
  {
    name: "Studio",
    price: "$149",
    priceIdEnv: "STRIPE_PRICE_STUDIO",
    description: "For agencies and internal product teams.",
    features: ["Unlimited scans", "Team workflows", "Policy templates", "Implementation review"],
  },
];

const workflow = [
  { icon: FileSearch, title: "Scan", text: "Read routes, API handlers, schemas, and framework conventions." },
  { icon: ShieldCheck, title: "Classify", text: "Flag safe reads, risky writes, admin routes, and sensitive fields." },
  { icon: Code2, title: "Generate", text: "Create a reviewable MCP adapter that calls your existing API." },
  { icon: GitBranch, title: "Ship", text: "Connect the adapter to an AI client, CLI, or internal assistant." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0f12] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#0b0f12_0%,#101820_48%,#17231d_100%)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] [background-size:48px_48px]" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a className="flex items-center gap-2 font-semibold" href="#top" aria-label="SafeMCP home">
            <span className="flex size-9 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            SafeMCP
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#workflow" className="hover:text-white">
              Workflow
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="/submit" className="hover:text-white">
              Submit project
            </a>
          </div>
        </nav>

        <div id="top" className="relative mx-auto grid min-h-[86vh] max-w-7xl content-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl self-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
              <Sparkles size={16} aria-hidden="true" />
              AI integration readiness for existing apps
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-white md:text-7xl">
              SafeMCP
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Scan any web app, find the API routes an AI assistant can safely use, and generate a controlled MCP adapter without exposing admin actions or private user data.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Start subscription
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href="/submit"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Submit project
              </a>
            </div>
          </div>

          <div className="self-center overflow-hidden rounded-lg border border-white/12 bg-slate-950/75 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-3">
              <div className="flex gap-2" aria-hidden="true">
                <span className="size-3 rounded-full bg-rose-400" />
                <span className="size-3 rounded-full bg-amber-300" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-xs text-slate-400">ai-mcp-analyzer report</span>
            </div>
            <div className="grid gap-4 p-5">
              <Metric label="Routes detected" value="42" tone="blue" />
              <Metric label="Safe read tools" value="8" tone="green" />
              <Metric label="Needs confirmation" value="11" tone="amber" />
              <Metric label="Do not expose" value="6" tone="red" />
              <div className="rounded-md border border-white/10 bg-slate-900/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                  <LockKeyhole size={16} aria-hidden="true" />
                  Generated adapter
                </div>
                <pre className="overflow-x-auto text-sm leading-6 text-slate-300">
                  <code>{`check_availability -> GET /slots
get_order_status  -> GET /orders/:id
create_booking    -> blocked until confirmed`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="border-b border-white/10 bg-[#f5f7f2] px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal md:text-5xl">A safety-first bridge from old apps to AI tools.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {workflow.map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <item.icon className="mb-4 text-emerald-700" size={24} aria-hidden="true" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal md:text-5xl">Sell it as a subscription.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Stripe Checkout is wired as a secure server route. Add real price IDs when you are ready to sell online.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <form
                key={plan.name}
                action="/api/checkout"
                method="POST"
                className={`rounded-lg border p-6 ${
                  plan.featured ? "border-emerald-500 bg-[#f1fbf5] shadow-lg shadow-emerald-950/10" : "border-slate-200 bg-white"
                }`}
              >
                <input type="hidden" name="priceIdEnv" value={plan.priceIdEnv} />
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.featured ? (
                    <span className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white">Best fit</span>
                  ) : null}
                </div>
                <p className="mt-4 text-4xl font-semibold">
                  {plan.price}
                  <span className="text-base font-normal text-slate-500">/mo</span>
                </p>
                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{plan.description}</p>
                <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="text-emerald-600" size={17} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="submit"
                  className={`mt-7 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold transition ${
                    plan.featured ? "bg-slate-950 text-white hover:bg-slate-800" : "border border-slate-300 text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  Subscribe
                </button>
              </form>
            ))}
          </div>
        </div>
      </section>

      <section id="deploy" className="bg-[#11171c] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 rounded-lg border border-white/10 bg-white/5 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Ready for review</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal">Subscribed users can send a project for SafeMCP analysis.</h2>
          </div>
          <a
            href="/submit"
            className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Submit project
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0b0f12] px-6 py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-white">
            <BadgeCheck size={18} aria-hidden="true" />
            SafeMCP
          </div>
          <p>Build the bridge. Keep the keys and risky actions server-side.</p>
        </div>
      </footer>
    </main>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" | "amber" | "red" }) {
  const tones = {
    blue: "text-sky-300 bg-sky-300/10 border-sky-300/20",
    green: "text-emerald-300 bg-emerald-300/10 border-emerald-300/20",
    amber: "text-amber-200 bg-amber-300/10 border-amber-300/20",
    red: "text-rose-300 bg-rose-300/10 border-rose-300/20",
  };

  return (
    <div className={`flex items-center justify-between rounded-md border px-4 py-3 ${tones[tone]}`}>
      <span className="text-sm text-slate-300">{label}</span>
      <span className="font-mono text-2xl font-semibold">{value}</span>
    </div>
  );
}
