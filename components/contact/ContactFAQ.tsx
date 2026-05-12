"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import { AccordionChevronIcon } from "@/utils/icons";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "How quickly can I schedule a viewing?",
    answer:
      "We typically schedule viewings within 24–48 hours, subject to property availability and your preferred time slot. For urgent requests, please contact us directly via phone or WhatsApp.",
  },
  {
    id: 2,
    question: "Do you assist with mortgage advice?",
    answer:
      "Yes. We work with trusted mortgage partners and can connect you with experts who offer tailored financing solutions for UAE residents, expats, and non-residents. Our team will guide you through the process.",
  },
  {
    id: 3,
    question: "What areas do you specialize in?",
    answer:
      "We cover Dubai and the wider UAE, with strong expertise in prime areas including Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, JBR, Dubai Hills, and off-plan developments across major districts.",
  },
  {
    id: 4,
    question: "Are your consultations free?",
    answer:
      "Yes. All initial consultations are complimentary. Whether you're buying, selling, or renting, our team will provide expert guidance at no cost to help you understand the market and your options.",
  },
];

const ContactFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="faq-heading"
    >
      <Container>
        <motion.h2
          id="faq-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-medium mb-10 md:mb-14"
          style={{ color: "#0d365e" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl space-y-0">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                borderTop: index === 0 ? "1px solid #9f8870" : undefined,
                borderBottom: "1px solid #9f8870",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                <span
                  className="text-base md:text-lg font-medium pr-4"
                  style={{ color: "#0d365e" }}
                >
                  {item.question}
                </span>
                <span style={{ color: "#0d365e" }}>
                  <AccordionChevronIcon open={openId === item.id} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-5 pr-12 text-[15px] leading-relaxed"
                      style={{ color: "#555" }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactFAQ;
