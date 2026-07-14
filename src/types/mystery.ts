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
  /** URL remota de imagen (Firebase Storage — Fase 3). */
  imageUrl?: string;
  /** Imagen local cargada con require(), según el tipo de misterio. Tiene prioridad sobre imageUrl. */
  imageSource?: number;
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
