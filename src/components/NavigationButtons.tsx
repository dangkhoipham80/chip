import React from 'react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastLevel: boolean;
  isAnswerRevealed: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  isLastLevel,
  isAnswerRevealed,
}) => {
  return (
    <>
      {/* Previous Level - Top Left */}
      {canGoPrevious && (
        <button
          onClick={onPrevious}
          className="absolute top-4 left-4 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl"
          aria-label="Câu trước"
        >
          ←
        </button>
      )}

      {/* Next Level - Bottom Right */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!isAnswerRevealed || !canGoNext}
          className="px-8 py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label={isLastLevel ? 'Hoàn thành' : 'Tiếp theo'}
        >
          {isLastLevel ? '🎉 Hoàn thành' : 'Tiếp theo →'}
        </button>
      </div>
    </>
  );
};

export default NavigationButtons;
