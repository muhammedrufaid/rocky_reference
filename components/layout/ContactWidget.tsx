"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import StickyWhatsApp from "@/components/layout/StickyWhatsApp";
import ChatBot from "@/components/layout/ChatBot";

/** Pages with their own agent/property WhatsApp & call CTAs (OffPlanIndividualHero). */
function hasPropertyContactCtas(pathname: string) {
  return (
    /^\/off-plan-properties\/in-dubai\/[^/]+$/.test(pathname) ||
    /^\/properties\/(?:buy|rent)\/in-dubai\/[^/]+$/.test(pathname)
  );
}

export default function ContactWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname();
  const showStickyContact = !hasPropertyContactCtas(pathname);

  return (
    <>
      {showStickyContact ? (
        <StickyWhatsApp onChatOpen={() => setIsChatOpen(true)} />
      ) : null}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
