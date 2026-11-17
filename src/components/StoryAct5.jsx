import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Quote, Handshake } from 'lucide-react';

export default function StoryAct5({ profile, isDarkMode }) {
  return (
    <section
      id="chronicle"
      className={`py-24 select-none ${isDarkMode ? "bg-[#030712]/40" : "bg-white/40 backdrop-blur-[2px]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#38bdf8]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
              Chapter 06 — Professional Path
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Six Years of Work &amp; Collaboration
          </h2>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Milestones across esports leadership, agency internships, creative direction, and feedback.
          </p>
        </div>

        {/* Two-column layout: portrait + career */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">

          {/* Left: Portrait + Education */}
          <div className="lg:col-span-5 space-y-5">
            <div className={`rounded-2xl border overflow-hidden ${
              isDarkMode ? 'bg-[#10131a] border-white/[0.07]' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={profile.aboutPortrait}
                  alt="Airl"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Airl
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mt-0.5">
                  Creative Designer &amp; Founder
                </p>
              </div>
            </div>

            {/* Education */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDarkMode ? 'bg-[#10131a] border-white/[0.07]' : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#38bdf8]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </div>
              {profile.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-blue-500/50 pl-3 space-y-0.5">
                  <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {edu.degree}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {edu.institution} ({edu.period})
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Career timeline */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              <span>Career History</span>
            </div>

            {profile.experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all hover:scale-[1.005] ${
                  isDarkMode
                    ? 'bg-[#10131a] border-white/[0.07] hover:border-blue-500/30'
                    : 'bg-white border-gray-200 hover:border-blue-500 shadow-sm'
                }`}
              >
                <div className="min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500">
                    {exp.type}
                  </span>
                  <h4 className={`text-sm font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {exp.role}
                  </h4>
                  <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{exp.company}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border shrink-0 self-start sm:self-auto ${
                  isDarkMode
                    ? 'bg-white/[0.04] border-white/[0.08] text-slate-300'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}>
                  {exp.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Collaborations */}
        <div className={`mb-16 p-6 sm:p-8 rounded-2xl border ${
          isDarkMode ? 'bg-[#0a0d14]/60 border-white/[0.07]' : 'bg-white/70 border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#38bdf8] mb-5">
            <Handshake className="w-4 h-4" />
            <span>Past Collaborations</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {(profile.collaborations || []).map((org, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  isDarkMode
                    ? 'bg-[#1e3a8a]/20 border-blue-500/30 text-blue-300 hover:bg-[#1e3a8a]/40 hover:border-blue-400/50'
                    : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 hover:border-blue-400'
                }`}
              >
                {org}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={`pt-10 border-t ${isDarkMode ? 'border-white/[0.07]' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-blue-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
              Endorsements
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What Collaborators Say
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {profile.testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                  isDarkMode ? 'bg-[#10131a] border-white/[0.07]' : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div>
                  <Quote className="w-5 h-5 text-blue-500/40 mb-3" />
                  <p className={`text-[11px] italic leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{t.quote}"
                  </p>
                </div>

                <div className={`flex items-center gap-3 pt-3 border-t ${
                  isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'
                }`}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h5 className={`text-[11px] font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t.name}
                    </h5>
                    <p className={`text-[9px] truncate ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
