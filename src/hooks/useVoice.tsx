import { useState, useCallback, useEffect } from 'react';
import { VoiceProfile } from '../types';
import { synthesizeSpeech, stopSpeech } from '../utils/polly';

export function useVoice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<VoiceProfile>({
    id: 'default',
    name: 'Default',
    language: 'en-US',
    pitch: 1,
    speed: 1,
    volume: 1,
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsPlaying(true);
      await synthesizeSpeech(text, currentProfile);
    } catch (error) {
      console.error('Speech synthesis failed:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [currentProfile]);

  const stop = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
  }, []);

  const updateProfile = useCallback((profile: Partial<VoiceProfile>) => {
    setCurrentProfile(prev => ({ ...prev, ...profile }));
  }, []);

  return {
    isPlaying,
    currentProfile,
    availableVoices,
    speak,
    stop,
    updateProfile,
  };
}