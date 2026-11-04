import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Search, 
  Bookmark, 
  Bell, 
  Menu, 
  X, 
  Film, 
  Tv, 
  Flame, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { MEDIA_ITEMS } from '../data/mockData';

export default function Navbar({ activeTab, setActiveTab, onSelectMedia, onSearchNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchInputRef = useRef(null);
  const { watchlist } = useWatchlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Instant search matches
  const searchResults = searchQuery.trim()
    ? MEDIA_ITEMS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.director?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchResult = (item) => {
    onSelectMedia(item);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchNavigate(searchQuery.trim());
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#08090c]/95 via-[#08090c]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform duration-300">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  VIEWER
                </span>
                <span className="hidden sm:inline-flex items-center text-[9px] tracking-widest uppercase text-rose-400 font-extrabold px-1.5 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/25">
                  STREAM
                </span>
              </div>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'tv', label: 'TV Shows' },
                { id: 'movies', label: 'Movies' },
                { id: 'trending', label: 'Trending' },
                { id: 'watchlist', label: 'Watchlist', badge: watchlist.length }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === link.id
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-600 text-white">
                      {link.badge}
                    </span>
                  )}
                  {activeTab === link.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-500 rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Actions: Search, Notifications, Profile, Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search Input / Toggle */}
            <div className="relative">
              <div
                className={`flex items-center rounded-full transition-all duration-300 ${
                  isSearchOpen
                    ? 'w-64 sm:w-80 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1.5'
                    : 'w-9 h-9 justify-center hover:bg-white/10'
                }`}
              >
                <Search
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="w-4 h-4 text-zinc-300 cursor-pointer hover:text-white shrink-0"
                />

                {isSearchOpen && (
                  <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center ml-2">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Titles, genres, actors..."
                      className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </form>
                )}
              </div>

              {/* Instant Search Dropdown Popover */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-modal rounded-2xl shadow-2xl p-2 z-50 overflow-hidden border border-zinc-700/60">
                  <div className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-zinc-400 border-b border-white/5 flex justify-between items-center">
                    <span>Quick Results</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-rose-400 hover:underline flex items-center gap-0.5"
                    >
                      See all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-white/5 py-1 max-h-80 overflow-y-auto">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSearchResult(item)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded-lg shrink-0 shadow"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                              <span className="text-amber-400 font-bold">★ {item.rating}</span>
                              <span>•</span>
                              <span>{item.year}</span>
                              <span>•</span>
                              <span className="uppercase text-[10px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-300">
                                {item.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">{item.genres.join(', ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-zinc-400">
                      No titles found for "{searchQuery}". Press Enter to search catalog.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-72 glass-modal rounded-2xl shadow-2xl p-3 z-50 border border-zinc-700/60 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] text-rose-400 font-medium">New</span>
                  </div>
                  <div className="py-2 space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <p className="font-semibold text-white">Season 3 of Chronicles of the Void</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Now streaming in 4K Dolby Atmos.</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">2 hours ago</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <p className="font-semibold text-white">New Watchlist Recommendation</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Based on your love for Cyberpunk 2099.</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">1 day ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-9 h-9 rounded-full ring-2 ring-rose-500/50 overflow-hidden cursor-pointer hover:ring-rose-400 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-modal border-t border-white/10 mt-3 px-4 py-4 space-y-1 animate-in slide-in-from-top-4 duration-200">
            {[
              { id: 'home', label: 'Home', icon: Flame },
              { id: 'tv', label: 'TV Shows', icon: Tv },
              { id: 'movies', label: 'Movies', icon: Film },
              { id: 'trending', label: 'Trending Now', icon: Flame },
              { id: 'watchlist', label: 'My Watchlist', icon: Bookmark, badge: watchlist.length }
            ].map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === link.id
                      ? 'bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
