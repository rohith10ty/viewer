import React from 'react';
import { Flame, Sparkles, Tv, Film, Rocket, Zap, Trophy, TrendingUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import CategoryPills from '../components/CategoryPills';
import { MEDIA_ITEMS } from '../data/mockData';

export default function HomeView({
  onSelectMedia,
  onPlayMedia,
  onSelectCategory,
  onNavigateTab
}) {
  const featuredItems = MEDIA_ITEMS.filter((item) => item.isFeatured);
  const trendingItems = MEDIA_ITEMS.filter((item) => item.isTrending).sort(
    (a, b) => (a.trendingRank || 99) - (b.trendingRank || 99)
  );
  const popularShows = MEDIA_ITEMS.filter((item) => item.type === 'tv');
  const blockbusterMovies = MEDIA_ITEMS.filter((item) => item.type === 'movie');
  const sciFiCollection = MEDIA_ITEMS.filter((item) => item.genres.includes('Sci-Fi'));
  const thrillers = MEDIA_ITEMS.filter((item) => item.genres.includes('Thriller'));

  return (
    <div className="pb-20">
      {/* Hero Banner Carousel */}
      <HeroSection
        featuredItems={featuredItems}
        onPlayMovie={onPlayMedia}
        onShowDetails={onSelectMedia}
      />

      {/* Rows Container */}
      <div className="relative z-20 -mt-8 sm:-mt-14 space-y-2">
        {/* Row 1: Top 10 Trending Today (Ranked with large numbers) */}
        <ContentRow
          title="Top 10 Trending Today"
          subtitle="The most-watched titles on Viewer right now"
          icon={Flame}
          items={trendingItems}
          isRanked={true}
          aspect="portrait"
          onSelectMedia={onSelectMedia}
          onPlayMedia={onPlayMedia}
          onExploreAll={() => onNavigateTab('trending')}
        />

        {/* Genre Quick Explorer */}
        <CategoryPills onSelectCategory={onSelectCategory} />

        {/* Row 2: Popular TV Shows */}
        <ContentRow
          title="Binge-Worthy TV Series"
          subtitle="Captivating storylines, unforgettable characters"
          icon={Tv}
          items={popularShows}
          aspect="portrait"
          onSelectMedia={onSelectMedia}
          onPlayMedia={onPlayMedia}
          onExploreAll={() => onNavigateTab('tv')}
        />

        {/* Row 3: Blockbuster Movies */}
        <ContentRow
          title="Blockbuster Movies & Cinema"
          subtitle="Award winners and box office sensations"
          icon={Film}
          items={blockbusterMovies}
          aspect="portrait"
          onSelectMedia={onSelectMedia}
          onPlayMedia={onPlayMedia}
          onExploreAll={() => onNavigateTab('movies')}
        />

        {/* Row 4: Sci-Fi Spotlight (Landscape cards) */}
        <ContentRow
          title="Futuristic & Sci-Fi Universes"
          subtitle="Explore quantum anomalies, cybernetic realms, and deep-space odysseys"
          icon={Rocket}
          items={sciFiCollection}
          aspect="landscape"
          onSelectMedia={onSelectMedia}
          onPlayMedia={onPlayMedia}
        />

        {/* Row 5: Heart-Pounding Thrillers */}
        <ContentRow
          title="Edge-of-Your-Seat Thrillers"
          subtitle="High stakes, dark twists, and unrelenting suspense"
          icon={Zap}
          items={thrillers}
          aspect="portrait"
          onSelectMedia={onSelectMedia}
          onPlayMedia={onPlayMedia}
        />
      </div>
    </div>
  );
}
