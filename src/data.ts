import type { Level } from './types';

// Game level data - 4 levels with Vietnamese history content
export const LEVELS: Level[] = [
  {
    id: 1,
    answer: 'Việt Nam',
    imageCount: 3,
    images: [
      'https://source.unsplash.com/400x400/?vietnam,flag',
      'https://source.unsplash.com/400x400/?vietnam,map',
      'https://source.unsplash.com/400x400/?vietnam,culture',
    ],
  },
  {
    id: 2,
    answer: 'Phong trào Cần Vương',
    imageCount: 3,
    images: [
      'https://source.unsplash.com/400x400/?emperor,vietnam',
      'https://source.unsplash.com/400x400/?resistance,history',
      'https://source.unsplash.com/400x400/?1885,historical',
    ],
  },
  {
    id: 3,
    answer: 'Khởi nghĩa Yên Thế',
    imageCount: 2,
    images: [
      'https://source.unsplash.com/400x400/?mountain,vietnam',
      'https://source.unsplash.com/400x400/?historical,vietnam,leader',
    ],
  },
  {
    id: 4,
    answer: 'Ba nước Đông Dương',
    imageCount: 3,
    images: [
      'https://source.unsplash.com/400x400/?vietnam,map,indochina',
      'https://source.unsplash.com/400x400/?laos,map',
      'https://source.unsplash.com/400x400/?cambodia,map',
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
