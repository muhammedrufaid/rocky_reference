import React from "react";
import type { ApiPropertyDetail } from "@/utils/getServices";
import PropertyContentLayout from "@/components/properties/PropertyContentLayout";
import PropertyAgentContactCard, {
  type PropertyAgent,
} from "@/components/properties/PropertyAgentContactCard";
import Container from "../layout/Container";

export interface PropertyDetailPageProps {
  property: ApiPropertyDetail;
  agent?: PropertyAgent;
  className?: string;
}

function agentFromProperty(property: ApiPropertyDetail): PropertyAgent {
  return {
    name: property.listingAgent || "Rocky Property Specialist",
    title: "Property Consultant",
    phone: property.listingAgentPhone,
    email: property.listingAgentEmail,
    // photoUrl: undefined (API doesn't provide it today)
  };
}

export default function PropertyDetailPage({ property, agent, className }: PropertyDetailPageProps) {
  const resolvedAgent = agent ?? agentFromProperty(property);

  return (
    <section
      className={["bg-white pt-6 text-[#333333] md:pt-8 lg:pt-10", className ?? ""].join(" ")}
      aria-label="Property Header"
    >
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="w-full flex-1">
            <PropertyContentLayout property={property} />
          </div>

          <div className="w-full md:w-[320px] md:flex-shrink-0 md:sticky md:top-25 md:self-start">
            <PropertyAgentContactCard agent={resolvedAgent} />
          </div>
        </div>
      </Container>
    </section>
  );
}

