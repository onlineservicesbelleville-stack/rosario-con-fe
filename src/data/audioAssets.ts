/**
 * Mapa de assets de audio locales.
 * Los require() DEBEN ser estáticos — Metro los resuelve en tiempo de bundle.
 * No uses require dinámicos (require(`./path/${id}.m4a`)) — no funcionan.
 *
 * Para añadir audios de Firebase en Fase 3: usa audioUrl (string) en Prayer,
 * que ya está preparado. Este archivo solo maneja assets locales.
 */

export const PRAYER_AUDIO_ASSETS: Record<string, number> = {
  'senal-de-la-cruz': require('../../assets/audio/senal-de-la-cruz.m4a') as number,
  'credo': require('../../assets/audio/credo.m4a') as number,
  'padre-nuestro': require('../../assets/audio/padre-nuestro.m4a') as number,
  'ave-maria': require('../../assets/audio/ave-maria.m4a') as number,
  'gloria': require('../../assets/audio/gloria.m4a') as number,
  'jaculatoria': require('../../assets/audio/jaculatoria.m4a') as number,
  'salve': require('../../assets/audio/salve.m4a') as number,
  'oracion-final': require('../../assets/audio/oracion-final.m4a') as number,
};

/** Devuelve el asset local para una oración, o undefined si no existe. */
export function getPrayerAudioAsset(prayerId: string): number | undefined {
  return PRAYER_AUDIO_ASSETS[prayerId];
}

/** Mapa de assets de audio de los 20 misterios, indexado por Mystery.id. */
export const MYSTERY_AUDIO_ASSETS: Record<string, number> = {
  'gozoso-1': require('../../assets/audio/gozoso-1-anunciacion.m4a') as number,
  'gozoso-2': require('../../assets/audio/gozoso-2-visitacion.m4a') as number,
  'gozoso-3': require('../../assets/audio/gozoso-3-nacimiento.m4a') as number,
  'gozoso-4': require('../../assets/audio/gozoso-4-presentacion.m4a') as number,
  'gozoso-5': require('../../assets/audio/gozoso-5-templo.m4a') as number,
  'doloroso-1': require('../../assets/audio/doloroso-1-huerto.m4a') as number,
  'doloroso-2': require('../../assets/audio/doloroso-2-flagelacion.m4a') as number,
  'doloroso-3': require('../../assets/audio/doloroso-3-coronacion.m4a') as number,
  'doloroso-4': require('../../assets/audio/doloroso-4-cruz.m4a') as number,
  'doloroso-5': require('../../assets/audio/doloroso-5-crucifixion.m4a') as number,
  'glorioso-1': require('../../assets/audio/glorioso-1-resurreccion.m4a') as number,
  'glorioso-2': require('../../assets/audio/glorioso-2-ascension.m4a') as number,
  'glorioso-3': require('../../assets/audio/glorioso-3-espiritu-santo.m4a') as number,
  'glorioso-4': require('../../assets/audio/glorioso-4-asuncion.m4a') as number,
  'glorioso-5': require('../../assets/audio/glorioso-5-coronacion.m4a') as number,
  'luminoso-1': require('../../assets/audio/luminoso-1-bautismo.m4a') as number,
  'luminoso-2': require('../../assets/audio/luminoso-2-cana.m4a') as number,
  'luminoso-3': require('../../assets/audio/luminoso-3-reino.m4a') as number,
  'luminoso-4': require('../../assets/audio/luminoso-4-transfiguracion.m4a') as number,
  'luminoso-5': require('../../assets/audio/luminoso-5-eucaristia.m4a') as number,
};

/** Devuelve el asset local para un misterio, o undefined si no existe. */
export function getMysteryAudioAsset(mysteryId: string): number | undefined {
  return MYSTERY_AUDIO_ASSETS[mysteryId];
}
