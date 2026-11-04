import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Star,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function HeroSection({ featuredItems, onPlayMovie, onShowDetails }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const currentItem = featuredItems[currentIndex] || featuredItems[0];
  const isSaved = currentItem ? isInWatchlist(currentItem.id) : false;

  // Auto-advance featured slider every 7.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [featuredItems.length, isPaused]);

  if (!currentItem) return null;

  return (
    <div 
      className="relative w-full h-[88vh] min-h-[580px] max-h-[860px] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Backdrops with crossfade */}
      {featuredItems.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transition-transform duration-[8000ms]`}
        >
          <img
            src={item.backdrop}
            alt={item.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/80 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#08090c]/20 to-[#08090c]/80" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-2xl space-y-4">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {currentItem.trendingRank && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30">
                <Flame className="w-3.5 h-3.5 fill-white" />
                # {currentItem.trendingRank} in Trending
              </span>
            )}
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/10 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
              {currentItem.matchScore}% Match
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 backdrop-blur-md text-zinc-300 border border-white/10">
              {currentItem.ageRating}
            </span>
            <span className="text-xs text-zinc-300 font-medium">
              {currentItem.year}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {currentItem.type === 'tv' ? currentItem.seasons : currentItem.duration}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
              {currentItem.quality || '4K UHD'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
            {currentItem.title}
          </h1>

          {/* Tagline / Subtitle */}
          {currentItem.tagline && (
            <p className="text-sm sm:text-base font-semibold text-rose-400/95 italic">
              "{currentItem.tagline}"
            </p>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-300 line-clamp-3 leading-relaxed drop-shadow max-w-xl">
            {currentItem.description}
          </p>

          {/* Genres Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {currentItem.genres.map((genre) => (
              <span
                key={genre}
                className="text-xs font-medium text-zinc-400 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {/* Play Button */}
            <button
              onClick={() => onPlayMovie(currentItem)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-rose-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Now</span>
            </button>

            {/* Info Button */}
            <button
              onClick={() => onShowDetails(currentItem)}
              className="px-5 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-white font-semibold text-sm sm:text-base flex items-center gap-2 backdrop-blur-md border border-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Info className="w-5 h-5 text-zinc-300" />
              <span>More Info</span>
            </button>

            {/* Watchlist Toggle Button */}
            <button
              onClick={() => toggleWatchlist(currentItem)}
              className={`p-3 rounded-xl border backdrop-blur-md transition-all duration-200 ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-zinc-900/60 border-white/15 text-zinc-300 hover:text-white hover:bg-zinc-800/80'
              }`}
              title={isSaved ? 'In your Watchlist' : 'Add to Watchlist'}
              aria-label="Toggle Watchlist"
            >
              {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom Right Controls: Mute & Spotlight Thumbnails */}
        <div className="absolute bottom-16 right-4 sm:right-8 z-20 flex flex-col items-end gap-4">
          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-md shadow-lg"
            title={isMuted ? 'Unmute Audio Preview' : 'Mute Audio Preview'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Featured items mini switcher */}
          <div className="hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            {featuredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all duration-300 ${
                  idx === currentIndex
                    ? 'ring-2 ring-rose-500 scale-105 opacity-100 shadow-md'
                    : 'opacity-50 hover:opacity-85'
                }`}
              >
                <img
                  src={item.backdrop}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {idx === currentIndex && (
                  <div className="absolute inset-0 bg-rose-500/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
