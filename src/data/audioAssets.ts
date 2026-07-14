/**
 * Mapa de assets de audio locales.
 * Los require() DEBEN ser estáticos — Metro los resuelve en tiempo de bundle.
 * No uses require dinámicos (require(`./path/${id}.mp3`)) — no funcionan.
 *
 * Para añadir audios de Firebase en Fase 3: usa audioUrl (string) en Prayer,
 * que ya está preparado. Este archivo solo maneja assets locales.
 */

export const PRAYER_AUDIO_ASSETS: Record<string, number> = {
  'senal-de-la-cruz': require('../../assets/audio/senal-de-la-cruz.mp3') as number,
  'credo': require('../../assets/audio/credo.mp3') as number,
  'padre-nuestro': require('../../assets/audio/padre-nuestro.mp3') as number,
  'ave-maria': require('../../assets/audio/ave-maria.mp3') as number,
  'gloria': require('../../assets/audio/gloria.mp3') as number,
  'jaculatoria': require('../../assets/audio/jaculatoria.mp3') as number,
  'salve': require('../../assets/audio/salve.mp3') as number,
  'oracion-final': require('../../assets/audio/oracion-final.mp3') as number,
};

/** Devuelve el asset local para una oración, o undefined si no existe. */
export function getPrayerAudioAsset(prayerId: string): number | undefined {
  return PRAYER_AUDIO_ASSETS[prayerId];
}

/** Mapa de assets de audio de los 20 misterios, indexado por Mystery.id. */
export const MYSTERY_AUDIO_ASSETS: Record<string, number> = {
  'gozoso-1': require('../../assets/audio/gozoso-1-anunciacion.mp3') as number,
  'gozoso-2': require('../../assets/audio/gozoso-2-visitacion.mp3') as number,
  'gozoso-3': require('../../assets/audio/gozoso-3-nacimiento.mp3') as number,
  'gozoso-4': require('../../assets/audio/gozoso-4-presentacion.mp3') as number,
  'gozoso-5': require('../../assets/audio/gozoso-5-templo.mp3') as number,
  'doloroso-1': require('../../assets/audio/doloroso-1-huerto.mp3') as number,
  'doloroso-2': require('../../assets/audio/doloroso-2-flagelacion.mp3') as number,
  'doloroso-3': require('../../assets/audio/doloroso-3-coronacion.mp3') as number,
  'doloroso-4': require('../../assets/audio/doloroso-4-cruz.mp3') as number,
  'doloroso-5': require('../../assets/audio/doloroso-5-crucifixion.mp3') as number,
  'glorioso-1': require('../../assets/audio/glorioso-1-resurreccion.mp3') as number,
  'glorioso-2': require('../../assets/audio/glorioso-2-ascension.mp3') as number,
  'glorioso-3': require('../../assets/audio/glorioso-3-espiritu-santo.mp3') as number,
  'glorioso-4': require('../../assets/audio/glorioso-4-asuncion.mp3') as number,
  'glorioso-5': require('../../assets/audio/glorioso-5-coronacion.mp3') as number,
  'luminoso-1': require('../../assets/audio/luminoso-1-bautismo.mp3') as number,
  'luminoso-2': require('../../assets/audio/luminoso-2-cana.mp3') as number,
  'luminoso-3': require('../../assets/audio/luminoso-3-reino.mp3') as number,
  'luminoso-4': require('../../assets/audio/luminoso-4-transfiguracion.mp3') as number,
  'luminoso-5': require('../../assets/audio/luminoso-5-eucaristia.mp3') as number,
};

/** Devuelve el asset local para un misterio, o undefined si no existe. */
export function getMysteryAudioAsset(mysteryId: string): number | undefined {
  return MYSTERY_AUDIO_ASSETS[mysteryId];
}
