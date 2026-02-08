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

  // Render hearts for lives
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < maxWrongAttempts; i++) {
      hearts.push(
        <span 
          key={i} 
          className={`text-3xl transition-transform duration-300 ${
            i < wrongAttempts ? 'opacity-30 scale-75' : 'scale-100'
          }`}
        >
          {i < wrongAttempts ? '🖤' : '❤️'}
        </span>
      );
    }
    return hearts;
  };

  return (
    <div>
      {/* Hearts/Lives Display */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border-2 border-white flex gap-2 items-center">
          {renderHearts()}
        </div>
      </div>

      {/* Hint Display */}
      <HintDisplay 
        hint={hintText} 
        totalWords={totalWords} 
        revealedWords={hintsRevealed} 
      />

      {/* Chunky Control Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mt-10 px-4 max-w-4xl mx-auto">
        {/* ĐÚNG Button - Success Green */}
        <button
          onClick={onCorrect}
          disabled={isAnswerRevealed}
          className="flex-1 min-h-[70px] px-8 py-5 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white shadow-2xl hover:shadow-green-400/50 hover:scale-105 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 border-4 border-white/30 relative overflow-hidden group"
          aria-label="Đáp án đúng"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-4xl">✓</span>
            <span>ĐÚNG</span>
          </span>
        </button>

        {/* SAI Button - Error Red */}
        <button
          onClick={onWrong}
          disabled={isAnswerRevealed || isWrongLimitReached}
          className="flex-1 min-h-[70px] px-8 py-5 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white shadow-2xl hover:shadow-red-400/50 hover:scale-105 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 border-4 border-white/30 relative overflow-hidden group"
          aria-label="Đáp án sai"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-4xl">✗</span>
            <span>SAI</span>
          </span>
        </button>

        {/* GỢI Ý Button - Hint Gold */}
        <button
          onClick={onHint}
          disabled={isAnswerRevealed || allHintsRevealed}
          className="flex-1 min-h-[70px] px-8 py-5 text-2xl font-extrabold rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 border-4 border-white/30 relative overflow-hidden group"
          aria-label="Gợi ý"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-4xl">💡</span>
            <span>GỢI Ý</span>
          </span>
          {!allHintsRevealed && !isAnswerRevealed && (
            <span className="absolute top-2 right-2 text-xs bg-white/30 px-2 py-1 rounded-full">
              {hintsRevealed}/{totalWords}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default HostControls;
