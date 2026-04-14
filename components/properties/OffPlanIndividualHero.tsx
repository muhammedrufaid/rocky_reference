'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Thumbs, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Container from '../layout/Container'
import type { ApiPropertyDetail } from '@/utils/getServices'

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



// ─── Icons ────────────────────────────────────────────────────────────────────

const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V19M22 9V19M2 19H22M2 9H22M2 9C2 9 2 5 7 5H17C22 5 22 9 22 9" />
    <path d="M12 5V9" />
  </svg>
)

const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12H20V17C20 19.2 18.2 21 16 21H8C5.8 21 4 19.2 4 17V12Z" />
    <path d="M4 12V5C4 3.9 4.9 3 6 3H8C9.1 3 10 3.9 10 5V12" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
)

const SizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3V21M3 9H9" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.18 2 2 0 012.06.03h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
)

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
  const resolvedPrice = data?.price ? `AED ${Number(data.price).toLocaleString()}` : price
  const resolvedCity = data?.city ?? city
  const resolvedLocality = data?.locality ?? locality
  const resolvedSubLocality = data?.subLocality ?? subLocality
  const resolvedTowerName = data?.towerName ?? towerName
  const resolvedBedrooms = data?.bedrooms ?? bedrooms
  const resolvedBathrooms = data?.bathrooms ?? bathrooms
  const resolvedPropertySize = data?.propertySize ?? propertySize
  const resolvedPropertyType = data?.propertyType ?? propertyType
  const resolvedOffPlan = data?.offPlan ? data.offPlan.toLowerCase() === 'yes' : offPlan
  const resolvedWhatsappNumber = (data?.listingAgentPhone ?? whatsappNumber)?.replace(/\D/g, '') || '971501234567'

  const safeImages = useMemo(() => (Array.isArray(resolvedImages) ? resolvedImages.filter(Boolean) : []), [resolvedImages])
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

  const handleWhatsApp = () => window.open(`https://wa.me/${resolvedWhatsappNumber}`, '_blank')

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
    { icon: <BedIcon />, value: resolvedBedrooms, label: 'Beds' },
    { icon: <BathIcon />, value: resolvedBathrooms, label: 'Baths' },
    { icon: <SizeIcon />, value: `${resolvedPropertySize}`, label: 'sqft' },
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
              modules={[Autoplay, EffectFade, Thumbs, Navigation]}
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
              thumbs={{ swiper: heroThumbsSwiper && !heroThumbsSwiper.destroyed ? heroThumbsSwiper : null }}
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
                    <span className="text-[#C3AD95]"><PinIcon /></span>
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
                  <motion.div variants={fadeUp} custom={5} className="hidden md:flex items-center gap-3">
                    <div className="w-48">
                      <Swiper
                        className="rre-thumb-swiper"
                        modules={[Thumbs]}
                        watchSlidesProgress
                        onSwiper={setHeroThumbsSwiper}
                        slidesPerView={4}
                        spaceBetween={5}
                      >
                        {safeImages.map((src, i) => (
                          <SwiperSlide key={i}>
                            <div className="h-9 rounded overflow-hidden">
                              <img src={src} alt="" className="w-full h-full object-cover" />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <button
                      onClick={() => openLightbox(activeIndex)}
                      className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#f6f6f6] hover:text-[#f6f6f6]/80 transition-colors duration-200 cursor-pointer"
                    >
                      <span className='text-[#C3AD95]'>
                        <GridIcon />
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
                          {resolvedPrice}
                        </p>
                      </div>

                      {handoverDate && (
                        <div className="flex items-center justify-between py-3 border-t border-white/10">
                          <span className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-light">Handover</span>
                          <span className="text-[13px] font-medium text-white/90">{handoverDate}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 pt-1">
                        {/* Primary CTA */}
                        <button
                          onClick={onRequestCallback}
                          className="group relative flex items-center justify-center gap-2 w-full py-3 rounded-md overflow-hidden text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #0D365E, #1C4E80)', color: '#E7DCCD' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #1C4E80, #0D365E)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, #0D365E, #1C4E80)')}
                        >
                          <PhoneIcon />
                          Request Callback
                        </button>

                        {/* WhatsApp */}
                        <button
                          onClick={handleWhatsApp}
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#25D366] transition-all duration-200 cursor-pointer"
                          style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.22)' }}
                        >
                          <WhatsAppIcon />
                          WhatsApp Us
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </Container>

            {/* ── Slide Counter + Nav (bottom-right, desktop) ── */}
            <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center gap-3">
              <span
                className="text-[11px] tracking-[0.2em] text-white/50"
              >
                {String(activeIndex + 1).padStart(2, '0')} / {String(safeImages.length).padStart(2, '0')}
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  ref={prevRef}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-[#C3AD95]/50 hover:text-[#C3AD95] transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  ref={nextRef}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-[#C3AD95]/50 hover:text-[#C3AD95] transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE Sticky CTA Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 px-4 py-3 border-t border-white/8"
        style={{ background: 'rgba(8,31,58,0.97)', backdropFilter: 'blur(16px)' }}
      >
        <button
          onClick={onRequestCallback}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#E7DCCD] cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #0D365E, #1C4E80)' }}
        >
          <PhoneIcon /> Callback
        </button>
        {/* <button
          onClick={onDownloadBrochure}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-[11px] tracking-[0.15em] uppercase font-medium text-[#C3AD95] cursor-pointer"
          style={{ background: 'rgba(195,173,149,0.08)', border: '1px solid rgba(195,173,149,0.2)' }}
        >
          <DownloadIcon /> Brochure
        </button> */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center py-2.5 gap-2 text-[11px] tracking-[0.15em] uppercase font-medium rounded-md text-[#25D366] cursor-pointer"
          style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)' }}
        >
          <WhatsAppIcon /> WhatsApp Us
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