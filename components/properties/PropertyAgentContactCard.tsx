"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Share2,
  Phone,
  MessageCircle,
} from "lucide-react";

export interface PropertyAgent {
  name: string;
  title?: string;
  photoUrl?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export interface PropertyAgentContactCardProps {
  agent: PropertyAgent;
  /** Optional overrides for share URLs. If not provided, uses current page URL (client-side). */
  shareUrl?: string;
  className?: string;
}

function normalizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsAppNumber(phone?: string): string {
  const normalized = normalizePhone(phone).replace(/^\+/, "");
  return normalized;
}

function WhatsAppMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.73L23 22h-6.2l-4.86-7.3L5.3 22H2l7.33-8.38L1 2h6.35l4.4 6.54L18.9 2Zm-1.09 18h1.72L6.26 3.91H4.4L17.81 20Z" />
    </svg>
  );
}

function SocialIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F6F6F6] bg-[#F6F6F6] text-[#0D365E] transition hover:border-[#0D365E]/30 hover:bg-white hover:text-[#0D365E]"
    >
      {children}
    </a>
  );
}

export default function PropertyAgentContactCard({
  agent,
  shareUrl,
  className,
}: PropertyAgentContactCardProps) {
  const [resolvedShareUrl, setResolvedShareUrl] = useState<string>(shareUrl ?? "");

  useEffect(() => {
    if (shareUrl) return;
    if (typeof window === "undefined") return;
    setResolvedShareUrl(window.location.href);
  }, [shareUrl]);

  const phone = useMemo(() => normalizePhone(agent.phone), [agent.phone]);
  const emailHref = agent.email ? `mailto:${agent.email}` : "";
  const whatsappNumber = useMemo(
    () => toWhatsAppNumber(agent.whatsapp ?? agent.phone),
    [agent.phone, agent.whatsapp],
  );
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";

  const shareTargets = useMemo(() => {
    const url = encodeURIComponent(resolvedShareUrl || "");
    return {
      email: resolvedShareUrl ? `mailto:?subject=Rocky%20Real%20Estate&body=${url}` : "",
      facebook: resolvedShareUrl ? `https://www.facebook.com/sharer/sharer.php?u=${url}` : "",
      x: resolvedShareUrl ? `https://twitter.com/intent/tweet?url=${url}` : "",
      linkedin: resolvedShareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}` : "",
      whatsapp: resolvedShareUrl ? `https://wa.me/?text=${url}` : "",
      instagram: "", // Instagram has no official direct web share intent for arbitrary URLs.
      vk: resolvedShareUrl ? `https://vk.com/share.php?url=${url}` : "",
      youtube: "", // No share intent.
    };
  }, [resolvedShareUrl]);

  return (
    <aside
      className={[
        "rounded-2xl border border-[#F6F6F6] bg-white text-[#333333] shadow-[0_18px_40px_rgba(8,31,58,0.10)]",
        className ?? "",
      ].join(" ")}
      aria-label="Agent contact card"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#0D365E]/25 to-transparent" />

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#F6F6F6] bg-[#F6F6F6]">
            {agent.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.photoUrl}
                alt={agent.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-medium tracking-wide text-[#0D365E]">
                {agent.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase())
                  .join("") || "RR"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            {/* <p className="text-sm tracking-[0.18em] uppercase text-[#333333]/60">Agent</p> */}
            <p className="mt-1 truncate text-lg font-semibold text-[#081F3A]">{agent.name}</p>
            {agent.title ? (
              <p className="mt-0.5 text-sm text-[#333333]/60">{agent.title}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={phone ? `tel:${phone}` : "#"}
            aria-disabled={!phone}
            className={[
              "inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition",
              phone
                ? "border-[#0D365E] bg-[#0D365E] text-white hover:border-[#1C4E80] hover:bg-[#1C4E80]"
                : "cursor-not-allowed border-[#F6F6F6] bg-[#F6F6F6] text-[#333333]/40",
            ].join(" ")}
          >
            <Phone size={16} aria-hidden="true" />
            Call Us
          </a>

          <a
            href={emailHref || "#"}
            aria-disabled={!emailHref}
            className={[
              "inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition",
              emailHref
                ? "border-[#0D365E] bg-transparent text-[#0D365E] hover:bg-[#1C4E80]/10"
                : "cursor-not-allowed border-[#F6F6F6] bg-[#F6F6F6] text-[#333333]/40",
            ].join(" ")}
          >
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
        </div>

        <div className="mt-5">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#0D365E] transition hover:text-[#1C4E80]"
            >
              <span className="text-[#0D365E]">
                <WhatsAppMark size={16} />
              </span>
              <span>Or contact us via WhatsApp</span>
            </a>
          ) : (
            <p className="text-sm text-[#333333]/60">WhatsApp contact not available</p>
          )}
        </div>


      </div>
    </aside>
  );
}

