import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from 'common/types/types';
import { Appearance } from 'react-native';

const getInitialTheme = (): ThemeMode => {
  const cs = Appearance.getColorScheme();
  return cs === 'dark' || cs === 'light' ? cs : 'system';
};

const initialState: ThemeMode = getInitialTheme();

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (_, action: PayloadAction<ThemeMode>) => {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;