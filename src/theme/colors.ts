
export const LightTheme = {
  mode: "light",
  background: "#FFFFFF",
  surface: "#FAFAFA",

  // Text
  text: "#000000",
  textSecondary: "#4C4C4F",

  // Borders
  border: "#E0E0E0",

  // Primary colors
  primary: "#005DAC",
  primaryText: "#FFFFFF",

  // Secondary colors
  secondary: "#E45F33",
  secondaryText: "#FFFFFF",

  // Buttons
  buttonPrimary: "#005DAC",
  buttonPrimaryText: "#FFFFFF",

  buttonSecondary: "#E45F33",
  buttonSecondaryText: "#FFFFFF",

  // Accents
  accentBlue: "#0096FA",
  accentYellow: "#FDD073",
  accentSilver: "#C4C4C4",

  // Status
  success: "#2ECC71",
  error: "#E74C3C",
  warning: "#F39C12",

  transparent: "transparent",
};


export const DarkTheme = {
  mode: "dark",

  // Backgrounds
  background: "#121212",
  surface: "#1E1E1E",

  // Text
  text: "#FFFFFF",
  textSecondary: "#75777B",

  // Borders
  border: "#2C2C2C",

  // Primary colors
  primary: "#4BA3FF",
  primaryText: "#000000",

  // Secondary colors
  secondary: "#FFA785",
  secondaryText: "#000000",

  // Buttons
  buttonPrimary: "#4BA3FF",
  buttonPrimaryText: "#000000",

  buttonSecondary: "#FFA785",
  buttonSecondaryText: "#000000",

  // Accents
  accentBlue: "#0096FA",
  accentYellow: "#FDD073",
  accentSilver: "#C4C4C4",

  // Status
  success: "#2ECC71",
  error: "#E74C3C",
  warning: "#F39C12",

  transparent: "transparent",
};


export type AppTheme = typeof LightTheme | typeof DarkTheme;
