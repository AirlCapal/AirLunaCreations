import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ['Creative Designer', 'Visual Brand Strategist', 'Art Director', 'Front-End Developer'];

const floatingTools = [
  {
    name: 'Adobe Illustrator', type: 'ai',
    bg: '#330000', border: '#FF9A00', glow: 'rgba(255,154,0,0.5)',
    pos: 'top-[12%] -left-3 sm:-left-8 md:-left-11', delay: 0, duration: 4.8,
  },
  {
    name: 'Adobe Photoshop', type: 'ps',
    bg: '#001E36', border: '#31A8FF', glow: 'rgba(49,168,255,0.5)',
    pos: 'top-[44%] -left-4 sm:-left-9 md:-left-13', delay: 0.7, duration: 5.2,
  },
  {
    name: 'CapCut', type: 'capcut',
    bg: '#111113', border: 'rgba(255,255,255,0.3)', glow: 'rgba(255,255,255,0.2)',
    pos: 'bottom-[12%] -left-2 sm:-left-7 md:-left-10', delay: 1.4, duration: 5.6,
  },
  {
    name: 'Adobe InDesign', type: 'id',
    bg: '#49021F', border: '#FF3366', glow: 'rgba(255,51,102,0.5)',
    pos: 'top-[46%] -right-3 sm:-right-8 md:-right-12', delay: 0.9, duration: 4.6,
  },
  {
    name: 'Canva Pro', type: 'canva',
    bg: '#7D2AE8', border: 'rgba(255,255,255,0.3)', glow: 'rgba(125,42,232,0.55)',
    pos: 'bottom-[14%] -right-2 sm:-right-7 md:-right-11', delay: 1.6, duration: 4.2,
  },
  {
    name: 'Figma', type: 'figma',
    bg: '#1e1e1e', border: 'rgba(255,255,255,0.2)', glow: 'rgba(162,89,255,0.45)',
    pos: 'top-[8%] -right-3 sm:-right-7 md:-right-10', delay: 0.3, duration: 5.0,
  },
];

function ToolIcon({ type }) {
  if (type === 'ai') return <span className="text-[22px] font-black tracking-tighter text-[#FF9A00] select-none">Ai</span>;
  if (type === 'ps') return <span className="text-[22px] font-black tracking-tighter text-[#31A8FF] select-none">Ps</span>;
  if (type === 'id') return <span className="text-[22px] font-black tracking-tighter text-[#FF3366] select-none">Id</span>;
  if (type === 'canva') return (
    <svg viewBox="0 0 80 80" className="w-9 h-9 drop-shadow">
      <defs>
        <linearGradient id="cv-g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="39" fill="url(#cv-g2)" />
      <path d="M57.27 48.21c-.33 0-.62.28-.92.9C52.93 56.02 47.04 60.91 40.21 60.91c-7.89 0-12.77-7.12-12.77-16.96 0-16.67 9.29-26.3 17.44-26.3 3.81 0 6.14 2.4 6.14 6.21 0 4.52-2.57 6.92-2.57 8.51 0 .72.44 1.15 1.33 1.15 3.55 0 7.71-4.08 7.71-9.84 0-5.59-4.86-9.69-13.02-9.69-13.48 0-25.46 12.5-25.46 29.79 0 13.38 7.64 22.23 19.44 22.23 12.52 0 19.75-12.45 19.75-16.49 0-.9-.46-1.3-.93-1.3z" fill="#fff" />
    </svg>
  );
  if (type === 'figma') return (
    <svg viewBox="0 0 38 57" className="w-6 h-8">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 0 9.5 57a9.5 9.5 0 0 0 9.5-9.5V38H9.5A9.5 9.5 0 0 0 0 47.5z" fill="#0acf83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  );
  if (type === 'capcut') return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z" fillRule="evenodd" />
    </svg>
  );
  return null;
}

export default function StoryPrologue({ profile, isDarkMode }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="prologue"
      className={`relative min-h-[100svh] flex flex-col justify-center overflow-hidden ${
        isDarkMode ? 'bg-[#060810]' : 'bg-[#f0f4ff]'
      }`}
    >
      {/* ── Layered ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className={`absolute top-0 left-0 w-[70vw] h-[70vh] rounded-full blur-[200px] opacity-60 ${
          isDarkMode ? 'bg-[#0d2062]' : 'bg-[#bfdbfe]'
        }`} />
        <div className={`absolute bottom-0 right-0 w-[55vw] h-[55vh] rounded-full blur-[180px] opacity-50 ${
          isDarkMode ? 'bg-[#1e3a8a]/60' : 'bg-[#93c5fd]/70'
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[220px] opacity-30 ${
          isDarkMode ? 'bg-[#2563eb]/40' : 'bg-[#dbeafe]'
        }`} />
      </div>

      {/* ── Fine grid texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div
        className={`max-w-7xl mx-auto px-5 sm:px-8 w-full pt-24 sm:pt-28 pb-20 relative z-10 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT: Headline copy ── */}
          <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider bg-blue-600/10 border-blue-500/30 text-blue-400">
              <Sparkles className="w-3 h-3" />
              <span>Creative Design &amp; Visual Direction</span>
            </div>

            {/* Main headline */}
            <div className="space-y-1">
              <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.18] ${
                isDarkMode ? 'text-white' : 'text-gray-950'
              }`}>
                We can create <span className="gradient-text">magic through designs✨</span>
              </h1>
            </div>

            {/* Bio line */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-lg ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              I'm <strong className={isDarkMode ? 'text-white' : 'text-slate-950'}>Airl</strong> —{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="font-bold text-blue-400 inline-block"
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
              {' '}with six years of brand identity, esports collateral, streetwear apparel, and clean digital UI.
            </p>

            {/* Stats */}
            <div className={`flex flex-wrap items-stretch gap-0 divide-x rounded-xl overflow-hidden border ${
              isDarkMode
                ? 'border-white/[0.07] divide-white/[0.07]'
                : 'border-gray-200 divide-gray-200 shadow-sm'
            }`}>
              {[
                { n: '6+',  label: 'Years Exp',    color: isDarkMode ? 'text-white' : 'text-gray-900' },
                { n: '100+', label: 'Design Assets', color: 'text-blue-400' },
                { n: '15+',  label: 'Collaborations', color: 'text-cyan-400' },
              ].map(({ n, label, color }) => (
                <div
                  key={label}
                  className={`flex-1 min-w-0 px-5 py-4 ${isDarkMode ? 'bg-white/[0.03]' : 'bg-white'}`}
                >
                  <span className={`text-2xl sm:text-3xl font-black block leading-none ${color}`}>{n}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 block ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-500'
                  }`}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#0d2062] via-blue-600 to-cyan-500 text-white shadow-xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Explore Work <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                  isDarkMode
                    ? 'border-white/15 text-slate-200 hover:text-white hover:border-white/30 hover:bg-white/[0.05]'
                    : 'border-gray-300 text-slate-700 hover:text-slate-950 hover:border-blue-400 hover:bg-blue-50 shadow-sm'
                }`}
              >
                Let's Talk
              </a>
            </div>

            {/* Tool stack */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest mr-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Tools:
              </span>
              {[
                { label: 'Illustrator', color: '#FF9A00' },
                { label: 'Photoshop',  color: '#31A8FF' },
                { label: 'InDesign',   color: '#FF3366' },
                { label: 'Figma',      color: '#a259ff' },
                { label: 'Canva',      color: '#00C4CC' },
                { label: 'CapCut',     color: 'rgba(255,255,255,0.7)' },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border ${
                    isDarkMode
                      ? 'bg-white/[0.04] border-white/[0.07] text-slate-300'
                      : 'bg-white border-gray-200 text-slate-700 shadow-sm'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Portrait card ── */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center order-1 lg:order-2 px-4 sm:px-0">
            <div className="relative w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]">

              {/* Multi-layer portrait glow */}
              <div
                className="absolute -inset-6 -z-10 rounded-[40px] blur-3xl opacity-60"
                style={{
                  background: isDarkMode
                    ? 'radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.6) 0%, rgba(13,32,98,0.4) 50%, transparent 75%)'
                    : 'radial-gradient(ellipse at 50% 60%, rgba(147,197,253,0.8) 0%, rgba(191,219,254,0.5) 50%, transparent 75%)',
                }}
                aria-hidden
              />

              {/* Portrait card itself */}
              <div className={`relative w-full rounded-[28px] overflow-hidden border shadow-2xl ${
                isDarkMode
                  ? 'bg-[#0d1120] border-blue-900/60 shadow-blue-950/60'
                  : 'bg-white border-blue-100 shadow-blue-200/60'
              }`}>

                {/* Shimmer top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[#0d2062] via-blue-500 to-cyan-400" />

                {/* Photo */}
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <img
                    src="/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/airl_hero_showcase.png"
                    alt="Airl — Creative Designer"
                    className="w-full h-full object-cover object-top select-none"
                    loading="eager"
                  />
                  {/* Bottom gradient blend */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                    style={{
                      background: isDarkMode
                        ? 'linear-gradient(to top, #0d1120 0%, rgba(13,17,32,0.7) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
                    }}
                  />

                  {/* Name tag inside card */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className={`px-4 py-2.5 rounded-xl backdrop-blur-md border flex items-center justify-between ${
                      isDarkMode
                        ? 'bg-[#0d1120]/80 border-white/10'
                        : 'bg-white/80 border-gray-200/80'
                    }`}>
                      <div>
                        <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Airl</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Creative Designer</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className={`text-[9px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          Available
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Floating tool icons ── */}
              {floatingTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  className={`absolute z-30 ${tool.pos}`}
                  animate={{ y: [-7, 7, -7], rotate: [-2, 2, -2] }}
                  transition={{ duration: tool.duration, repeat: Infinity, ease: 'easeInOut', delay: tool.delay }}
                >
                  <div
                    className="w-10 h-10 sm:w-13 sm:h-13 md:w-14 md:h-14 p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl flex items-center justify-center border backdrop-blur-md select-none transition-transform hover:scale-110 hover:-rotate-3 shadow-xl cursor-default"
                    style={{
                      backgroundColor: tool.bg,
                      borderColor: tool.border,
                      boxShadow: `0 16px 40px -8px ${tool.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                    title={tool.name}
                  >
                    <ToolIcon type={tool.type} />
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#showcase"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity"
        aria-label="Scroll down"
      >
        <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-slate-500 animate-bounce" />
      </a>
    </section>
  );
}
