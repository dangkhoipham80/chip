import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioConfig } from '../types';

export const useAudio = () => {
  const [audioConfig, setAudioConfig] = useState<AudioConfig>({
    bgmVolume: 0.5,
    sfxVolume: 0.7,
    currentTrack: 0,
    bgmEnabled: true,
  });

  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize BGM (will be replaced with actual audio file)
    // bgmRef.current = new Audio(AUDIO_TRACKS.bgm[audioConfig.currentTrack]);
    // bgmRef.current.loop = true;
    // bgmRef.current.volume = audioConfig.bgmVolume;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, []);

  const playBGM = useCallback(() => {
    if (bgmRef.current && audioConfig.bgmEnabled) {
      bgmRef.current.play().catch(err => {
        console.log('BGM playback failed:', err);
      });
    }
  }, [audioConfig.bgmEnabled]);

  const pauseBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
    }
  }, []);

  const toggleBGM = useCallback(() => {
    setAudioConfig(prev => {
      const newEnabled = !prev.bgmEnabled;
      if (newEnabled) {
        playBGM();
      } else {
        pauseBGM();
      }
      return { ...prev, bgmEnabled: newEnabled };
    });
  }, [playBGM, pauseBGM]);

  const playSFX = useCallback((sfxType: 'correct' | 'wrong' | 'levelComplete') => {
    // TODO: Implement with actual audio files
    console.log(`[AUDIO] Playing SFX: ${sfxType}`);
    // const sfx = new Audio(AUDIO_TRACKS.sfx[sfxType]);
    // sfx.volume = audioConfig.sfxVolume;
    // sfx.play().catch(err => console.log('SFX playback failed:', err));
  }, []);

  const setBGMVolume = useCallback((volume: number) => {
    setAudioConfig(prev => ({ ...prev, bgmVolume: volume }));
    if (bgmRef.current) {
      bgmRef.current.volume = volume;
    }
  }, []);

  const setSFXVolume = useCallback((volume: number) => {
    setAudioConfig(prev => ({ ...prev, sfxVolume: volume }));
  }, []);

  const changeTrack = useCallback((trackIndex: number) => {
    setAudioConfig(prev => ({ ...prev, currentTrack: trackIndex }));
    // TODO: Implement track switching with actual audio files
    console.log(`[AUDIO] Changing to track ${trackIndex}`);
  }, []);

  return {
    audioConfig,
    playBGM,
    pauseBGM,
    toggleBGM,
    playSFX,
    setBGMVolume,
    setSFXVolume,
    changeTrack,
  };
};
