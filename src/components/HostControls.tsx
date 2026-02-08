import { motion } from 'framer-motion';
import React from 'react';
import { getProgressiveHint, getTotalWords } from '../utils/hintHelpers';
import HintDisplay from './HintDisplay';

interface HostControlsProps {
  onCorrect: () => void;
  onWrong: () => void;
  onHint: () => void;
  isAnswerRevealed: boolean;
  wrongAttempts: number;
  maxWrongAttempts: number;
  hintsRevealed: number;
  currentAnswer: string;
}

const HostControls: React.FC<HostControlsProps> = ({
  onCorrect,
  onWrong,
  onHint,
  isAnswerRevealed,
  wrongAttempts,
  maxWrongAttempts,
  hintsRevealed,
  currentAnswer,
}) => {
  const totalWords = getTotalWords(currentAnswer);
  const hintText = getProgressiveHint(currentAnswer, hintsRevealed);
  const isWrongLimitReached = wrongAttempts >= maxWrongAttempts;
  const allHintsRevealed = hintsRevealed >= totalWords;

  // Render hearts for lives with animation - Smaller Scale
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxWrongAttempts; i++) {
      hearts.push(
        <motion.span 
          key={i} 
          animate={
            i >= wrongAttempts 
              ? { 
                  scale: [1, 1.15, 1], // Slightly more subtle pulse
                } 
              : { scale: 0.7, opacity: 0.3 }
          }
          transition={
            i >= wrongAttempts
              ? { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.15 
                }
              : { duration: 0.3 }
          }
          className="text-3xl inline-block" // Smaller than 5xl
        >
          {i < wrongAttempts ? '🖤' : '❤️'}
        </motion.span>
      );
    }
    return hearts;
  };

  return (
    <div>
      {/* Hearts/Lives Display - More Compact */}
      <div className="flex justify-center mb-6">
        <div className="bg-gradient-to-r from-pink-50 to-red-50 backdrop-blur-sm px-10 py-3 rounded-2xl shadow-xl border-4 border-white flex gap-2 items-center">
          {renderHearts()}
        </div>
      </div>

      {/* Hint Display */}
      <HintDisplay 
        hint={hintText} 
        totalWords={totalWords} 
        revealedWords={hintsRevealed} 
      />

      {/* Chunky Control Buttons - Scaled Down but still chunky */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mt-8 px-4 max-w-4xl mx-auto">
        {/* ĐÚNG Button */}
        <motion.button
          onClick={onCorrect}
          disabled={isAnswerRevealed}
          whileHover={!isAnswerRevealed ? { scale: 1.05, rotate: 1 } : {}}
          whileTap={!isAnswerRevealed ? { scale: 0.95 } : {}}
          className="flex-1 min-h-[70px] px-8 py-4 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white shadow-xl hover:shadow-green-400/60 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-4 border-white/40 relative overflow-hidden group"
          aria-label="Đáp án đúng"
        >
          {!isAnswerRevealed && (
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-3xl">✓</span>
            <span>ĐÚNG</span>
          </span>
        </motion.button>

        {/* SAI Button */}
        <motion.button
          onClick={onWrong}
          disabled={isAnswerRevealed || isWrongLimitReached}
          whileHover={!isAnswerRevealed && !isWrongLimitReached ? { scale: 1.05, rotate: -1 } : {}}
          whileTap={!isAnswerRevealed && !isWrongLimitReached ? { scale: 0.95 } : {}}
          className="flex-1 min-h-[70px] px-8 py-4 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white shadow-xl hover:shadow-red-400/60 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-4 border-white/40 relative overflow-hidden group"
          aria-label="Đáp án sai"
        >
          {!isAnswerRevealed && !isWrongLimitReached && (
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-3xl">✗</span>
            <span>SAI</span>
          </span>
        </motion.button>

        {/* GỢI Ý Button */}
        <motion.button
          onClick={onHint}
          disabled={isAnswerRevealed || allHintsRevealed}
          whileHover={!isAnswerRevealed && !allHintsRevealed ? { scale: 1.05, rotate: 1 } : {}}
          whileTap={!isAnswerRevealed && !allHintsRevealed ? { scale: 0.95 } : {}}
          className="flex-1 min-h-[70px] px-8 py-4 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white shadow-xl hover:shadow-yellow-400/60 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-4 border-white/40 relative overflow-hidden group"
          aria-label="Gợi ý"
        >
          {!allHintsRevealed && !isAnswerRevealed && (
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <motion.span 
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-3xl inline-block"
            >
              💡
            </motion.span>
            <span>GỢI Ý</span>
          </span>
          {!allHintsRevealed && !isAnswerRevealed && (
            <span className="absolute top-2 right-2 text-xs bg-white/40 px-2 py-1 rounded-full font-bold">
              {hintsRevealed}/{totalWords}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default HostControls;
