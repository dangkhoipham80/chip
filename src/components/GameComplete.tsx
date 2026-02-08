import { motion } from 'framer-motion';
import React from 'react';

interface GameCompleteProps {
  score: number;
  onRestart: () => void;
  onReturnHome: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ score, onRestart, onReturnHome }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex items-center justify-center p-6"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border-4 border-white/50">
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
          Bạn đã hoàn thành tất cả các câu hỏi!
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

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onReturnHome}
            className="px-10 py-5 text-2xl font-bold rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            🏠 Về trang chủ
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onRestart}
            className="px-10 py-5 text-2xl font-bold rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            🔄 Chơi lại
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameComplete;
