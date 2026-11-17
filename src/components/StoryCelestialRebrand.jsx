import React, { useState } from 'react';
import { Eye, Flame, ShieldCheck, Maximize2, Sparkles, CheckCircle2, Layers, Megaphone } from 'lucide-react';

const palette = [
  { name: 'Obsidian Noir', hex: '#000000', role: 'Base Substrate & Jersey Background', cmyk: 'C:75 M:68 Y:67 K:90' },
  { name: 'Celestial Forest', hex: '#1A5A43', role: 'Primary Brand Tone', cmyk: 'C:83 M:37 Y:73 K:35' },
  { name: 'Jade Mint', hex: '#2563eb', role: 'Accent, Highlight & Energy', cmyk: 'C:69 M:10 Y:69 K:1' },
  { name: 'Citron Gold', hex: '#38bdf8', role: 'Victory & Crest Glow', cmyk: 'C:22 M:11 Y:83 K:0' },
];

const celestialPublicationMaterials = [
  {
    title: 'PLMun Celestial Valkyrie Tournament Matchday Poster',
    category: 'Tournament Event Poster',
    badge: 'Championship Print',
    image: '/assets/media/POSTER/0387bda5eaac0daffc6468af78c34169.png',
    desc: 'Official matchday poster featuring the Celestial Valkyrie team roster, player jerseys, and Infinix partnership.'
  },
  {
    title: 'Celestial Esports Official Matchday Announcement Graphic',
    category: 'Social Media Campaign',
    badge: 'Matchday Graphic',
    image: '/assets/media/SMM%20-%20SOCIAL%20MEDIA%20POSTING/9995af4f3ab5ccb579a8e60d0c7a5afb.png',
    desc: 'Tournament series schedule graphic featuring the official Celestial Phoenix emblem, team stats, and match times.'
  },
  {
    title: 'Celestial Esports Official Roster Lineup Announcement',
    category: 'Player Roster Publication',
    badge: 'Team Roster',
    image: '/assets/media/SMM%20-%20SOCIAL%20MEDIA%20POSTING/ba670a89d34de797e44a9f4ad3251304.png',
    desc: 'Official team roster reveal card highlighting starting lineup positions with emerald brand colorway.'
  },
  {
    title: 'Celestial Esports Tournament Schedule & Broadcast Banner',
    category: 'Digital Broadcast Collateral',
    badge: 'Broadcast Assets',
    image: '/assets/media/SMM%20-%20SOCIAL%20MEDIA%20POSTING/872af602ec38271f36870d841be7f9fc.png',
    desc: 'Official streaming lower-third banner and social tournament calendar for esports fan community.'
  },
  {
    title: 'Celestial Esports Championship Victory & Community Card',
    category: 'Social Media Campaign',
    badge: 'Victory Graphic',
    image: '/assets/media/SMM%20-%20SOCIAL%20MEDIA%20POSTING/da520f3b96b7605cf029b1da0cdc7b70.png',
    desc: 'Official tournament celebratory social collateral with Citron Gold accents and team sponsor lockups.'
  },
  {
    title: 'Celestial Esports Facebook Desktop Brand Experience',
    category: 'Digital Social Mockup',
    badge: 'Desktop Header',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/6994bdbed5a883ae9d1870e442955971.png',
    desc: 'Official desktop Facebook page branding showing the banner, avatar emblem, and verified organization layout.'
  },
  {
    title: 'Celestial Esports Laptop Display & Digital Interface',
    category: 'Web Experience Mockup',
    badge: 'Web Interface',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/d0191b32c41672856882be3e0fd12128.png',
    desc: 'Laptop mockup showcasing the official Celestial brand ecosystem on widescreen web viewports.'
  },
  {
    title: 'Celestial Esports Mobile Social & Tournament App Interface',
    category: 'Mobile Digital Mockup',
    badge: 'Mobile App',
    image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/d9467a7c565196656220a7ddb7f023cb.png',
    desc: 'Mobile viewport testing the phoenix emblem legibility and responsive social media profile layout.'
  }
];

export default function StoryCelestialRebrand({ onSelectImage, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('board');

  const tabs = [
    { id: 'board', label: '1. Rebrand Presentation Board', icon: Layers },
    { id: 'comparison', label: '2. Old vs. New Logo Evolution', icon: CheckCircle2 },
    { id: 'anatomy', label: '3. Symbology (Phoenix & Eye)', icon: Flame },
    { id: 'palette', label: '4. Official Swatches & Values', icon: Sparkles },
    { id: 'publications', label: '5. Publication Materials & Collateral (8)', icon: Megaphone },
  ];

  return (
    <section id="celestial" className={`py-24 border-b relative select-none ${
      isDarkMode ? 'bg-[#08090c] border-white/10' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Case Study Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/30 text-blue-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Rebranding Case Study • Creative Director Role</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-950'
          }`}>
            Celestial Esports Complete Rebrand
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The comprehensive visual identity overhaul for <strong>Celestial Esports</strong>. Built to solve small-screen broadcasting legibility, jersey embroidery precision, and merchandise reproduction — unifying the Phoenix & All-Seeing Eye into an authoritative esports brand system.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-10 border-b border-gray-200 dark:border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white shadow-md'
                    : isDarkMode
                    ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXACT CELESTIAL ESPORTS REBRAND BOARD (From reference) */}
        {activeTab === 'board' && (
          <div className="space-y-6 animate-fade-in">
            <div
              onClick={() =>
                onSelectImage({
                  image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/celestial_rebrand_board.png',
                  title: 'Celestial Esports Logo Rebranding Board',
                  category: 'Official Rebrand Presentation',
                })
              }
              className={`p-4 sm:p-6 rounded-3xl border cursor-pointer group shadow-2xl transition-all ${
                isDarkMode ? 'bg-[#12151c] border-blue-500/30 hover:border-blue-500/60' : 'bg-gray-50 border-gray-200 hover:border-blue-600'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-blue-500 block">
                    Master Rebranding Board
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Celestial Esports — Logo Rebranding Comprehensive System
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-500 font-bold uppercase">
                  <span>Expand Board</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Board Viewer */}
              <div className="w-full rounded-2xl overflow-hidden bg-black p-2 sm:p-4 border border-white/10 flex items-center justify-center">
                <img
                  src="/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/celestial_rebrand_board.png"
                  alt="Celestial Esports Logo Rebranding Board"
                  className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              {/* Callouts Bar below the board */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200'}`}>
                  <span className="text-blue-500 font-bold block mb-1">Old vs. New Logo Evolution</span>
                  <p className="text-gray-400">Replaced the complex legacy illustration with an iconic vector phoenix mark and dynamic slanted wordmark.</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200'}`}>
                  <span className="text-[#38bdf8] font-bold block mb-1">Dual Symbology</span>
                  <p className="text-gray-400">Phoenix wings represent competitive resurgence; the center eye anchors strategic objective and vision.</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200'}`}>
                  <span className="text-blue-500 font-bold block mb-1">Omnichannel Deployment</span>
                  <p className="text-gray-400">Tested across tournament player kits, streaming broadcast lower-thirds, and mobile app avatars.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Old vs. New Logo Evolution Breakdown (Clean Logo Focus) */}
        {activeTab === 'comparison' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Old Logo Mark */}
              <div className={`p-8 rounded-3xl border flex flex-col justify-between ${
                isDarkMode ? 'bg-[#12151c] border-white/10' : 'bg-gray-50 border-gray-200'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-gray-500">Legacy Identity</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase">
                      Old Logo
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Previous Celestial Esports Crest
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    The previous logo used an overly complicated crest with detailed globe lines, figure silhouettes, and flame borders. At small digital resolutions and on physical fabric embroidery, the complex lines blurred together and lost visual clarity.
                  </p>
                </div>

                {/* Old Crest */}
                <div className={`aspect-square w-full rounded-2xl p-8 flex flex-col items-center justify-center ${
                  isDarkMode ? 'art-matting-dark' : 'art-matting-light'
                }`}>
                  <img
                    src="/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/6e5dd9e4d81468efc6ac99954db1265a.png"
                    alt="Old Celestial Esports Crest"
                    className="max-h-[85%] max-w-[85%] object-contain"
                  />
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-4 font-bold">Legacy Celestial Crest</span>
                </div>
              </div>

              {/* New Logo Mark */}
              <div className={`p-8 rounded-3xl border-2 flex flex-col justify-between ${
                isDarkMode ? 'bg-[#12151c] border-blue-500/50 shadow-2xl' : 'bg-white border-blue-600 shadow-xl'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-blue-500">Redesigned System</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold uppercase">
                      New Official Logo
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    New Official Phoenix Emblem
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    A modern, razor-sharp vector emblem. Engineered with pure geometric balance, the new phoenix icon scales effortlessly down to a 16px mobile favicon and shines on stadium broadcast screens and embroidered player gear.
                  </p>
                </div>

                {/* New Phoenix Emblem */}
                <div
                  onClick={() =>
                    onSelectImage({
                      image: '/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/9ef46e20627d2512d5fcabe7201fba41.png',
                      title: 'Celestial Esports Official Phoenix Emblem (Standalone Mark)',
                      category: 'Brand Mark',
                    })
                  }
                  className={`aspect-square w-full rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer group ${
                    isDarkMode ? 'art-matting-dark' : 'art-matting-light'
                  }`}
                >
                  <img
                    src="/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/9ef46e20627d2512d5fcabe7201fba41.png"
                    alt="New Celestial Esports Phoenix Emblem"
                    className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] text-blue-500 uppercase tracking-wider mt-4 font-bold">New Official Phoenix Emblem ↗</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Symbology (Phoenix & All-Seeing Eye) */}
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <div className={`p-8 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-[#12151c] border-white/10' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 block">
                Primary Emblem Symbol
              </span>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                The Phoenix
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Symbolizes hope, life, and resurrection.</strong> In the high-stakes arena of competitive esports, teams face crushing losses and tournament bracket resets. The rising phoenix represents resilience — rising from the ashes of defeat to claim victory.
              </p>
              <div className="pt-4 flex items-center justify-center">
                <img
                  src="/assets/media/BRAND%20GUIDE%20AND%20REBRANDING/9ef46e20627d2512d5fcabe7201fba41.png"
                  alt="Phoenix Silhouette"
                  className="w-36 h-36 object-contain"
                />
              </div>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 ${
              isDarkMode ? 'bg-[#12151c] border-white/10' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] block">
                Inner Core Symbol
              </span>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                The All-Seeing Eye
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Represents clairvoyance, omniscience, vision, and track goal focus.</strong> Anchored at the heart of the phoenix wings to signify strategic map awareness, situational control, and relentless focus on the championship objective.
              </p>
              <div className="pt-4 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/5">
                  <Eye className="w-16 h-16 text-[#38bdf8]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Exact Color Swatches & Values */}
        {activeTab === 'palette' && (
          <div className={`p-8 rounded-3xl border animate-fade-in ${
            isDarkMode ? 'bg-[#12151c] border-white/10' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="max-w-xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 block mb-1">
                Official Color Standard
              </span>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Team Color Palette
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Engineered for screen luminosity and textile fabric color consistency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {palette.map((color) => (
                <div
                  key={color.hex}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-[#090b0e] border-white/5' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  <div
                    className="aspect-[4/3] w-full rounded-xl mb-4 border border-white/10 shadow-inner flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/70 text-white backdrop-blur">
                      {color.hex}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {color.name}
                    </h4>
                    <span className="text-[10px] font-mono text-blue-500 block mt-0.5">
                      {color.cmyk}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1.5 block">
                      {color.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Authentic Celestial Publication Materials & Media Collateral */}
        {activeTab === 'publications' && (
          <div className="space-y-6 animate-fade-in">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 block mb-1">
                Real-World Brand Deployment
              </span>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Official Publication Materials & Tournament Collateral
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Authentic tournament matchday posters, player roster reveals, social broadcast graphics, and verified digital brand viewports for Celestial Esports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {celestialPublicationMaterials.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectImage(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer group transition-all flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#12151c] border-white/10 hover:border-blue-500/50' : 'bg-gray-50 border-gray-200 hover:border-blue-600 shadow-sm'
                  }`}
                >
                  <div className={`aspect-square rounded-xl overflow-hidden mb-3 p-2 flex items-center justify-center ${
                    isDarkMode ? 'art-matting-dark' : 'art-matting-light'
                  }`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 block">
                      {item.badge}
                    </span>
                    <h4 className={`text-xs font-bold mt-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
