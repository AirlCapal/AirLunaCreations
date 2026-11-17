import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

const chapters = [
  { label: 'Home',      href: '#prologue' },
  { label: 'Showcase',  href: '#showcase' },
  { label: 'Logomarks', href: '#marks' },
  { label: 'Prints',    href: '#print' },
  { label: 'Digital',   href: '#digital' },
  { label: 'Profile',   href: '#chronicle' },
  { label: 'Contact',   href: '#contact' },
];

export default function StoryNav({ isDarkMode, setIsDarkMode }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('#prologue');
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const ids = chapters.map(c => c.href.slice(1));
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el && el.getBoundingClientRect().top <= 120) {
            setActive('#' + ids[i]);
            break;
          }
        }
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDarkMode
            ? 'bg-[#090a0d]/88 backdrop-blur-xl border-b border-white/[0.07] shadow-2xl py-2'
            : 'bg-white/88 backdrop-blur-xl border-b border-gray-200/80 shadow-md py-2'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* ── Brand monogram + wordmark ── */}
        <a href="#prologue" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src={isDarkMode
                ? "/assets/media/LOGO%20DESIGN/alc_official_logo.png"
                : "/assets/media/LOGO%20DESIGN/alc_official_logo_dark.png"}
              alt="AirLuna Creations"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`text-[15px] font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              AirLuna Creations
            </span>
            <span className={`text-[9px] font-semibold tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Creative Designer
            </span>
          </div>
        </a>

        {/* ── Desktop pill nav ── */}
        <nav className={`hidden lg:flex items-center gap-0.5 rounded-full border px-2 py-1.5 transition-all ${
          isDarkMode
            ? 'bg-slate-900/60 border-slate-800 backdrop-blur-md'
            : 'bg-white/90 border-slate-200 backdrop-blur-md'
        }`}>
          {chapters.map((ch) => {
            const isActive = active === ch.href;
            return (
              <a
                key={ch.href}
                href={ch.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? isDarkMode
                      ? 'bg-blue-600/25 text-blue-300 ring-1 ring-blue-500/40'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {ch.label}
              </a>
            );
          })}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
              isDarkMode
                ? 'bg-slate-800/60 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow hover:brightness-110 transition-all"
          >
            Hire Me <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className={`lg:hidden w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
              isDarkMode
                ? 'bg-white/[0.05] border-white/[0.08] text-white'
                : 'bg-gray-100 border-gray-200 text-gray-900'
            }`}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className={`lg:hidden border-t ${
          isDarkMode
            ? 'bg-[#0d0f14]/95 backdrop-blur-xl border-white/[0.07]'
            : 'bg-white/95 backdrop-blur-xl border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {chapters.map((ch) => (
              <a
                key={ch.href}
                href={ch.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 px-3 rounded-lg text-sm font-bold transition-colors ${
                  active === ch.href
                    ? isDarkMode ? 'bg-white/[0.08] text-white' : 'bg-gray-100 text-gray-900'
                    : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/[0.05]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {ch.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white shadow"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
