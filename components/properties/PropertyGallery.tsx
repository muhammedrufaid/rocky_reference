"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Container from "../layout/Container";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  propertyTitle?: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images = [],
  propertyTitle = "Property",
}) => {

  return (
    <section
      className="py-6 md:py-10"
      aria-labelledby="gallery-heading"
    >
      <Container>
        <div>
          <Image

            src={images[0]}
            alt={propertyTitle}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </Container>

    </section>
  );
};

export default PropertyGallery;
