"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import StickyWhatsApp from "@/components/layout/StickyWhatsApp";
import ChatBot from "@/components/layout/ChatBot";
import { isContactWidgetHidden } from "@/utils/contactWidget";

export default function ContactWidget() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (isContactWidgetHidden(pathname)) {
    return null;
  }

  return (
    <>
      <StickyWhatsApp onChatOpen={() => setIsChatOpen(true)} />
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
