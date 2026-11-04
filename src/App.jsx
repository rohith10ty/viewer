import React, { useState } from 'react';
import { WatchlistProvider } from './context/WatchlistContext';
import { useLenisScroll } from './hooks/useLenisScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import MovieDetailsModal from './components/MovieDetailsModal';
import VideoPlayerModal from './components/VideoPlayerModal';
import HomeView from './pages/HomeView';
import CatalogView from './pages/CatalogView';
import WatchlistView from './pages/WatchlistView';

function ViewerApp() {
  // Initialize Lenis Smooth Scrolling
  useLenisScroll();

  const [activeTab, setActiveTab] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playingMedia, setPlayingMedia] = useState(null);
  const [catalogGenre, setCatalogGenre] = useState('All');
  const [catalogQuery, setCatalogQuery] = useState('');

  const handleSelectMedia = (item) => {
    setSelectedMedia(item);
  };

  const handlePlayMedia = (item) => {
    setPlayingMedia(item);
  };

  const handleSelectCategory = (genre) => {
    setCatalogGenre(genre);
    setCatalogQuery('');
    setActiveTab('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchNavigate = (query) => {
    setCatalogQuery(query);
    setCatalogGenre('All');
    setActiveTab('movies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCatalogGenre('All');
          setCatalogQuery('');
        }}
        onSelectMedia={handleSelectMedia}
        onSearchNavigate={handleSearchNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onSelectMedia={handleSelectMedia}
            onPlayMedia={handlePlayMedia}
            onSelectCategory={handleSelectCategory}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'tv' && (
          <CatalogView
            key={`tv-${catalogGenre}-${catalogQuery}`}
            initialType="tv"
            initialGenre={catalogGenre}
            initialQuery={catalogQuery}
            onSelectMedia={handleSelectMedia}
            onPlayMedia={handlePlayMedia}
          />
        )}

        {activeTab === 'movies' && (
          <CatalogView
            key={`movie-${catalogGenre}-${catalogQuery}`}
            initialType="movie"
            initialGenre={catalogGenre}
            initialQuery={catalogQuery}
            onSelectMedia={handleSelectMedia}
            onPlayMedia={handlePlayMedia}
          />
        )}

        {activeTab === 'trending' && (
          <CatalogView
            key={`trending-${catalogGenre}-${catalogQuery}`}
            initialType="all"
            initialGenre="All"
            initialQuery=""
            onSelectMedia={handleSelectMedia}
            onPlayMedia={handlePlayMedia}
          />
        )}

        {activeTab === 'watchlist' && (
          <WatchlistView
            onSelectMedia={handleSelectMedia}
            onPlayMedia={handlePlayMedia}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedMedia && (
        <MovieDetailsModal
          mediaItem={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onPlayMedia={(item) => {
            setSelectedMedia(null);
            setPlayingMedia(item);
          }}
          onSelectMedia={handleSelectMedia}
        />
      )}

      {/* Fullscreen Video Player Modal */}
      {playingMedia && (
        <VideoPlayerModal
          mediaItem={playingMedia}
          onClose={() => setPlayingMedia(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <WatchlistProvider>
      <ViewerApp />
    </WatchlistProvider>
  );
}
