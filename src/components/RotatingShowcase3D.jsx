import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const cards = [
  // ── CATEGORY 1: LOGO DESIGN (2 Distinct Designs) ──
  {
    num: '01',
    title: 'Celestial Phoenix Logo',
    discipline: 'Logo Design',
    badge: 'Esports Mark',
    categoryFilter: 'logos',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/9ef46e20627d2512d5fcabe7201fba41.png',
    desc: 'Official standalone vector phoenix emblem engineered for esports broadcast scaling & jersey embroidery.',
    color: '#2563eb',
  },
  {
    num: '02',
    title: 'AirLuna Master Monogram',
    discipline: 'Logo Design',
    badge: 'Studio Mark',
    categoryFilter: 'logos',
    image: '/assets/media/LOGO%20DESIGN/a07495b8dcca196f8dfd0bf773624860.png',
    desc: 'Mathematical symmetry and timeless negative-space mark designed for AirLuna Creations studio identity.',
    color: '#38bdf8',
  },
  {
    num: '03',
    title: 'Precision Geometric Emblem',
    discipline: 'Logo Design',
    badge: 'Vector Icon',
    categoryFilter: 'logos',
    image: '/assets/media/LOGO%20DESIGN/250f677cbb837c2d3e48716faa6e82b3.png',
    desc: 'Isometric vector icon balance crafted with clean mathematical grid structures and negative space.',
    color: '#a855f7',
  },

  // ── CATEGORY 2: BRAND IDENTITY / FULL BRANDING SUITE (2 Distinct Guides) ──
  {
    num: '04',
    title: 'Official Brand Architecture Guide',
    discipline: 'Brand Identity',
    badge: 'Full Branding Suite',
    categoryFilter: 'brand_identity',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/2e7db589a8e1d47c30e34c403ae1690d.png',
    desc: 'Comprehensive visual identity system detailing master logo variations, grid specifications, and brand overview.',
    color: '#38bdf8',
  },
  {
    num: '05',
    title: 'Clearspace & Layout Systems Manual',
    discipline: 'Brand Identity',
    badge: 'Full Branding Suite',
    categoryFilter: 'brand_identity',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/b6efc3a5b51381e0ea30894e91ee39a7.png',
    desc: 'Formal clearspace boundaries, minimum reproduction scales, and precision margins manual.',
    color: '#f59e0b',
  },

  // ── CATEGORY 3: APPAREL & MERCH (Actual Streetwear T-Shirts & Apparel Mockups) ──
  {
    num: '06',
    title: 'Graphic Streetwear T-Shirt Mockup',
    discipline: 'Apparel & Merch',
    badge: 'Apparel T-Shirt',
    categoryFilter: 'mockups',
    image: '/assets/media/APPAREL/c01d097dcccb376c9cbf03370814e905.png',
    desc: 'Production-ready streetwear graphic tee mockup with custom front typography and back print graphic layout.',
    color: '#10b981',
  },
  {
    num: '07',
    title: 'Dark Edition Oversized Heavyweight Tee',
    discipline: 'Apparel & Merch',
    badge: 'Apparel T-Shirt',
    categoryFilter: 'mockups',
    image: '/assets/media/APPAREL/6c89d01f7aa3dc3f10e5c9686c8998a3.png',
    desc: 'Custom garment washed streetwear t-shirt mockup showcasing chest print placement and shoulder drape.',
    color: '#06b6d4',
  },
  {
    num: '08',
    title: 'Typography Streetwear Collection Mockup',
    discipline: 'Apparel & Merch',
    badge: 'Apparel T-Shirt',
    categoryFilter: 'mockups',
    image: '/assets/media/APPAREL/cb17f54481fdd46c162a86732c0184e1.png',
    desc: 'Urban aesthetic graphic t-shirt mockup engineered for screen-printed fashion and apparel drops.',
    color: '#ec4899',
  },

  // ── CATEGORY 4: POSTER & PRINT (2 Distinct Posters) ──
  {
    num: '09',
    title: 'PLMun Celestial Valkyrie Championship Poster',
    discipline: 'Poster & Print',
    badge: 'Tournament Poster',
    categoryFilter: 'posters_flyers',
    image: '/assets/media/POSTER/0387bda5eaac0daffc6468af78c34169.png',
    desc: 'Official championship tournament matchday poster featuring team lineup and Infinix partnership.',
    color: '#6366f1',
  },
  {
    num: '10',
    title: 'High-Impact Typographic Campaign Poster',
    discipline: 'Poster & Print',
    badge: 'Event Poster',
    categoryFilter: 'posters_flyers',
    image: '/assets/media/POSTER/6223b2fc924063c7e489d52028979157.png',
    desc: 'Bold editorial typography flyer designed for live event campaigns and promotional signage.',
    color: '#8b5cf6',
  },

  // ── CATEGORY 5: UI/UX WEB DESIGN (2 Distinct Layouts) ──
  {
    num: '11',
    title: 'Dark Mode SaaS Dashboard Architecture',
    discipline: 'UI/UX Web',
    badge: 'Web App Prototype',
    categoryFilter: 'web_ui',
    image: '/assets/media/WEB%20DESIGN/866ae0989a4afe1e2d0cb0004b6d4c72.png',
    desc: 'Clean front-end component layouts engineered for clarity, navigation ease, and user conversion.',
    color: '#14b8a6',
  },
  {
    num: '12',
    title: 'Interactive Web Prototype & Experience',
    discipline: 'UI/UX Web',
    badge: 'Responsive Web UI',
    categoryFilter: 'web_ui',
    image: '/assets/media/WEB%20DESIGN/98d18916590262d25e9fdf7930970608.png',
    desc: 'High-fidelity responsive web application interface designed with modern spacing and micro-interactions.',
    color: '#f97316',
  },
];

export default function RotatingShowcase3D({ onSelectImage, isDarkMode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = cards.length;

  const next = useCallback(() => setActiveIndex(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex(p => (p - 1 + total) % total), [total]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  /* Auto rotate every 5s */
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="showcase"
      className={`py-24 relative overflow-hidden select-none ${
        isDarkMode ? "bg-[#030712]/40" : "bg-white/40 backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
                Featured Deliverables
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Interactive 3D Deliverables
            </h2>
            <p className={`text-sm mt-2 max-w-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Every card shows an exact discipline deliverable: identity manuals, created vector logos, real streetwear apparel, and web layouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isDarkMode
                  ? 'border-white/[0.12] bg-white/[0.04] hover:bg-white/10 text-white'
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800 shadow-sm'
              }`}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-black text-gray-500 tabular-nums w-12 text-center">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                isDarkMode
                  ? 'border-white/[0.12] bg-white/[0.04] hover:bg-white/10 text-white'
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800 shadow-sm'
              }`}
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div className="perspective-stage relative h-[480px] sm:h-[520px] md:h-[560px] flex items-center justify-center">
          {cards.map((card, i) => {
            const offset = ((i - activeIndex + total) % total);
            const normalizedOffset = offset > total / 2 ? offset - total : offset;

            const isCenter = normalizedOffset === 0;
            const isAdjacent = Math.abs(normalizedOffset) === 1;
            const isVisible = Math.abs(normalizedOffset) <= 2;

            if (!isVisible) return null;

            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const xPos = normalizedOffset * (isMobile ? 180 : 320);
            const zPos = isCenter ? 0 : isAdjacent ? -120 : -220;
            const rotateY = normalizedOffset * -18;
            const scale = isCenter ? 1 : isAdjacent ? (isMobile ? 0.75 : 0.85) : (isMobile ? 0.6 : 0.72);
            const opacity = isCenter ? 1 : isAdjacent ? (isMobile ? 0.4 : 0.6) : (isMobile ? 0.15 : 0.3);
            const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

            return (
              <motion.div
                key={card.num}
                onClick={() => isCenter ? onSelectImage(card) : setActiveIndex(i)}
                animate={{ x: xPos, z: zPos, rotateY, scale, opacity }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute w-[260px] xs:w-[280px] sm:w-[360px] md:w-[400px] rounded-2xl overflow-hidden border cursor-pointer preserve-3d ${
                  isDarkMode
                    ? isCenter
                      ? 'bg-[#10131a] border-blue-500/40 shadow-2xl shadow-blue-500/10'
                      : 'bg-[#0d0f14] border-white/[0.06]'
                    : isCenter
                    ? 'bg-white border-blue-600 shadow-2xl shadow-blue-500/10'
                    : 'bg-white border-gray-200'
                }`}
                style={{ zIndex }}
              >
                {/* Badge bar */}
                <div className={`px-4 py-3 flex items-center justify-between border-b ${
                  isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                      {card.badge}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-gray-500">{card.num}</span>
                </div>

                {/* Image viewport */}
                <div className={`h-[300px] sm:h-[340px] md:h-[360px] p-5 flex items-center justify-center relative overflow-hidden group ${
                  isDarkMode ? 'art-matting-dark' : 'art-matting-light'
                }`}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className={`px-5 py-4 border-t ${
                  isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 pr-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 block">
                        {card.discipline}
                      </span>
                      <h3 className={`text-sm font-black tracking-tight mt-0.5 truncate ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {card.title}
                      </h3>
                    </div>
                    {isCenter && (
                      <span className="text-[10px] font-black text-blue-500 uppercase shrink-0">View ↗</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8 overflow-x-auto max-w-xs mx-auto py-1">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                activeIndex === idx
                  ? 'w-6 bg-blue-500'
                  : isDarkMode ? 'w-1.5 bg-white/15 hover:bg-white/25' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
