import { motion } from 'framer-motion';
import React from 'react';
import { getProgressiveHint, getTotalWords } from '../utils/hintHelpers';
import HintDisplay from './HintDisplay';

interface HostControlsProps {
  onCorrect: () => void;
  onWrong: () => void;
  onHint: () => void;
  onContentHint: () => void;
  isAnswerRevealed: boolean;
  wrongAttempts: number;
  maxWrongAttempts: number;
  hintsRevealed: number;
  contentHintsRevealed: number;
  currentAnswer: string;
  contentHints: string[];
}

const HostControls: React.FC<HostControlsProps> = ({
  onCorrect,
  onWrong,
  onHint,
  onContentHint,
  isAnswerRevealed,
  wrongAttempts,
  maxWrongAttempts,
  hintsRevealed,
  contentHintsRevealed,
  currentAnswer,
  contentHints = [],
}) => {
  const totalWords = getTotalWords(currentAnswer);
  const hintText = getProgressiveHint(currentAnswer, hintsRevealed);
  const isWrongLimitReached = wrongAttempts >= maxWrongAttempts;
  const allHintsRevealed = hintsRevealed >= totalWords;
  const allContentHintsRevealed = contentHintsRevealed >= contentHints.length;

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
    <div className="w-full flex flex-col items-center">
      {/* Content Hints Display Area */}
      <div className="w-full max-w-4xl px-4 min-h-[60px] mb-2 flex flex-col gap-2 items-center justify-end">
         {contentHints.slice(0, contentHintsRevealed).map((hint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-100/90 backdrop-blur-sm border-l-4 border-yellow-500 text-yellow-900 px-4 py-2 rounded shadow-sm text-lg font-medium text-center w-full shadow-lg"
            >
              💡 Gợi ý {index + 1}: {hint}
            </motion.div>
         ))}
      </div>

      {/* Hearts/Lives Display - More Compact */}
      <div className="flex justify-center mb-2">
        <div className="bg-gradient-to-r from-pink-50 to-red-50 backdrop-blur-sm px-10 py-2 rounded-2xl shadow-lg border-2 border-white flex gap-2 items-center">
          {renderHearts()}
        </div>
      </div>

      {/* Hint Display (Word Hint) - Fixed Height Container for Stability */}
      <div className="relative h-20 w-full flex justify-center items-center mb-2 z-20 pointer-events-none">
        <div className="absolute w-full flex justify-center pointer-events-auto">
          <HintDisplay 
            hint={hintText} 
            totalWords={totalWords} 
            revealedWords={hintsRevealed} 
          />
        </div>
      </div>

      {/* Chunky Control Buttons - Refined & Premium */}
      <div className="flex flex-col md:flex-row gap-3 justify-center items-center mt-2 px-4 max-w-6xl mx-auto w-full z-10">
        {/* ĐÚNG Button */}
        <motion.button
          onClick={onCorrect}
          disabled={isAnswerRevealed}
          whileHover={!isAnswerRevealed ? { scale: 1.03, y: -2 } : {}}
          whileTap={!isAnswerRevealed ? { scale: 0.97, y: 0 } : {}}
          className="flex-1 w-full md:w-auto h-[60px] px-6 rounded-xl bg-gradient-to-b from-green-400 to-green-600 text-white shadow-[0_4px_0_rgb(21,128,61)] hover:shadow-[0_6px_0_rgb(21,128,61)] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 relative overflow-hidden group border-2 border-green-300/30"
          aria-label="Đáp án đúng"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-black text-lg sm:text-xl tracking-wide uppercase">
            <span className="text-2xl">✓</span>
            <span>ĐÚNG</span>
          </span>
        </motion.button>

        {/* SAI Button */}
        <motion.button
          onClick={onWrong}
          disabled={isAnswerRevealed || isWrongLimitReached}
          whileHover={!isAnswerRevealed && !isWrongLimitReached ? { scale: 1.03, y: -2 } : {}}
          whileTap={!isAnswerRevealed && !isWrongLimitReached ? { scale: 0.97, y: 0 } : {}}
          className="flex-1 w-full md:w-auto h-[60px] px-6 rounded-xl bg-gradient-to-b from-red-400 to-red-600 text-white shadow-[0_4px_0_rgb(185,28,28)] hover:shadow-[0_6px_0_rgb(185,28,28)] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 relative overflow-hidden group border-2 border-red-300/30"
          aria-label="Đáp án sai"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-black text-lg sm:text-xl tracking-wide uppercase">
            <span className="text-2xl">✗</span>
            <span>SAI</span>
          </span>
        </motion.button>

        {/* CONTENT HINT Button (Yellow) */}
        <motion.button
          onClick={onContentHint}
          disabled={isAnswerRevealed || allContentHintsRevealed}
          whileHover={!isAnswerRevealed && !allContentHintsRevealed ? { scale: 1.03, y: -2 } : {}}
          whileTap={!isAnswerRevealed && !allContentHintsRevealed ? { scale: 0.97, y: 0 } : {}}
          className="flex-1 w-full md:w-auto h-[60px] px-4 rounded-xl bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_6px_0_rgb(180,83,9)] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 relative overflow-hidden group border-2 border-amber-300/30"
          aria-label="Gợi ý nội dung"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-black text-lg sm:text-xl tracking-wide">
            <span className="text-2xl">💡</span>
            <span className="uppercase">GỢI Ý NỘI DUNG</span>
            <span className="bg-black/20 px-2 py-0.5 rounded text-sm min-w-[3.5rem] text-center ml-1">
              {contentHintsRevealed}/{contentHints.length}
            </span>
          </span>
        </motion.button>

        {/* WORD HINT Button (Blue) */}
        <motion.button
          onClick={onHint}
          disabled={isAnswerRevealed || allHintsRevealed}
          whileHover={!isAnswerRevealed && !allHintsRevealed ? { scale: 1.03, y: -2 } : {}}
          whileTap={!isAnswerRevealed && !allHintsRevealed ? { scale: 0.97, y: 0 } : {}}
          className="flex-1 w-full md:w-auto h-[60px] px-4 rounded-xl bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-[0_4px_0_rgb(3,105,161)] hover:shadow-[0_6px_0_rgb(3,105,161)] active:shadow-none transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 relative overflow-hidden group border-2 border-sky-300/30"
          aria-label="Gợi ý từ"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-black text-lg sm:text-xl tracking-wide">
            <span className="text-2xl">🔤</span>
            <span className="uppercase">GỢI Ý TỪ</span>
            {!allHintsRevealed && !isAnswerRevealed && (
               <span className="bg-black/20 px-2 py-0.5 rounded text-sm min-w-[3.5rem] text-center ml-1">
                {hintsRevealed}/{totalWords}
               </span>
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default HostControls;
