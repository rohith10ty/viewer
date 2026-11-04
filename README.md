# Viewer — Premium TV & Movie Streaming Platform

A modern, high-performance streaming web application inspired by Netflix, Disney+, and Amazon Prime Video. Built with React (Vite), Tailwind CSS, Framer Motion, and Lenis Smooth Scroll.

![Viewer Cover](https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80)

---

## ✨ Features & Architecture

### 1. 🎬 Cinematic Home Page
- **Hero Spotlight Carousel**: Dynamic auto-playing spotlight featuring trending titles, 4K UHD & HDR badges, IMDb scores, storyline previews, and quick interactive playback controls.
- **Top 10 Trending Today**: Numbered cards (1-10) with custom outlined typography and hover zoom animations.
- **Curated Carousels**: Blockbuster Movies, Binge-Worthy TV Series, Sci-Fi Universes (landscape aspect ratio), and Edge-of-your-Seat Thrillers.
- **Browse by Genre**: Visual genre tiles for Action, Sci-Fi, Drama, Thriller, Comedy, Fantasy, Crime, and Animation.

### 2. 📺 Comprehensive Catalog (TV Shows & Movies)
- **Multi-Filter Engine**: Filter seamlessly between All Titles, TV Shows, and Movies.
- **Genre Pill Selector**: Quickly isolate categories like Action, Sci-Fi, Fantasy, and Crime.
- **Live Search & Autocomplete**: Instant search by title, genre, director, or cast with zero latency.
- **Dynamic Sorting**: Sort by Highest IMDb Rating, Newest Release Year, or Alphabetical (A-Z).

### 3. 🍿 Movie & TV Show Details View
- Full cinematic backdrop banner with immersive gradients.
- Detailed metadata: Age certifications (18+, 16+, 13+), Match %, Runtime, Audio codecs (Dolby Atmos, Spatial Audio).
- **Interactive Seasons & Episode Explorer**: View episode titles, runtime, thumbnail previews, descriptions, and one-click episode play buttons.
- **Cast & Crew Directory**: Character roles, actor portraits, and director information.
- **"More Like This" Recommendations**: Intelligent genre-matched related recommendations.

### 4. 📽️ Immersive Video Player
- Custom-built OTT streaming controls:
  - Play / Pause (with Spacebar hotkey)
  - Scrubbable seekbar with real-time time tracking
  - Fast Forward (+10s) and Rewind (-10s)
  - Fullscreen toggle (F key) and Mute toggle (M key)
  - Streaming Quality Selector (4K UHD, 1080p FHD, 720p HD)
  - Subtitle Selector (English [CC], Spanish, French)
  - Auto-hiding control overlay on inactivity

### 5. 🔖 LocalStorage-Synced Watchlist
- 1-click "Add to Watchlist" / "Remove from Watchlist" from any card or modal.
- Persistent storage via `localStorage` (saved across browser refreshes).
- Interactive toast notifications with smooth slide animations.
- Filter saved items by Movies or TV Shows, or clear entire library with one click.

### 6. 🎨 Premium UI & Experience
- **Outfit Typography**: Modern typography via Google Fonts Outfit (wght 300-900).
- **Lenis Smooth Scroll**: Silky-smooth 60fps momentum scrolling throughout the application.
- **Hidden Scrollbars**: Clean aesthetics across Chrome, Safari, Firefox, and Edge (`scrollbar-width: none`).
- **Dark Aesthetic**: OLED blacks (`#08090c`), glassmorphic frosted modals, and crimson accents.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis Scroll
- **State & Storage**: React Context API & Browser LocalStorage

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/viewer-streaming.git

# Navigate to project directory
cd "tv streaming website"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:5173`.

### Production Build

```bash
# Create optimized production build
npm run build

# Preview build locally
npm run preview
```

---

## 🌐 Deploy to Vercel or Netlify

### Option A: Deploy with Vercel CLI
```bash
npx vercel
```

### Option B: Deploy with Netlify
```bash
npx netlify deploy --prod --dir=dist
```

Or connect the GitHub repository directly to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for automatic CI/CD deployments.
