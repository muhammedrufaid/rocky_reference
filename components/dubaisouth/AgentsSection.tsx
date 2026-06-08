"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import Pagination from "@/components/common/Pagination";
import { dubaiSouthAgents } from "@/utils/data";
import { getDubaiSouthAgentProfilePath } from "@/utils/selectors";
import { EmailIcon, TeamSearchIcon, WhatsAppIcon } from "@/utils/icons";
import type { TeamMember } from "@/utils/types";

const ITEMS_PER_PAGE = 12;

const DEFAULT_AGENT_EMAIL = "info@rockyrealestate.com";
const DEFAULT_AGENT_WHATSAPP = "97144476644";
const WHATSAPP_GREEN = "#25d366";

function getAgentContact(agent: TeamMember) {
  const email = (agent.email || DEFAULT_AGENT_EMAIL).trim();
  const whatsapp = (agent.whatsapp || agent.phone || DEFAULT_AGENT_WHATSAPP).replace(
    /[^\d]/g,
    "",
  );

  return {
    emailHref: email ? `mailto:${email}` : "",
    whatsappHref: whatsapp ? `https://wa.me/${whatsapp}` : "",
  };
}

type AgentContactLinksProps = {
  agent: TeamMember;
  className?: string;
};

function AgentContactLinks({ agent, className = "" }: AgentContactLinksProps) {
  const { emailHref, whatsappHref } = getAgentContact(agent);

  const links = [
    { href: whatsappHref, label: "WhatsApp", icon: WhatsAppIcon, external: true },
    { href: emailHref, label: "Email", icon: EmailIcon },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div className={`grid w-full grid-cols-2 gap-2 ${className}`}>
      {links.map(({ href, label, icon: Icon, external }) => {
        const isWhatsApp = label === "WhatsApp";

        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isWhatsApp
                ? "text-white hover:opacity-90 focus-visible:ring-[#25d366]"
                : "bg-white text-[#0d365e] hover:bg-white/90 focus-visible:ring-[#0d365e]/30"
            }`}
            style={isWhatsApp ? { backgroundColor: WHATSAPP_GREEN } : undefined}
          >
            <Icon width={14} height={14} />
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}

function getTeamMemberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

type AgentCardImageProps = { name: string; image: string };

const AgentCardImage: React.FC<AgentCardImageProps> = ({ name, image }) => {
  const trimmed = image.trim();
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  const showPlaceholder = !trimmed || loadFailed;

  return (
    <>
      {!showPlaceholder && (
        <Image
          src={trimmed}
          alt={name.trim()}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onError={() => setLoadFailed(true)}
        />
      )}
      {showPlaceholder && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d365e]/10 via-transparent to-[#e7dccd]/50"
          aria-hidden
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0d365e]/35">
            {getTeamMemberInitials(name)}
          </span>
        </div>
      )}
    </>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
};

/* ─── Main section ─── */
const AgentsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const agentsData = dubaiSouthAgents;

  const filteredAgents = useMemo(() => {
    return agentsData.filter((member) => {
      const q = searchQuery.trim().toLowerCase();
      return (
        q === "" ||
        member.name.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        (member.designation?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [agentsData, searchQuery]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAgents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAgents, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <section
      className="pb-12 sm:pb-16 md:pb-20 lg:pb-24"
      aria-labelledby="team-members-heading"
    >
      <Container>
        <h2 id="team-members-heading" className="sr-only">
          Team members
        </h2>

        {/* ── Section header ── */}
        <header className="mb-10 max-w-3xl sm:mb-12 md:mb-14">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px w-10 bg-[var(--sandstone-taupe)]"
              aria-hidden
            />
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--sandstone-taupe)]">
              Our Experts
            </p>
          </div>
          <p
            className="text-2xl font-medium leading-tight tracking-tight text-[var(--rocky-blue)] sm:text-3xl md:text-4xl"
            aria-hidden
          >
            Dubai South property specialists
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--charcoal)]/75 md:text-base">
            Connect with experienced advisors for sales, leasing, and off-plan
            investments across Dubai South and the wider UAE market.
          </p>
        </header>

        {/* ── Filters bar ── */}
        <div className="mb-10 sm:mb-12">
          <div className="relative min-w-0">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--charcoal)]/35"
              aria-hidden
            >
              <TeamSearchIcon />
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or role…"
              aria-label="Search agents"
              className="h-11 w-full rounded-xl border border-[var(--border-light)] bg-white pl-11 pr-4 text-sm text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/40 outline-none transition-all duration-200 hover:border-[var(--rocky-blue)]/30 focus:border-[var(--rocky-blue)] focus:ring-2 focus:ring-[var(--rocky-blue)]/15"
            />
          </div>

          {searchQuery.trim() && (
            <p
              className="mt-3 text-xs text-[var(--charcoal)]/50"
              aria-live="polite"
            >
              {filteredAgents.length} agent
              {filteredAgents.length === 1 ? "" : "s"} found
            </p>
          )}
        </div>

        {/* ── Agent cards grid ── */}
        <AnimatePresence mode="popLayout">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedAgents.map((agent, index) => {
                const profileHref = getDubaiSouthAgentProfilePath(agent);

                return (
                  <motion.article
                    key={agent.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                    className="flex flex-col gap-4 sm:gap-5"
                  >
                    {/* Image flip — hover only on portrait */}
                    <div className="group/image [perspective:1200px]">
                      <div className="relative aspect-[6/7] w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover/image:[transform:rotateY(-180deg)]">
                        {/* Front */}
                        <div className="absolute inset-0 overflow-hidden rounded-xl border border-gray-100/80 bg-gradient-to-bl from-[#0d365e]/10 via-[#f5f3f0] to-[#e7dccd] shadow-sm [backface-visibility:hidden] sm:rounded-2xl">
                          <Link
                            href={profileHref}
                            className="relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e]/40 focus-visible:ring-offset-2"
                          >
                            <AgentCardImage
                              name={agent.name}
                              image={agent.image}
                            />
                          </Link>
                        </div>

                        {/* Back — revealed on image hover */}
                        <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-[#0d365e]/20 bg-gradient-to-bl from-[#0d365e] via-[#1a5a96] to-[#0d365e] p-4 text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-2xl sm:p-5">
                          <div className="flex flex-col gap-1.5">
                            {/* <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                              {agent.department}
                            </span> */}
                            <p className="text-sm font-medium leading-snug">
                              {agent.name.trim()}
                            </p>
                            {agent.designation && (
                              <p className="text-xs leading-relaxed text-white/75 sm:text-sm">
                                {agent.designation}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-2.5">
                            <AgentContactLinks agent={agent} />
                            <Link
                              href={profileHref}
                              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:text-sm"
                            >
                              View Profile
                              <span aria-hidden>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content — static, no flip */}
                    <div className="flex flex-col gap-2">
                      <Link
                        href={profileHref}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e]/40 focus-visible:ring-offset-2 rounded-sm"
                      >
                        <h3 className="normal-case text-base font-medium text-[#0d365e] transition-colors duration-200 hover:text-[#1a5a96] sm:text-lg">
                          {agent.name.trim()}
                        </h3>
                      </Link>
                      {agent.designation && (
                        <p className="text-sm text-[#9f8870]">
                          {agent.designation}
                        </p>
                      )}
                      <div
                        className="h-0.5 w-8 rounded-full bg-[var(--rocky-blue)]"
                        aria-hidden
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-[var(--border-light)] bg-white px-6 py-16 text-center sm:py-20"
            >
              <p className="text-base font-medium text-[var(--charcoal)]/80">
                No agents match your search
              </p>
              <p className="mt-2 text-sm text-[var(--charcoal)]/50">
                Try a different name or role.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex h-9 items-center rounded-xl border border-[var(--border-light)] bg-white px-4 text-xs font-medium text-[var(--rocky-blue)] transition-colors duration-200 hover:border-[var(--rocky-blue)]/30 hover:bg-[var(--soft-sand)]/50"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ── */}
        {filteredAgents.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredAgents.length}
            pageSize={ITEMS_PER_PAGE}
            className="mt-10 sm:mt-12"
          />
        )}
      </Container>
    </section>
  );
};

export default AgentsSection;