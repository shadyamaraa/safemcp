import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { SubmitProjectForm } from "./submit-project-form";

export default function SubmitProjectPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f2] px-6 py-10 text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="self-start">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to SafeMCP
          </Link>
          <div className="inline-flex size-11 items-center justify-center rounded-md bg-emerald-500 text-slate-950">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal md:text-6xl">Submit your project.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-650">
            Send the app you want analyzed. The first delivery is manual and review-first: a readiness report, safe endpoint map, and MCP adapter plan.
          </p>
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <LockKeyhole size={17} aria-hidden="true" />
              Privacy note
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share only a repository or project URL you are allowed to submit. Do not paste API keys, passwords, payment secrets, or private customer data into this form.
            </p>
          </div>
        </section>

        <section className="self-start">
          <SubmitProjectForm />
        </section>
      </div>
    </main>
  );
}
