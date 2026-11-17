import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoryAct4({ webItems, onSelectImage, isDarkMode }) {
  const [showAll, setShowAll] = useState(false);
  const [mobileIdx, setMobileIdx] = useState(0);

  const INITIAL_LIMIT = 4;
  const displayed = showAll ? webItems : webItems.slice(0, INITIAL_LIMIT);

  const currentMobileItem = webItems[mobileIdx] || webItems[0];

  const handleMobileNext = () => {
    setMobileIdx((prev) => (prev + 1) % webItems.length);
  };

  const handleMobilePrev = () => {
    setMobileIdx((prev) => (prev - 1 + webItems.length) % webItems.length);
  };

  return (
    <section
      id="digital"
      className={`py-16 sm:py-24 select-none ${isDarkMode ? "bg-[#030712]/40" : "bg-white/40 backdrop-blur-[2px]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
              Chapter 05 — Digital Experience
            </span>
          </div>
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Front-End Craft &amp; UI Architecture
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Responsive component layouts combining systems logic with visual design aesthetics.
          </p>
        </div>

        {/* ── MOBILE-ONLY INTERACTIVE CARD (Compact, swipeable, no long vertical scroll) ── */}
        <div className="block sm:hidden">
          {currentMobileItem && (
            <div className={`rounded-2xl border overflow-hidden shadow-xl transition-all ${
              isDarkMode
                ? 'bg-[#10131a] border-white/[0.08] shadow-xl'
                : 'bg-white border-gray-200 shadow-md'
            }`}>
              {/* Browser chrome header */}
              <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-[#0b0d12] border-white/[0.05]' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className={`text-[10px] font-mono font-bold ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  {mobileIdx + 1} / {webItems.length}
                </span>
              </div>

              {/* Viewport preview */}
              <div
                onClick={() => onSelectImage(currentMobileItem)}
                className={`aspect-[16/10] w-full p-4 flex items-center justify-center relative cursor-pointer ${
                  isDarkMode ? 'art-matting-dark' : 'art-matting-light'
                }`}
              >
                <img
                  src={currentMobileItem.image}
                  alt={currentMobileItem.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Navigation controller */}
              <div className={`p-4 border-t ${isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'}`}>
                <div className="mb-3">
                  <h4 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentMobileItem.title}
                  </h4>
                  <span className="text-[10px] text-gray-500">React &amp; Tailwind CSS Architecture</span>
                </div>

                {/* Left / Right Carousel Controls for Mobile */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleMobilePrev}
                    aria-label="Previous layout"
                    className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-[0.98] ${
                      isDarkMode
                        ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]'
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-blue-400" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleMobileNext}
                    aria-label="Next layout"
                    className={`flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow transition-all active:scale-[0.98]`}
                  >
                    <span>Next UI</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── TABLET & DESKTOP FULL GRID ── */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => onSelectImage(item)}
              className={`rounded-2xl border overflow-hidden cursor-pointer group transition-all hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-[#10131a] border-white/[0.07] hover:border-blue-500/40 shadow-xl'
                  : 'bg-white border-gray-200 hover:border-blue-600 shadow-md'
              }`}
            >
              {/* Chrome bar */}
              <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-[#0b0d12] border-white/[0.05]' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${
                  isDarkMode ? 'text-slate-500' : 'text-gray-400'
                }`}>
                  Layout {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Viewport */}
              <div className={`aspect-[16/10] w-full p-4 flex items-center justify-center ${
                isDarkMode ? 'art-matting-dark' : 'art-matting-light'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Footer info */}
              <div className={`px-5 py-4 border-t flex items-center justify-between ${
                isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'
              }`}>
                <div className="min-w-0 pr-3">
                  <h4 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-gray-500">React &amp; Tailwind CSS</span>
                </div>
                <Maximize2 className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-500 transition-colors shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Toggle Button (Tablet & Desktop) */}
        {webItems.length > INITIAL_LIMIT && (
          <div className="hidden sm:block mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-blue-500/40'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-blue-600 shadow-sm'
              }`}
            >
              <span>{showAll ? 'Show Fewer Web Projects' : `View All (${webItems.length}) Web Layouts`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-blue-500" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
