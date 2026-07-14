import { Audio, AVPlaybackStatus } from 'expo-av';

let currentSound: Audio.Sound | null = null;

/**
 * Fuente de audio:
 * - number → asset local cargado con require() (Metro)
 * - string → URL remota (Firebase Storage o HTTPS)
 */
export type AudioSource = number | string;

export const audioService = {
  async load(source: AudioSource): Promise<Audio.Sound | null> {
    try {
      await audioService.stop();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      // number = asset local; string = URL remota
      const playbackSource =
        typeof source === 'number' ? source : { uri: source };

      const { sound } = await Audio.Sound.createAsync(
        playbackSource,
        { shouldPlay: false },
      );
      currentSound = sound;
      return sound;
    } catch {
      return null;
    }
  },

  async play(): Promise<void> {
    if (currentSound) await currentSound.playAsync();
  },

  async pause(): Promise<void> {
    if (currentSound) await currentSound.pauseAsync();
  },

  async stop(): Promise<void> {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }
  },

  async seekTo(positionMs: number): Promise<void> {
    if (currentSound) await currentSound.setPositionAsync(positionMs);
  },

  getStatus(): Promise<AVPlaybackStatus | null> {
    if (!currentSound) return Promise.resolve(null);
    return currentSound.getStatusAsync();
  },

  setStatusCallback(cb: (status: AVPlaybackStatus) => void): void {
    if (currentSound) currentSound.setOnPlaybackStatusUpdate(cb);
  },
};
