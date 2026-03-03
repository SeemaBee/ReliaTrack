import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import CustomText from './text';
import { Metrics } from 'theme/metrics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  iconLeft: LeftIcon,
  iconRight: RightIcon,
  style,
}) => {
  const theme = useTheme();

  const bgColor =
    variant === 'primary'
      ? theme.primary
      : variant === 'secondary'
      ? theme.secondary
      : 'transparent';

  const borderColor = variant === 'outline' ? theme.secondary : 'transparent';

  const textColor =
    variant === 'outline'
      ? theme.secondary
      : variant === 'secondary'
      ? theme.white
      : theme.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {LeftIcon && (
            <LeftIcon
              color={textColor}
              size={scale(18)}
              style={{ marginRight: scale(6) }}
            />
          )}

          <CustomText color={textColor}>{title}</CustomText>

          {RightIcon && (
            <RightIcon
              color={textColor}
              size={scale(18)}
              style={{ marginLeft: scale(6) }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrics._12,
    paddingHorizontal: Metrics._16,
    borderRadius: Metrics._12,
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    marginTop: Metrics._20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
