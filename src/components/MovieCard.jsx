import React, { useState } from 'react';
import { Play, Plus, Check, Info, Star } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ 
  item, 
  onSelect, 
  onPlay, 
  rank = null, 
  aspect = 'portrait' 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(item.id);

  const handleCardClick = (e) => {
    // If clicked directly, open detail modal
    onSelect(item);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay(item);
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    toggleWatchlist(item);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    onSelect(item);
  };

  return (
    <div
      className="group relative cursor-pointer select-none transition-all duration-300 transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* If this card has a Top 10 Rank */}
      {rank !== null && (
        <div className="absolute -left-3 sm:-left-5 bottom-2 sm:bottom-4 z-20 pointer-events-none select-none">
          <span 
            className="text-6xl sm:text-8xl font-black italic tracking-tighter"
            style={{
              color: '#08090c',
              WebkitTextStroke: '3px #52525b',
              textShadow: '0 4px 20px rgba(0,0,0,0.9)'
            }}
          >
            {rank}
          </span>
        </div>
      )}

      {/* Main Poster Container */}
      <div 
        className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-white/5 transition-all duration-300 group-hover:border-rose-500/40 group-hover:shadow-2xl group-hover:shadow-rose-600/20 group-hover:-translate-y-1.5 ${
          rank !== null ? 'ml-7 sm:ml-10' : ''
        } ${
          aspect === 'landscape' ? 'aspect-video' : 'aspect-[2/3]'
        }`}
      >
        <img
          src={aspect === 'landscape' ? item.backdrop : item.poster}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          {item.rating && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-[11px] border border-amber-400/20 shadow">
              <Star className="w-3 h-3 fill-amber-400" />
              {item.rating}
            </span>
          )}
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-white/10">
            {item.ageRating}
          </span>
        </div>

        {/* Hover / Bottom Overlay Info */}
        <div className="absolute bottom-0 inset-x-0 p-3 z-10 flex flex-col justify-end">
          <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-rose-400 transition-colors drop-shadow">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 text-[11px] text-zinc-300 mt-1 font-medium">
            <span className="text-emerald-400 font-semibold">{item.matchScore}% Match</span>
            <span>•</span>
            <span>{item.year}</span>
            <span>•</span>
            <span className="uppercase text-[10px]">{item.type}</span>
          </div>

          {/* Quick Action Buttons (Show on hover or always subtle) */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/10 mt-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayClick}
                className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-transform active:scale-90"
                title="Watch Now"
                aria-label="Play"
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </button>

              <button
                onClick={handleWatchlistClick}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  isSaved
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-zinc-800/80 hover:bg-zinc-700 border-white/20 text-zinc-200'
                }`}
                title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                aria-label="Toggle Watchlist"
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={handleInfoClick}
              className="w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-white/20 text-zinc-200 flex items-center justify-center transition-colors"
              title="Details & Episodes"
              aria-label="More Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
