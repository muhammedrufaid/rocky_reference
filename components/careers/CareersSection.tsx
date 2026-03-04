"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface CareersIntroSectionProps {
  data?: any[];
}

const CareersIntroSection: React.FC<CareersIntroSectionProps> = ({ data }) => {
  

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="careers-section-heading"
    >
      <Container>
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <motion.h2
              id="off-plan-section-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
              style={{ color: "#0d365e" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Featured Off Plan Projects
            </motion.h2>
            <motion.p
              className="mt-3 text-sm md:text-base max-w-lg"
              style={{ color: "#555" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              Explore and invest in top off-plan projects located in prime areas in Dubai.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="self-start sm:self-auto"
          >
          </motion.div>
        </header>

        {/* Grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-visible">

        </div>
      </Container>
    </section>
  );
};

export default CareersIntroSection;