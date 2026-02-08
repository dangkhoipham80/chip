import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AdminPanel from './components/AdminPanel';
import AnswerReveal from './components/AnswerReveal';
import GameComplete from './components/GameComplete';
import GameOverModal from './components/GameOverModal';
import Header from './components/Header';
import HostControls from './components/HostControls';
import ImageGrid from './components/ImageGrid';
import { LEVELS } from './data';
import { useAudio } from './hooks/useAudio';
import { useGameState } from './hooks/useGameState';
import { getTotalWords } from './utils/hintHelpers';

function App() {
  const {
    gameState,
    adminState,
    handleCorrect,
    revealAnswer,
    handleWrong,
    handleHint,
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
  const [isWinning, setIsWinning] = useState(true); // Track if revealing answer from win or loss
  const [gameOverModal, setGameOverModal] = useState<{
    isVisible: boolean;
    type: 'win' | 'lose' | 'outOfTurns';
  }>({ isVisible: false, type: 'win' });

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

  // Handle correct answer with auto-advance
  const onCorrectClick = () => {
    setIsWinning(true); // Winning = show points
    handleCorrect(); // This reveals the answer
    playSFX('correct');
    
    // Wait 2 seconds to show answer, then advance
    setTimeout(() => {
      if (gameState.currentLevel === LEVELS.length - 1) {
        playSFX('levelComplete');
      }
      nextLevel();
    }, 2000);
  };

  // Handle wrong answer with shake animation
  const onWrongClick = () => {
    handleWrong();
    playSFX('wrong');
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);
  };

  // Handle hint button
  const onHintClick = () => {
    handleHint();
  };

  // Check for game-over conditions
  useEffect(() => {
    // Skip check if answer is already revealed or game is complete
    if (gameState.isAnswerRevealed || isGameComplete) return;

    const totalWords = getTotalWords(currentLevelData.answer);

    // Check if all hints revealed
    if (gameState.hintsRevealed >= totalWords && gameState.hintsRevealed > 0) {
      console.log('[GAME OVER] All hints revealed - player loses');
      playSFX('wrong');
      setGameOverModal({ isVisible: true, type: 'lose' });
      
      setTimeout(() => {
        setGameOverModal({ isVisible: false, type: 'lose' });
        nextLevel();
      }, 2500);
    }
    // Check if max wrong attempts reached
    else if (gameState.wrongAttempts >= gameState.maxWrongAttempts) {
      console.log('[GAME OVER] Max wrong attempts reached');
      playSFX('wrong');
      setIsWinning(false); // Losing = don't show points
      revealAnswer(); // Reveal the answer WITHOUT adding points
      
      // Wait 2 seconds to show answer, then advance
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  }, [gameState.hintsRevealed, gameState.wrongAttempts, gameState.isAnswerRevealed, isGameComplete, currentLevelData.answer, gameState.maxWrongAttempts, nextLevel, playSFX, handleCorrect, revealAnswer]);

  // If game is complete, show completion screen
  if (isGameComplete) {
    return <GameComplete score={gameState.score} onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex flex-col overflow-hidden">
      {/* Header */}
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

      {/* Main Game Area - Full height, centered */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Previous Level Button */}
          {gameState.currentLevel > 0 && (
            <button
              onClick={previousLevel}
              className="mb-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl border-2 border-white/40"
              aria-label="Câu trước"
           >
              ←
            </button>
          )}

          {/* Game Board Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.currentLevel}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="bg-[#FFF8F0]/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white/50"
            >
              <ImageGrid
                images={currentLevelData.images}
                shouldShake={shouldShake}
              />

              <HostControls
                onCorrect={onCorrectClick}
                onWrong={onWrongClick}
                onHint={onHintClick}
                isAnswerRevealed={gameState.isAnswerRevealed}
                wrongAttempts={gameState.wrongAttempts}
                maxWrongAttempts={gameState.maxWrongAttempts}
                hintsRevealed={gameState.hintsRevealed}
                currentAnswer={currentLevelData.answer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Answer Reveal Modal - Hide when GameOver modal is showing */}
      <AnswerReveal
        isVisible={gameState.isAnswerRevealed && !gameOverModal.isVisible}
        answer={currentLevelData.answer}
        onClose={closeAnswerReveal}
        showPoints={isWinning}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={gameOverModal.isVisible}
        type={gameOverModal.type}
        onClose={() => setGameOverModal({ ...gameOverModal, isVisible: false })}
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
