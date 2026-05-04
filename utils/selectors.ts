import { slugify, slugFromPath } from "./slugify";
import type { Service, TeamMember } from "./types";
import { services, teamMembers } from "./data";

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
  return teamMembers.find((m) => getTeamMemberSlug(m) === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
