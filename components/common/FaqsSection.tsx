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
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a viewing directly through our contact form, by calling our office, or by emailing your preferred agent. We accommodate early morning, evening, and weekend appointments to suit your schedule. A confirmation with all details will be sent within 24 hours of your request.",
  },
  {
    id: "faq-2",
    question: "What documents do I need to prepare for a property purchase?",
    answer:
      "For a standard purchase, you will need a valid government-issued ID, proof of funds or a mortgage pre-approval letter, your tax returns for the past two years, recent bank statements, and employment verification. Our agents will guide you through any additional documentation specific to your transaction.",
  },
  {
    id: "faq-3",
    question: "How long does the buying process typically take?",
    answer:
      "From accepted offer to closing, the process generally takes 30 to 60 days, depending on financing, inspections, and any negotiations that arise. Cash transactions can close considerably faster. Our team actively manages each milestone to keep your purchase on track and on schedule.",
  },
  {
    id: "faq-4",
    question: "Do you assist with property valuations before listing?",
    answer:
      "Absolutely. We offer complimentary comparative market analyses for homeowners considering selling. Our advisors assess recent sales, current inventory, property condition, and local market trends to provide an accurate and realistic valuation — with no obligation to list.",
  },
  {
    id: "faq-5",
    question: "What areas do you serve?",
    answer:
      "We specialize in luxury residential and investment properties across the metropolitan region, including the urban core, suburban enclaves, and select coastal communities. Contact our office to confirm coverage in your specific neighborhood or to be connected with a trusted partner in adjacent markets.",
  },
  {
    id: "faq-6",
    question: "Can you help with investment or rental properties?",
    answer:
      "Yes. Our investment advisory team works with both first-time investors and seasoned portfolio holders. We provide cap rate analysis, rental yield projections, tenant placement support, and property management referrals — ensuring your asset performs at its highest potential from day one.",
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