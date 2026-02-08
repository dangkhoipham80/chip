import { motion } from 'framer-motion';
import React from 'react';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Title Section - Much Larger */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mb-6"
          >
            🎮
          </motion.div>
          <h1 className="text-8xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            Đuổi hình bắt chữ
          </h1>
          <p className="text-4xl font-bold text-gray-700 mb-4">
            Phong trào đấu tranh ở Việt Nam
          </p>
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
            Nhóm 1
          </div>
        </motion.div>

        {/* Instructions - Larger and Side-by-Side Cards */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* How to Play */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
            <h2 className="text-4xl font-bold text-purple-700 mb-6 flex items-center gap-3">
              📖 Cách chơi
            </h2>
            <ul className="space-y-4 text-2xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-3xl">🖼️</span>
                <span>Nhìn các hình ảnh gợi ý</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-3xl">🤔</span>
                <span>Đoán tên sự kiện lịch sử</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-3xl">💡</span>
                <span>Sử dụng gợi ý nếu cần</span>
              </li>
            </ul>
          </div>

          {/* Rules */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-pink-200">
            <h2 className="text-4xl font-bold text-pink-700 mb-6 flex items-center gap-3">
              ⚡ Luật chơi
            </h2>
            <ul className="space-y-4 text-2xl text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-3xl">❤️</span>
                <span>Có 3 lượt sai / câu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-3xl">🏆</span>
                <span>Đúng = +10 điểm</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <span>4 câu hỏi thú vị</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Start Button - HUGE */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            onClick={onStartGame}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-24 py-8 text-5xl font-extrabold rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white shadow-2xl hover:shadow-green-500/50 transition-all border-8 border-white overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <span className="relative z-10 flex items-center gap-4">
              <span className="text-6xl">🚀</span>
              BẮT ĐẦU CHƠI
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
