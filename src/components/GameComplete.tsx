import { motion } from 'framer-motion';
import React from 'react';

interface GameCompleteProps {
  score: number;
  onRestart: () => void;
  onReturnHome: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({ score, onReturnHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Confetti emojis */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotate: Math.random() * 360,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 3, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-4xl"
          >
            {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl text-center">
        {/* Giant Trophy */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="text-[200px] leading-none">🏆</div>
        </motion.div>

        {/* Congratulations Text */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-8xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text mb-6 drop-shadow-2xl leading-tight py-2"
        >
          XUẤT SẮC!
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl text-gray-700 font-bold mb-12"
        >
          Bạn đã hoàn thành tất cả các câu hỏi!
        </motion.p>

        {/* HUGE Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 10,
            delay: 0.6 
          }}
          className="mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-[50px] p-3 shadow-2xl">
            <div className="bg-white/95 rounded-[40px] px-20 py-12">
              <div className="text-gray-500 text-3xl font-bold mb-2">TỔNG ĐIỂM</div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[120px] font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-none"
              >
                {score}
              </motion.div>
              <div className="text-gray-500 text-3xl font-bold mt-2">điểm</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons - Smaller */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-6 justify-center flex-col sm:flex-row"
        >
          <motion.button
            onClick={onReturnHome}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 text-3xl font-extrabold rounded-3xl bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all border-6 border-white/50"
          >
            <span className="flex items-center gap-3">
              <span className="text-4xl">🏠</span>
              Về trang chủ
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameComplete;
