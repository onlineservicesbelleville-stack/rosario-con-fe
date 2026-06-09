import { RosaryStep } from '../types/rosary';
import { MysteryType } from '../types/mystery';
import { MYSTERIES } from './mysteries';
import { PRAYERS } from './prayers';

const prayerText = (id: string) => PRAYERS.find((p) => p.id === id)?.text ?? '';

export function buildRosarySteps(mysteryType: MysteryType): RosaryStep[] {
  const mysteries = MYSTERIES.filter((m) => m.type === mysteryType).sort(
    (a, b) => a.order - b.order,
  );

  const steps: RosaryStep[] = [];
  let order = 0;

  const push = (step: Omit<RosaryStep, 'order'>) => {
    steps.push({ ...step, order: order++ });
  };

  push({
    id: 'intro',
    type: 'intro',
    title: 'Inicio del Santo Rosario',
    text: 'Vamos a rezar el Santo Rosario. Pon tu corazón en Dios y en María.',
    isPremium: false,
  });

  push({
    id: 'senal-cruz',
    type: 'prayer',
    title: 'Señal de la Cruz',
    text: prayerText('senal-de-la-cruz'),
    isPremium: false,
  });

  push({
    id: 'credo',
    type: 'prayer',
    title: 'Credo de los Apóstoles',
    text: prayerText('credo'),
    isPremium: false,
  });

  push({
    id: 'padre-nuestro-inicio',
    type: 'prayer',
    title: 'Padre Nuestro',
    text: prayerText('padre-nuestro'),
    isPremium: false,
  });

  for (let i = 1; i <= 3; i++) {
    push({
      id: `ave-maria-inicio-${i}`,
      type: 'prayer',
      title: `Ave María (${i} de 3)`,
      text: prayerText('ave-maria'),
      isPremium: false,
      repetitions: 3,
      currentRepetition: i,
    });
  }

  push({
    id: 'gloria-inicio',
    type: 'prayer',
    title: 'Gloria',
    text: prayerText('gloria'),
    isPremium: false,
  });

  mysteries.forEach((mystery, idx) => {
    const num = idx + 1;

    push({
      id: `mystery-${mystery.id}`,
      type: 'mystery',
      title: `${num}° Misterio: ${mystery.title}`,
      text: mystery.meditation,
      isPremium: mystery.isPremium,
      mysteryNumber: num,
      mysteryType,
    });

    push({
      id: `padre-nuestro-${num}`,
      type: 'prayer',
      title: 'Padre Nuestro',
      text: prayerText('padre-nuestro'),
      isPremium: false,
    });

    for (let i = 1; i <= 10; i++) {
      push({
        id: `ave-maria-${num}-${i}`,
        type: 'prayer',
        title: `Ave María (${i} de 10)`,
        text: prayerText('ave-maria'),
        isPremium: mystery.isPremium,
        repetitions: 10,
        currentRepetition: i,
      });
    }

    push({
      id: `gloria-${num}`,
      type: 'prayer',
      title: 'Gloria',
      text: prayerText('gloria'),
      isPremium: false,
    });

    push({
      id: `jaculatoria-${num}`,
      type: 'prayer',
      title: 'Jaculatoria de Fátima',
      text: prayerText('jaculatoria'),
      isPremium: false,
    });
  });

  push({
    id: 'salve',
    type: 'prayer',
    title: 'Salve Regina',
    text: prayerText('salve'),
    isPremium: false,
  });

  push({
    id: 'oracion-final',
    type: 'prayer',
    title: 'Oración Final',
    text: prayerText('oracion-final'),
    isPremium: false,
  });

  push({
    id: 'finish',
    type: 'finish',
    title: '¡Rosario Completado!',
    text: 'Has terminado el Santo Rosario. Que la Virgen María lleve tus intenciones al corazón de Jesús.',
    isPremium: false,
  });

  return steps;
}
