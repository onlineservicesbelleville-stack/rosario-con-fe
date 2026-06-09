export const Colors = {
  // ── Azul Mariano ──────────────────────────────────────────
  primary: '#1B3A6B',
  primaryLight: '#2E5BA8',
  primaryDark: '#0F2347',

  // ── Dorado Suave ──────────────────────────────────────────
  secondary: '#C9A84C',
  secondaryLight: '#E4C97A',
  secondaryDark: '#9C7D35',

  // ── Fondos Cálidos (crema / blanco nacarado) ──────────────
  background: '#F7F4EF',
  backgroundAlt: '#EDE8DF',
  backgroundBlue: '#EBF3FC',   // zona de cabecera celeste muy suave
  card: '#FEFCF9',             // blanco nacarado cálido
  cardAlt: '#F0EDE6',

  // ── Texto ──────────────────────────────────────────────────
  text: '#1A2640',
  textSecondary: '#6B7A8D',
  textMuted: '#9AA3B0',
  textLight: '#FFFFFF',

  // ── Celeste Mariano ────────────────────────────────────────
  celeste: '#A8D4F5',
  celesteLight: '#D6ECFB',
  celesteDark: '#5AAADE',

  // ── Semánticos ────────────────────────────────────────────
  success: '#4CAF7D',
  successLight: '#E8F5EE',
  danger: '#E05252',
  dangerLight: '#FDECEA',
  warning: '#F5A623',
  warningLight: '#FEF3E2',

  // ── Bordes y divisores ────────────────────────────────────
  border: '#E2DDD6',
  borderLight: '#EDE8DF',
  divider: '#EDE8DF',
  shadow: 'rgba(27, 58, 107, 0.12)',

  // ── Misterios ─────────────────────────────────────────────
  mysteryGozoso: '#4A90D9',
  mysteryGozosoLight: '#D6ECFB',
  mysteryDoloroso: '#9B4444',
  mysteryDolorosoLight: '#F5E0E0',
  mysteryGlorioso: '#C9A84C',
  mysteryGloriosoLight: '#F5EDD0',
  mysteryLuminoso: '#3A8B6F',
  mysteryLuminosoLight: '#D4F0E6',

  // ── Premium ───────────────────────────────────────────────
  premiumGold: '#C9A84C',
  premiumGoldLight: '#F5EDD0',
  premiumGoldDark: '#9C7D35',

  // ── Misc ──────────────────────────────────────────────────
  transparent: 'transparent',
  overlay: 'rgba(15, 35, 71, 0.45)',
  overlayLight: 'rgba(15, 35, 71, 0.15)',
} as const;

export type ColorKey = keyof typeof Colors;

// Utilidad: color de fondo suave por tipo de misterio
export const mysteryLightColor: Record<string, string> = {
  gozoso: Colors.mysteryGozosoLight,
  doloroso: Colors.mysteryDolorosoLight,
  glorioso: Colors.mysteryGloriosoLight,
  luminoso: Colors.mysteryLuminosoLight,
};
