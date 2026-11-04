import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function ContentRow({
  title,
  subtitle = null,
  icon: Icon = null,
  items = [],
  onSelectMedia,
  onPlayMedia,
  isRanked = false,
  aspect = 'portrait',
  onExploreAll = null
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative group/row py-4 sm:py-6">
      {/* Row Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-baseline justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-rose-600/10 text-rose-500">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-zinc-400 font-normal">{subtitle}</p>
            )}
          </div>
        </div>

        {onExploreAll && (
          <button
            onClick={onExploreAll}
            className="text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 group/btn"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Slider Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-rose-600 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Track - No scrollbar visible */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`shrink-0 transition-transform duration-200 ${
                aspect === 'landscape'
                  ? 'w-[260px] sm:w-[320px] md:w-[360px]'
                  : isRanked
                  ? 'w-[180px] sm:w-[210px] md:w-[230px]'
                  : 'w-[160px] sm:w-[190px] md:w-[210px]'
              }`}
            >
              <MovieCard
                item={item}
                rank={isRanked ? index + 1 : null}
                aspect={aspect}
                onSelect={onSelectMedia}
                onPlay={onPlayMedia}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-rose-600 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
