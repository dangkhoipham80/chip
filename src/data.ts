import type { Level } from './types';

// Game level data - 4 levels with Vietnamese history content
export const LEVELS: Level[] = [
  {
    id: 1,
    answer: 'Việt Nam',
    imageCount: 2,
    images: [
      'images/viet.jpeg',
      'images/nam.jpeg',
    ],
    contentHints: [
      "Một quốc gia nằm ở khu vực Đông Nam Á.",
      "Quốc gia hình chữ S, có bờ biển dài và thủ đô là Hà Nội.",
      "Tên nước bắt đầu bằng chữ V, có quốc kỳ đỏ sao vàng."
    ]
  },
  {
    id: 2,
    answer: 'Phong trào Cần Vương',
    imageCount: 4,
    images: [
      'images/phong.jpeg',
      'images/trao.png',
      'images/can.jpg',
      'images/vuong.jpg',
    ],
    contentHints: [
      "Một phong trào yêu nước chống Pháp vào cuối thế kỷ 19.",
      "Phong trào hưởng ứng chiếu chỉ của một vị vua nhà Nguyễn để cứu nước.",
      "Phong trào do vua Hàm Nghi phát động năm 1885."
    ]
  },
  {
    id: 3,
    answer: 'Khởi nghĩa Yên Thế',
    imageCount: 4,
    images: [
      'images/khoi.jpg',
      'images/nghia.jpg',
      'images/yen.jpg',
      'images/the.png',
    ],
    contentHints: [
      "Một cuộc khởi nghĩa nông dân lớn chống Pháp ở miền Bắc.",
      "Cuộc khởi nghĩa kéo dài gần 30 năm do 'Hùm xám' lãnh đạo.",
      "Cuộc khởi nghĩa vũ trang dài nhất trong lịch sử chống Pháp (1884–1913)."
    ]
  },
  {
    id: 4,
    answer: 'Thực dân Pháp',
    imageCount: 3,
    images: [
      'images/nguyet-thuc.jpg',
      'images/nhan-dan.png',
      'images/phap-kieu.webp',
    ],
    contentHints: [
      "Việt Nam mất chủ quyền, trở thành thuộc địa của một thế lực xâm lược.",
      "Thế lực này lập bộ máy cai trị để đàn áp nhân dân.",
      "Chính quyền phong kiến bị khống chế, trở thành công cụ của kẻ đô hộ."
    ]
  },
];

// TODO: Replace with actual audio files
export const AUDIO_TRACKS = {
  bgm: [
    '/audio/bgm-track-1.mp3', // TODO: Add custom BGM track
    '/audio/bgm-track-2.mp3',
  ],
  sfx: {
    correct: '/audio/correct-ding.mp3', // TODO: Add cheerful ding sound
    wrong: '/audio/wrong-buzz.mp3', // TODO: Add soft buzz sound
    levelComplete: '/audio/level-complete.mp3', // TODO: Add victory jingle
    outOfHints: '/audio/out-of-hints.mp3', // TODO: Add sound for running out of hints
  },
};
