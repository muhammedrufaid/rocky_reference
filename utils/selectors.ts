import { slugify, slugFromPath } from "./slugify";
import type { Service, TeamMember } from "./types";
import { dubaiSouthAgents, services, teamMembers2 } from "./data";

/** Slug for `/our-team/[slug]`: last segment of `path` when set, otherwise `slugify(name)`. */
export function getTeamMemberSlug(member: TeamMember): string {
  const raw = member.path?.trim();
  if (raw) {
    const last = slugFromPath(raw);
    if (last) return last;
  }
  return slugify(member.name);
}

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers2.find((m) => getTeamMemberSlug(m) === slug);
}

export function getDubaiSouthAgentBySlug(slug: string): TeamMember | undefined {
  return dubaiSouthAgents.find((m) => getTeamMemberSlug(m) === slug);
}

export function getDubaiSouthAgentProfilePath(member: TeamMember): string {
  const raw = member.path?.trim();
  if (raw) return raw;
  return `/dubaisouth/agents/${getTeamMemberSlug(member)}`;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
