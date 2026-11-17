import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { createWatermarkedImage } from '../utils/watermark';

export default function Modal({ item, onClose, isDarkMode }) {
  const [downloading, setDownloading] = useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Pre-generate watermarked version
    if (item?.image) {
      createWatermarkedImage(item.image).then((url) => {
        setWatermarkedUrl(url);
      });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const url = watermarkedUrl || await createWatermarkedImage(item.image);
      const a = document.createElement('a');
      a.href = url;
      const cleanTitle = (item.title || 'airluna-design')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      a.download = `${cleanTitle}-airluna-creations-watermarked.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border shadow-2xl z-10 transition-colors ${
        isDarkMode ? 'bg-[#0f1117] border-white/10' : 'bg-white border-gray-200'
      }`}>
        
        {/* Header Bar */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDarkMode ? 'border-white/10 bg-[#0a0d14]' : 'border-gray-200 bg-gray-50'
        }`}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">
              {item.categoryBadge || item.category || 'Portfolio Showcase'}
            </span>
            <h3 className={`text-base sm:text-lg font-bold tracking-tight truncate max-w-md ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Download with Watermark button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                downloading
                  ? 'bg-blue-600/50 text-white border-blue-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-sm'
              }`}
              title="Download image with official ALC watermark"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {downloading ? 'Preparing...' : 'Download (Watermarked)'}
              </span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode ? 'border-white/10 text-gray-300 hover:text-white hover:bg-white/10' : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Frame with watermark watermark layer overlay on right click / save */}
        <div className={`relative flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center min-h-[300px] ${
          isDarkMode ? 'art-matting-dark' : 'art-matting-light'
        }`}>
          <div className="relative group max-h-[70vh] flex items-center justify-center">
            {/* The artwork image */}
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300"
              draggable="false"
            />

            {/* Invisible / subtle center watermark watermark preview badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 sm:opacity-25 select-none transition-opacity">
              <img
                src="/assets/media/LOGO%20DESIGN/alc_official_logo.png"
                alt="ALC Watermark"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              />
              <span className="text-white text-[11px] sm:text-xs font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-1 font-mono">
                AirLuna Creations
              </span>
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className={`px-6 py-3 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-2 ${
          isDarkMode ? 'border-white/10 bg-[#0a0d14] text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'
        }`}>
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">
              {item.tagline || item.desc || 'Original design asset by AirLuna Creations.'}
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider shrink-0">
            Protected by AirLuna Creations (ALC)
          </span>
        </div>

      </div>
    </div>
  );
}
