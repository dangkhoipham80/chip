import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AdminPanel from './components/AdminPanel';
import AnswerReveal from './components/AnswerReveal';
import GameComplete from './components/GameComplete';
import GameOverModal from './components/GameOverModal';
import Header from './components/Header';
import HomePage from './components/HomePage';
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
  const [gameStatus, setGameStatus] = useState<'home' | 'playing' | 'finished'>('home');
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

  // Start game from home page
  const startGame = () => {
    setGameStatus('playing');
  };

  // Return to home page
  const returnHome = () => {
    resetGame();
    setGameStatus('home');
  };

  // Check for game-over conditions
  useEffect(() => {
    // Skip check if answer is already revealed or game is complete
    if (gameState.isAnswerRevealed || isGameComplete || !currentLevelData) return;

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
  }, [gameState.hintsRevealed, gameState.wrongAttempts, gameState.isAnswerRevealed, isGameComplete, currentLevelData?.answer, gameState.maxWrongAttempts, nextLevel, playSFX, handleCorrect, revealAnswer, currentLevelData]);

  // Effect to transition to finished state when game completes
  useEffect(() => {
    if (isGameComplete && gameStatus === 'playing') {
      setGameStatus('finished');
    }
  }, [isGameComplete, gameStatus]);

  // Show home page
  if (gameStatus === 'home') {
    return <HomePage onStartGame={startGame} />;
  }

  // Show game complete screen
  if (gameStatus === 'finished' || !currentLevelData) {
    return <GameComplete score={gameState.score} onRestart={resetGame} onReturnHome={returnHome} />;
  }

  // Show main game (gameStatus === 'playing')
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F2] via-[#FFD5E5] to-[#D5F5FF] flex flex-col overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className={`absolute rounded-full blur-xl ${
              i % 3 === 0 ? 'bg-purple-300' : i % 3 === 1 ? 'bg-pink-300' : 'bg-cyan-300'
            }`}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50
            }}
          />
        ))}
      </div>

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

      {/* Main Game Area - Expanded to Full Screen */}
      <div className="flex-1 flex flex-col items-center justify-between py-6 px-4 relative z-10 w-full">
        {/* Top Controls / Navigation Layer */}
        <div className="w-full flex justify-start items-start px-4 sm:px-8">
          {/* Previous Level Button - More elegant positioning */}
          {gameState.currentLevel > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={previousLevel}
              className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md shadow-lg hover:bg-white/60 hover:scale-110 transition-all flex items-center justify-center text-3xl border-2 border-white/20 text-gray-700"
              aria-label="Câu trước"
            >
              ←
            </motion.button>
          )}
        </div>

        {/* Game Content Spotlight */}
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.currentLevel}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-[90vw] mx-auto">
                <ImageGrid
                  images={currentLevelData.images}
                  shouldShake={shouldShake}
                />

                <div className="mt-4">
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
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Padding for balance */}
        <div className="h-4" />
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
