import React, { useState } from 'react';
import { Mail, Phone, ArrowUpRight, Copy, Check, Send, Loader2, AlertCircle, X, ShieldCheck } from 'lucide-react';

export default function StoryEpilogue({ contacts, isDarkMode }) {
  const [copiedStudio, setCopiedStudio] = useState(false);
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', scope: 'brand', message: '' });
  const [emailError, setEmailError] = useState('');

  // Strict email validation regex & disposable domain detection
  const validateEmailFormat = (email) => {
    const trimmed = email.trim();
    // RFC 5322 standard email structure
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    if (!trimmed) {
      return 'Email address is required.';
    }
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g., name@company.com).';
    }
    
    // Ensure domain has at least 2 characters TLD (.com, .org, .co, etc.)
    const parts = trimmed.split('@');
    if (parts.length === 2) {
      const domainParts = parts[1].split('.');
      const tld = domainParts[domainParts.length - 1];
      if (!tld || tld.length < 2) {
        return 'Please provide a valid domain extension (e.g., .com, .io).';
      }
    }
    return '';
  };

  const scopeLabels = {
    brand: 'Brand Identity & Complete Guidelines',
    esports: 'Esports Team Branding & Merch Package',
    print: 'Poster, Event Flyer & Publication Layout',
    social: 'Social Media Marketing Collateral',
    web: 'UI/UX Web Design & Front-End Engineering',
    other: 'General Design Collaboration'
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'studio') {
      setCopiedStudio(true);
      setTimeout(() => setCopiedStudio(false), 2000);
    } else {
      setCopiedPersonal(true);
      setTimeout(() => setCopiedPersonal(false), 2000);
    }
  };

  // Step 1: Open confirmation modal after rigorous validation
  const handlePreSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // 1. Name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormError('Please enter a valid name (at least 2 characters).');
      return;
    }

    // 2. Email validation
    const err = validateEmailFormat(formData.email);
    if (err) {
      setEmailError(err);
      setFormError(err);
      return;
    }
    setEmailError('');

    // 3. Message validation
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormError('Please share a few more details in your message (at least 10 characters).');
      return;
    }

    setShowConfirmModal(true);
  };

  // Step 2: Actually execute the delivery upon user confirming
  const handleConfirmedSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '37f76bc1-00fb-4b44-b874-4a2d65c9d396',
          name: formData.name,
          email: formData.email,
          replyto: formData.email,
          client_email: formData.email,
          subject: `New Client Project Inquiry: ${scopeLabels[formData.scope] || formData.scope} – ${formData.name}`,
          scope: scopeLabels[formData.scope] || formData.scope,
          message: formData.message,
          from_name: `${formData.name} via AirLuna Creations Portfolio`
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSent(true);
        setFormData({ name: '', email: '', scope: 'brand', message: '' });
      } else {
        setFormError(result.message || 'Something went wrong. Please try again or email directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Seamless fallback to mailto if offline or blocked by adblock
      const subject = encodeURIComponent(`[ALC Portfolio Inquiry] ${formData.scope.toUpperCase()} from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.scope}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:${contacts.email}?subject=${subject}&body=${body}`, '_blank');
      setFormSent(true);
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Studio Official Email */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-blue-400 block">Studio & Business Inquiries</span>
                    <a href={`mailto:${contacts.email}`} className={`text-xs sm:text-sm font-bold ${
                      isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-700'
                    }`}>
                      {contacts.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(contacts.email, 'studio')}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Copy studio email"
                >
                  {copiedStudio ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Personal / Backup Direct Email */}
              {contacts.personalEmail && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? 'bg-[#10131a] border-white/[0.08]' : 'bg-white border-gray-200 shadow-sm'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Direct / Personal Email</span>
                      <a href={`mailto:${contacts.personalEmail}`} className={`text-xs sm:text-sm font-bold ${
                        isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-900 hover:text-blue-700'
                      }`}>
                        {contacts.personalEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contacts.personalEmail, 'personal')}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      isDarkMode ? 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Copy personal email"
                  >
                    {copiedPersonal ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Phone / Mobile */}
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
                <div className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center space-y-2 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-blue-400">Message Delivered Straight to Airl!</h4>
                  <p className="text-xs text-gray-400">Thank you for reaching out. Your inquiry has been forwarded directly to <strong>{contacts.email}</strong> and I will get back to you shortly.</p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-3 px-4 py-1.5 rounded-full text-[11px] font-bold border border-blue-500/40 text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePreSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

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
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Email Address
                        </label>
                        {emailError && (
                          <span className="text-[10px] font-medium text-rose-400 animate-pulse">
                            {emailError}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onBlur={() => setEmailError(validateEmailFormat(formData.email))}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (emailError) setEmailError(validateEmailFormat(e.target.value));
                        }}
                        placeholder="john@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                          emailError 
                            ? 'border-rose-500 bg-rose-500/5 text-rose-300 focus:border-rose-500' 
                            : isDarkMode 
                              ? 'bg-[#090b0e] border-white/[0.08] text-white focus:border-blue-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
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
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white font-black text-[11px] uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Directly to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <span>Review & Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
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

      {/* ── Confirmation Modal before Final Dispatch ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-md p-6 sm:p-7 rounded-3xl border shadow-2xl relative ${
            isDarkMode ? 'bg-[#0f1422] border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Confirm Your Message</h3>
                <p className="text-[11px] text-slate-400">Please review before sending directly to Airl</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2.5 text-xs mb-5 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
                <span className="text-[10px] uppercase font-bold text-slate-400">From</span>
                <span className="font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
                <span className="text-[10px] uppercase font-bold text-slate-400">Your Email</span>
                <span className="font-mono text-blue-400 font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-700/30">
                <span className="text-[10px] uppercase font-bold text-slate-400">Project Scope</span>
                <span className="font-bold text-right text-[11px]">{scopeLabels[formData.scope] || formData.scope}</span>
              </div>
              <div className="pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Message Preview</span>
                <p className={`p-2.5 rounded-xl text-[11px] max-h-24 overflow-y-auto italic ${
                  isDarkMode ? 'bg-slate-950/60 text-slate-300' : 'bg-white text-slate-700'
                }`}>
                  "{formData.message}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                Edit Message
              </button>
              <button
                type="button"
                onClick={handleConfirmedSubmit}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Yes, Send Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
