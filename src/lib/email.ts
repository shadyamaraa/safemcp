import { Resend } from "resend";

type ProjectSubmissionEmail = {
  email: string;
  projectUrl: string;
  projectType: string;
  goal: string;
};

let resendClient: Resend | null = null;

export async function sendProjectSubmissionEmail(submission: ProjectSubmissionEmail): Promise<"sent" | "not_configured" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.SUBMISSION_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    return "not_configured";
  }

  try {
    const resend = getResend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "SafeMCP <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: notifyEmail,
      subject: "New SafeMCP project submission",
      text: [
        "New SafeMCP project submission",
        "",
        `Contact email: ${submission.email}`,
        `Project URL: ${submission.projectUrl}`,
        `Project type: ${submission.projectType}`,
        "",
        "Goal:",
        submission.goal,
      ].join("\n"),
      html: renderSubmissionEmail(submission),
    });

    return error ? "failed" : "sent";
  } catch {
    return "failed";
  }
}

function getResend(apiKey: string): Resend {
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

function renderSubmissionEmail(submission: ProjectSubmissionEmail): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h1 style="font-size: 22px;">New SafeMCP project submission</h1>
      <p><strong>Contact email:</strong> ${escapeHtml(submission.email)}</p>
      <p><strong>Project URL:</strong> <a href="${escapeAttribute(submission.projectUrl)}">${escapeHtml(submission.projectUrl)}</a></p>
      <p><strong>Project type:</strong> ${escapeHtml(submission.projectType)}</p>
      <p><strong>Goal:</strong></p>
      <div style="white-space: pre-wrap; padding: 12px; background: #f3f4f6; border-radius: 8px;">${escapeHtml(submission.goal)}</div>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
