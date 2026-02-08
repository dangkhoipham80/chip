import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface AnswerRevealProps {
  isVisible: boolean;
  answer: string;
  onClose: () => void;
  showPoints?: boolean; // Whether to show +10 points
}

const AnswerReveal: React.FC<AnswerRevealProps> = ({ isVisible, answer, onClose, showPoints = true }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="answer-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`rounded-3xl shadow-2xl overflow-hidden relative w-[520px] min-h-[360px] flex flex-col items-center justify-center p-8 text-center ${
              showPoints 
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-4 border-white' 
                : 'bg-gradient-to-br from-gray-50 to-slate-100 border-4 border-white'
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            {/* Icon */}
            {!showPoints && (
              <div className="mb-6">
                <img 
                  src="/images/x.png" 
                  alt="Lose Icon" 
                  className="w-28 h-28 object-contain drop-shadow-md mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-7xl">❌</span>';
                  }}
                />
              </div>
            )}

            {showPoints && (
              <div className="mb-6">
                <img 
                  src="/images/correct.png" 
                  alt="Win Icon" 
                  className="w-28 h-28 object-contain drop-shadow-md mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-7xl">🎉</span>';
                  }}
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <h2 id="answer-title" className={`text-3xl font-extrabold mb-1 tracking-tight ${showPoints ? 'text-green-600' : 'text-slate-800'}`}>
                {showPoints ? 'Chính xác!' : 'Bạn đã thua'}
              </h2>
              
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {showPoints ? 'Đáp án là:' : 'Đáp án đúng là:'}
              </p>

              <div className="w-full px-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/50 rounded-xl py-3 px-2 w-full backdrop-blur-sm shadow-inner"
                >
                  <p className={`text-2xl sm:text-3xl font-black break-words leading-tight ${showPoints ? 'text-green-600' : 'text-red-500'}`}>
                    {answer}
                  </p>
                </motion.div>
              </div>

              {showPoints && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 bg-yellow-100/80 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold shadow-sm"
                >
                  ✨ +10 điểm ✨
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerReveal;
