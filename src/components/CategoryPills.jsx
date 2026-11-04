import React from 'react';
import { 
  Zap, 
  Rocket, 
  Drama, 
  Flame, 
  Smile, 
  Sparkles, 
  ShieldAlert, 
  Palette 
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

const ICON_MAP = {
  Zap,
  Rocket,
  Drama,
  Flame,
  Smile,
  Sparkles,
  ShieldAlert,
  Palette
};

export default function CategoryPills({ onSelectCategory }) {
  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Browse by Genre
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Handpicked collections tailored to your streaming mood
          </p>
        </div>
      </div>

      {/* Grid of Genre Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES_DATA.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Flame;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-28 rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-600/20 text-left flex flex-col justify-end p-3.5"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent`} />
              
              <div className="relative z-10 flex flex-col">
                <div className="w-7 h-7 rounded-lg bg-rose-600/80 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow group-hover:scale-110 group-hover:bg-rose-500 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
