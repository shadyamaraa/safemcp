import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0f12] px-6 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-semibold">Subscription started</h1>
        <p className="mt-4 text-slate-300">Stripe redirected back successfully. Next step: connect this to account provisioning.</p>
        <Link className="mt-8 inline-flex h-11 items-center rounded-md bg-emerald-400 px-5 text-sm font-semibold text-slate-950" href="/">
          Back to SafeMCP
        </Link>
      </div>
    </main>
  );
}
