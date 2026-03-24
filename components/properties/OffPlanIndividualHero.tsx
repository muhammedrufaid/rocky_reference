'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, Thumbs, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import Container from '../layout/Container'

// ─── Types ────────────────────────────────────────────────────────────────────

interface OffPlanHeroProps {
  images?: string[]
  propertyTitle?: string
  price?: string
  startingPrice?: string
  city?: string
  locality?: string
  subLocality?: string
  towerName?: string
  bedrooms?: number | string
  bathrooms?: number | string
  propertySize?: string
  propertyType?: string
  propertyStatus?: string
  offPlan?: boolean
  handoverDate?: string
  whatsappNumber?: string
  onRequestCallback?: () => void
  onDownloadBrochure?: () => void
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85',
]

// ─── Icons ────────────────────────────────────────────────────────────────────

const BedIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V19M22 9V19M2 19H22M2 9H22M2 9C2 9 2 5 7 5H17C22 5 22 9 22 9" />
    <path d="M12 5V9M7 9V7C7 6 8 5 9 5H15C16 5 17 6 17 7V9" />
  </svg>
)

const BathIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12H20V17C20 19.2 18.2 21 16 21H8C5.8 21 4 19.2 4 17V12Z" />
    <path d="M4 12V5C4 3.9 4.9 3 6 3H8C9.1 3 10 3.9 10 5V12" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
)

const SizeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3V21M3 9H9M3 15H9" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.18 2 2 0 012.06.03h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const LocationPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5C3.9 3 3 3.9 3 5V8M21 8V5C21 3.9 20.1 3 19 3H16M16 21H19C20.1 21 21 20.1 21 19V16M3 16V19C3 20.1 3.9 21 5 21H8" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const OffPlanIndividualHero: React.FC<OffPlanHeroProps> = ({
  images = DEMO_IMAGES,
  propertyTitle = 'Elara Residences at Palm Jumeirah',
  price = 'AED 4,200,000',
  startingPrice = 'AED 4.2M',
  city = 'Dubai',
  locality = 'Palm Jumeirah',
  subLocality = 'The Crescent',
  towerName = 'Elara Tower A',
  bedrooms = 3,
  bathrooms = 4,
  propertySize = '2,840',
  propertyType = 'Apartment',
  propertyStatus = 'Under Construction',
  offPlan = true,
  handoverDate = 'Q4 2027',
  whatsappNumber = '971501234567',
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const [thumbsSwiperMain, setThumbsSwiperMain] = useState<SwiperType | null>(null)
  const [thumbsSwiperFullscreen, setThumbsSwiperFullscreen] = useState<SwiperType | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleWhatsApp = () => window.open(`https://wa.me/${whatsappNumber}`, '_blank')

  const titleWords = propertyTitle.split(' ')
  const titleMain = titleWords.slice(0, -2).join(' ')
  const titleAccent = titleWords.slice(-2).join(' ')

  const metaItems = [
    { icon: <BedIcon />, label: 'Beds', value: String(bedrooms) },
    { icon: <BathIcon />, label: 'Baths', value: String(bathrooms) },
    { icon: <SizeIcon />, label: 'Area', value: `${propertySize} sqft` },
  ]

  return (
    <>
      {/* Minimal Swiper overrides — only what Tailwind can't do */}
      <style>{`
        .hero-main-swiper .swiper-pagination { bottom: 56px !important; left: 50% !important; transform: translateX(-50%) !important; width: auto !important; }
        @media (min-width: 1024px) { .hero-main-swiper .swiper-pagination { display: none; } }
        .hero-main-swiper .swiper-pagination-bullet { background: rgba(255,255,255,0.35); opacity: 1; width: 6px; height: 6px; transition: all 0.3s; margin: 0 3px !important; }
        .hero-main-swiper .swiper-pagination-bullet-active { background: #C9A96E; width: 20px; border-radius: 3px; }
        .hero-thumb-swiper .swiper-slide { opacity: 0.45; transition: opacity 0.25s, outline 0.25s; cursor: pointer; border-radius: 8px; }
        .hero-thumb-swiper .swiper-slide-thumb-active { opacity: 1; outline: 1.5px solid #C9A96E; box-shadow: 0 0 0 3px rgba(201,169,110,0.2); }
        .fullscreen-swiper .swiper-button-prev, .fullscreen-swiper .swiper-button-next { color: rgba(255,255,255,0.7); }
        .fullscreen-swiper .swiper-button-prev:hover, .fullscreen-swiper .swiper-button-next:hover { color: #C9A96E; }
        .fullscreen-thumb-swiper .swiper-slide { opacity: 0.45; cursor: pointer; border-radius: 8px; transition: opacity 0.25s; }
        .fullscreen-thumb-swiper .swiper-slide-thumb-active { opacity: 1; outline: 1.5px solid #C9A96E; }
      `}</style>

      <section className="py-10 md:py-12 lg:py-14" aria-label="Property description">
        <Container>

          {/* ── Hero Wrapper ── */}
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[520px] max-h-[720px] aspect-video">

            {/* ── Main Image Swiper ── */}
            <Swiper
              className="hero-main-swiper !absolute inset-0 w-full h-full"
              modules={[Autoplay, EffectFade, Pagination, Thumbs]}
              effect="fade"
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              thumbs={{
                swiper: thumbsSwiperMain && !thumbsSwiperMain.destroyed ? thumbsSwiperMain : null,
              }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={i} className="!w-full !h-full">
                  <img
                    src={src}
                    alt={`Property view ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ── Gradient Overlays ── */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/10 to-transparent z-10 pointer-events-none" />

            {/* ── Gallery Button (top-right) ── */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/12 text-white/55 hover:text-white hover:border-white/25 transition-all duration-200 text-[11px] tracking-widest uppercase cursor-pointer"
            >
              <ExpandIcon />
              <span className="hidden sm:inline">Gallery</span>
            </button>

            {/* ── Main Content Layer ── */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 md:p-10">
              <div className="flex items-end justify-between gap-8 xl:gap-10">

                {/* ── LEFT COLUMN ── */}
                <div className="flex-1 min-w-0 flex flex-col gap-4">

                  {/* Breadcrumb */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-amber-400/75">
                      <LocationPinIcon />
                    </span>
                    <span className="text-white/45 text-[11px] tracking-widest uppercase font-light">{city}</span>
                    <span className="text-white/22 text-[11px]">›</span>
                    <span className="text-white/45 text-[11px] tracking-widest uppercase font-light">{locality}</span>
                    <span className="text-white/22 text-[11px]">›</span>
                    <span className="text-white/45 text-[11px] tracking-widest uppercase font-light">{subLocality}</span>
                    <span className="text-white/22 text-[11px]">›</span>
                    <span className="text-amber-300/85 text-[11px] tracking-widest uppercase font-light">{towerName}</span>
                  </div>

                  {/* Property Title */}
                  <h1 className="text-4xl md:text-5xl xl:text-[3.25rem] font-light leading-[1.1] text-white/95 tracking-tight">
                    {titleMain}{' '}
                    <em className="not-italic italic text-amber-300/90">{titleAccent}</em>
                  </h1>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2">
                    {offPlan && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium bg-amber-400/10 border border-amber-400/35 text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Off Plan
                      </span>
                    )}
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium bg-white/8 border border-white/15 text-white/85">
                      {propertyType}
                    </span>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium bg-white/8 border border-white/15 text-white/85">
                      {propertyStatus}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-[2.2rem] font-semibold text-amber-300/95 tracking-tight leading-none">
                      {price}
                    </span>
                    <span className="text-[11px] tracking-widest uppercase text-white/38 font-light">
                      Starting Price
                    </span>
                  </div>

                  {/* Meta Strip */}
                  <div className="flex">
                    {metaItems.map((item, i) => (
                      <div
                        key={i}
                        className={[
                          'flex items-center gap-2.5 px-4 py-2.5 bg-black/55 backdrop-blur-xl border border-amber-400/15 text-white',
                          i === 0 && 'rounded-l-xl',
                          i === metaItems.length - 1 && 'rounded-r-xl',
                          i > 0 && 'border-l-0',
                        ].filter(Boolean).join(' ')}
                      >
                        <span className="text-amber-400/75 flex-shrink-0">{item.icon}</span>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[10px] tracking-widest uppercase text-white/42 font-light">{item.label}</span>
                          <span className="text-[13px] font-medium text-white/90">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Thumbnail Swiper — desktop only, below meta */}
                  <div className="hidden md:block w-52">
                    <Swiper
                      className="hero-thumb-swiper"
                      modules={[Thumbs]}
                      watchSlidesProgress
                      onSwiper={setThumbsSwiperMain}
                      slidesPerView={4}
                      spaceBetween={6}
                    >
                      {images.map((src, i) => (
                        <SwiperSlide key={i}>
                          <div className="h-9 rounded-lg overflow-hidden">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                {/* ── GLASS CARD (right, desktop) ── */}
                <div className="hidden lg:flex flex-col gap-4 w-[268px] flex-shrink-0 bg-black/62 backdrop-blur-2xl border border-amber-400/18 rounded-2xl p-6 shadow-[0_8px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(201,169,110,0.1)]">

                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-white/38 font-light mb-1">Starting From</p>
                    <p className="text-2xl font-semibold text-amber-300/95 leading-tight">{startingPrice}</p>
                  </div>

                  {handoverDate && (
                    <>
                      <div className="h-px bg-amber-400/12" />
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-white/38 font-light mb-1">Handover</p>
                        <p className="text-[15px] font-medium text-white/85">{handoverDate}</p>
                      </div>
                    </>
                  )}

                  <div className="h-px bg-amber-400/12" />

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={onRequestCallback}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[12.5px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(201,169,110,0.35)] cursor-pointer"
                    >
                      <PhoneIcon /> Request Callback
                    </button>
                    <button
                      onClick={onDownloadBrochure}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/7 hover:bg-white/12 border border-white/15 text-white text-[12.5px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-px cursor-pointer"
                    >
                      <DownloadIcon /> Download Brochure
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/25 text-[#25D366] text-[12.5px] font-medium tracking-wide transition-all duration-200 hover:-translate-y-px cursor-pointer"
                    >
                      <WhatsAppIcon /> WhatsApp Us
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2.5 px-4 py-3 bg-black/92 backdrop-blur-xl border-t border-amber-400/15">
        <button
          onClick={onRequestCallback}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[12px] font-medium tracking-wide transition-all duration-200 cursor-pointer"
        >
          <PhoneIcon /> Callback
        </button>
        <button
          onClick={onDownloadBrochure}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white text-[12px] font-medium tracking-wide transition-all duration-200 cursor-pointer"
        >
          <DownloadIcon /> Brochure
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#25D366]/12 border border-[#25D366]/25 text-[#25D366] transition-all duration-200 cursor-pointer"
        >
          <WhatsAppIcon />
        </button>
      </div>

      {/* ── Fullscreen Gallery ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col">
          <button
            className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-200 cursor-pointer"
            onClick={() => setIsFullscreen(false)}
          >
            <CloseIcon />
          </button>

          <div className="flex-1 flex items-center justify-center px-4 pt-16 pb-4">
            <Swiper
              className="fullscreen-swiper w-full max-w-5xl"
              modules={[Navigation, Pagination, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              loop
              thumbs={{
                swiper: thumbsSwiperFullscreen && !thumbsSwiperFullscreen.destroyed ? thumbsSwiperFullscreen : null,
              }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="flex items-center justify-center h-[65vh]">
                    <img
                      src={src}
                      alt={`Property view ${i + 1}`}
                      className="max-w-full max-h-full object-contain rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="px-4 pb-6">
            <Swiper
              className="fullscreen-thumb-swiper max-w-2xl mx-auto"
              modules={[Thumbs]}
              watchSlidesProgress
              onSwiper={setThumbsSwiperFullscreen}
              spaceBetween={8}
              breakpoints={{
                320: { slidesPerView: 4 },
                640: { slidesPerView: 6 },
                1024: { slidesPerView: 8 },
              }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="h-14 rounded-lg overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  )
}

export default OffPlanIndividualHero