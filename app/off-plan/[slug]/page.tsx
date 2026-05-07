import { redirect } from "next/navigation";

export default function OffPlanSlugRedirectPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const qs = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const v of value) qs.append(key, v);
    } else {
      qs.set(key, value);
    }
  }

  redirect(
    `/off-plan-properties/in-dubai/${encodeURIComponent(params.slug)}${
      qs.toString() ? `?${qs.toString()}` : ""
    }`
  );
}

