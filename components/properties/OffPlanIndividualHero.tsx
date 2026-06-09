'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import Container from '../layout/Container'
import type { ApiPropertyDetail } from '@/utils/getServices'
import {
  CallIcon,
  DirhamIcon,
  DownloadArrowIcon,
  MapPinFilledIcon,
  OffPlanBathIcon,
  OffPlanBedIcon,
  OffPlanCarouselChevronLeftIcon,
  OffPlanCarouselChevronRightIcon,
  OffPlanPropertySizeIcon,
  WhatsAppIcon,
} from '@/utils/icons'

// ─── Types ────────────────────────────────────────────────────────────────────

interface OffPlanHeroProps {
  data?: ApiPropertyDetail
  images?: string[]
  propertyTitle?: string
  price?: string
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



// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// ─── Component ────────────────────────────────────────────────────────────────

const OffPlanIndividualHero: React.FC<OffPlanHeroProps> = ({
  data,
  images,
  propertyTitle,
  price,
  city,
  locality,
  subLocality,
  towerName,
  bedrooms,
  bathrooms,
  propertySize,
  propertyType,
  offPlan,
  handoverDate,
  whatsappNumber,
  onRequestCallback,
  onDownloadBrochure,
}) => {
  const resolvedImages = (data?.images ?? images) as string[]
  const resolvedPropertyTitle = data?.propertyTitle ?? data?.towerName ?? data?.propertyRefNo ?? propertyTitle
  const resolvedPrice = data?.price != null
    ? Number(data.price).toLocaleString()
    : String(price ?? '').replace(/^\s*aed\s*/i, '').trim()
  const resolvedCity = data?.city ?? city
  const resolvedLocality = data?.locality ?? locality
  const resolvedSubLocality = data?.subLocality ?? subLocality
  const resolvedTowerName = data?.towerName ?? towerName
  const resolvedBedrooms = data?.bedrooms ?? bedrooms
  const resolvedBathrooms = data?.bathrooms ?? bathrooms
  const resolvedPropertySize = data?.propertySize ?? propertySize
  const resolvedPropertyType = data?.propertyType ?? propertyType
  const resolvedOffPlan = data?.offPlan ? data.offPlan.toLowerCase() === 'yes' : offPlan
  const resolvedContactPhone =
    (data?.listingAgentPhone ?? whatsappNumber)?.replace(/\D/g, '') || '97144476644'

  const callbackPhoneHref = useMemo(
    () => `tel:+${resolvedContactPhone}`,
    [resolvedContactPhone],
  )

  const safeImages = useMemo(() => (Array.isArray(resolvedImages) ? resolvedImages.filter(Boolean) : []), [resolvedImages])

  const openWhatsApp = useCallback(
    (prefilledText?: string) => {
      const base = `https://wa.me/${resolvedContactPhone}`
      const url = prefilledText ? `${base}?text=${prefilledText}` : base
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    [resolvedContactPhone],
  )

  const handleWhatsApp = useCallback(() => openWhatsApp(), [openWhatsApp])

  const handleRequestCallbackClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (onRequestCallback) {
        e.preventDefault()
        onRequestCallback()
      }
    },
    [onRequestCallback],
  )
  const canLoop = safeImages.length > 1

  const heroSwiperRef = useRef<SwiperType | null>(null)
  const [heroThumbsSwiper, setHeroThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  // ─── Lightbox (same UX as PropertyGallery) ─────────────────────────────────
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [lightboxFading, setLightboxFading] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const lightboxTouchX = useRef(0)
  const lightboxThumbRef = useRef<HTMLDivElement>(null)

  const syncHeroTo = useCallback(
    (idx: number) => {
      setActiveIndex(idx)
      const swiper = heroSwiperRef.current
      if (!swiper) return
      if (swiper.params.loop) swiper.slideToLoop(idx)
      else swiper.slideTo(idx)
    },
    []
  )

  const openLightbox = useCallback(
    (idx: number) => {
      setLightboxIdx(idx)
      setZoomed(false)
      setLightboxOpen(true)
    },
    []
  )

  const handleThumbClick = useCallback(
    (idx: number) => {
      openLightbox(idx)
    },
    [openLightbox],
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setZoomed(false)
  }, [])

  const lightboxNav = useCallback(
    (dir: number) => {
      if (zoomed) return
      if (!safeImages.length) return
      const next = (lightboxIdx + dir + safeImages.length) % safeImages.length
      setLightboxFading(true)
      setTimeout(() => {
        setLightboxIdx(next)
        setLightboxFading(false)
        syncHeroTo(next)
        if (lightboxThumbRef.current) {
          const thumbEl = lightboxThumbRef.current.children[next] as HTMLElement
          thumbEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
      }, 160)
    },
    [lightboxIdx, safeImages.length, syncHeroTo, zoomed]
  )

  const handleLightboxThumbClick = useCallback(
    (i: number) => {
      if (i === lightboxIdx) return
      setLightboxFading(true)
      setTimeout(() => {
        setLightboxIdx(i)
        syncHeroTo(i)
        setLightboxFading(false)
      }, 160)
    },
    [lightboxIdx, syncHeroTo]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') lightboxNav(-1)
      if (e.key === 'ArrowRight') lightboxNav(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeLightbox, lightboxNav, lightboxOpen])

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const locationParts = [resolvedCity, resolvedLocality, resolvedSubLocality, resolvedTowerName].filter(Boolean)

  const highlights = [
    { icon: <OffPlanBedIcon />, value: resolvedBedrooms, label: 'Beds' },
    { icon: <OffPlanBathIcon />, value: resolvedBathrooms, label: 'Baths' },
    { icon: <OffPlanPropertySizeIcon />, value: `${resolvedPropertySize}`, label: 'sqft' },
  ]

  useEffect(() => {
    const swiper = heroSwiperRef.current
    if (!swiper) return
    if (!prevRef.current || !nextRef.current) return

    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      swiper.params.navigation.prevEl = prevRef.current
      swiper.params.navigation.nextEl = nextRef.current
    }

    swiper.navigation?.destroy?.()
    swiper.navigation?.init?.()
    swiper.navigation?.update?.()
  }, [])

  useEffect(() => {
    const thumbs = heroThumbsSwiper
    if (!thumbs || thumbs.destroyed) return
    thumbs.slideTo(activeIndex)
  }, [activeIndex, heroThumbsSwiper])

  return (
    <>
      {/* ── Swiper CSS Overrides ── */}
      <style>{`
        .rre-hero-swiper { width: 100%; height: 100%; }
        .rre-hero-swiper .swiper-slide { width: 100%; height: 100%; }
        .rre-thumb-swiper .swiper-slide { opacity: 0.5; transition: opacity 0.2s; border-radius: 4px; overflow: hidden; cursor: pointer; }
        .rre-thumb-swiper .swiper-slide-thumb-active { opacity: 1; }
        .rre-gallery-swiper .swiper-button-prev,
        .rre-gallery-swiper .swiper-button-next { display: none; }
      `}</style>

      <section className="relative w-full">
        {/* ── MAIN HERO ── */}
        <div className="relative w-full" style={{ minHeight: '100vh' }}>

          {/* ── Background Slider ── */}
          <div className="absolute inset-0 z-0">
            <Swiper
              className="rre-hero-swiper"
              modules={[Autoplay, EffectFade, Navigation]}
              effect="fade"
              autoplay={canLoop ? { delay: 5000, disableOnInteraction: false } : false}
              loop={canLoop}
              speed={1000}
              navigation={{
                prevEl: prevRef.current ?? undefined,
                nextEl: nextRef.current ?? undefined,
              }}
              onBeforeInit={(swiper) => {
                heroSwiperRef.current = swiper
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current
                  swiper.params.navigation.nextEl = nextRef.current
                }
              }}
              onInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current
                  swiper.params.navigation.nextEl = nextRef.current
                }
                swiper.navigation?.destroy?.()
                swiper.navigation?.init?.()
                swiper.navigation?.update?.()
              }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
            >
              {safeImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="w-full h-full">
                    <img
                      src={src}
                      alt={`View ${i + 1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover"
                      style={{ minHeight: 'min(92vh, 780px)' }}
                      onClick={() => openLightbox(activeIndex)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom scrim — keeps text readable */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 30%, rgba(0,0,0,0.18) 58%, transparent 100%)',
              }}
            />
            {/* Left-side scrim — protects text content column only */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.08) 60%, transparent 100%)',
              }}
            />
          </div>

          {/* ── Content ── */}
          <div className="relative z-20 flex flex-col justify-end h-full" style={{ minHeight: 'min(92vh, 780px)' }}>
            <Container>
              <div className="pb-10 pt-24 md:pb-12 lg:pb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">

                {/* ── LEFT: Property Info ── */}
                <motion.div
                  className="flex-1 min-w-0 flex flex-col gap-5"
                  initial="hidden"
                  animate="visible"
                >
                  {/* Location breadcrumb */}
                  <motion.div
                    variants={fadeUp}
                    custom={0}
                    className="flex items-center gap-1.5 flex-wrap"
                  >
                    <span className="text-[#C3AD95]"><MapPinFilledIcon /></span>
                    {locationParts.map((part, i) => (
                      <React.Fragment key={i}>
                        <span className="text-[#f6f6f6] text-[11px] tracking-[0.15em] uppercase font-light">
                          {part}
                        </span>
                        {i < locationParts.length - 1 && (
                          <span className="text-white/30 text-[10px]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    variants={fadeUp}
                    custom={1}
                    className="text-3xl md:text-4xl xl:text-5xl font-light leading-[1.08] text-white tracking-tight max-w-2xl"
                  // style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", textShadow: '0 2px 20px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {resolvedPropertyTitle}
                  </motion.h1>

                  {/* Tags row */}
                  <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-2">
                    {resolvedOffPlan && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] tracking-[0.18em] uppercase font-medium bg-[#C3AD95]/15 border border-[#C3AD95]/30 text-[#f6f6f6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C3AD95] animate-pulse" />
                        Off Plan
                      </span>
                    )}
                    <span className="inline-flex items-center px-3 py-1 rounded-sm text-[10px] tracking-[0.18em] uppercase font-light bg-white/10 border border-white/18 text-[#f6f6f6]">
                      {resolvedPropertyType}
                    </span>
                    {handoverDate && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] tracking-[0.18em] uppercase font-light bg-white/10 border border-white/18 text-white/80">
                        Handover {handoverDate}
                      </span>
                    )}
                  </motion.div>

                  {/* Price */}
                  {/* <motion.div variants={fadeUp} custom={3} className="flex items-baseline gap-3">
                    <span
                      className="text-3xl md:text-4xl font-light text-white tracking-tight"
                      // style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
                    >
                      {resolvedPrice}
                    </span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-light pb-1">
                      Starting Price
                    </span>
                  </motion.div> */}

                  {/* Highlights strip */}
                  <motion.div variants={fadeUp} custom={4} className="flex gap-0">
                    {highlights.map((h, i) => (
                      <div
                        key={i}
                        className={[
                          'flex items-center gap-2.5 px-4 py-3 backdrop-blur-md border border-white/15',
                          'bg-black/30',
                          i === 0 && 'rounded-l-md',
                          i === highlights.length - 1 && 'rounded-r-md',
                          i > 0 && 'border-l-0',
                        ].filter(Boolean).join(' ')}
                      >
                        <span className="text-[#C3AD95]/80">{h.icon}</span>
                        <div className="leading-tight">
                          <span className="block text-[13px] font-medium text-white/95">{h.value}</span>
                          <span className="block text-[10px] tracking-widest uppercase text-[#f6f6f6] font-light">{h.label}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Thumbnail strip + gallery btn */}
                  <motion.div variants={fadeUp} custom={5} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1 md:flex-none md:w-[35rem]">
                      <Swiper
                        className="rre-thumb-swiper"
                        onSwiper={setHeroThumbsSwiper}
                        slidesPerView={4}
                        spaceBetween={7}
                      >
                        {safeImages.map((src, i) => (
                          <SwiperSlide
                            key={i}
                            className={i === activeIndex ? 'swiper-slide-thumb-active' : undefined}
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              aria-label={`Open photo ${i + 1}`}
                              onClick={() => handleThumbClick(i)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleThumbClick(i)
                                }
                              }}
                              className="h-[70px] md:h-[100px] w-full rounded overflow-hidden"
                            >
                              <img src={src} alt="" className="w-full h-full object-cover" />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      {safeImages.length > 1 && (
                        <div className="flex items-center justify-start gap-3 mt-2">
                          <button
                            type="button"
                            aria-label="Previous thumbnail"
                            disabled={activeIndex === 0}
                            onClick={() => syncHeroTo(activeIndex - 1)}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-[#C3AD95]/50 hover:text-[#C3AD95] transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white/60"
                          >
                            <OffPlanCarouselChevronLeftIcon />
                          </button>
                          <span className="text-[11px] tracking-[0.2em] text-white/50 tabular-nums">
                            {activeIndex + 1} / {safeImages.length}
                          </span>
                          <button
                            type="button"
                            aria-label="Next thumbnail"
                            disabled={activeIndex === safeImages.length - 1}
                            onClick={() => syncHeroTo(activeIndex + 1)}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-[#C3AD95]/50 hover:text-[#C3AD95] transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white/60"
                          >
                            <OffPlanCarouselChevronRightIcon />
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => openLightbox(activeIndex)}
                      className="flex shrink-0 items-center justify-center gap-1.5 h-[70px] md:h-[100px] px-3 text-[13px] md:text-[14px] tracking-[0.18em] uppercase text-[#f6f6f6] hover:text-[#f6f6f6]/80 transition-colors duration-200 cursor-pointer"
                    >
                      <span className="text-[#C3AD95]">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </span>
                      All Photos ({safeImages.length})
                    </button>
                  </motion.div>
                </motion.div>

                {/* ── RIGHT: CTA Card ── */}
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  className="hidden lg:block w-[260px] flex-shrink-0"
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      background: 'rgba(0,0,0,0.45)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                    }}
                  >
                    {/* Thin accent line at top */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C3AD95]/60 to-transparent" />

                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-[#f6f6f6] mb-1">Starting From</p>
                        <p
                          className="text-[1.65rem] font-semibold text-white leading-tight"
                        // style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                        >
                          <span className="inline-flex items-center gap-1 whitespace-nowrap leading-none">
                            <DirhamIcon className="w-[20px] h-[20px] shrink-0 " aria-hidden />
                            <span className="leading-none">{resolvedPrice}</span>
                          </span>
                        </p>
                      </div>

                      {handoverDate && (
                        <div className="flex items-center justify-between py-3 border-t border-white/10">
                          <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-light">Handover</span>
                          <span className="text-[13px] font-medium text-white/90">{handoverDate}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 pt-1">
                        {/* Primary CTA — same number as WhatsApp, opens phone dialer */}
                        <a
                          href={callbackPhoneHref}
                          onClick={handleRequestCallbackClick}
                          className="group relative flex items-center justify-center gap-2 w-full py-3 rounded-md overflow-hidden text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 cursor-pointer no-underline"
                          style={{ background: 'linear-gradient(135deg, #0D365E, #1C4E80)', color: '#E7DCCD' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #1C4E80, #0D365E)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #0D365E, #1C4E80)')}
                        >
                          <CallIcon width="14" height="14" />
                          Call the Agent
                        </a>

                        {/* WhatsApp */}
                        <button
                          onClick={handleWhatsApp}
                          type="button"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#25D366] transition-all duration-200 cursor-pointer"
                          style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.22)' }}
                        >
                          <WhatsAppIcon width="14" height="14" />
                          WhatsApp Us
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Container>

            {/* ── Slide Counter + Nav (bottom-right, desktop) ── */}
            
          </div>
        </div>
      </section>

      {/* ── MOBILE Sticky CTA Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 px-4 py-3 border-t border-white/8"
        style={{ background: 'rgba(8,31,58,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <a
          href={callbackPhoneHref}
          onClick={handleRequestCallbackClick}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#E7DCCD] cursor-pointer no-underline"
          style={{ background: 'linear-gradient(135deg, #0D365E, #1C4E80)' }}
        >
          <CallIcon width="14" height="14" /> Callback
        </a>
        {/* <button
          onClick={onDownloadBrochure}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#C3AD95] cursor-pointer"
          style={{ background: 'rgba(195,173,149,0.08)', border: '1px solid rgba(195,173,149,0.2)' }}
        >
          <DownloadArrowIcon /> Brochure
        </button> */}
        <button
          onClick={handleWhatsApp}
          type="button"
          className="flex-1 flex items-center justify-center py-2.5 gap-2 text-[11px] tracking-[0.15em] uppercase font-medium rounded-md text-[#25D366] cursor-pointer"
          style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)' }}
        >
          <WhatsAppIcon width="14" height="14" /> WhatsApp Us
        </button>
      </div>

      {/* ── Lightbox (PropertyGallery UI) ─────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex flex-col"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onTouchStart={(e) => {
            lightboxTouchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            const diff = lightboxTouchX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) > 50) lightboxNav(diff > 0 ? 1 : -1)
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
            <span className="text-white/80 text-sm font-medium">
              {resolvedPropertyTitle ?? 'Property'}&nbsp;·&nbsp;{lightboxIdx + 1} / {safeImages.length}
            </span>
            <div className="flex items-center gap-2">
              {/* Zoom toggle */}
              <button
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                {zoomed ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                )}
              </button>
              {/* Close */}
              <button
                onClick={closeLightbox}
                aria-label="Close gallery"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-14">
            {/* Prev */}
            <button
              onClick={() => lightboxNav(-1)}
              disabled={zoomed}
              aria-label="Previous image"
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center" style={{ overflow: zoomed ? 'auto' : 'hidden' }}>
              <img
                src={safeImages[lightboxIdx]}
                alt={`${resolvedPropertyTitle ?? 'Property'} - image ${lightboxIdx + 1}`}
                style={{
                  maxWidth: zoomed ? 'none' : '100%',
                  maxHeight: zoomed ? 'none' : '100%',
                  width: zoomed ? '160%' : 'auto',
                  objectFit: 'contain',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: lightboxFading ? 0 : 1,
                  transform: lightboxFading ? 'scale(0.97)' : 'scale(1)',
                  borderRadius: 8,
                  cursor: zoomed ? 'zoom-out' : 'zoom-in',
                }}
                onClick={() => setZoomed((z) => !z)}
              />
            </div>

            {/* Next */}
            <button
              onClick={() => lightboxNav(1)}
              disabled={zoomed}
              aria-label="Next image"
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex-shrink-0 px-5 py-4">
            <div ref={lightboxThumbRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {safeImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => handleLightboxThumbClick(i)}
                  className="flex-shrink-0 object-cover rounded-lg cursor-pointer transition-all duration-150 hover:scale-105"
                  style={{
                    width: 72,
                    height: 54,
                    border: i === lightboxIdx ? '2.5px solid #60A5FA' : '2.5px solid rgba(255,255,255,0.15)',
                    boxShadow: i === lightboxIdx ? '0 0 0 2px rgba(96,165,250,0.4)' : 'none',
                    opacity: i === lightboxIdx ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OffPlanIndividualHero