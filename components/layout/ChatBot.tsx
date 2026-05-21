"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const MESSAGES = [
  {
    id: 1,
    role: "bot" as const,
    text: "Hello! Welcome to Rocky Real Estate. I'm here to help you find your perfect property in Dubai. How can I assist you today?",
  },
  {
    id: 2,
    role: "user" as const,
    text: "I'm looking for a 2-bedroom apartment in Downtown Dubai.",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(196,169,109,0.15)", border: "1px solid rgba(196,169,109,0.35)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
            stroke="#c4a96d"
            strokeWidth="1.5"
          />
          <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="#c4a96d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-3.5 py-2.5"
        style={{ background: "rgba(196,169,109,0.1)", border: "1px solid rgba(196,169,109,0.2)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full"
            style={{ background: "#c4a96d" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chatbot"
          role="dialog"
          aria-label="Rocky Real Estate chat"
          aria-modal="true"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="fixed bottom-20 right-4 z-50 flex w-72 flex-col sm:right-6 sm:w-80"
          style={{
            maxHeight: "460px",
            background: "#0f1923",
            border: "1px solid rgba(196,169,109,0.28)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            className="flex shrink-0 items-center justify-between px-4 py-3"
            style={{
              background: "#111d27",
              borderBottom: "1px solid rgba(196,169,109,0.2)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "rgba(196,169,109,0.15)", border: "1px solid rgba(196,169,109,0.4)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 9.5L12 3l9 6.5V21H3V9.5z"
                    stroke="#c4a96d"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide" style={{ color: "#c4a96d" }}>
                  Rocky Real Estate
                </p>
                <p className="text-[10px]" style={{ color: "rgba(196,169,109,0.55)" }}>
                  Online · Typically replies in minutes
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-6 w-6 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-85 focus:outline-none focus-visible:ring-2"
              style={{
                background: "rgba(196,169,109,0.12)",
                color: "#c4a96d",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" style={{ minHeight: 0 }}>
            {MESSAGES.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 280, damping: 24 }}
                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "bot" && (
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(196,169,109,0.15)",
                      border: "1px solid rgba(196,169,109,0.35)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M3 9.5L12 3l9 6.5V21H3V9.5z"
                        stroke="#c4a96d"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <p
                  className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed"
                  style={
                    msg.role === "bot"
                      ? {
                          background: "rgba(196,169,109,0.1)",
                          border: "1px solid rgba(196,169,109,0.2)",
                          color: "rgba(255,255,255,0.85)",
                          borderBottomLeftRadius: "4px",
                        }
                      : {
                          background: "#c4a96d",
                          color: "#0f1923",
                          fontWeight: 500,
                          borderBottomRightRadius: "4px",
                        }
                  }
                >
                  {msg.text}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: MESSAGES.length * 0.12, type: "spring", stiffness: 280, damping: 24 }}
            >
              <TypingIndicator />
            </motion.div>
          </div>

          <div
            className="shrink-0 px-3 py-3"
            style={{ borderTop: "1px solid rgba(196,169,109,0.18)", background: "#111d27" }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(196,169,109,0.07)", border: "1px solid rgba(196,169,109,0.22)" }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message…"
                className="flex-1 bg-transparent text-xs placeholder:text-[rgba(196,169,109,0.4)] focus:outline-none"
                style={{ color: "rgba(255,255,255,0.85)" }}
                aria-label="Type your message"
              />

              <button
                aria-label="Send message"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-opacity duration-200 hover:opacity-85 focus:outline-none focus-visible:ring-2"
                style={{ background: "#c4a96d", color: "#0f1923" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-1.5 text-center text-[9px]" style={{ color: "rgba(196,169,109,0.3)" }}>
              Rocky Real Estate · Dubai
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
