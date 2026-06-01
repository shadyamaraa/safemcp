import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ProjectSubmission = {
  email: string;
  projectUrl: string;
  projectType: string;
  goal: string;
  stripeSessionId: string;
  emailStatus: string;
};

export type SaveSubmissionStatus = "saved" | "not_configured" | "failed";

let supabaseClient: SupabaseClient | null = null;

export async function saveProjectSubmission(submission: ProjectSubmission): Promise<SaveSubmissionStatus> {
  const supabase = getSupabase();

  if (!supabase) {
    return "not_configured";
  }

  const { error } = await supabase.from("project_submissions").insert({
    email: submission.email,
    project_url: submission.projectUrl,
    project_type: submission.projectType,
    goal: submission.goal,
    stripe_session_id: submission.stripeSessionId,
    email_status: submission.emailStatus,
    status: "new",
  });

  return error ? "failed" : "saved";
}

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
}
