import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface AnswerRevealProps {
  isVisible: boolean;
  answer: string;
  onClose: () => void;
}

const AnswerReveal: React.FC<AnswerRevealProps> = ({ isVisible, answer, onClose }) => {
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200 p-12 rounded-3xl shadow-2xl max-w-3xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-7xl mb-6"
              >
                🎉
              </motion.div>
              <h2 id="answer-title" className="text-5xl font-bold text-gray-800 mb-4">
                Đáp án
              </h2>
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold text-purple-700"
              >
                {answer}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <div className="text-4xl">✨ +10 điểm ✨</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerReveal;
