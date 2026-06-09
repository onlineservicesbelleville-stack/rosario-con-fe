export interface Prayer {
  id: string;
  title: string;
  text: string;
  explanation: string;
  audioUrl?: string;
  isPremium: boolean;
  order: number;
}
