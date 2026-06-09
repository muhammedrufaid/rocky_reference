"use client";

import { motion } from "framer-motion";
import { CallIcon, WhatsAppIcon } from "@/utils/icons";

const PHONE_HREF = "tel:+97144476644";
const WHATSAPP_HREF = "https://wa.me/971564120637";
const WHATSAPP_GREEN = "#25d366";

function ChatIcon({ width = 16, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...SPRING, delay: i * 0.08 },
  }),
};

const dividerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { ...SPRING, delay: i * 0.08 + 0.04 },
  }),
};

function Divider({ custom }: { custom: number }) {
  return (
    <motion.div
      custom={custom}
      variants={dividerVariants}
      initial="hidden"
      animate="visible"
      className="my-1 origin-center"
      style={{ width: "1px", height: "8px", background: "rgba(196,169,109,0.4)" }}
      aria-hidden="true"
    />
  );
}

interface IconButtonProps {
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  tooltip: string;
  solid?: boolean;
  variant?: "gold" | "whatsapp";
  custom: number;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

function IconButton({
  href,
  onClick,
  ariaLabel,
  tooltip,
  solid = false,
  variant = "gold",
  custom,
  target,
  rel,
  children,
}: IconButtonProps) {
  const focusRing =
    variant === "whatsapp"
      ? "focus-visible:ring-[#25d366]"
      : "focus-visible:ring-[#c4a96d]";

  const baseClass = `
    group relative
    flex h-12 w-12 sm:h-9 sm:w-9 items-center justify-center
    shrink-0 rounded-full
    shadow-[0_4px_14px_rgba(0,0,0,0.25)]
    transition-opacity duration-200
    hover:opacity-85
    touch-manipulation
    focus:outline-none
    focus-visible:ring-2 ${focusRing} focus-visible:ring-offset-2
  `;

  const solidStyle =
    variant === "whatsapp"
      ? { background: WHATSAPP_GREEN, color: "#ffffff" }
      : { background: "#c4a96d", color: "#0f1923" };

  const outlineStyle = {
    background: "transparent",
    border: "1px solid #c4a96d",
    color: "#c4a96d",
  };

  const inner = (
    <>
      {children}
      <span
        className="
          pointer-events-none absolute right-full mr-3
          hidden whitespace-nowrap
          rounded-sm
          px-2.5 py-1
          text-xs font-medium tracking-wide
          opacity-0
          transition-opacity duration-200
          group-hover:opacity-100
          group-focus-visible:opacity-100
          lg:block
        "
        style={{ background: "rgba(15,25,35,0.92)", color: "#c4a96d" }}
        aria-hidden="true"
      >
        {tooltip}
      </span>
    </>
  );

  const motionProps = {
    custom,
    variants: itemVariants,
    initial: "hidden" as const,
    animate: "visible" as const,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={baseClass}
        style={solid ? solidStyle : outlineStyle}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClass}
      style={solid ? solidStyle : outlineStyle}
    >
      {inner}
    </motion.button>
  );
}

interface StickyWhatsAppProps {
  onChatOpen: () => void;
}

export default function StickyWhatsApp({ onChatOpen }: StickyWhatsAppProps) {
  return (
    <aside
      className="fixed bottom-6 right-4 z-40 sm:bottom-8 sm:right-6"
      aria-label="Quick contact"
    >
      <div className="flex flex-col items-center gap-0">
        <IconButton
          href={PHONE_HREF}
          ariaLabel="Call Rocky Real Estate"
          tooltip="Call"
          solid={false}
          custom={2}
        >
          <CallIcon width={16} height={16} />
        </IconButton>

        <Divider custom={1} />

        <IconButton
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Chat on WhatsApp with Rocky Real Estate"
          tooltip="WhatsApp"
          solid
          variant="whatsapp"
          custom={1}
        >
          <WhatsAppIcon width={18} height={18} />
        </IconButton>

        {/* <Divider custom={0} />

        <IconButton
          onClick={onChatOpen}
          ariaLabel="Open chat with Rocky Real Estate"
          tooltip="Chat"
          solid={false}
          custom={0}
        >
          <ChatIcon width={16} height={16} />
        </IconButton> */}
      </div>
    </aside>
  );
}
