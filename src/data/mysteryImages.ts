/**
 * Mapa de imágenes locales por tipo de misterio (gozoso, doloroso, glorioso, luminoso).
 * Los require() DEBEN ser estáticos — Metro los resuelve en tiempo de bundle.
 * No uses require dinámicos — no funcionan.
 *
 * Para añadir imágenes de Firebase en Fase 3: usa imageUrl (string) en Mystery,
 * que ya está preparado. Este archivo solo maneja assets locales.
 */

export const MYSTERY_TYPE_IMAGES: Record<string, number> = {
  gozoso: require('../../assets/images/mysteries/misterios-gozosos.png') as number,
  doloroso: require('../../assets/images/mysteries/misterios-dolorosos.png') as number,
  glorioso: require('../../assets/images/mysteries/misterios-gloriosos.png') as number,
  luminoso: require('../../assets/images/mysteries/misterios-luminosos.png') as number,
};

/** Devuelve la imagen local para un tipo de misterio, o undefined si no existe. */
export function getMysteryTypeImage(type: string): number | undefined {
  return MYSTERY_TYPE_IMAGES[type];
}
