export const LightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  unfocusedArea: '#000000b3',

  // Text
  text: '#000000',
  textSecondary: '#4C4C4F',
  white: '#ffffff',

  // Borders
  border: '#E0E0E0',

  // Primary colors
  primary: '#222F4E',
  primaryText: '#FFFFFF',

  // Secondary colors
  secondary: '#AEBD52',
  secondaryDark: '#889921',
  secondaryText: '#FFFFFF',

  // Buttons
  buttonPrimary: '#005DAC',
  buttonPrimaryText: '#FFFFFF',

  buttonSecondary: '#E45F33',
  buttonSecondaryText: '#FFFFFF',

  // Grey
  grey: '#909090',
  grey1: '#868686',
  grey2: '#CBCBCB',

  // Accents
  accentBlue: '#0096FA',
  accentYellow: '#FDD073',
  accentSilver: '#C4C4C4',

  // Status
  success: '#2ECC71',
  error: '#E74C3C',
  warning: '#F39C12',

  transparent: 'transparent',
};

export const DarkTheme = {
  mode: 'dark',

  // Backgrounds
  background: '#121212',
  surface: '#1E1E1E',
  unfocusedArea: '#000000b3',

  // Text
  text: '#FFFFFF',
  textSecondary: '#75777B',
  white: '#ffffff',

  // Borders
  border: '#2C2C2C',

  // Primary colors
  primary: '#222F4E',
  primaryText: '#000000',

  // Secondary colors
  secondary: '#AEBD52',
  secondaryDark: '#889921',
  secondaryText: '#000000',

  // Buttons
  buttonPrimary: '#4BA3FF',
  buttonPrimaryText: '#000000',

  buttonSecondary: '#FFA785',
  buttonSecondaryText: '#000000',

  // Grey
  grey: '#909090',
  grey1: '#868686',
  grey2: '#CBCBCB',

  // Accents
  accentBlue: '#0096FA',
  accentYellow: '#FDD073',
  accentSilver: '#C4C4C4',

  // Status
  success: '#2ECC71',
  error: '#E74C3C',
  warning: '#F39C12',

  transparent: 'transparent',
};

export type AppTheme = typeof LightTheme | typeof DarkTheme;
