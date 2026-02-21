"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
    {
      id: "faq-1",
      question: "What does Rocky Real Estate’s Property Management include?",
      answer:
        "At Rocky Real Estate, we provide end-to-end service. That covers screening, rent collection, legal compliance, maintenance, detailed financial reporting, and more. We currently manage over 300 buildings, treating every unit like our own.",
    },
    {
      id: "faq-2",
      question: "Why should you choose Rocky Real Estate?",
      answer:
        "With a legacy of over 49 years, we offer \"Local Intelligence\" and have navigated every market cycle in Dubai, providing a stable, transparent partnership for nearly 5 decades.",
    },
    {
      id: "faq-3",
      question: "Does Rocky Real Estate offer property snagging services?",
      answer:
        "Yes. Before you take possession of a new property, our experts conduct a professional snagging inspection to identify construction defects or unfinished work, ensuring the developer rectifies them before you move in or rent it out.",
    },
    {
      id: "faq-4",
      question: "Is it safe to buy off-plan property in Dubai?",
      answer:
        "Yes. The Dubai Land Department (DLD) and RERA have implemented strict regulations. All payments are deposited into a project-specific Escrow Account and are released to the developer only upon verified construction milestones.",
    },
    {
      id: "faq-5",
      question: "Can I sell my off-plan property before completion?",
      answer:
        "Most developers allow you to resell after paying a percentage of the total property value (typically 30% to 40%). Rocky Real Estate can manage the entire resale process for you.",
    },
    {
      id: "faq-6",
      question: "What are the hidden costs of buying property in Dubai?",
      answer:
        "Beyond the purchase price, you must factor in the 4% DLD fee, a registration trustee fee (approx. AED 4,000), and agency commission (typically 2%). For off-plan, there is also an Oqood (Pre-Title Deed) registration fee.",
    },
    {
      id: "faq-7",
      question: "Does buying property qualify me for a UAE Golden Visa?",
      answer:
        "If your property investment value is at Dh2 million or more, you are eligible for the 10-year Golden Visa. This qualification applies to both ready and off-plan properties (provided the investment reaches the threshold).",
    },
    {
      id: "faq-8",
      question: "Can I manage my property if I live outside the UAE?",
      answer:
        "Absolutely. Through our Remote Management services and Power of Attorney (POA) arrangements, Rocky Real Estate can handle everything from utility setup (DEWA) to tenant disputes while you remain abroad.",
    },
  ];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const FaqsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faqs-section"
      aria-labelledby="faqs-section-heading"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Subtle background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#faf9f7" }}
      />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headingVariants}
        >
          <p
            className="mb-3 text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: "#a89880", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Common Questions
          </p>
          <h2
            id="faqs-section-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
            style={{
              color: "#1c1a18",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              letterSpacing: "-0.01em",
            }}
          >
            Frequently Asked
            <br />
            <span style={{ fontStyle: "italic", color: "#7a6a56" }}>Questions</span>
          </h2>
          <div
            className="mt-5 h-px w-16"
            style={{ background: "linear-gradient(to right, #c9b99a, transparent)" }}
            aria-hidden
          />
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="border-b"
                style={{ borderColor: "#e8e0d5" }}
              >
                <button
                  id={`${faq.id}-btn`}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-panel`}
                  onClick={() => toggle(faq.id)}
                  className="group flex w-full items-start justify-between gap-4 py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={
                    {
                      "--tw-ring-color": "#c9b99a",
                      color: "#1c1a18",
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="text-base md:text-lg font-light leading-snug transition-colors duration-200"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: isOpen ? "#7a6a56" : "#1c1a18",
                      fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className="mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? "#a89880" : "#d5cab8",
                      background: isOpen ? "#a89880" : "transparent",
                    }}
                    aria-hidden
                  >
                    <motion.svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <line
                        x1="5"
                        y1="1"
                        x2="5"
                        y2="9"
                        stroke={isOpen ? "#faf9f7" : "#a89880"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="1"
                        y1="5"
                        x2="9"
                        y2="5"
                        stroke={isOpen ? "#faf9f7" : "#a89880"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>
                </button>

                {/* Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${faq.id}-panel`}
                      role="region"
                      aria-labelledby={`${faq.id}-btn`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.25, ease: "easeInOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="pb-7 pr-10 text-sm md:text-base leading-relaxed"
                        style={{
                          color: "#6b5f52",
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 300,
                          lineHeight: "1.8",
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
       
      </Container>
    </section>
  );
};

export default FaqsSection;