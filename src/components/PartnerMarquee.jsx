import React from 'react';

const partners = [
  { name: 'JCI Alabang',                                      tag: 'Collaboration' },
  { name: 'Gusi Peace Prize International',                  tag: 'International Event' },
  { name: 'SDO Muntinlupa',                                   tag: 'Institutional' },
  { name: 'Boy Scouts of the Philippines',                    tag: 'National Org' },
  { name: 'Univ. of Perpetual Help System DALTA - Calamba',   tag: 'Academic Partner' },
  { name: 'PLMun University Student Council',                 tag: 'Student Governance' },
  { name: 'Lakbayan',                                         tag: 'Advocacy & Culture' },
  { name: 'Celestial Esports',                                tag: 'Creative Director' },
  { name: 'eScience Corp.',                                   tag: 'Design Intern' },
  { name: 'Walter Campaign',                                  tag: 'Creative Lead' },
  { name: 'Infinix',                                          tag: 'Graphic Designer' },
  { name: 'Knowledge Hive',                                   tag: 'Art Director' },
  { name: 'AirLuna Creations (ALC)',                          tag: 'Creative Studio' },
  { name: 'PLMun IT',                                         tag: 'BS IT Graduate' },
];

export default function PartnerMarquee({ isDarkMode }) {
  const loop = [...partners, ...partners, ...partners];

  return (
    <section
      className={`py-5 overflow-hidden select-none border-y ${
        isDarkMode ? 'bg-[#07080b] border-white/[0.05]' : 'bg-gray-50 border-gray-200'
      }`}
      aria-label="Collaborators"
    >
      <div
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="single-line-marquee flex items-center">
          {loop.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <div className="flex items-center gap-2.5 px-5 py-2 group cursor-default">
                <span className={`text-sm font-black tracking-tight transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 group-hover:text-blue-400'
                    : 'text-gray-600 group-hover:text-blue-700'
                }`}>
                  {item.name}
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                  isDarkMode ? 'bg-white/[0.04] text-slate-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.tag}
                </span>
              </div>
              <span className={`text-[6px] mx-2 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>●</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
