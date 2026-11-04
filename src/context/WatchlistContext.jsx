import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('viewer_watchlist');
      if (saved) return JSON.parse(saved);
      // Default initial watchlist items for great out-of-the-box demo
      return ['mv-1', 'tv-1'];
    } catch {
      return ['mv-1', 'tv-1'];
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('viewer_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToWatchlist = (mediaItem) => {
    if (!watchlist.includes(mediaItem.id)) {
      setWatchlist(prev => [mediaItem.id, ...prev]);
      showToast(`"${mediaItem.title}" added to your Watchlist`, 'success');
    }
  };

  const removeFromWatchlist = (mediaId, title = '') => {
    setWatchlist(prev => prev.filter(id => id !== mediaId));
    showToast(title ? `"${title}" removed from Watchlist` : 'Removed from Watchlist', 'removed');
  };

  const toggleWatchlist = (mediaItem) => {
    if (watchlist.includes(mediaItem.id)) {
      removeFromWatchlist(mediaItem.id, mediaItem.title);
    } else {
      addToWatchlist(mediaItem);
    }
  };

  const isInWatchlist = (mediaId) => watchlist.includes(mediaId);

  const clearWatchlist = () => {
    setWatchlist([]);
    showToast('Your Watchlist has been cleared', 'info');
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        clearWatchlist,
        toasts,
        removeToast
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
