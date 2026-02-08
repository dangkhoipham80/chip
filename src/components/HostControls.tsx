import React from 'react';

interface HostControlsProps {
  onCorrect: () => void;
  onWrong: () => void;
  isAnswerRevealed: boolean;
}

const HostControls: React.FC<HostControlsProps> = ({
  onCorrect,
  onWrong,
  isAnswerRevealed,
}) => {
  return (
    <div className="flex gap-6 justify-center mt-8">
      <button
        onClick={onCorrect}
        disabled={isAnswerRevealed}
        className="px-12 py-6 text-2xl font-bold rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[160px]"
        aria-label="Đáp án đúng"
      >
        ✓ Đúng
      </button>

      <button
        onClick={onWrong}
        disabled={isAnswerRevealed}
        className="px-12 py-6 text-2xl font-bold rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[160px]"
        aria-label="Đáp án sai"
      >
        ✗ Sai
      </button>
    </div>
  );
};

export default HostControls;
