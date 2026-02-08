import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AdminPanel from './components/AdminPanel';
import AnswerReveal from './components/AnswerReveal';
import GameComplete from './components/GameComplete';
import Header from './components/Header';
import HostControls from './components/HostControls';
import ImageGrid from './components/ImageGrid';
import { LEVELS } from './data';
import { useAudio } from './hooks/useAudio';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    gameState,
    adminState,
    handleCorrect,
    handleWrong,
    nextLevel,
    previousLevel,
    closeAnswerReveal,
    jumpToLevel,
    resetScore,
    resetGame,
    toggleAdmin,
    toggleShowAnswers,
  } = useGameState();

  const {
    audioConfig,
    toggleBGM,
    playSFX,
    setBGMVolume,
    setSFXVolume,
    changeTrack,
  } = useAudio();

  const [shouldShake, setShouldShake] = useState(false);

  const currentLevelData = LEVELS[gameState.currentLevel];
  const isGameComplete = gameState.currentLevel >= LEVELS.length;

  // Handle keyboard shortcuts for admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A to toggle admin panel
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        toggleAdmin();
        console.log('[ADMIN] Admin panel toggled');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleAdmin]);

  // Handle correct answer
  const onCorrectClick = () => {
    handleCorrect();
    playSFX('correct');
  };

  // Handle wrong answer with shake animation
  const onWrongClick = () => {
    handleWrong();
    playSFX('wrong');
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);
  };

  // Handle next level
  const onNextClick = () => {
    if (gameState.currentLevel === LEVELS.length - 1) {
      playSFX('levelComplete');
      nextLevel(); // This will trigger game complete state
    } else {
      nextLevel();
    }
  };

  // If game is complete, show completion screen
  if (isGameComplete) {
    return <GameComplete score={gameState.score} onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-yellow via-pastel-pink to-pastel-blue flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <Header
          score={gameState.score}
          currentLevel={gameState.currentLevel}
          totalLevels={LEVELS.length}
          onToggleBGM={toggleBGM}
          bgmEnabled={audioConfig.bgmEnabled}
          bgmVolume={audioConfig.bgmVolume}
          sfxVolume={audioConfig.sfxVolume}
          onBGMVolumeChange={setBGMVolume}
          onSFXVolumeChange={setSFXVolume}
          onTrackChange={changeTrack}
          currentTrack={audioConfig.currentTrack}
        />
      </div>

      {/* Main Game Area - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl">
          <div className="relative">
            {/* Navigation: Previous Level Button */}
            {gameState.currentLevel > 0 && (
              <button
                onClick={previousLevel}
                className="absolute -top-16 left-0 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl z-10"
                aria-label="Câu trước"
              >
                ←
              </button>
            )}

            {/* Main Game Board */}
            <AnimatePresence mode="wait">
              <motion.div
                key={gameState.currentLevel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <ImageGrid
                  images={currentLevelData.images}
                  shouldShake={shouldShake}
                />

                <HostControls
                  onCorrect={onCorrectClick}
                  onWrong={onWrongClick}
                  isAnswerRevealed={gameState.isAnswerRevealed}
                />

                {/* Next Level Button */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={onNextClick}
                    disabled={!gameState.isAnswerRevealed || gameState.currentLevel >= LEVELS.length}
                    className="px-10 py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label={gameState.currentLevel === LEVELS.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                  >
                    {gameState.currentLevel === LEVELS.length - 1 ? '🎉 Hoàn thành' : 'Tiếp theo →'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Answer Reveal Modal */}
      <AnswerReveal
        isVisible={gameState.isAnswerRevealed}
        answer={currentLevelData.answer}
        onClose={closeAnswerReveal}
      />

      {/* Admin Panel (hidden by default, Ctrl+Shift+A to toggle) */}
      <AdminPanel
        isVisible={adminState.isEnabled}
        showAnswers={adminState.showAnswers}
        currentLevel={gameState.currentLevel}
        onJumpToLevel={jumpToLevel}
        onResetScore={resetScore}
        onToggleShowAnswers={toggleShowAnswers}
        currentAnswer={currentLevelData.answer}
      />

      {/* Admin Answer Debug (always visible if enabled) */}
      {adminState.showAnswers && (
        <div className="fixed top-4 left-4 bg-yellow-300 text-gray-800 px-4 py-2 rounded-lg shadow-lg z-40 font-bold">
          DEBUG: {currentLevelData.answer}
        </div>
      )}
    </div>
  );
}

export default App;
