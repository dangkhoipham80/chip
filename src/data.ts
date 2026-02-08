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
  },
  {
    id: 3,
    answer: 'Khởi nghĩa Yên Thế',
    imageCount: 4,
    images: [
      'images/khoi.jpg',
      'images/nghia.jpg',
      'images/yen.jpg',
      'images/the.jpg',
    ],
  },
  {
    id: 4,
    answer: 'Ba nước Đông Dương',
    imageCount: 4,
    images: [
      'images/3.jpg',
      'images/nuoc.jpeg',
      'images/dong.png',
      'images/duong.webp',
    ],
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
  },
};
