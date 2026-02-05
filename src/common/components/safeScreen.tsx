import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../helperFunctions';

type Props = {
  children: ReactNode;
};

export default function SafeScreen({ children }: Props) {
  const theme = useTheme();

  return <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});