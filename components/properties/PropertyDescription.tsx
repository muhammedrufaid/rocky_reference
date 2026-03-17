"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";

interface PropertyDescriptionProps {
  propertyDescription: string;
}

const COLLAPSED_LENGTH = 420;

export default function PropertyDescription({
  propertyDescription,
}: PropertyDescriptionProps) {
  const description = propertyDescription?.trim() ?? "";
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongDescription = description.length > COLLAPSED_LENGTH;
  const previewText = useMemo(() => {
    if (!isLongDescription) return description;
    return `${description.slice(0, COLLAPSED_LENGTH).trimEnd()}...`;
  }, [description, isLongDescription]);

  if (!description) return null;

  return (
    <section className="pb-10 md:pb-12 lg:pb-14" aria-label="Property description">
      <Container>
        <div className="rounded-2xl border border-[var(--border-light)] bg-white p-5 md:p-7">
          <h2 className="text-xl font-medium text-gray-900 md:text-2xl">
            Property Description
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-700 md:text-base">
            {isExpanded ? description : previewText}
          </p>

          {isLongDescription && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="mt-4 inline-flex cursor-pointer items-center text-sm font-medium text-[var(--rocky-blue)] transition hover:text-[var(--rocky-blue-hover)]"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
