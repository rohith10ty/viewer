import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Film, 
  Tv, 
  ArrowUpDown, 
  Star,
  Sparkles
} from 'lucide-react';
import { MEDIA_ITEMS, GENRES } from '../data/mockData';
import MovieCard from '../components/MovieCard';

export default function CatalogView({
  initialType = 'all', // 'all' | 'movie' | 'tv'
  initialGenre = 'All',
  initialQuery = '',
  onSelectMedia,
  onPlayMedia
}) {
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'year' | 'title'

  // Filter & sort logic
  const filteredItems = useMemo(() => {
    return MEDIA_ITEMS.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Genre filter
      if (selectedGenre !== 'All' && !item.genres.includes(selectedGenre)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesGenre = item.genres.some(g => g.toLowerCase().includes(q));
        const matchesCast = item.cast?.some(c => c.name.toLowerCase().includes(q));
        const matchesDirector = item.director?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesGenre && !matchesCast && !matchesDirector) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedType, selectedGenre, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedGenre('All');
    setSearchQuery('');
    setSortBy('rating');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Page Title & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-rose-600/20 text-rose-400 font-bold text-xs uppercase tracking-wider border border-rose-500/30">
              Complete Catalog
            </span>
            <span className="text-xs text-zinc-400">
              {filteredItems.length} Available Titles
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Explore TV Shows & Movies
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Stream award-winning cinema, bingeable series, and exclusive originals in stunning 4K HDR.
          </p>
        </div>

        {/* Media Type Switcher: All / TV / Movies */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10 self-start md:self-auto">
          {[
            { id: 'all', label: 'All Titles' },
            { id: 'tv', label: 'TV Shows', icon: Tv },
            { id: 'movie', label: 'Movies', icon: Film }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === tab.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Search input, Genre Pills, Sort Dropdown */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, genre, director or cast..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="rating" className="bg-zinc-900 text-white">Sort: Highest Rating</option>
                <option value="year" className="bg-zinc-900 text-white">Sort: Newest First</option>
                <option value="title" className="bg-zinc-900 text-white">Sort: Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Genre Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <span className="text-xs font-semibold text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-rose-500" /> Genre:
          </span>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredItems.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              aspect="portrait"
              onSelect={onSelectMedia}
              onPlay={onPlayMedia}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-3xl p-8 border border-white/10 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">No Titles Found</h3>
          <p className="text-xs text-zinc-400 mb-6">
            We couldn't find any movies or shows matching your current filter criteria.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-rose-600/30"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
