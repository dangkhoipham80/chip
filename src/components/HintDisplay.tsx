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
    <div className="mt-6 mb-4">
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💡</span>
          <span className="text-sm font-semibold text-yellow-800">
            Gợi ý ({revealedWords}/{totalWords} từ)
          </span>
        </div>
        <p className="text-xl md:text-2xl font-bold text-gray-800">
          {hint}
        </p>
      </div>
    </div>
  );
};

export default HintDisplay;
