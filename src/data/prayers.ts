import { Prayer } from '../types/prayer';
import { PRAYER_AUDIO_ASSETS } from './audioAssets';

export const PRAYERS: Prayer[] = [
  {
    id: 'senal-de-la-cruz',
    title: 'Señal de la Cruz',
    text:
      'Por la señal de la Santa Cruz,\nde nuestros enemigos,\nlíbranos, Señor, Dios nuestro.\n\nEn el nombre del Padre,\ny del Hijo,\ny del Espíritu Santo.\nAmén.',
    explanation:
      'Con esta oración comenzamos el Rosario. Hacemos la señal de la cruz sobre nuestro cuerpo recordando que somos bautizados y pertenecemos a Dios.',
    audioSource: PRAYER_AUDIO_ASSETS['senal-de-la-cruz'],
    isPremium: false,
    order: 1,
  },
  {
    id: 'credo',
    title: 'Credo de los Apóstoles',
    text:
      'Creo en Dios, Padre todopoderoso,\nCreador del cielo y de la tierra.\n\nCreo en Jesucristo, su único Hijo, Nuestro Señor,\nque fue concebido por obra y gracia del Espíritu Santo,\nnació de Santa María Virgen,\npadeció bajo el poder de Poncio Pilato,\nfue crucificado, muerto y sepultado,\ndescendió a los infiernos,\nal tercer día resucitó de entre los muertos,\nsubió a los cielos\ny está sentado a la derecha de Dios, Padre todopoderoso.\nDesde allí ha de venir a juzgar a vivos y muertos.\n\nCreo en el Espíritu Santo,\nla santa Iglesia católica,\nla comunión de los santos,\nel perdón de los pecados,\nla resurrección de la carne\ny la vida eterna.\nAmén.',
    explanation:
      'El Credo es un resumen de todo lo que creemos como católicos. Lo rezamos al inicio del Rosario para declarar nuestra fe en Dios Padre, Jesucristo y el Espíritu Santo.',
    audioSource: PRAYER_AUDIO_ASSETS['credo'],
    isPremium: false,
    order: 2,
  },
  {
    id: 'padre-nuestro',
    title: 'Padre Nuestro',
    text:
      'Padre nuestro, que estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.\n\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros perdonamos\na los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén.',
    explanation:
      'El Padre Nuestro es la oración que Jesús mismo nos enseñó. La rezamos antes de cada misterio del Rosario.',
    audioSource: PRAYER_AUDIO_ASSETS['padre-nuestro'],
    isPremium: false,
    order: 3,
  },
  {
    id: 'ave-maria',
    title: 'Ave María',
    text:
      'Dios te salve, María,\nllena eres de gracia,\nel Señor es contigo.\nBendita tú eres entre todas las mujeres,\ny bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén.',
    explanation:
      'El Ave María es la oración central del Rosario. La rezamos diez veces en cada misterio (una decena). Saludamos a María con las mismas palabras que el Ángel Gabriel le dijo.',
    audioSource: PRAYER_AUDIO_ASSETS['ave-maria'],
    isPremium: false,
    order: 4,
  },
  {
    id: 'gloria',
    title: 'Gloria',
    text:
      'Gloria al Padre,\ny al Hijo,\ny al Espíritu Santo.\nComo era en el principio,\nahora y siempre,\npor los siglos de los siglos.\nAmén.',
    explanation:
      'El Gloria es una doxología, un himno de alabanza a Dios. Lo rezamos al final de cada decena del Rosario para glorificar a la Santísima Trinidad.',
    audioSource: PRAYER_AUDIO_ASSETS['gloria'],
    isPremium: false,
    order: 5,
  },
  {
    id: 'jaculatoria',
    title: 'Jaculatoria de Fátima',
    text:
      'Oh Jesús mío,\nperdona nuestros pecados,\n\nlíbranos del fuego del infierno,\n\nllevad al cielo a todas las almas,\nespecialmente a las más necesitadas\nde tu divina misericordia.',
    explanation:
      'Esta oración fue pedida por Nuestra Señora de Fátima. La rezamos después del Gloria en cada misterio. Es una petición de misericordia para todas las almas.',
    audioSource: PRAYER_AUDIO_ASSETS['jaculatoria'],
    isPremium: false,
    order: 6,
  },
  {
    id: 'salve',
    title: 'Salve Regina',
    text:
      'Dios te salve, Reina y Madre de misericordia,\nvida, dulzura y esperanza nuestra,\nDios te salve.\n\nA Ti llamamos los desterrados hijos de Eva,\na Ti suspiramos gimiendo y llorando\nen este valle de lágrimas.\n\nEa, pues, Señora, abogada nuestra,\nvuelve a nosotros esos tus ojos misericordiosos;\ny después de este destierro,\nmuéstranos a Jesús,\nfruto bendito de tu vientre.\n\nOh clementísima, oh piadosa,\noh dulce Virgen María.',
    explanation:
      'La Salve es una oración de súplica a María como nuestra Reina y Madre. La rezamos al final del Rosario completo para encomendarnos a su protección.',
    audioSource: PRAYER_AUDIO_ASSETS['salve'],
    isPremium: false,
    order: 7,
  },
  {
    id: 'oracion-final',
    title: 'Oración Final del Rosario',
    text:
      'Oh Dios, cuyo Hijo Unigénito,\npor su vida, muerte y resurrección,\nnos ha ganado el premio de la salvación eterna:\nte pedimos que meditando estos misterios\ndel Santísimo Rosario de la Bienaventurada Virgen María,\nimitemos lo que contienen\ny obtengamos lo que prometen.\n\nPor Jesucristo Nuestro Señor.\nAmén.',
    explanation:
      'Con esta oración cerramos el Rosario, pidiendo a Dios que los misterios meditados nos transformen y nos lleven a la salvación.',
    audioSource: PRAYER_AUDIO_ASSETS['oracion-final'],
    isPremium: false,
    order: 8,
  },
];

export const getPrayerById = (id: string): Prayer | undefined =>
  PRAYERS.find((p) => p.id === id);
