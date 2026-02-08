import { motion } from 'framer-motion';
import React from 'react';

interface GameCompleteProps {
  score: number;
  onRestart: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ score, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-yellow to-pastel-blue flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl mb-6"
        >
          🎊
        </motion.div>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-gray-800 mb-4"
        >
          Chúc mừng!
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-gray-600 mb-8"
        >
          Các em đã hoàn thành tất cả các câu hỏi!
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-8 mb-8"
        >
          <div className="text-6xl font-bold text-white">
            🏆 {score} điểm
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onRestart}
          className="px-10 py-5 text-2xl font-bold rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          🔄 Chơi lại
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameComplete;
