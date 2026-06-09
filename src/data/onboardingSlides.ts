export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    title: 'Aprende a rezar\nel Rosario',
    subtitle: 'Una guía sencilla para rezar paso a paso,\nsolo o en familia.',
    icon: '📿',
    color: '#1B3A6B',
  },
  {
    id: 'slide-2',
    title: 'Escucha y sigue',
    subtitle: 'Acompaña cada oración y misterio con\nnarraciones claras y tranquilas.',
    icon: '🎵',
    color: '#2E5BA8',
  },
  {
    id: 'slide-3',
    title: 'Modo niños',
    subtitle: 'Explicaciones sencillas para que los pequeños\naprendan con amor y alegría.',
    icon: '⭐',
    color: '#3A8B6F',
  },
  {
    id: 'slide-4',
    title: 'Crea un hábito de fe',
    subtitle: 'Recibe recordatorios y guarda tu\nprogreso espiritual día a día.',
    icon: '🙏',
    color: '#C9A84C',
  },
];
