import { useCallback, useState } from 'react';
import type { AdminState, GameState } from '../types';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    isAnswerRevealed: false,
    wrongAttempts: 0,
    hintsRevealed: 0,
    maxWrongAttempts: 3,
    contentHintsRevealed: 0,
  });

  const [adminState, setAdminState] = useState<AdminState>({
    isEnabled: false,
    showAnswers: false,
  });

  const handleCorrect = useCallback(() => {
    console.log('[HOST ACTION] Đúng clicked - Revealing answer and adding +10 points');
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10,
      isAnswerRevealed: true,
    }));
  }, []);

  const revealAnswer = useCallback(() => {
    console.log('[GAME OVER] Revealing answer without points');
    setGameState(prev => ({
      ...prev,
      isAnswerRevealed: true,
    }));
  }, []);

  const handleWrong = useCallback(() => {
    console.log('[HOST ACTION] Sai clicked - Shaking images and incrementing wrong attempts');
    setGameState(prev => ({
      ...prev,
      wrongAttempts: prev.wrongAttempts + 1,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    console.log('[HOST ACTION] Next level clicked');
    setGameState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      isAnswerRevealed: false,
      wrongAttempts: 0,
      hintsRevealed: 0,
      contentHintsRevealed: 0,
    }));
  }, []);

  const previousLevel = useCallback(() => {
    console.log('[HOST ACTION] Previous level clicked');
    if (gameState.currentLevel > 0) {
      setGameState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel - 1,
        isAnswerRevealed: false,
        wrongAttempts: 0,
        hintsRevealed: 0,
        contentHintsRevealed: 0,
      }));
    }
  }, [gameState.currentLevel]);

  const closeAnswerReveal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isAnswerRevealed: false,
    }));
  }, []);

  const handleHint = useCallback(() => {
    console.log('[HOST ACTION] Word Hint clicked - Revealing next word');
    setGameState(prev => ({
      ...prev,
      hintsRevealed: prev.hintsRevealed + 1,
    }));
  }, []);

  const handleContentHint = useCallback((maxHints: number) => {
    console.log('[HOST ACTION] Content Hint clicked - Revealing next content hint');
    setGameState(prev => ({
      ...prev,
      contentHintsRevealed: Math.min(prev.contentHintsRevealed + 1, maxHints),
    }));
  }, []);

  const jumpToLevel = useCallback((levelIndex: number) => {
    console.log(`[ADMIN] Jumping to level ${levelIndex + 1}`);
    setGameState(prev => ({
      ...prev,
      currentLevel: levelIndex,
      isAnswerRevealed: false,
      wrongAttempts: 0,
      hintsRevealed: 0,
      contentHintsRevealed: 0,
    }));
  }, []);

  const resetScore = useCallback(() => {
    console.log('[ADMIN] Resetting score');
    setGameState(prev => ({ ...prev, score: 0 }));
  }, []);

  const resetGame = useCallback(() => {
    console.log('[HOST ACTION] Resetting game');
    setGameState({
      currentLevel: 0,
      score: 0,
      isAnswerRevealed: false,
      wrongAttempts: 0,
      hintsRevealed: 0,
      maxWrongAttempts: 3,
      contentHintsRevealed: 0,
    });
  }, []);

  const toggleAdmin = useCallback(() => {
    setAdminState(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  }, []);

  const toggleShowAnswers = useCallback(() => {
    setAdminState(prev => ({ ...prev, showAnswers: !prev.showAnswers }));
  }, []);

  return {
    gameState,
    adminState,
    handleCorrect,
    revealAnswer,
    handleWrong,
    handleHint,
    handleContentHint,
    nextLevel,
    previousLevel,
    closeAnswerReveal,
    jumpToLevel,
    resetScore,
    resetGame,
    toggleAdmin,
    toggleShowAnswers,
  };
};
