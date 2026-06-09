export interface KidsLesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string;
  isPremium: boolean;
  order: number;
}

export const KIDS_LESSONS: KidsLesson[] = [
  {
    id: 'que-es-rosario',
    title: '¿Qué es el Rosario?',
    emoji: '📿',
    description: 'Aprende qué es el Rosario y por qué lo rezamos.',
    content:
      'El Rosario es una oración muy especial que rezamos con cuentas en un collar llamado "rosario".\n\nCada cuenta nos ayuda a recordar una oración.\n\nAl rezar el Rosario pensamos en momentos importantes de la vida de Jesús y de su mamá, la Virgen María.\n\nEs como contarle a María cuánto amamos a Jesús y pedirle que nos ayude.\n\n¡El Rosario es el regalo favorito de la Virgen María!',
    isPremium: false,
    order: 1,
  },
  {
    id: 'quien-es-maria',
    title: '¿Quién es la Virgen María?',
    emoji: '👑',
    description: 'Conoce a María, la mamá de Jesús.',
    content:
      'María es la mamá de Jesús, el Hijo de Dios.\n\nDios la escogió a ella porque era muy buena, muy humilde y amaba mucho a Dios.\n\nCuando el ángel Gabriel le dijo que iba a ser la mamá de Jesús, María dijo: "¡Sí, lo que Dios quiera!"\n\nMaría nos quiere a todos como una mamá. ¡Es nuestra Mamá del Cielo!\n\nCuando tenemos miedo o estamos tristes, podemos hablar con ella. Ella siempre nos escucha y lleva nuestras oraciones a Jesús.',
    isPremium: false,
    order: 2,
  },
  {
    id: 'padre-nuestro-ninos',
    title: 'El Padre Nuestro',
    emoji: '✝️',
    description: 'Aprende la oración que Jesús nos enseñó.',
    content:
      '¿Sabías que el Padre Nuestro es la oración que Jesús mismo nos enseñó?\n\nUn día, sus amigos le pidieron: "Jesús, enséñanos a rezar."\n\nY Jesús les dijo:\n\n"Padre nuestro, que estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad en la tierra como en el cielo.\n\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros perdonamos\na los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén."\n\nCuando dices "Padre nuestro", le dices a Dios: ¡Eres mi papá!',
    isPremium: false,
    order: 3,
  },
  {
    id: 'ave-maria-ninos',
    title: 'El Ave María',
    emoji: '🌸',
    description: 'El saludo más bonito para la Virgen María.',
    content:
      '¿Sabes cómo saludar a la Virgen María?\n\nEl Ave María empieza con las mismas palabras que el ángel Gabriel le dijo cuando fue a visitarla:\n\n"Dios te salve, María,\nllena eres de gracia,\nel Señor es contigo.\nBendita tú eres entre todas las mujeres,\ny bendito es el fruto de tu vientre, Jesús."\n\nLuego le pedimos su ayuda:\n\n"Santa María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén."\n\nEl Rosario tiene muchas Ave Marías. ¡A María le encanta escucharlas!',
    isPremium: false,
    order: 4,
  },
  {
    id: 'historias-misterios',
    title: 'Historias de los Misterios',
    emoji: '📖',
    description: 'Las historias más bonitas de la vida de Jesús y María.',
    content: 'En los misterios del Rosario recordamos momentos muy especiales de la vida de Jesús y María. ¡Son como cuentos reales de amor!',
    isPremium: true,
    order: 5,
  },
  {
    id: 'rosario-corto',
    title: 'Rosario Corto para Niños',
    emoji: '🌟',
    description: 'Reza el Rosario corto paso a paso. ¡Perfecto para empezar!',
    content: '',
    isPremium: false,
    order: 5,
  },
  {
    id: 'logros-ninos',
    title: 'Mis Logros',
    emoji: '🏆',
    description: 'Mira todo lo que has aprendido.',
    content: '¡Aquí puedes ver tus logros! Cada vez que aprendes algo nuevo o rezas el Rosario, ganas una estrella.',
    isPremium: false,
    order: 6,
  },
];
