"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RECRUITMENT_POPUP_DELAY_MS,
  RECRUITMENT_POPUP_SCROLL_THRESHOLD,
  getScrollProgress,
  isRecruitmentPopupInCooldown,
  markRecruitmentPopupDismissed,
} from "@/utils/recruitmentPopup";

interface UseRecruitmentPopupOptions {
  /** When false, triggers are not registered (e.g. off homepage). */
  enabled: boolean;
}

interface UseRecruitmentPopupReturn {
  isOpen: boolean;
  /** Closes the popup and starts the 24-hour cooldown. */
  dismiss: () => void;
}

/**
 * Manages recruitment popup triggers (4s timer OR 40% scroll),
 * localStorage cooldown, and body scroll lock while open.
 */
export function useRecruitmentPopup({
  enabled,
}: UseRecruitmentPopupOptions): UseRecruitmentPopupReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Hydration-safe: only evaluate localStorage after mount.
  useEffect(() => {
    if (!enabled) {
      setCanTrigger(false);
      return;
    }

    if (isRecruitmentPopupInCooldown()) {
      setCanTrigger(false);
      return;
    }

    setCanTrigger(true);
  }, [enabled]);

  const openPopup = useCallback(() => {
    if (hasTriggeredRef.current) return;

    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, []);

  const dismiss = useCallback(() => {
    markRecruitmentPopupDismissed();
    setIsOpen(false);
  }, []);

  // Time-based and scroll-based triggers — whichever fires first.
  useEffect(() => {
    if (!canTrigger || isOpen) return;

    const timerId = window.setTimeout(openPopup, RECRUITMENT_POPUP_DELAY_MS);

    const handleScroll = () => {
      if (getScrollProgress() >= RECRUITMENT_POPUP_SCROLL_THRESHOLD) {
        openPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canTrigger, isOpen, openPopup]);

  // Prevent background scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return { isOpen, dismiss };
}
