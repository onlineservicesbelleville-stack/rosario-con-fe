export type MysteryType = 'gozoso' | 'doloroso' | 'glorioso' | 'luminoso';

export interface Mystery {
  id: string;
  type: MysteryType;
  title: string;
  days: string[];
  shortDescription: string;
  meditation: string;
  kidsVersion: string;
  intention: string;
  /** URL remota (Firebase Storage — Fase 3). */
  audioUrl?: string;
  /** Asset local cargado con require(). Tiene prioridad sobre audioUrl. */
  audioSource?: number;
  imageUrl?: string;
  isPremium: boolean;
  order: number;
}

export interface MysteryGroup {
  type: MysteryType;
  label: string;
  days: string[];
  color: string;
  mysteries: Mystery[];
}
