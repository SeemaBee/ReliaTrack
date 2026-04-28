import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import CustomText from 'common/components/text';
import Button from 'common/components/button';
import OTPInput from 'common/components/otpInut';
import { LocalDB } from 'services/database';
import useStyles from './SetPin.styles';

interface SetPinProps {
  navigation: AppNavigationProp<'SetPin'>;
}

const SetPin: React.FC<SetPinProps> = ({ navigation }) => {
  const styles = useStyles();
  const [pin, setPin] = useState('');

  const handleSetPin = async () => {
    if (pin.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit PIN');
      return;
    }

    try {
      await LocalDB.setItem('userPin', pin);
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardNavigation' }],
      });
    } catch (error) {
      console.log('Error saving PIN:', error);
      Alert.alert('Error', 'Failed to save PIN');
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Set PIN</CustomText>
      <CustomText style={styles.subTitle}>Set a 6-digit PIN for quick access</CustomText>

      <View style={styles.otpContainer}>
        <OTPInput values={pin} onChange={(val) => setPin(val)} />
      </View>

      <Button
        title="Save PIN"
        onPress={handleSetPin}
        disabled={pin.length !== 6}
      />
    </View>
  );
};

export default SetPin;
