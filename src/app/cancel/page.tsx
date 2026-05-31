import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0f12] px-6 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-semibold">Checkout canceled</h1>
        <p className="mt-4 text-slate-300">No payment was made. You can return to pricing and choose another plan.</p>
        <Link className="mt-8 inline-flex h-11 items-center rounded-md border border-white/20 px-5 text-sm font-semibold text-white" href="/#pricing">
          View pricing
        </Link>
      </div>
    </main>
  );
}
