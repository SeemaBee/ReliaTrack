import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeMode } from './types/theme';
import { RootState } from 'redux/store';
import { DarkTheme, LightTheme } from 'theme/colors';
import i18n from 'i18n';

export const useTheme = () => {
  const mode: ThemeMode = useSelector((state: RootState) => state.theme);

  if (mode === 'light') return LightTheme;
  if (mode === 'dark') return DarkTheme;

  const systemMode = Appearance.getColorScheme();
  return systemMode === 'dark' ? DarkTheme : LightTheme;
};

export const changeLanguage = (lang: 'en' | 'fr') => {
  i18n.changeLanguage(lang);
};
