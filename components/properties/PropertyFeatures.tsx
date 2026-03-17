import { Check } from "lucide-react";
import Container from "@/components/layout/Container";

interface PropertyFeaturesProps {
  features?: string[];
}

function normalizeFeatures(features?: string[]): string[] {
  if (!features || features.length === 0) return [];

  const cleanedFeatures = features
    .map((feature) => feature?.trim())
    .filter((feature): feature is string => Boolean(feature));

  return [...new Set(cleanedFeatures)];
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  const amenityItems = normalizeFeatures(features);

  if (amenityItems.length === 0) return null;

  return (
    <section className="pb-10 md:pb-12 lg:pb-14" aria-label="Property features and amenities">
      <Container>
        <div className="rounded-2xl border border-[var(--border-light)] bg-white p-5 md:p-7">
          <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
            Features & Amenities
          </h2>

          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {amenityItems.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2.5 text-sm text-gray-700 md:text-base"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--rocky-blue)]/10 text-[var(--rocky-blue)]"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
