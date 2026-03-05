import { LightTheme } from 'theme/colors';
import i18n from 'i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from './types/types';

export const useTheme = () => {
  // const mode: ThemeMode = useSelector((state: RootState) => state.theme);

  // if (mode === 'light') return LightTheme;
  // if (mode === 'dark') return DarkTheme;

  // const systemMode = Appearance.getColorScheme();
  // return systemMode === 'dark' ? DarkTheme : LightTheme;
  return LightTheme;
};

export const changeLanguage = async (lang: Language) => {
  i18n.changeLanguage(lang);
  await AsyncStorage.setItem('language', lang);
};
