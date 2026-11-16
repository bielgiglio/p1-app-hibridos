export const lightColors = {
  primary: '#3797EF',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  textPrimary: '#000000',
  textSecondary: '#8E8E8E',
  border: '#DBDBDB',
  like: '#E1306C',
  inputBackground: '#FAFAFA',
  secondaryButton: '#EFEFEF',
  card: '#FFFFFF',
  danger: '#ED4956',
};

export const darkColors = {
  primary: '#3797EF',
  background: '#000000',
  surface: '#121212',
  textPrimary: '#FFFFFF',
  textSecondary: '#A8A8A8',
  border: '#262626',
  like: '#E1306C',
  inputBackground: '#121212',
  secondaryButton: '#262626',
  card: '#121212',
  danger: '#ED4956',
};

export type ThemeColors = typeof lightColors;

// Mantido para retrocompatibilidade com componentes existentes
export const COLORS = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  card: 12,
  pill: 999,
};

export const SIZES = {
  base: 8,
  fontSmall: 11,
  fontRegular: 13,
  fontMedium: 16,
  fontLarge: 20,
  avatarSmall: 32,
  avatarMedium: 58,
  avatarLarge: 76,
};
