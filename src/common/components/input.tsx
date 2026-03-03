import React, { Ref, useState } from 'react';
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import CustomText from './text';
import { Metrics } from 'theme/metrics';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  ref?: Ref<TextInput> | undefined;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  style,
  ref,
  ...rest
}) => {
  const theme = useTheme();

  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.white,
            borderColor: error ? theme.error : theme.border1,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={isSecure}
          style={[styles.input, { color: theme.text }, style]}
          ref={ref}
          {...rest}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconRight}
          >
            {isSecure ? (
              <Eye size={20} color={theme.textSecondary} />
            ) : (
              <EyeOff size={20} color={theme.textSecondary} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.iconRight}>{rightIcon}</View>
        )}
      </View>

      {error && <CustomText color={theme.error}>{error}</CustomText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics._16,
    width: '100%',
  },
  label: {
    fontSize: Metrics._14,
    marginBottom: Metrics._8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Metrics._8,
    paddingHorizontal: Metrics._12,
    height: verticalScale(48),
  },
  input: {
    flex: 1,
    fontSize: Metrics._12,
  },
  iconLeft: {
    marginRight: Metrics._4,
  },
  iconRight: {
    marginLeft: Metrics._4,
  },
  error: {
    marginTop: Metrics._8,
    fontSize: Metrics._10,
  },
});
