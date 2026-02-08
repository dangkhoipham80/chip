import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type GameOverType = 'win' | 'lose' | 'outOfTurns';

interface GameOverModalProps {
  isVisible: boolean;
  type: GameOverType;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isVisible, type, onClose }) => {
  if (!isVisible) return null;

  const getContent = () => {
    switch (type) {
      case 'win':
        return {
          emoji: '🎉',
          title: 'Chúc mừng!',
          message: 'Bạn đã trả lời đúng!',
          bgGradient: 'from-green-400 to-green-600',
        };
      case 'lose':
        return {
          emoji: '😢',
          title: 'Bạn đã thua',
          message: 'Đã dùng hết gợi ý',
          bgGradient: 'from-orange-400 to-orange-600',
        };
      case 'outOfTurns':
        return {
          emoji: '❌',
          title: 'Bạn đã hết lượt chơi',
          message: 'Đã sai 7 lần',
          bgGradient: 'from-red-400 to-red-600',
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`bg-gradient-to-br ${content.bgGradient} p-12 rounded-3xl shadow-2xl max-w-md mx-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center text-white">
              <div className="text-8xl mb-6 animate-bounce">
                {content.emoji}
              </div>
              <h2 className="text-4xl font-bold mb-4">
                {content.title}
              </h2>
              <p className="text-xl opacity-90">
                {content.message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;
