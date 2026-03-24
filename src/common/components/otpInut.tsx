import { useTheme } from 'common/helperFunctions';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  TextInput,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { LightTheme } from 'theme/colors';
import { Metrics } from 'theme/metrics';
import { FontSizes } from 'theme/typography';

type OTPInputProps = {
  values: string;
  onChange: (otp: string) => void;
};

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const OTPInput = ({ values, onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const theme = useTheme();

  useEffect(() => {
    if (values === '') {
      setOtp(['', '', '', '', '', '']);
    }
  }, [values]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  const inputs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

  const handlePress = (keyValue: string, index: number): void => {
    const newOtp = [...otp];

    if (keyValue === 'Backspace') {
      if (newOtp[index] === '') {
        if (index > 0) inputs[index - 1].current?.focus();
      } else {
        newOtp[index] = '';
      }
    } else if (digits.includes(keyValue)) {
      newOtp[index] = keyValue;
      if (index < 5) {
        inputs[index + 1].current?.focus();
      } else {
        Keyboard.dismiss();
      }
    }

    setOtp(newOtp);
    otpMaker(newOtp);
  };

  const otpMaker = (otpArray: string[]) => {
    const isComplete = otpArray.every(digit => digit !== '');
    const otpStr = isComplete ? otpArray.join('') : '';
    onChange(otpStr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.otpInput}
            maxLength={1}
            placeholder="X"
            placeholderTextColor={theme.black2}
            keyboardType="number-pad"
            value={value}
            onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
              handlePress(e.nativeEvent.key, index)
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            submitBehavior="submit"
          />
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    otpInput: {
      width: Metrics._40,
      height: Metrics._40,
      textAlign: 'center',
      fontSize: FontSizes._14,
      borderRadius: Metrics._8,
      borderWidth: 1,
      borderColor: theme.border1,
      marginHorizontal: Metrics._5,
      backgroundColor: theme.white,
      color: theme.black1,
    },
    errorIcon: {
      alignItems: 'center',
      marginTop: Metrics._8,
    },
  });

export default OTPInput;
