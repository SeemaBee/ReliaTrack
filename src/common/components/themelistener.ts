import { Appearance, ColorSchemeName } from 'react-native';
import store from 'redux/store';
import { setTheme } from 'redux/features/themeSlice';
import { ThemeMode } from 'common/types/types';
 
export const normalizeTheme = (
  cs: ColorSchemeName | null | undefined,
): ThemeMode => {
  return cs === 'dark' || cs === 'light' ? cs : 'system';
};
 
export const initThemeListener = () => {
  const initial = normalizeTheme(Appearance.getColorScheme());
  store.dispatch(setTheme(initial));
 
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    const mode = normalizeTheme(colorScheme);
    store.dispatch(setTheme(mode));
  });
 
  return () => subscription.remove();
};