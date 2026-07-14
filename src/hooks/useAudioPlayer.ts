import { useState, useEffect, useRef, useCallback } from 'react';
import { AVPlaybackStatus } from 'expo-av';
import { audioService, AudioSource } from '../services/audioService';

export interface AudioPlayerState {
  isLoaded: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  error: string | null;
}

/**
 * Hook de reproducción de audio.
 * Acepta un asset local (number de require()) o una URL remota (string).
 */
export function useAudioPlayer(source?: AudioSource) {
  const [state, setState] = useState<AudioPlayerState>({
    isLoaded: false,
    isPlaying: false,
    isLoading: false,
    position: 0,
    duration: 0,
    error: null,
  });

  const sourceRef = useRef<AudioSource | undefined>(undefined);

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
    // source === undefined: no hay audio → limpiar
    if (source === undefined) {
      sourceRef.current = undefined;
      return;
    }
    // Mismo source que antes → no recargar
    if (source === sourceRef.current) return;

    sourceRef.current = source;
    let cancelled = false;

    setState((s) => ({ ...s, isLoading: true, isLoaded: false, error: null }));

    (async () => {
      const sound = await audioService.load(source);
      if (cancelled) return;
      if (!sound) {
        setState((s) => ({ ...s, isLoading: false, error: 'No se pudo cargar el audio.' }));
        return;
      }
      audioService.setStatusCallback(handleStatus);
    })();

    return () => { cancelled = true; };
  }, [source, handleStatus]);

  useEffect(() => {
    return () => { audioService.stop(); };
  }, []);

  const play  = useCallback(() => audioService.play(), []);
  const pause = useCallback(() => audioService.pause(), []);
  const stop  = useCallback(() => audioService.stop(), []);
  const toggle = useCallback(
    () => (state.isPlaying ? pause() : play()),
    [state.isPlaying, play, pause],
  );
  const seekTo = useCallback((pos: number) => audioService.seekTo(pos * 1000), []);

  return { ...state, play, pause, stop, toggle, seekTo };
}
