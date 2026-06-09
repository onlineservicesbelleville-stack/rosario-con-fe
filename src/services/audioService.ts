import { Audio, AVPlaybackStatus } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export interface AudioState {
  isLoaded: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  position: number;
  duration: number;
  error: string | null;
}

export const audioService = {
  async load(uri: string): Promise<Audio.Sound | null> {
    try {
      await audioService.stop();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: false });
      currentSound = sound;
      return sound;
    } catch {
      return null;
    }
  },

  async play(): Promise<void> {
    if (currentSound) {
      await currentSound.playAsync();
    }
  },

  async pause(): Promise<void> {
    if (currentSound) {
      await currentSound.pauseAsync();
    }
  },

  async stop(): Promise<void> {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }
  },

  async seekTo(positionMs: number): Promise<void> {
    if (currentSound) {
      await currentSound.setPositionAsync(positionMs);
    }
  },

  getStatus(): Promise<AVPlaybackStatus | null> {
    if (!currentSound) return Promise.resolve(null);
    return currentSound.getStatusAsync();
  },

  setStatusCallback(cb: (status: AVPlaybackStatus) => void): void {
    if (currentSound) {
      currentSound.setOnPlaybackStatusUpdate(cb);
    }
  },
};
