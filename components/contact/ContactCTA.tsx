"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const ContactCTA: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#0d365e" }}
      aria-labelledby="cta-heading"
    >
      <Container>
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight"
          >
            Ready to Make Your Next Move?
          </h2>
          <p className="mt-4 text-white/90 text-base md:text-lg">
            Our expert team is here to guide you through every step of your property journey.
          </p>
          <div className="mt-10">
            <Link
              href="tel:+97144476644"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-lg transition-colors duration-200 hover:bg-[#e7dccd]"
              style={{
                backgroundColor: "#ffffff",
                color: "#0d365e",
              }}
            >
              Speak to Our Expert Team
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactCTA;
