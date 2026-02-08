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

  const getContent = (): { emoji: string; image: string; title: string; message: string; bgGradient: string } => {
    switch (type) {
      case 'win':
        return {
          emoji: '🎉',
          image: '/images/correct.png',
          title: 'Chúc mừng!',
          message: 'Bạn đã trả lời đúng!',
          bgGradient: 'from-green-400 to-green-600',
        };
      case 'lose':
        return {
          emoji: '😢',
          image: '/images/goi-y-tu.png',
          title: 'Gợi ý mà xài hao vậy ba?',
          message: 'Đã dùng hết gợi ý từ',
          bgGradient: 'from-orange-400 to-orange-600',
        };
      case 'outOfTurns':
        return {
          emoji: '❌',
          image: '/images/x.png',
          title: 'Hết lượt chơi',
          message: 'Bạn đã sai quá 3 lần',
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-3xl shadow-2xl overflow-hidden relative w-[520px] min-h-[360px] flex flex-col items-center justify-center p-8 text-center border-4 border-white ${
              type === 'win' 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100' 
                : 'bg-gradient-to-br from-gray-50 to-slate-100'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            {/* Icon */}
            <div className="mb-6">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-28 h-28 object-contain drop-shadow-md mx-auto animate-bounce"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-7xl">${content.emoji}</span>`;
                }}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <h2 className={`text-3xl font-extrabold mb-2 tracking-tight ${type === 'win' ? 'text-green-600' : 'text-slate-800'}`}>
                {content.title}
              </h2>
              
              <p className="text-xl font-medium text-slate-500 mb-6 max-w-xs leading-relaxed">
                {content.message}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                   type === 'win'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/30'
                    : 'bg-gradient-to-r from-slate-700 to-slate-900 shadow-slate-500/30'
                }`}
              >
                {type === 'win' ? 'Tiếp tục' : 'Đóng'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;
