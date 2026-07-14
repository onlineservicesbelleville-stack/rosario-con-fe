export interface Prayer {
  id: string;
  title: string;
  text: string;
  explanation: string;
  /** URL remota (Firebase Storage — Fase 3). */
  audioUrl?: string;
  /** Asset local cargado con require(). Tiene prioridad sobre audioUrl. */
  audioSource?: number;
  isPremium: boolean;
  order: number;
}
