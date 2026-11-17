import React, { useState } from 'react';
import { Mail, Phone, ArrowUpRight, Copy, Check, Send } from 'lucide-react';

export default function StoryEpilogue({ contacts, isDarkMode }) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', scope: 'brand', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    // Generate mailto link for direct message delivery
    const subject = encodeURIComponent(`[ALC Portfolio Inquiry] ${formData.scope.toUpperCase()} from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.scope}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${contacts.email}?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <footer id="contact" className={`py-24 select-none ${
      isDarkMode ? "bg-[#030712]/40" : "bg-white/40 backdrop-blur-[2px]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
                  Epilogue — Contact
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Let’s build something impactful.
              </h2>
            </div>
            
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Available for brand identity systems, esports merchandise packages, event print collateral, and front-end interface engineering.
            </p>

            <div className="space-y-3 pt-2">
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Direct Email</span>
                    <a href={`mailto:${contacts.email}`} className={`text-xs sm:text-sm font-bold ${
                      isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-700'
                    }`}>
                      {contacts.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={`p-2 rounded-lg border transition-colors ${
                    isDarkMode ? 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-blue-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Phone / Mobile</span>
                    <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className={`text-xs sm:text-sm font-bold ${
                      isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-700'
                    }`}>
                      {contacts.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${contacts.phone.replace(/\s+/g, '')}`}
                  className={`p-2 rounded-lg border transition-colors ${
                    isDarkMode ? 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                External Channels & Socials
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { name: 'Instagram', url: contacts.instagram },
                  { name: 'LinkedIn', url: contacts.linkedin },
                  { name: 'Facebook', url: contacts.facebook },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                      isDarkMode
                        ? 'bg-[#10131a] border-white/[0.08] text-gray-300 hover:text-white hover:border-blue-500/50'
                        : 'bg-white border-gray-200 text-gray-700 hover:text-blue-700 hover:border-blue-500 shadow-sm'
                    }`}
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
              isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200'
            }`}>
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-1">
                  Start a Project
                </span>
                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Send a Direct Message
                </h3>
              </div>

              {formSent ? (
                <div className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-blue-400">Message Delivered</h4>
                  <p className="text-xs text-gray-400">Thanks for reaching out! Airl will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                          isDarkMode ? 'bg-[#090b0e] border-white/[0.08] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                          isDarkMode ? 'bg-[#090b0e] border-white/[0.08] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                      Scope / Project Type
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                        isDarkMode ? 'bg-[#090b0e] border-white/[0.08] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    >
                      <option value="brand">Brand Identity & Complete Guidelines</option>
                      <option value="esports">Esports Team Branding & Merch Package</option>
                      <option value="print">Poster, Event Flyer & Publication Layout</option>
                      <option value="social">Social Media Marketing Collateral</option>
                      <option value="web">UI/UX Web Design & Front-End Engineering</option>
                      <option value="other">General Design Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, timeline, and vision..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                        isDarkMode ? 'bg-[#090b0e] border-white/[0.08] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 ${
          isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'
        }`}>
          <div>
            © {new Date().getFullYear()} Airl — AirLuna Creations (ALC).
          </div>
          <div>
            Creative Designer & Front-End Developer
          </div>
        </div>

      </div>
    </footer>
  );
}
