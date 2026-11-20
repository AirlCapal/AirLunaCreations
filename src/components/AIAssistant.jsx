import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  ArrowRight, 
  Compass, 
  Image as ImageIcon,
  Palette,
  Briefcase,
  Mail,
  ChevronDown
} from 'lucide-react';
import { processUserQuery, SUGGESTED_PROMPTS, scrollToSection } from '../utils/aiAssistant.js';

export default function AIAssistant({ 
  onSelectImage, 
  isDarkMode, 
  setIsDarkMode,
  isOpen,
  setIsOpen 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hey! I'm **Luna**, Airl's AI Concierge. ✦\n\nI can answer questions about Airl's work, experience, software tools, client testimonials, or navigate you anywhere across the portfolio. How can I help you today?",
      actions: [
        { label: "Show Logos", target: "#marks" },
        { label: "Celestial Rebrand", target: "#celestial" },
        { label: "Hire Airl", target: "#contact" }
      ],
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll inside chat log
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle action click (scrolling or triggering event)
  const handleActionClick = (act) => {
    if (act.href) {
      window.open(act.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (act.target === 'action' && act.actionKey === 'toggleTheme') {
      setIsDarkMode(prev => !prev);
      return;
    }
    if (act.target && act.target.startsWith('#')) {
      scrollToSection(act.target);
      // On small mobile screens, minimize or close chat so user can see the section
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    }
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserQuery(query, {
        onSelectImage,
        onToggleTheme: () => setIsDarkMode(prev => !prev)
      });

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        items: response.items,
        actions: response.actions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Conversation cleared. Feel free to ask me anything about Airl's work, experience, or tools!",
        actions: [
          { label: "Show Logos", target: "#marks" },
          { label: "Hire Airl", target: "#contact" }
        ],
        timestamp: new Date()
      }
    ]);
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [setIsOpen]);

  return (
    <>
      {/* ── Floating Badge / Trigger (Bottom Right) ── */}
      {/* Mobile: small circular pulse button to never block screen; Desktop: pill badge */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Assistant"
          className="group relative flex items-center justify-center gap-2 px-3.5 py-3 sm:px-4 sm:py-3 rounded-full shadow-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white border-blue-400/40 shadow-blue-500/25"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <span className="text-xs font-black tracking-wider uppercase hidden sm:inline">
            Ask Luna AI
          </span>
          <span className="hidden md:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono text-blue-100">
            ⌘K
          </span>
        </button>
      </div>

      {/* ── Main Chat Interface Window ── */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col shadow-2xl backdrop-blur-2xl border ${
            isExpanded 
              ? 'inset-2 sm:inset-6 md:inset-12 rounded-2xl'
              : 'bottom-0 right-0 sm:bottom-20 sm:right-6 w-full sm:w-[410px] h-[92vh] sm:h-[580px] max-h-[92vh] rounded-t-3xl sm:rounded-3xl'
          } ${
            isDarkMode 
              ? 'bg-[#0f1422]/98 border-slate-700/60 shadow-cyan-950/40 text-slate-100' 
              : 'bg-white/98 border-slate-200 shadow-slate-400/30 text-slate-800'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-4 sm:px-5 py-3.5 border-b shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/70'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black uppercase tracking-wider">Luna AI</h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">AirLuna Creations Concierge</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className={`p-1.5 rounded-lg transition-colors hidden sm:block ${
                  isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Action Navigation Pills */}
          <div className={`px-3 sm:px-4 py-2 border-b flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] shrink-0 ${
            isDarkMode ? 'border-slate-800/80 bg-slate-950/30' : 'border-slate-100 bg-slate-50/70'
          }`}>
            <button
              onClick={() => handleSend("Show me your logo designs")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all font-medium text-[10.5px]"
            >
              <Palette className="w-3 h-3" /> Logos
            </button>
            <button
              onClick={() => handleSend("Tell me about Celestial Esports rebrand")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all font-medium text-[10.5px]"
            >
              <Compass className="w-3 h-3" /> Celestial Rebrand
            </button>
            <button
              onClick={() => handleSend("Show me UI/UX & Web projects")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-medium text-[10.5px]"
            >
              <ImageIcon className="w-3 h-3" /> Web/UI
            </button>
            <button
              onClick={() => handleSend("How can I hire you or get a quote?")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full whitespace-nowrap bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all font-medium text-[10.5px]"
            >
              <Mail className="w-3 h-3" /> Rates & Hire
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 sm:gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                    : isDarkMode 
                      ? 'bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-tl-none' 
                      : 'bg-slate-100 text-slate-800 border border-slate-200/90 rounded-tl-none'
                }`}>
                  {/* Markdown-style bold and list rendering */}
                  <div className="whitespace-pre-line space-y-1">
                    {msg.text.split('\n').map((line, i) => {
                      if (!line.trim()) return <div key={i} className="h-1" />;
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p 
                          key={i} 
                          dangerouslySetInnerHTML={{ __html: formatted }} 
                          className="break-words"
                        />
                      );
                    })}
                  </div>

                  {/* Thumbnail Previews if items returned */}
                  {msg.items && msg.items.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-700/40 grid grid-cols-2 gap-2">
                      {msg.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            onSelectImage(item);
                            if (window.innerWidth < 640) setIsOpen(false);
                          }}
                          className={`cursor-pointer rounded-lg overflow-hidden border p-1 group transition-all hover:scale-105 active:scale-95 ${
                            isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-cyan-400' : 'bg-white border-slate-200 hover:border-blue-500'
                          }`}
                        >
                          <div className="aspect-square rounded overflow-hidden bg-slate-950 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <p className="mt-1 text-[10px] font-bold truncate text-center">{item.title}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Navigation Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/30 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/30 border border-blue-400/30 cursor-pointer"
                        >
                          {act.label} <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing state indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex gap-1 items-center px-3 py-2 rounded-xl bg-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Carousel */}
          <div className={`px-3 py-2 border-t overflow-x-auto scrollbar-none flex gap-1.5 shrink-0 ${
            isDarkMode ? 'border-slate-800/60 bg-slate-900/30' : 'border-slate-100 bg-slate-50'
          }`}>
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className={`text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap transition-all border shrink-0 ${
                  isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className={`p-3 border-t shrink-0 ${
            isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'
          }`}>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Luna anything..."
                className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500'
                    : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                }`}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                aria-label="Send Message"
                className={`p-2.5 rounded-xl transition-all ${
                  inputValue.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 hover:brightness-110 active:scale-95'
                    : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
