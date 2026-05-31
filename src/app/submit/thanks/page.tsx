import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function SubmitThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; projectUrl?: string; projectType?: string; emailStatus?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0f12] px-6 text-white">
      <div className="w-full max-w-xl rounded-lg border border-white/10 bg-white/5 p-7">
        <CheckCircle2 className="text-emerald-300" size={34} aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-semibold">Project received</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Your submission is ready for the manual SafeMCP review workflow.
        </p>
        {params.emailStatus === "sent" ? (
          <p className="mt-4 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
            Email notification sent.
          </p>
        ) : (
          <p className="mt-4 rounded-md border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
            Email notification is not configured yet. Save this page or copy the project details.
          </p>
        )}
        <dl className="mt-6 grid gap-3 rounded-md border border-white/10 bg-slate-950/60 p-4 text-sm">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-1 break-words text-slate-200">{params.email ?? "Not provided"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Project</dt>
            <dd className="mt-1 break-words text-slate-200">{params.projectUrl ?? "Not provided"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Type</dt>
            <dd className="mt-1 text-slate-200">{params.projectType ?? "Not provided"}</dd>
          </div>
        </dl>
        <Link className="mt-7 inline-flex h-11 items-center rounded-md bg-emerald-400 px-5 text-sm font-semibold text-slate-950" href="/">
          Back to SafeMCP
        </Link>
      </div>
    </main>
  );
}
