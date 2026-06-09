export interface PremiumBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const PREMIUM_BENEFITS: PremiumBenefit[] = [
  {
    id: 'audio-guiado',
    icon: '🎵',
    title: 'Rosario completo con audio guiado',
    description: 'Narración profesional que te acompaña en cada oración paso a paso.',
  },
  {
    id: 'misterios-narrados',
    icon: '📿',
    title: 'Todos los misterios narrados',
    description: 'Los 20 misterios con meditación en audio para una oración más profunda.',
  },
  {
    id: 'modo-ninos',
    icon: '⭐',
    title: 'Modo niños completo',
    description: 'Todas las lecciones, historias bíblicas y el Rosario corto para los pequeños.',
  },
  {
    id: 'rosario-dormir',
    icon: '🌙',
    title: 'Rosario para dormir',
    description: 'Narración suave con música de fondo para rezar antes de descansar.',
  },
  {
    id: 'rosario-familia',
    icon: '👨‍👩‍👧‍👦',
    title: 'Rosario por la familia',
    description: 'Rosario especial con intenciones para el hogar, la salud y los seres queridos.',
  },
  {
    id: 'meditaciones',
    icon: '🕊️',
    title: 'Meditaciones especiales',
    description: 'Reflexiones profundas para cada misterio y momentos del año litúrgico.',
  },
  {
    id: 'progreso',
    icon: '📊',
    title: 'Recordatorios y progreso espiritual',
    description: 'Seguimiento de tu racha, logros y estadísticas de oración detalladas.',
  },
];

export const PLANS = [
  {
    id: 'monthly',
    productId: 'rosario_premium_monthly',
    title: 'Mensual',
    price: '$1.99',
    period: '/mes',
    description: 'Acceso completo mes a mes',
    buttonLabel: 'Elegir Mensual',
    isBestValue: false,
  },
  {
    id: 'yearly',
    productId: 'rosario_premium_yearly',
    title: 'Anual',
    price: '$9.99',
    period: '/año',
    description: 'Mejor valor para rezar todo el año',
    buttonLabel: 'Elegir Anual',
    isBestValue: true,
  },
] as const;

export type PlanId = typeof PLANS[number]['id'];
