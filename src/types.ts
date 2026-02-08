// Core game types
export interface Level {
  id: number;
  answer: string;
  images: string[];
  imageCount: number;
}

export interface GameState {
  currentLevel: number;
  score: number;
  isAnswerRevealed: boolean;
  wrongAttempts: number;
  hintsRevealed: number;
  maxWrongAttempts: number;
}

export interface AudioConfig {
  bgmVolume: number;
  sfxVolume: number;
  currentTrack: number;
  bgmEnabled: boolean;
}

export interface AdminState {
  isEnabled: boolean;
  showAnswers: boolean;
}
