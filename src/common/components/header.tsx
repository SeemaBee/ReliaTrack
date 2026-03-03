import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LightTheme } from 'theme/colors';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import CustomText from './text';
import { ArrowLeft } from 'lucide-react-native';

type Props = {
  title: string;
  onBackPress: () => void;
};

const Header = ({ title, onBackPress }: Props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onBackPress()}>
        <ArrowLeft />
      </TouchableOpacity>
      <CustomText style={styles.title}>{title}</CustomText>
    </View>
  );
};

const getStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: Metrics._60,
      paddingHorizontal: Metrics._16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics._8,
    },
    title: {
      fontSize: Metrics._22,
    },
  });

export default Header;
