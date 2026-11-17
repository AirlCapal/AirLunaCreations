import React, { useState, useMemo } from 'react';
import { Search, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';

export default function StoryArchive({ categories, onSelectImage, isDarkMode }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const INITIAL_LIMIT = 12;

  const allItems = useMemo(() => {
    const list = [];
    categories.forEach((cat) => {
      if (cat.items && cat.items.length > 0) {
        cat.items.forEach((item) => {
          list.push({
            ...item,
            categoryLabel: cat.label,
            categoryId: cat.id,
          });
        });
      }
    });
    return list;
  }, [categories]);

  const filteredItems = useMemo(() => {
    let result =
      activeTab === 'all'
        ? allItems
        : allItems.filter((item) => item.categoryId === activeTab);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeTab, allItems, searchQuery]);

  const displayedItems = useMemo(() => {
    return showAll ? filteredItems : filteredItems.slice(0, INITIAL_LIMIT);
  }, [filteredItems, showAll]);

  const handleTabChange = (catId) => {
    setActiveTab(catId);
    setShowAll(false);
  };

  return (
    <section
      id="archive"
      className={`py-24 select-none ${
        isDarkMode ? 'bg-[#08090c]' : 'bg-[#f4f5f8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">
                Chapter 07 — Complete Repository
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              All Design Assets
            </h2>
            <p className={`text-sm mt-2 max-w-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Browse every extracted visual asset with adaptive contrast matting to view light and dark designs with full fidelity.
            </p>
          </div>

          <div className={`text-[11px] font-bold px-4 py-2 rounded-full border self-start md:self-auto ${
            isDarkMode ? 'bg-white/[0.04] border-white/[0.08] text-slate-300' : 'bg-white border-gray-200 text-gray-700 shadow-sm'
          }`}>
            Showing {displayedItems.length} of {filteredItems.length} Works
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = activeTab === cat.id;
              const count = cat.id === 'all' ? allItems.length : cat.items?.length || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0d2062] via-[#2563eb] to-[#38bdf8] text-white shadow'
                      : isDarkMode
                      ? 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors border ${
                isDarkMode
                  ? 'bg-[#10131a] border-white/[0.08] text-white placeholder-gray-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => onSelectImage(item)}
              className={`rounded-2xl border cursor-pointer group flex flex-col justify-between overflow-hidden transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-[#10131a] border-white/[0.07] hover:border-blue-500/40'
                  : 'bg-white border-gray-200 hover:border-blue-600 shadow-sm'
              }`}
            >
              <div className={`aspect-square w-full p-3 flex items-center justify-center relative overflow-hidden ${
                isDarkMode ? 'art-matting-dark' : 'art-matting-light'
              }`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className={`p-2.5 border-t ${
                isDarkMode ? 'border-white/[0.05]' : 'border-gray-100'
              }`}>
                <h5 className={`text-[10px] font-bold truncate ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h5>
                <span className="text-[8px] font-bold uppercase tracking-wider text-gray-500 block truncate mt-0.5">
                  {item.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Toggle Button */}
        {filteredItems.length > INITIAL_LIMIT && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-blue-500/40'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-blue-600 shadow-sm'
              }`}
            >
              <span>{showAll ? 'Show Fewer Assets' : `View All (${filteredItems.length}) Works`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-blue-500" />}
            </button>
          </div>
        )}

        {displayedItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">No assets match your search criteria.</p>
          </div>
        )}

      </div>
    </section>
  );
}
