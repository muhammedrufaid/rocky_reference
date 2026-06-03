/** localStorage key for the 24-hour recruitment popup cooldown. */
export const RECRUITMENT_POPUP_STORAGE_KEY = "rocky-recruitment-popup-dismissed-at";

/** Cooldown before the popup can appear again (24 hours). */
export const RECRUITMENT_POPUP_COOLDOWN_MS = 24 * 60 * 60 * 1000;

/** Delay before the time-based trigger fires (4 seconds). */
export const RECRUITMENT_POPUP_DELAY_MS = 4000;

/** Scroll depth (0–1) required to trigger the popup (40%). */
export const RECRUITMENT_POPUP_SCROLL_THRESHOLD = 0.4;

/** Reads the last dismissal timestamp from localStorage, or null if unset. */
export function getRecruitmentPopupDismissedAt(): number | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(RECRUITMENT_POPUP_STORAGE_KEY);
    if (!raw) return null;

    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Returns true when the popup was dismissed within the cooldown window. */
export function isRecruitmentPopupInCooldown(): boolean {
  const dismissedAt = getRecruitmentPopupDismissedAt();
  if (!dismissedAt) return false;

  return Date.now() - dismissedAt < RECRUITMENT_POPUP_COOLDOWN_MS;
}

/** Persists the current timestamp so the popup stays hidden for 24 hours. */
export function markRecruitmentPopupDismissed(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(RECRUITMENT_POPUP_STORAGE_KEY, String(Date.now()));
  } catch {
    // Storage may be unavailable in private browsing — fail silently.
  }
}

/** Calculates vertical scroll progress as a value between 0 and 1. */
export function getScrollProgress(): number {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.documentElement;
  const maxScroll = scrollHeight - innerHeight;

  if (maxScroll <= 0) return 1;

  return scrollY / maxScroll;
}
