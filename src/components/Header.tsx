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
  return (
    <header className="bg-gradient-to-r from-pastel-pink via-pastel-blue to-pastel-yellow p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center">
        {/* Score - Left */}
        <div className="flex-1">
          <motion.div
            key={score}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-bold text-purple-600"
            role="status"
            aria-live="polite"
            aria-label={`Điểm hiện tại: ${score}`}
          >
            🏆 {score}
          </motion.div>
        </div>

        {/* Level Indicator - Center */}
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-gray-700">
            Câu {currentLevel + 1}/{totalLevels}
          </div>
        </div>

        {/* Audio Controls - Right */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <button
            onClick={onToggleBGM}
            className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center text-2xl"
            aria-label={bgmEnabled ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          >
            {bgmEnabled ? '🔊' : '🔇'}
          </button>
          
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="text-xs text-gray-600 mb-1">BGM</div>
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

          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="text-xs text-gray-600 mb-1">SFX</div>
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
    </header>
  );
};

export default Header;
