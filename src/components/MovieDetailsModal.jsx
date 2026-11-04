import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Plus, 
  Check, 
  Star, 
  Flame, 
  Clock, 
  Calendar, 
  Award, 
  Volume2, 
  Share2, 
  Tv, 
  Film,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { MEDIA_ITEMS } from '../data/mockData';
import MovieCard from './MovieCard';

export default function MovieDetailsModal({ mediaItem, onClose, onPlayMedia, onSelectMedia }) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mediaItem) return null;

  const isSaved = isInWatchlist(mediaItem.id);

  // Recommendations: media items with overlapping genres, excluding current item
  const relatedItems = MEDIA_ITEMS.filter(
    (item) => item.id !== mediaItem.id && item.genres.some(g => mediaItem.genres.includes(g))
  ).slice(0, 4);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#0e1017] rounded-none sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-rose-600 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Header */}
        <div className="relative w-full h-[340px] sm:h-[420px]">
          <img
            src={mediaItem.backdrop}
            alt={mediaItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1017] via-[#0e1017]/40 to-transparent sm:w-2/3" />

          {/* Floating Actions on Banner */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="max-w-xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white uppercase tracking-wider">
                  {mediaItem.type === 'tv' ? 'TV Series' : 'Blockbuster Movie'}
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  {mediaItem.matchScore}% Match
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {mediaItem.title}
              </h2>
              {mediaItem.tagline && (
                <p className="text-xs sm:text-sm text-zinc-300 italic font-medium">
                  "{mediaItem.tagline}"
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onPlayMedia(mediaItem)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-600/40 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(mediaItem)}
                className={`p-3 rounded-xl border backdrop-blur-md transition-colors ${
                  isSaved
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
                title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-white/10">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {mediaItem.rating} Rating
                </span>
                <span>•</span>
                <span>{mediaItem.year}</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                  {mediaItem.ageRating}
                </span>
                <span>•</span>
                <span>{mediaItem.type === 'tv' ? mediaItem.seasons : mediaItem.duration}</span>
                <span>•</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                  {mediaItem.quality || '4K Ultra HD'}
                </span>
              </div>

              {/* Synopsis */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {mediaItem.description}
              </p>

              {/* Audio & Video Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                  Audio: {mediaItem.audio || 'Dolby Atmos'}
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                  Subtitles: English, Spanish, French, German
                </span>
              </div>
            </div>

            {/* Right Meta Column: Cast & Director */}
            <div className="space-y-3 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Director / Creator
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {mediaItem.director || 'Visionary Studios'}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Genres
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {mediaItem.genres.map((g) => (
                    <span
                      key={g}
                      className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-white/5"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Audio Formats
                </span>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {mediaItem.audio || 'Dolby Digital Plus 5.1'}
                </p>
              </div>
            </div>
          </div>

          {/* Cast Members with Photos */}
          {mediaItem.cast && mediaItem.cast.length > 0 && (
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                Starring Cast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaItem.cast.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{member.name}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TV Shows: Interactive Episodes List */}
          {mediaItem.type === 'tv' && mediaItem.episodes && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Tv className="w-4 h-4 text-rose-500" />
                  <span>Episodes & Seasons</span>
                </h3>
                <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">
                  Season 1
                </span>
              </div>

              <div className="space-y-3">
                {mediaItem.episodes.map((ep) => (
                  <div
                    key={ep.episodeNum}
                    onClick={() => onPlayMedia(mediaItem)}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="relative w-28 sm:w-36 aspect-video rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
                        <img
                          src={ep.thumb}
                          alt={ep.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 fill-white text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-400">
                            E{ep.episodeNum}
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                            {ep.title}
                          </h4>
                          <span className="text-[11px] text-zinc-500">
                            ({ep.duration})
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                          {ep.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayMedia(mediaItem);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-800 group-hover:bg-rose-600 text-zinc-300 group-hover:text-white text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Recommendations */}
          {relatedItems.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>More Like This</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {relatedItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => onSelectMedia(item)}
                    className="cursor-pointer"
                  >
                    <MovieCard
                      item={item}
                      onSelect={onSelectMedia}
                      onPlay={onPlayMedia}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
