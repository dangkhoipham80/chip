/**
 * Utility functions for progressive hint system
 */

/**
 * Split answer into individual words
 * @param answer - The full answer string
 * @returns Array of words
 */
export const splitAnswerIntoWords = (answer: string): string[] => {
  return answer.trim().split(/\s+/);
};

/**
 * Get progressive hint based on number of hints revealed
 * @param answer - The full answer string
 * @param hintsRevealed - Number of words to reveal
 * @returns Partial answer string
 * 
 * @example
 * getProgressiveHint("Phong trào Cần Vương", 0) // ""
 * getProgressiveHint("Phong trào Cần Vương", 1) // "Phong"
 * getProgressiveHint("Phong trào Cần Vương", 2) // "Phong trào"
 * getProgressiveHint("Phong trào Cần Vương", 3) // "Phong trào Cần"
 * getProgressiveHint("Phong trào Cần Vương", 4) // "Phong trào Cần Vương"
 */
export const getProgressiveHint = (answer: string, hintsRevealed: number): string => {
  if (hintsRevealed === 0) {
    return '';
  }
  
  const words = splitAnswerIntoWords(answer);
  const revealedWords = words.slice(0, hintsRevealed);
  return revealedWords.join(' ');
};

/**
 * Get total number of words in an answer
 * @param answer - The full answer string
 * @returns Number of words
 */
export const getTotalWords = (answer: string): number => {
  return splitAnswerIntoWords(answer).length;
};
