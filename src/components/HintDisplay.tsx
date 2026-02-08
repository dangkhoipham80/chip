import React from 'react';

interface HintDisplayProps {
  hint: string;
  totalWords: number;
  revealedWords: number;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ hint, totalWords, revealedWords }) => {
  if (!hint) {
    return null;
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/95 backdrop-blur-md border-2 border-sky-400 rounded-xl px-6 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-3">
        <span className="text-3xl animate-pulse drop-shadow-sm">📝</span>
        <div className="flex-1">
          <p className="text-xl font-bold text-sky-900 tracking-wide text-center uppercase">
            {hint}
          </p>
        </div>
        <span className="text-xs font-bold bg-sky-100 text-sky-700 px-2 py-1 rounded">
          {revealedWords}/{totalWords}
        </span>
      </div>
    </div>
  );
};

export default HintDisplay;
