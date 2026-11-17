import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoryAct3({ posters, socialMedia, mockups, onSelectImage, isDarkMode }) {
  const [activeSub, setActiveSub] = useState('posters');
  const [showAll, setShowAll] = useState(false);
  const [mobileIdx, setMobileIdx] = useState(0);

  const tabs = [
    { id: 'posters', label: 'Posters & Flyers', allData: posters },
    { id: 'social', label: 'Social Media Assets', allData: socialMedia },
    { id: 'mockups', label: 'Apparel & Mockups', allData: mockups },
  ];

  const currentTab = tabs.find(t => t.id === activeSub) || tabs[0];
  const INITIAL_LIMIT = 8;
  const displayedData = showAll ? currentTab.allData : currentTab.allData.slice(0, INITIAL_LIMIT);

  const handleTabChange = (tabId) => {
    setActiveSub(tabId);
    setShowAll(false);
    setMobileIdx(0);
  };

  const currentMobileItem = currentTab.allData[mobileIdx] || currentTab.allData[0];

  const handleMobileNext = () => {
    setMobileIdx((prev) => (prev + 1) % currentTab.allData.length);
  };

  const handleMobilePrev = () => {
    setMobileIdx((prev) => (prev - 1 + currentTab.allData.length) % currentTab.allData.length);
  };

  return (
    <section
      id="print"
      className={`py-16 sm:py-24 select-none ${
        isDarkMode ? "bg-[#030712]/40" : "bg-white/40 backdrop-blur-[2px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
              Chapter 04 — Print & Editorial
            </span>
          </div>
          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Print, Editorial & Spatial Canvas
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Campaign graphics, event flyers, streetwear mockups, and publication spreads.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-10 border-b ${
          isDarkMode ? 'border-white/[0.07]' : 'border-gray-200'
        }`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeSub === tab.id
                  ? 'bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white shadow'
                  : isDarkMode
                  ? 'bg-white/[0.04] text-gray-500 hover:text-white hover:bg-white/[0.08]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.allData.length})
            </button>
          ))}
        </div>

        {/* ── MOBILE-ONLY INTERACTIVE CARD (Compact, swipeable, no long vertical scroll) ── */}
        <div className="block sm:hidden">
          {currentMobileItem && (
            <div className={`rounded-2xl border overflow-hidden shadow-xl transition-all ${
              isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200 shadow-md'
            }`}>
              {/* Card top bar */}
              <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs ${
                isDarkMode ? 'border-white/[0.06] bg-[#0c0e14]' : 'border-gray-100 bg-gray-50'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    {currentTab.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {mobileIdx + 1} / {currentTab.allData.length}
                </span>
              </div>

              {/* Viewport preview */}
              <div
                onClick={() => onSelectImage(currentMobileItem)}
                className={`aspect-[3/4] w-full p-4 flex items-center justify-center relative cursor-pointer ${
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
              <div className={`p-4 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentMobileItem.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">Tap preview to view full resolution</p>
                  </div>
                </div>

                {/* Left / Right Carousel Controls for Mobile */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleMobilePrev}
                    aria-label="Previous artwork"
                    className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-[0.98] ${
                      isDarkMode
                        ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]'
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-cyan-400" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleMobileNext}
                    aria-label="Next artwork"
                    className={`flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow transition-all active:scale-[0.98]`}
                  >
                    <span>Next Piece</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── TABLET & DESKTOP FULL GRID ── */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              onClick={() => onSelectImage(item)}
              className={`rounded-2xl border cursor-pointer group transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-[#10131a] border-white/[0.07] hover:border-blue-500/40'
                  : 'bg-white border-gray-200 hover:border-blue-600 shadow-sm'
              }`}
            >
              <div className={`aspect-[3/4] w-full rounded-t-2xl p-3 flex items-center justify-center relative overflow-hidden ${
                isDarkMode ? 'art-matting-dark' : 'art-matting-light'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'}`}>
                <h4 className={`text-[11px] font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 block mt-0.5">
                  {currentTab.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Toggle Button (Tablet & Desktop) */}
        {currentTab.allData.length > INITIAL_LIMIT && (
          <div className="hidden sm:block mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-blue-500/40'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-blue-600 shadow-sm'
              }`}
            >
              <span>{showAll ? `Show Fewer ${currentTab.label}` : `View All (${currentTab.allData.length}) ${currentTab.label}`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-blue-500" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
