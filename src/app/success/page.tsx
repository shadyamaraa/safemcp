import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const query = params.session_id ? `?session_id=${encodeURIComponent(params.session_id)}` : "";

  redirect(`/submit${query}`);
}
