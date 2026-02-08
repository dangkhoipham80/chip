import { motion } from 'framer-motion';
import React from 'react';

interface HeaderProps {
  score: number;
  currentLevel: number;
  totalLevels: number;
  onToggleBGM: () => void;
  bgmEnabled: boolean;
  bgmVolume: number;
  sfxVolume: number;
  onBGMVolumeChange: (volume: number) => void;
  onSFXVolumeChange: (volume: number) => void;
  onTrackChange: (trackIndex: number) => void;
  currentTrack: number;
}

const Header: React.FC<HeaderProps> = ({
  score,
  currentLevel,
  totalLevels,
  onToggleBGM,
  bgmEnabled,
  bgmVolume,
  sfxVolume,
  onBGMVolumeChange,
  onSFXVolumeChange,
}) => {
  // Generate progress dots
  const renderProgressDots = () => {
    return Array.from({ length: totalLevels }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`w-4 h-4 rounded-full ${
          index < currentLevel
            ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg'
            : index === currentLevel
            ? 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg animate-pulse'
            : 'bg-white/40 border-2 border-white/60'
        }`}
        title={`Câu ${index + 1}`}
      />
    ));
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center gap-6">
          {/* LEFT: Score Display */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏆</span>
              <motion.div
                key={score}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
                role="status"
                aria-live="polite"
                aria-label={`Điểm hiện tại: ${score}`}
              >
                {score}
              </motion.div>
            </div>
            <div className="text-xs text-white/80 font-semibold mt-1 ml-1">ĐIỂM SỐ</div>
          </div>

          {/* CENTER: Progress Dots */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {renderProgressDots()}
            </div>
            <div className="text-lg font-bold text-white drop-shadow">
              Câu {currentLevel + 1}/{totalLevels}
            </div>
          </div>

          {/* RIGHT: Audio Controls */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <button
              onClick={onToggleBGM}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 hover:scale-110 transition-all flex items-center justify-center text-2xl shadow-lg"
              aria-label={bgmEnabled ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            >
              {bgmEnabled ? '🔊' : '🔇'}
            </button>
            
            <div className="hidden md:flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 shadow-md">
                <div className="text-xs text-white font-semibold mb-1">BGM</div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={bgmVolume}
                  onChange={(e) => onBGMVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                  aria-label="Âm lượng nhạc nền"
                />
              </div>

              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 shadow-md">
                <div className="text-xs text-white font-semibold mb-1">SFX</div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={sfxVolume}
                  onChange={(e) => onSFXVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                  aria-label="Âm lượng hiệu ứng"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
