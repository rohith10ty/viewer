import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Play, 
  Info, 
  Film, 
  Tv, 
  Sparkles, 
  ArrowRight,
  Star
} from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { MEDIA_ITEMS } from '../data/mockData';

export default function WatchlistView({ onSelectMedia, onPlayMedia, onNavigateHome }) {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const [filterType, setFilterType] = useState('all');

  // Match IDs with actual media items
  const savedItems = watchlist
    .map(id => MEDIA_ITEMS.find(item => item.id === id))
    .filter(Boolean);

  const filteredItems = savedItems.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-rose-600/20 text-rose-400 font-bold text-xs uppercase tracking-wider border border-rose-500/30 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 fill-rose-400" />
              Saved Library
            </span>
            <span className="text-xs text-zinc-400">
              {savedItems.length} Titles Saved
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            My Watchlist
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            All your bookmarked movies and shows, stored and synced locally on your device.
          </p>
        </div>

        {/* Filter & Clear buttons */}
        {savedItems.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10">
              {[
                { id: 'all', label: 'All' },
                { id: 'movie', label: 'Movies' },
                { id: 'tv', label: 'TV Shows' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterType === tab.id
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={clearWatchlist}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-600/20 text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Clear all saved titles"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-600/20 transition-all duration-300 aspect-[2/3] flex flex-col justify-end"
            >
              {/* Poster Image */}
              <img
                src={item.poster}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-bold text-[11px] border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {item.rating}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-900/80 backdrop-blur-md text-zinc-300 border border-white/10">
                  {item.ageRating}
                </span>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(item.id, item.title);
                }}
                className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-rose-600 text-zinc-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
                title="Remove from Watchlist"
                aria-label="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-3 space-y-2">
                <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-rose-400 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span className="uppercase text-[10px]">{item.type}</span>
                  <span>•</span>
                  <span>{item.matchScore}% Match</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onPlayMedia(item)}
                    className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch</span>
                  </button>
                  <button
                    onClick={() => onSelectMedia(item)}
                    className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-white/10 transition-colors"
                    title="Details"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Watchlist State */
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl p-8 border border-white/10 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mb-5 shadow-inner">
            <Bookmark className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Your Watchlist is Empty</h2>
          <p className="text-sm text-zinc-400 mb-6 max-w-sm">
            Save movies and TV shows you want to watch later by clicking the "+" button anywhere on Viewer.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-transform active:scale-95"
          >
            <span>Explore Trending Shows</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
