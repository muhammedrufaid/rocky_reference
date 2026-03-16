"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

const officePhotos = [
    {
        src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
        alt: "Rocky Real Estate office reception area",
    },
    {
        src: "https://images.pexels.com/photos/5520323/pexels-photo-5520323.jpeg",
        alt: "Rocky Real Estate team workspace",
    },
    {
        src: "https://images.pexels.com/photos/7652055/pexels-photo-7652055.jpeg",
        alt: "Rocky Real Estate office consultation space",
    },
    {
        src: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg",
        alt: "Rocky Real Estate office meeting zone",
    },
    {
        src: "https://images.pexels.com/photos/33827315/pexels-photo-33827315.jpeg",
        alt: "Rocky Real Estate front desk office view",
    },
    {
        src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        alt: "Rocky Real Estate client interaction area",
    },
];

const OfficeGallerySection: React.FC = () => {
    return (
        <section
            className="pb-16 md:pb-20 lg:pb-24"
            style={{ backgroundColor: "#ffffff" }}
            aria-labelledby="office-gallery-heading"
        >
            <Container>
                <div className="space-y-10">
                    <header className="text-center max-w-2xl mx-auto">
                        <h2
                            id="office-gallery-heading"
                            className="text-3xl md:text-4xl font-medium text-slate-900"
                        >
                            Visit Our Office
                        </h2>
                        <p className="mt-3 text-base md:text-lg text-slate-600">
                            Step inside our workspace and discover where we
                            help clients find their perfect property.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {officePhotos.map((photo, index) => (
                            <div
                                key={photo.src}
                                className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority={index < 2}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default OfficeGallerySection;
