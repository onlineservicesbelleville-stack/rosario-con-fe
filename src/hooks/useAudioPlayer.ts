import { useState, useEffect, useRef, useCallback } from 'react';
import { AVPlaybackStatus } from 'expo-av';
import { audioService } from '../services/audioService';

export interface AudioPlayerState {
  isLoaded: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  error: string | null;
}

export function useAudioPlayer(uri?: string) {
  const [state, setState] = useState<AudioPlayerState>({
    isLoaded: false,
    isPlaying: false,
    isLoading: false,
    position: 0,
    duration: 0,
    error: null,
  });

  const uriRef = useRef<string | undefined>(undefined);

  const handleStatus = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        setState((s) => ({ ...s, error: 'Error al cargar el audio.', isLoading: false }));
      }
      return;
    }
    setState({
      isLoaded: true,
      isPlaying: status.isPlaying,
      isLoading: false,
      position: status.positionMillis / 1000,
      duration: (status.durationMillis ?? 0) / 1000,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (!uri || uri === uriRef.current) return;
    uriRef.current = uri;

    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true, isLoaded: false, error: null }));

    (async () => {
      const sound = await audioService.load(uri);
      if (cancelled) return;
      if (!sound) {
        setState((s) => ({ ...s, isLoading: false, error: 'No se pudo cargar el audio.' }));
        return;
      }
      audioService.setStatusCallback(handleStatus);
    })();

    return () => { cancelled = true; };
  }, [uri, handleStatus]);

  useEffect(() => {
    return () => { audioService.stop(); };
  }, []);

  const play = useCallback(() => audioService.play(), []);
  const pause = useCallback(() => audioService.pause(), []);
  const stop = useCallback(() => audioService.stop(), []);
  const toggle = useCallback(() => (state.isPlaying ? pause() : play()), [state.isPlaying, play, pause]);
  const seekTo = useCallback((pos: number) => audioService.seekTo(pos * 1000), []);

  return { ...state, play, pause, stop, toggle, seekTo };
}
