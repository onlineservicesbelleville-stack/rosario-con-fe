import { Mystery, MysteryGroup, MysteryType } from '../types/mystery';
import { MYSTERY_AUDIO_ASSETS } from './audioAssets';

const MYSTERIES_BASE: Mystery[] = [
  // ── GOZOSOS ──
  {
    id: 'gozoso-1',
    type: 'gozoso',
    title: 'La Anunciación',
    days: ['lunes', 'sábado'],
    shortDescription: 'El Ángel Gabriel anuncia a María que será la Madre de Jesús.',
    meditation:
      'Meditamos cómo María, llena de gracia, recibe con humildad y obediencia el plan de Dios. Ella dice "Hágase en mí según tu palabra". Su fe nos enseña a confiar en Dios incluso cuando no entendemos todo.',
    kidsVersion:
      'Un ángel muy brillante llamado Gabriel fue a ver a María y le dijo: "¡Dios te saluda, María! Vas a ser la mamá de Jesús, el Hijo de Dios." María respondió con amor: "Sí, haré lo que Dios quiera."',
    intention: 'Por las familias que esperan un bebé y por quienes enfrentan decisiones difíciles.',
    isPremium: false,
    order: 1,
  },
  {
    id: 'gozoso-2',
    type: 'gozoso',
    title: 'La Visitación',
    days: ['lunes', 'sábado'],
    shortDescription: 'María visita a su prima Isabel, que también está embarazada.',
    meditation:
      'María, recién anunciada, corre a servir a su prima Isabel. Nos enseña que la fe se expresa en el servicio a los demás, especialmente a los más necesitados. Su caridad y prontitud son modelo para nosotros.',
    kidsVersion:
      'María fue a visitar a su prima Isabel, que iba a tener un bebé. Cuando Isabel la vio, su bebé saltó de alegría dentro de ella. Las dos estaban muy felices porque Dios las había bendecido.',
    intention: 'Por las mujeres embarazadas y por quienes cuidan a personas mayores o enfermas.',
    isPremium: false,
    order: 2,
  },
  {
    id: 'gozoso-3',
    type: 'gozoso',
    title: 'El Nacimiento de Jesús',
    days: ['lunes', 'sábado'],
    shortDescription: 'Jesús nace en Belén, en un pesebre humilde.',
    meditation:
      'El Hijo de Dios elige nacer pobre, en un establo, para decirnos que Dios está con los humildes. Los pastores y los Reyes Magos lo adoran. Jesús viene a traer paz y alegría a todos.',
    kidsVersion:
      'Jesús nació en un establo porque no había lugar en las posadas. María lo envolvió con cariño y lo acostó en un pesebre. Los angelitos cantaban y los pastorcitos vinieron a adorarlo. ¡Qué noche tan especial!',
    intention: 'Por las familias que no tienen hogar y por los niños que nacen en situaciones difíciles.',
    isPremium: false,
    order: 3,
  },
  {
    id: 'gozoso-4',
    type: 'gozoso',
    title: 'La Presentación de Jesús en el Templo',
    days: ['lunes', 'sábado'],
    shortDescription: 'María y José presentan al Niño Jesús en el Templo de Jerusalén.',
    meditation:
      'Al cumplir la ley, María y José ofrecen a Jesús al Padre. El anciano Simeón reconoce al Salvador y profetiza que será "luz para las naciones". Ofrecemos también nuestras vidas y familias a Dios.',
    kidsVersion:
      'Cuarenta días después de nacer, María y José llevaron al Niño Jesús al Templo para presentarlo a Dios. Un señor muy anciano llamado Simeón lo tomó en brazos y lloró de alegría porque había esperado toda su vida ver a Jesús.',
    intention: 'Por los sacerdotes y religiosas que han consagrado su vida a Dios.',
    isPremium: true,
    order: 4,
  },
  {
    id: 'gozoso-5',
    type: 'gozoso',
    title: 'El Niño Jesús perdido y hallado en el Templo',
    days: ['lunes', 'sábado'],
    shortDescription: 'A los doce años, Jesús se queda en el Templo enseñando a los maestros.',
    meditation:
      'María y José buscan a Jesús durante tres días con angustia. Lo encuentran en el Templo, en los asuntos de su Padre. Este misterio nos invita a buscar siempre a Jesús cuando lo hemos "perdido" en nuestra vida.',
    kidsVersion:
      'Cuando Jesús tenía doce años, fue con sus papás a Jerusalén. Al regresar, María y José no lo encontraban. ¡Estaban muy asustados! Después de tres días lo encontraron en el Templo, hablando con los maestros de la Biblia.',
    intention: 'Por los jóvenes que buscan el camino de Dios y por las familias en momentos de crisis.',
    isPremium: true,
    order: 5,
  },

  // ── DOLOROSOS ──
  {
    id: 'doloroso-1',
    type: 'doloroso',
    title: 'La Oración en el Huerto de Getsemaní',
    days: ['martes', 'viernes'],
    shortDescription: 'Jesús ora al Padre en el huerto, angustiado ante su pasión.',
    meditation:
      'Jesús, en su humanidad, siente el peso de todo el sufrimiento del mundo. Suda sangre de angustia, pero dice: "No se haga mi voluntad, sino la tuya." Nos enseña a rezar en los momentos más oscuros.',
    kidsVersion:
      'La noche antes de morir, Jesús fue a un jardín a rezar. Estaba muy triste porque sabía lo que iba a pasar. Pero le dijo a Dios: "Papá, haz lo que tú quieras, no lo que yo quiera." Sus amigos estaban dormidos y no lo acompañaron.',
    intention: 'Por quienes sufren en silencio y por los que atraviesan momentos de angustia y depresión.',
    isPremium: false,
    order: 6,
  },
  {
    id: 'doloroso-2',
    type: 'doloroso',
    title: 'La Flagelación de Jesús',
    days: ['martes', 'viernes'],
    shortDescription: 'Jesús es atado y azotado cruelmente por los soldados romanos.',
    meditation:
      'Jesús acepta los golpes por amor a nosotros. Cada llaga es fruto de nuestros pecados y signo de su amor infinito. Meditemos cuánto nos amó Jesús y cuánto sufrió para liberarnos.',
    kidsVersion:
      'Los soldados trataron muy mal a Jesús. Lo golpearon aunque él no había hecho nada malo. Jesús aguantó todo ese dolor porque nos amaba muchísimo y quería salvarnos.',
    intention: 'Por las víctimas de violencia y por quienes sufren injustamente.',
    isPremium: false,
    order: 7,
  },
  {
    id: 'doloroso-3',
    type: 'doloroso',
    title: 'La Coronación de Espinas',
    days: ['martes', 'viernes'],
    shortDescription: 'Los soldados colocan una corona de espinas en la cabeza de Jesús.',
    meditation:
      'Se burlan de Jesús llamándolo "Rey de los Judíos". Pero Jesús sí es Rey, rey del universo. Con humildad acepta el desprecio. Nos enseña a soportar las humillaciones con dignidad y amor.',
    kidsVersion:
      'Los soldados hicieron una corona con ramas llenas de pinchos y la pusieron en la cabeza de Jesús. Se reían de él. Pero Jesús era de verdad el Rey más grande, el Rey del cielo.',
    intention: 'Por quienes son humillados, burlados o rechazados.',
    isPremium: false,
    order: 8,
  },
  {
    id: 'doloroso-4',
    type: 'doloroso',
    title: 'Jesús con la Cruz a Cuestas',
    days: ['martes', 'viernes'],
    shortDescription: 'Jesús carga la cruz camino al Calvario entre empujones y caídas.',
    meditation:
      'Jesús cae, se levanta y sigue. María lo contempla con el corazón partido. El Cireneo le ayuda. Cada uno de nosotros tiene su cruz. Jesús nos invita a cargarla con él y a ayudar a los demás con las suyas.',
    kidsVersion:
      'Jesús tuvo que cargar una cruz muy pesada por las calles. Caía y se levantaba. Un señor llamado Simón lo ayudó a cargarla. María, su mamá, lo miraba con mucho dolor en el corazón.',
    intention: 'Por quienes cargan enfermedades, deudas o sufrimientos familiares.',
    isPremium: true,
    order: 9,
  },
  {
    id: 'doloroso-5',
    type: 'doloroso',
    title: 'La Crucifixión y Muerte de Jesús',
    days: ['martes', 'viernes'],
    shortDescription: 'Jesús es crucificado en el Calvario y muere por nuestra salvación.',
    meditation:
      'Jesús muere en la Cruz diciendo: "Padre, perdónalos, porque no saben lo que hacen." Y también: "Todo está cumplido." Su muerte es el acto de amor más grande de la historia. Por ella somos salvados.',
    kidsVersion:
      'En una colina llamada el Calvario, Jesús murió en la Cruz. Sus últimas palabras fueron de amor y perdón para todos. El cielo se oscureció y la tierra tembló. María y sus amigos estaban muy tristes.',
    intention: 'Por los enfermos terminales, por quienes agoniz y por la paz en el mundo.',
    isPremium: true,
    order: 10,
  },

  // ── GLORIOSOS ──
  {
    id: 'glorioso-1',
    type: 'glorioso',
    title: 'La Resurrección de Jesús',
    days: ['miércoles', 'domingo'],
    shortDescription: 'Jesús resucita glorioso al tercer día de su muerte.',
    meditation:
      'La Resurrección es el centro de nuestra fe. Jesús vence a la muerte y nos abre las puertas de la vida eterna. Este misterio nos llena de esperanza: la muerte no tiene la última palabra, el amor sí.',
    kidsVersion:
      'El domingo por la mañana, las mujeres fueron al sepulcro y lo encontraron vacío. ¡Jesús había resucitado! Un ángel les dijo: "No busquen aquí al que vive, ¡ha resucitado!" Fue el día más feliz de la historia.',
    intention: 'Por quienes han perdido la esperanza y por los que están en duelo.',
    isPremium: false,
    order: 11,
  },
  {
    id: 'glorioso-2',
    type: 'glorioso',
    title: 'La Ascensión de Jesús al Cielo',
    days: ['miércoles', 'domingo'],
    shortDescription: 'Jesús asciende glorioso al Cielo ante sus discípulos.',
    meditation:
      'Jesús sube al Cielo con su cuerpo glorificado. Prometió enviarnos al Espíritu Santo y estar con nosotros hasta el fin del mundo. La Ascensión nos recuerda que nuestra patria verdadera es el Cielo.',
    kidsVersion:
      'Cuarenta días después de resucitar, Jesús se despidió de sus amigos. Poco a poco subió al cielo mientras ellos miraban con asombro. Antes de irse les dijo: "Voy a preparar un lugar para ustedes."',
    intention: 'Por los misioneros y por quienes llevan el Evangelio a lugares lejanos.',
    isPremium: false,
    order: 12,
  },
  {
    id: 'glorioso-3',
    type: 'glorioso',
    title: 'La Venida del Espíritu Santo (Pentecostés)',
    days: ['miércoles', 'domingo'],
    shortDescription: 'El Espíritu Santo desciende sobre los apóstoles y María.',
    meditation:
      'El Espíritu Santo transforma a los apóstoles tímidos en valientes testigos de Cristo. Ese mismo Espíritu vive en nosotros desde el Bautismo. Pidamos que renueve nuestra fe y nos llene de su fuego.',
    kidsVersion:
      'Los amigos de Jesús estaban reunidos con María cuando de repente apareció una luz fuerte como fuego sobre sus cabezas. Era el Espíritu Santo. De repente todos podían hablar idiomas que nunca habían aprendido. ¡Fue un milagro!',
    intention: 'Por la unidad de la Iglesia y por la renovación de la fe en las familias.',
    isPremium: false,
    order: 13,
  },
  {
    id: 'glorioso-4',
    type: 'glorioso',
    title: 'La Asunción de la Virgen María',
    days: ['miércoles', 'domingo'],
    shortDescription: 'María es llevada al Cielo en cuerpo y alma al final de su vida.',
    meditation:
      'Dios lleva a María, cuerpo y alma, a la gloria del Cielo. Ella es la primera en compartir plenamente la resurrección de su Hijo. María en el Cielo intercede por nosotros sin parar.',
    kidsVersion:
      'Al terminar su vida en la tierra, Dios llevó a la Virgen María al cielo, con su cuerpo y su alma. Fue un regalo especial porque ella fue tan buena y amó tanto a Dios. Ahora está en el cielo con Jesús.',
    intention: 'Por las madres y abuelas, y por quienes cuidan a personas enfermas.',
    isPremium: true,
    order: 14,
  },
  {
    id: 'glorioso-5',
    type: 'glorioso',
    title: 'La Coronación de María como Reina del Cielo',
    days: ['miércoles', 'domingo'],
    shortDescription: 'María es coronada Reina del Cielo y la Tierra.',
    meditation:
      'María recibe la corona de Reina porque dijo sí a Dios toda su vida. Como Madre y Reina, intercede por cada uno de sus hijos en la tierra. Pidámosle que nos lleve a todos a su Hijo Jesús.',
    kidsVersion:
      'En el cielo, Dios puso una corona de estrellas en la cabeza de María y la hizo Reina del Cielo. Ahora María es nuestra Reina y nuestra Mamá del Cielo. Siempre está rezando por nosotros.',
    intention: 'Por todas las familias del mundo y por la paz universal.',
    isPremium: true,
    order: 15,
  },

  // ── LUMINOSOS ──
  {
    id: 'luminoso-1',
    type: 'luminoso',
    title: 'El Bautismo de Jesús en el Jordán',
    days: ['jueves'],
    shortDescription: 'Jesús es bautizado por Juan y el Padre declara: "Este es mi Hijo amado."',
    meditation:
      'Al bautizarse, Jesús santifica las aguas y abre el camino de nuestro propio Bautismo. El cielo se abre y el Espíritu Santo desciende en forma de paloma. Dios nos llama hijos suyos desde nuestro Bautismo.',
    kidsVersion:
      'Jesús fue al río Jordán para que Juan lo bautizara. Cuando salió del agua, el cielo se abrió y una paloma bajó sobre él. Una voz del cielo dijo: "Este es mi Hijo, a quien amo mucho."',
    intention: 'Por los recién bautizados y por quienes se preparan para el bautismo.',
    isPremium: false,
    order: 16,
  },
  {
    id: 'luminoso-2',
    type: 'luminoso',
    title: 'Las Bodas de Caná',
    days: ['jueves'],
    shortDescription: 'A petición de María, Jesús convierte el agua en vino.',
    meditation:
      'María intercede ante Jesús por los novios que se han quedado sin vino. Jesús actúa por la fe de su Madre. María nos dice hoy: "Hagan lo que él les diga." Su intercesión es poderosa.',
    kidsVersion:
      'En una boda, se acabó el vino. María le dijo a Jesús: "No tienen vino." Después les dijo a los sirvientes: "Hagan lo que él les diga." Jesús convirtió seis tinajas llenas de agua en vino delicioso. ¡Fue su primer milagro!',
    intention: 'Por los matrimonios y las familias en dificultad.',
    isPremium: false,
    order: 17,
  },
  {
    id: 'luminoso-3',
    type: 'luminoso',
    title: 'El Anuncio del Reino de Dios',
    days: ['jueves'],
    shortDescription: 'Jesús proclama el Reino y llama a la conversión.',
    meditation:
      'Jesús recorre pueblos y aldeas anunciando la Buena Noticia. "El Reino de Dios está cerca, conviértanse y crean en el Evangelio." Nos invita a cambiar el corazón y vivir como hijos de Dios.',
    kidsVersion:
      'Jesús iba de pueblo en pueblo contando a la gente cosas muy importantes sobre el amor de Dios. Curaba a los enfermos y ayudaba a los pobres. Les decía: "Dios los ama mucho, cambia tu corazón y cree en Él."',
    intention: 'Por los que están lejos de Dios y por la conversión de los pecadores.',
    isPremium: true,
    order: 18,
  },
  {
    id: 'luminoso-4',
    type: 'luminoso',
    title: 'La Transfiguración',
    days: ['jueves'],
    shortDescription: 'Jesús se transfigura en el Monte Tabor, resplandeciendo de gloria.',
    meditation:
      'Por un instante los apóstoles ven la gloria divina de Jesús. El Padre dice: "Este es mi Hijo amado, escúchenlo." Este misterio nos invita a mirar a Jesús con ojos de fe y escuchar su Palabra.',
    kidsVersion:
      'Un día, Jesús subió a una montaña con tres amigos. De repente su ropa se volvió blanca y brillante como el sol. Aparecieron Moisés y Elías hablando con él. Una nube llegó y una voz dijo: "Este es mi Hijo, escúchenlo."',
    intention: 'Por quienes buscan la verdad y por los que están confundidos en su fe.',
    isPremium: true,
    order: 19,
  },
  {
    id: 'luminoso-5',
    type: 'luminoso',
    title: 'La Institución de la Eucaristía',
    days: ['jueves'],
    shortDescription: 'En la Última Cena, Jesús entrega su Cuerpo y Sangre como alimento.',
    meditation:
      'Jesús toma el pan y el vino y los convierte en su Cuerpo y Sangre. "Hagan esto en memoria mía." La Eucaristía es el mayor regalo que nos dejó: su presencia real entre nosotros en cada Misa.',
    kidsVersion:
      'La noche antes de morir, Jesús cenó con sus amigos. Tomó el pan, dio gracias a Dios y lo partió diciendo: "Esto es mi cuerpo." Luego tomó el vino y dijo: "Esto es mi sangre." Así nos dejó la Misa como el regalo más grande.',
    intention: 'Por los sacerdotes y por quienes se acercan por primera vez a la Eucaristía.',
    isPremium: true,
    order: 20,
  },
];

export const MYSTERIES: Mystery[] = MYSTERIES_BASE.map((m) => ({
  ...m,
  audioSource: MYSTERY_AUDIO_ASSETS[m.id],
}));

export const MYSTERY_GROUPS: MysteryGroup[] = [
  {
    type: 'gozoso',
    label: 'Misterios Gozosos',
    days: ['lunes', 'sábado'],
    color: '#4A90D9',
    mysteries: MYSTERIES.filter((m) => m.type === 'gozoso'),
  },
  {
    type: 'doloroso',
    label: 'Misterios Dolorosos',
    days: ['martes', 'viernes'],
    color: '#8B3A3A',
    mysteries: MYSTERIES.filter((m) => m.type === 'doloroso'),
  },
  {
    type: 'glorioso',
    label: 'Misterios Gloriosos',
    days: ['miércoles', 'domingo'],
    color: '#C9A84C',
    mysteries: MYSTERIES.filter((m) => m.type === 'glorioso'),
  },
  {
    type: 'luminoso',
    label: 'Misterios Luminosos',
    days: ['jueves'],
    color: '#3A8B6F',
    mysteries: MYSTERIES.filter((m) => m.type === 'luminoso'),
  },
];

export const getMysteryById = (id: string): Mystery | undefined =>
  MYSTERIES.find((m) => m.id === id);

export const getMysteryGroupColor = (type: string): string => {
  const group = MYSTERY_GROUPS.find((g) => g.type === type);
  return group?.color ?? '#1B3A6B';
};
