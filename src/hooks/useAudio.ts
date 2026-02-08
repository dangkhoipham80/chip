import { useCallback, useEffect, useRef, useState } from 'react';
import { AUDIO_TRACKS } from '../data';
import type { AudioConfig } from '../types';

export const useAudio = () => {
  const [audioConfig, setAudioConfig] = useState<AudioConfig>({
    bgmVolume: 0.3, // Lower default BGM volume
    sfxVolume: 0.6,
    currentTrack: 0,
    bgmEnabled: true,
  });

  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize BGM
    const bgm = new Audio(AUDIO_TRACKS.bgm[audioConfig.currentTrack]);
    bgm.loop = true;
    bgm.volume = audioConfig.bgmEnabled ? audioConfig.bgmVolume : 0;
    bgmRef.current = bgm;

    // Try to play if enabled, but handle autoplay restrictions
    if (audioConfig.bgmEnabled) {
      const playPromise = bgm.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
          // Auto-play might be blocked until user interaction
        });
      }
    }

    return () => {
      bgm.pause();
      bgmRef.current = null;
    };
  }, [audioConfig.currentTrack]);

  // Update volume/enabled state without reloading
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = audioConfig.bgmVolume;
      if (audioConfig.bgmEnabled) {
        bgmRef.current.play().catch(e => console.log("Play failed", e));
      } else {
        bgmRef.current.pause();
      }
    }
  }, [audioConfig.bgmVolume, audioConfig.bgmEnabled]);

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
      return { ...prev, bgmEnabled: newEnabled };
    });
  }, []);

  const playSFX = useCallback((sfxType: 'correct' | 'wrong' | 'levelComplete' | 'outOfHints') => {
    console.log(`[AUDIO] Playing SFX: ${sfxType}`);
    try {
      const sfxConfig = AUDIO_TRACKS.sfx as any; // Type assertion if needed
      const src = sfxConfig[sfxType];
      if (src) {
        const sfx = new Audio(src);
        sfx.volume = audioConfig.sfxVolume;
        sfx.play().catch(err => console.log('SFX playback failed:', err));
      }
    } catch (error) {
       console.error("Error playing SFX:", error);
    }
  }, [audioConfig.sfxVolume]);

  const setBGMVolume = useCallback((volume: number) => {
    setAudioConfig(prev => ({ ...prev, bgmVolume: volume }));
  }, []);

  const setSFXVolume = useCallback((volume: number) => {
    setAudioConfig(prev => ({ ...prev, sfxVolume: volume }));
  }, []);

  const changeTrack = useCallback((trackIndex: number) => {
    setAudioConfig(prev => ({ ...prev, currentTrack: trackIndex }));
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
