export const LightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  cardBackground: '#F4F6FB',
  textSecondary: '#4C4C4F',
  border1: '#D0D0D0',
  border2: '#0000004A',
  border3: '#E3E3E3',
  border4: '#DFDEDE',
  border5: '#E2E2E2',
  border6: '#D4D4D4',
  border7: '#C4C4C4',
  borderSecondary: '#889921',
  error: '#E74C3C',
  primary: '#222F4E',
  secondary: '#AEBD52',
  inactiveTab: '#A0A0A0',
  black1: '#000000',
  black2: '#4A4A4A',
  black3: '#737373',
  black4: '#494949',
  black5: '#777777',
  black6: '#484848',
  black7: '#2D2D2D',
  black8: '#555555',
  black9: '#222222',
  black10: '#7F7F7F',
  black11: '#333333',
  black12: '#7B7B7B',
  black13: '#6E6E6E',
  tooltipColor: '#E9FFEB',
  lightBlue: '#C0DBFB',
  darkBlue: '#2280EF',
  verticalSeparator: '#1B5E2021',
  text: '#000000',
  grey1: '#9A9A9A',
  grey2: '#909090',
  grey3: '#CBCBCB',
  grey4: '#868686',
  white: '#FFFFFF',
};

export const DarkTheme = {
  mode: 'dark',

  // Backgrounds
  background: '#121212',
  surface: '#1E1E1E',

  // Text
  text: '#FFFFFF',
  textSecondary: '#75777B',

  // Borders
  border: '#2C2C2C',

  // Primary colors
  primary: '#4BA3FF',
  primaryText: '#000000',

  // Secondary colors
  secondary: '#FFA785',
  secondaryText: '#000000',

  // Buttons
  buttonPrimary: '#4BA3FF',
  buttonPrimaryText: '#000000',

  buttonSecondary: '#FFA785',
  buttonSecondaryText: '#000000',

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
