"use client";

import { useState } from "react";
import StickyWhatsApp from "@/components/layout/StickyWhatsApp";
import ChatBot from "@/components/layout/ChatBot";

export default function ContactWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <StickyWhatsApp onChatOpen={() => setIsChatOpen(true)} />
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
