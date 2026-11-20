import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData.json';
import StoryNav from './components/StoryNav.jsx';
import StoryPrologue from './components/StoryPrologue.jsx';
import PartnerMarquee from './components/PartnerMarquee.jsx';
import RotatingShowcase3D from './components/RotatingShowcase3D.jsx';
import StoryAct1 from './components/StoryAct1.jsx';
import StoryCelestialRebrand from './components/StoryCelestialRebrand.jsx';
import StoryAct3 from './components/StoryAct3.jsx';
import StoryAct4 from './components/StoryAct4.jsx';
import StoryAct5 from './components/StoryAct5.jsx';
import StoryArchive from './components/StoryArchive.jsx';
import StoryEpilogue from './components/StoryEpilogue.jsx';
import Modal from './components/Modal.jsx';
import AIAssistant from './components/AIAssistant.jsx';
import { createWatermarkedImage } from './utils/watermark.js';

export default function App() {
  const { profile, categories } = portfolioData;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll progress bar + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(scrolled > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global Watermark & ContextMenu Interceptor for artwork images
  useEffect(() => {
    // Intercept right-clicks on portfolio artwork images to deliver watermarked canvas or alert
    const handleContextMenu = async (e) => {
      const target = e.target;
      // If clicked on an image inside main or modal
      if (target && target.tagName === 'IMG' && target.src && target.src.includes('/assets/media/')) {
        // Prevent default direct raw image save without watermark
        // Provide seamless watermarked image download
        e.preventDefault();
        try {
          const watermarkedDataUrl = await createWatermarkedImage(target.src);
          const a = document.createElement('a');
          a.href = watermarkedDataUrl;
          a.download = `airluna-creations-design-watermarked.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (err) {
          console.error('Watermark generation error:', err);
        }
      }
    };

    // Prevent drag-and-drop raw file saving
    const handleDragStart = (e) => {
      const target = e.target;
      if (target && target.tagName === 'IMG' && target.src && target.src.includes('/assets/media/')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Asset categorization lookups
  const getCategoryItems = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.items || [] : [];
  };

  const logoItems = getCategoryItems('logos');
  const posterItems = getCategoryItems('posters_flyers');
  const socialItems = getCategoryItems('social_media');
  const mockupItems = getCategoryItems('mockups');
  const webItems = getCategoryItems('web_ui');

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-300 selection:bg-[#2563eb] selection:text-white bg-transparent">

      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-[#0d2062] via-blue-500 to-cyan-400 transition-all duration-100 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Dynamic Ambient Background Canvas with ALC Brand Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden>
        {isDarkMode ? (
          <>
            <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#0d2062]/45 via-[#1e3a8a]/25 to-transparent blur-[140px]" />
            <div className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#1e40af]/30 via-[#0a1538]/30 to-transparent blur-[160px]" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#091337]/50 via-[#1d4ed8]/20 to-transparent blur-[150px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#bfdbfe]/50 via-[#dbeafe]/40 to-transparent blur-[120px]" />
            <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#93c5fd]/45 via-[#e0e7ff]/35 to-transparent blur-[140px]" />
            <div className="absolute -bottom-[10%] left-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#60a5fa]/30 via-[#bae6fd]/40 to-transparent blur-[130px]" />
          </>
        )}
      </div>
      {/* 1. Header Navigation with Theme Toggle */}
      <StoryNav
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenAI={() => setIsAIOpen(true)}
        activeChapter=""
      />

      <main>
        {/* 2. Prologue: Narrative Genesis & Core Identity */}
        <StoryPrologue profile={profile} isDarkMode={isDarkMode} />

        {/* 3. Single Moving Line Partner Marquee */}
        <PartnerMarquee isDarkMode={isDarkMode} />

        {/* 4. High-Impact 3D Rotational Project Carousel */}
        <RotatingShowcase3D
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />

        {/* 5. Chapter 02: Logomarks with Contrast Canvas Selector */}
        <StoryAct1
          logoItems={logoItems}
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />

        {/* 6. Chapter 03: CELESTIAL ESPORTS COMPLETE REBRAND (Unified Case Study) */}
        <StoryCelestialRebrand
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />

        {/* 7. Chapter 04: Print & Editorial Canvas (Posters, Social, Merch) */}
        <StoryAct3
          posters={posterItems}
          socialMedia={socialItems}
          mockups={mockupItems}
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />

        {/* 8. Chapter 05: Front-End Craft & UI Architecture */}
        <StoryAct4
          webItems={webItems}
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />

        {/* 9. Chapter 06: Career Path & Endorsements */}
        <StoryAct5 profile={profile} isDarkMode={isDarkMode} />

        {/* 10. Chapter 07: Complete Repository (All 124+ Assets Filterable) */}
        <StoryArchive
          categories={categories}
          onSelectImage={setSelectedItem}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* 11. Epilogue: Contact & Brief Inquiry */}
      <StoryEpilogue contacts={profile.contacts} isDarkMode={isDarkMode} />

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* AI Assistant (Luna AI) */}
      <AIAssistant
        onSelectImage={setSelectedItem}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isOpen={isAIOpen}
        setIsOpen={setIsAIOpen}
      />

      {/* ── Back to top button (desktop only, appears after scrolling) ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={`hidden lg:flex fixed bottom-20 right-6 z-40 w-10 h-10 rounded-full items-center justify-center border shadow-lg transition-all hover:scale-110 active:scale-95 ${
            isDarkMode
              ? 'bg-[#0d0f16]/90 border-white/[0.1] text-gray-300 hover:text-white backdrop-blur-xl'
              : 'bg-white/90 border-gray-200 text-gray-600 hover:text-gray-900 backdrop-blur-xl shadow-md'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
