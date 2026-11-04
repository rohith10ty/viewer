import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowLeft, 
  Settings, 
  Subtitles, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function VideoPlayerModal({ mediaItem, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('4K UHD');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English [CC]');
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
        } else {
          onClose();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        seekBy(10);
      } else if (e.key === 'ArrowLeft') {
        seekBy(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isFullscreen, onClose]);

  // Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3200);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const seekBy = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={playerContainerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={mediaItem.videoUrl}
        poster={mediaItem.backdrop}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Top Header Overlay */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 flex items-center justify-between z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md"
            aria-label="Back to viewer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white uppercase">
                {mediaItem.type}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight drop-shadow">
                {mediaItem.title}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Playing in {selectedQuality} • {mediaItem.audio || 'Dolby Atmos'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> DRM Protected Stream
          </span>
        </div>
      </div>

      {/* Center Play/Pause Indicator if Paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute z-20 w-20 h-20 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
        >
          <Play className="w-8 h-8 fill-white ml-1" />
        </button>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 space-y-3 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubbable Seek Bar */}
        <div className="relative group/seek flex items-center">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeekChange}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none transition-all group-hover/seek:h-2"
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left Actions: Play/Pause, Rewind, Forward, Time */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-rose-500 transition-colors p-1"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={() => seekBy(-10)}
              className="text-zinc-300 hover:text-white transition-colors p-1"
              title="Rewind 10s"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => seekBy(10)}
              className="text-zinc-300 hover:text-white transition-colors p-1"
              title="Fast Forward 10s"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="text-zinc-300 hover:text-white transition-colors p-1"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-rose-600"
              />
            </div>

            {/* Elapsed / Total Time */}
            <div className="text-xs font-semibold text-zinc-300 pl-2">
              <span>{formatTime(currentTime)}</span>
              <span className="text-zinc-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Actions: Subtitles, Quality, Fullscreen */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            {/* Subtitles Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubtitlesMenu(!showSubtitlesMenu);
                  setShowSettings(false);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSubtitlesMenu ? 'text-rose-400 bg-white/10' : 'text-zinc-300 hover:text-white'
                }`}
                title="Subtitles & Audio"
              >
                <Subtitles className="w-5 h-5" />
              </button>

              {showSubtitlesMenu && (
                <div className="absolute right-0 bottom-12 w-48 glass-modal rounded-xl shadow-2xl p-2 border border-zinc-700/60 z-30 space-y-1 text-xs">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-zinc-400 border-b border-white/10">
                    Subtitles
                  </div>
                  {['English [CC]', 'Spanish', 'French', 'Off'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubtitle(sub);
                        setShowSubtitlesMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedSubtitle === sub
                          ? 'bg-rose-600 text-white font-bold'
                          : 'text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Settings Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowSubtitlesMenu(false);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSettings ? 'text-rose-400 bg-white/10' : 'text-zinc-300 hover:text-white'
                }`}
                title="Streaming Quality"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <div className="absolute right-0 bottom-12 w-44 glass-modal rounded-xl shadow-2xl p-2 border border-zinc-700/60 z-30 space-y-1 text-xs">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-zinc-400 border-b border-white/10">
                    Video Quality
                  </div>
                  {['4K UHD', '1080p FHD', '720p HD', 'Auto'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSelectedQuality(q);
                        setShowSettings(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        selectedQuality === q
                          ? 'bg-rose-600 text-white font-bold'
                          : 'text-zinc-300 hover:bg-white/10'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="text-zinc-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
