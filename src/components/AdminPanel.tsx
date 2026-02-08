import React from 'react';
import { LEVELS } from '../data';

interface AdminPanelProps {
  isVisible: boolean;
  showAnswers: boolean;
  currentLevel: number;
  onJumpToLevel: (levelIndex: number) => void;
  onResetScore: () => void;
  onToggleShowAnswers: () => void;
  currentAnswer: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isVisible,
  showAnswers,
  currentLevel,
  onJumpToLevel,
  onResetScore,
  onToggleShowAnswers,
  currentAnswer,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-xl shadow-2xl z-40 max-w-xs">
      <div className="text-sm font-bold mb-3 text-yellow-400">🔧 ADMIN PANEL</div>
      
      {/* Level Jump */}
      <div className="mb-3">
        <div className="text-xs mb-2">Jump to Level:</div>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map((level, index) => (
            <button
              key={level.id}
              onClick={() => onJumpToLevel(index)}
              className={`px-3 py-1 rounded text-xs font-bold ${
                currentLevel === index
                  ? 'bg-yellow-400 text-gray-800'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Score */}
      <button
        onClick={onResetScore}
        className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-bold mb-3"
      >
        Reset Score
      </button>

      {/* Toggle Answers */}
      <button
        onClick={onToggleShowAnswers}
        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold mb-3"
      >
        {showAnswers ? 'Hide' : 'Show'} Answers
      </button>

      {/* Current Answer */}
      {showAnswers && (
        <div className="mt-3 p-3 bg-gray-700 rounded">
          <div className="text-xs mb-1">Current Answer:</div>
          <div className="font-bold text-yellow-300">{currentAnswer}</div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
