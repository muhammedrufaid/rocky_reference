"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

// Google Maps embed for Al Barsha 1, Dubai — replace with your actual embed URL from Google Maps
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.348882374269!2d55.1855!3d25.1124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6822a4f7a0b5%3A0x1c1c1c1c1c1c1c1c!2sAl%20Barsha%201%2C%20Dubai!5e0!3m2!1sen!2sae!4v1";

const ContactMap: React.FC = () => {
  return (
    <section
      className="pb-16 md:pb-20 lg:pb-24"
      style={{ backgroundColor: "#ffffff" }}
      aria-labelledby="map-heading"
    >
      <Container>
        {/* <motion.h2
          id="map-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-medium mb-10 md:mb-12"
          style={{ color: "#0d365e" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Visit Our Office
        </motion.h2> */}

        <motion.div
          className="relative rounded-lg overflow-hidden"
          style={{
            boxShadow: "0 4px 24px rgba(13, 54, 94, 0.08)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="aspect-[16/9] sm:aspect-[21/9] min-h-[280px] sm:min-h-[320px]"
            style={{ backgroundColor: "#ffffff" }}
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rocky Real Estate office location - Al Barsha 1, Dubai"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Optional overlay contact card on map corner */}
          <div
            className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[280px] p-4 rounded-lg bg-white shadow-lg"
            style={{ boxShadow: "0 4px 20px rgba(13, 54, 94, 0.12)" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "#0d365e" }}>
              Rocky Real Estate
            </p>
            <p className="text-sm" style={{ color: "#555" }}>
              Al Khaimah 2, Al Barsha 1, Dubai
            </p>
            <a
              href="https://maps.google.com/?q=Al+Barsha+1+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium hover:underline"
              style={{ color: "#0d365e" }}
            >
              Get Directions →
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactMap;
