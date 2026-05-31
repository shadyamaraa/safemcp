"use client";

import { useActionState } from "react";
import { submitProject, type SubmitProjectState } from "./actions";

const initialState: SubmitProjectState = {};

export function SubmitProjectForm() {
  const [state, formAction, pending] = useActionState(submitProject, initialState);

  return (
    <form action={formAction} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-medium text-slate-900">
        Contact email
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-900">
        Project or repository URL
        <input
          name="projectUrl"
          type="url"
          placeholder="https://github.com/company/project"
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-900">
        Project type
        <select
          name="projectType"
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          defaultValue="generic"
        >
          <option value="generic">Generic web app</option>
          <option value="booking">Booking or reservations</option>
          <option value="ecommerce">E-commerce</option>
          <option value="crm">CRM or internal tool</option>
          <option value="education">Education or course platform</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-900">
        What should AI/MCP help with?
        <textarea
          name="goal"
          rows={5}
          placeholder="Example: Let users ask about availability, create safe read-only reports, or generate an MCP adapter for my existing API."
          className="resize-y rounded-md border border-slate-300 px-3 py-3 text-sm leading-6 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          required
        />
      </label>

      {state.error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting..." : "Submit project"}
      </button>
    </form>
  );
}
