"use server";

import { redirect } from "next/navigation";
import { sendProjectSubmissionEmail } from "@/lib/email";
import { isPaidCheckoutSession } from "@/lib/checkout";

export type SubmitProjectState = {
  error?: string;
};

export async function submitProject(_previousState: SubmitProjectState, formData: FormData): Promise<SubmitProjectState> {
  const email = String(formData.get("email") ?? "").trim();
  const projectUrl = String(formData.get("projectUrl") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const goal = String(formData.get("goal") ?? "").trim();
  const sessionId = String(formData.get("sessionId") ?? "").trim();

  const isPaid = await isPaidCheckoutSession(sessionId);
  if (!isPaid) {
    return { error: "Please complete checkout before submitting a project." };
  }

  if (!email || !projectUrl || !projectType || !goal) {
    return { error: "Please fill in every field before submitting your project." };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (!projectUrl.startsWith("https://")) {
    return { error: "Please use an HTTPS project or repository URL." };
  }

  const emailStatus = await sendProjectSubmissionEmail({
    email,
    projectUrl,
    projectType,
    goal,
  });

  const params = new URLSearchParams({
    email,
    projectUrl,
    projectType,
    emailStatus,
    session_id: sessionId,
  });

  redirect(`/submit/thanks?${params.toString()}`);
}
