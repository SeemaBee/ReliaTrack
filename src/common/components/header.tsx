import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { LightTheme } from 'theme/colors';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import CustomText from './text';
import { ArrowLeft } from 'lucide-react-native';
import { FontFamily, FontSizes } from 'theme/typography';

type Props = {
  title: string;
  onBackPress: () => void;
  style?: ViewStyle;
};

const Header = ({ title, onBackPress, style }: Props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={[styles.container, style]}>
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
      fontSize: FontSizes._22,
      fontFamily: FontFamily.interTightMedium,
    },
  });

export default Header;
