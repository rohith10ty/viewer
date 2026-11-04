import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, BookmarkCheck, Trash2, X } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useWatchlist();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-zinc-900/90 border-rose-500/40 text-white'
                : toast.type === 'removed'
                ? 'bg-zinc-900/90 border-zinc-700/60 text-zinc-300'
                : 'bg-zinc-900/90 border-blue-500/40 text-white'
            }`}
          >
            <div className="flex items-center gap-3 text-sm">
              {toast.type === 'success' && (
                <div className="p-1 rounded-full bg-rose-500/20 text-rose-500">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'removed' && (
                <div className="p-1 rounded-full bg-zinc-700/50 text-zinc-400">
                  <Trash2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <span className="font-medium text-xs sm:text-sm line-clamp-2">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
