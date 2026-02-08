import { motion } from 'framer-motion';
import React from 'react';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border-4 border-white/50"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-7xl mb-4">Nhóm 1</div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Đuổi hình bắt chữ
          </h1>
          <p className="text-2xl text-gray-600">
            Phong trào đấu tranh ở Việt Nam
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Cách chơi:</h2>
          <ul className="text-left text-lg text-gray-700 space-y-2">
            <li>🖼️ Nhìn các hình ảnh gợi ý</li>
            <li>🤔 Đoán tên sự kiện lịch sử</li>
            <li>💡 Sử dụng gợi ý nếu cần</li>
            <li>❤️ Bạn có 7 lượt sai cho mỗi câu</li>
            <li>🏆 Mỗi câu đúng được +10 điểm</li>
          </ul>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onStartGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-16 py-6 text-3xl font-extrabold rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-2xl hover:shadow-green-400/50 transition-all border-4 border-white/30"
        >
          🎮 BẮT ĐẦU
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;
