"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  CallIcon,
  ChevronLeftIcon,
  DownloadArrowIcon,
  EmailIcon,
  WhatsAppIcon,
} from "@/utils/icons";
import type { TeamMember } from "@/utils/types";

const DEFAULT_AGENT_EMAIL = "info@rockyrealestate.com";
const DEFAULT_AGENT_PHONE = "+97144476644";
const DEFAULT_AGENT_WHATSAPP = "97144476644";

function getAgentContact(agent: TeamMember) {
  const phone = (agent.phone || DEFAULT_AGENT_PHONE).trim();
  const email = (agent.email || DEFAULT_AGENT_EMAIL).trim();
  const whatsapp = (agent.whatsapp || agent.phone || DEFAULT_AGENT_WHATSAPP).replace(
    /[^\d]/g,
    "",
  );

  return {
    phone,
    phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "",
    email,
    emailHref: email ? `mailto:${email}` : "",
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp}` : "",
    whatsappLabel: whatsapp ? `+${whatsapp}` : "",
  };
}

function getTeamMemberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function getExperienceParagraphs(experience?: string | string[]): string[] {
  if (!experience) return [];
  return Array.isArray(experience) ? experience : [experience];
}

type AgentProfileImageProps = {
  name: string;
  image: string;
};

function AgentProfileImage({ name, image }: AgentProfileImageProps) {
  const trimmed = image.trim();
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  const showPlaceholder = !trimmed || loadFailed;

  return (
    <div className="relative w-[280px] shrink-0 sm:w-80 lg:w-[360px] xl:w-[400px]">
      {/* rounded-xl applied here */}
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-linear-to-br from-[#e8e2d8] to-[#f5f2ee]">
        {!showPlaceholder && (
          <Image
            src={trimmed}
            alt={name.trim()}
            fill
            priority
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 440px"
            className="object-cover object-top"
            onError={() => setLoadFailed(true)}
          />
        )}
        {showPlaceholder && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#ddd6c8] to-[#f0ece5]"
            aria-hidden
          >
            <span className="text-[2.5rem] font-medium tracking-[-0.02em] text-[#0d365e]/20">
              {getTeamMemberInitials(name)}
            </span>
          </div>
        )}
      </div>

      {/* Offset accent border */}
      <div
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 -z-10 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-xl border border-[#0d365e]/12"
        aria-hidden
      />
      {/* Dot accent */}
      {/* <div
        className="absolute -left-2 -top-2 h-1.5 w-1.5 rounded-full bg-[#0d365e]/18"
        aria-hidden
      /> */}
    </div>
  );
}

type AgentProfileSectionProps = {
  member: TeamMember;
};

const AgentProfileSection: React.FC<AgentProfileSectionProps> = ({ member }) => {
  const languages = member.languages?.filter(Boolean) ?? [];
  const contact = getAgentContact(member);

  const contactItems = [
    {
      id: "phone",
      icon: CallIcon,
      label: "Call",
      href: contact.phoneHref,
      external: false,
      title: contact.phone,
    },
    {
      id: "email",
      icon: EmailIcon,
      label: "Email",
      href: contact.emailHref,
      external: false,
      title: contact.email,
    },
    {
      id: "whatsapp",
      icon: WhatsAppIcon,
      label: "WhatsApp",
      href: contact.whatsappHref,
      external: true,
      title: contact.whatsappLabel,
      isWhatsApp: true,
    },
  ].filter((item) => item.href);

  const experienceParagraphs = getExperienceParagraphs(member.experience);
  const businessCardPdf = member.businessCardPdf?.trim();
  const downloadFileName = businessCardPdf
    ? businessCardPdf.split("/").pop() ?? `${getTeamMemberInitials(member.name)}-business-card.pdf`
    : undefined;

  return (
    <section className="pt-12 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      <Container>
        {/* Back link */}
        <Link
          href="/dubaisouth/agents"
          className="group mb-14 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-[#0d365e] no-underline opacity-55 transition-opacity duration-200 hover:opacity-100"
        >
          <ChevronLeftIcon
            width={14}
            height={14}
            className="transition-transform duration-200 group-hover:-translate-x-[3px]"
          />
          Dubai South Agents
        </Link>

        {/* Hero grid */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ── Content ── */}
          <div className="flex flex-col lg:order-1">
            <div className="mb-6 h-px w-10 bg-[#0d365e]/25" aria-hidden />

            <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#0d365e]">
              {member.name.trim()}
            </h1>

            {member.designation && (
              <p className="mt-4 text-[0.9375rem] font-normal leading-normal tracking-[0.01em] text-[#0d365e]/60">
                {member.designation}
              </p>
            )}

            <div className="my-7 h-px w-full bg-[#0d365e]/8" aria-hidden />

            {/* Contact icon row */}
            {contactItems.length > 0 && (
              <div className="flex items-center gap-3">
                {contactItems.map(({ id, icon: Icon, label, href, external, title, isWhatsApp }) => (
                  <a
                    key={id}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    title={title}
                    aria-label={label}
                    className={[
                      "group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e]/20 focus-visible:ring-offset-2",
                      isWhatsApp
                        ? "border-[#25d366]/30 text-[#25d366] hover:border-[#25d366] hover:bg-[#25d366] hover:text-white"
                        : "border-[#C3AD95]/30 text-[#C3AD95] hover:border-[#C3AD95]/50 hover:bg-[#C3AD95]/10 hover:text-[#C3AD95]",
                    ].join(" ")}
                  >
                    <Icon width={16} height={16} className="transition-colors duration-200" />
                  </a>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <p className="mt-6 text-sm tracking-[0.01em] text-[#0d365e]/55">
                <strong className="font-medium text-[#0d365e]">Languages</strong>
                &nbsp;&nbsp;{languages.join(", ")}
              </p>
            )}

            {businessCardPdf && (
              <a
                href={businessCardPdf}
                download={downloadFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-lg border border-[#0d365e] bg-transparent px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-[#0d365e] no-underline transition-[background,color,border-color] duration-200 hover:border-[#C3AD95] hover:bg-[#C3AD95] hover:text-white"
              >
                <DownloadArrowIcon
                  width={14}
                  height={14}
                  className="transition-transform duration-200 group-hover:translate-y-0.5 "
                />
                Download Business Card
              </a>
            )}
          </div>

          {/* ── Image ── */}
          <div className="flex justify-center lg:order-2 lg:justify-end">
            <AgentProfileImage name={member.name} image={member.image} />
          </div>
        </div>

        {/* Experience section */}
        {experienceParagraphs.length > 0 && (
          <div className="mt-20 border-t border-[#0d365e]/8 pt-16 sm:mt-22 lg:mt-26">
            <div className="grid max-w-208 gap-12 md:grid-cols-[180px_1fr] md:gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-lg font-medium leading-snug tracking-[-0.01em] text-[#0d365e]">
                  Experience at Rocky Real Estate
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {experienceParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="m-0 text-[0.9375rem] leading-[1.8] text-[#0d365e]/60"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AgentProfileSection;