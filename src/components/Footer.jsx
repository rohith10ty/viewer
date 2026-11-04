import React from 'react';
import { Play, Sparkles, Heart, Globe, Shield, HelpCircle, Film, Tv } from 'lucide-react';

export default function Footer({ onNavigateTab }) {
  return (
    <footer className="bg-[#050608] border-t border-white/5 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-white/5">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xl font-black tracking-wider uppercase text-white">
                VIEWER
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Viewer is your premier next-generation TV & cinema streaming platform, featuring curated blockbuster films, binge-worthy series, 4K HDR streams, and immersive Dolby Atmos audio.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-semibold">
                Ultra HD 4K
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-semibold">
                Dolby Vision
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-semibold">
                Spatial Audio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Browse
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-white transition-colors">
                  Home Featured
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('tv')} className="hover:text-white transition-colors">
                  TV Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('movies')} className="hover:text-white transition-colors">
                  Movies & Originals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('trending')} className="hover:text-white transition-colors">
                  Trending Top 10
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('watchlist')} className="hover:text-white transition-colors">
                  My Watchlist
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#devices" className="hover:text-white transition-colors">Supported Devices</a></li>
              <li><a href="#speed" className="hover:text-white transition-colors">Speed Test</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Languages & Region */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Language
            </h4>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>English (United States)</span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-2">
              Viewer Stream Service © 2024-2026. All rights reserved. Content subject to availability.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Viewer Streaming Platform. Engineered for ultimate cinema lovers.</p>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Built with precision & passion</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
