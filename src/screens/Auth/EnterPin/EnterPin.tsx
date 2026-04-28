import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import CustomText from 'common/components/text';
import Button from 'common/components/button';
import OTPInput from 'common/components/otpInut';
import { LocalDB } from 'services/database';
import useStyles from './EnterPin.styles';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from 'redux/features/authSlice';

interface EnterPinProps {
  navigation: AppNavigationProp<'EnterPin'>;
}

const EnterPin: React.FC<EnterPinProps> = ({ navigation }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');

  const handleVerifyPin = async () => {
    if (pin.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit PIN');
      return;
    }

    try {
      const savedPin = await LocalDB.getItem('userPin');
      if (savedPin === pin) {
        // PIN matches, make sure we have auth token and proceed
        const data = await LocalDB.getMany(["authToken", "userData"]);
        const token = data?.authToken;
        const userData = data?.userData;

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          dispatch(setUser(parsedUser));
          dispatch(setToken(token));
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardNavigation' }],
          });
        } else {
          Alert.alert("Error", "No saved session found. Please log in with email and password.");
        }
      } else {
        Toast.showWithGravity("Incorrect PIN", Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      console.log('Error verifying PIN:', error);
      Alert.alert('Error', 'Failed to verify PIN');
    }
  };

  const handleLogout = async () => {
    try {
      await LocalDB.removeMany(['authToken', 'userData', 'userPin']);
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingNavigation' }],
      });
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Enter PIN</CustomText>
      <CustomText style={styles.subTitle}>Enter your 6-digit PIN to continue</CustomText>

      <View style={styles.otpContainer}>
        <OTPInput secureTextEntry={true} values={pin} onChange={(val) => {
          setPin(val)
          // if (val.length === 6) {
          //   handleVerifyPin()
          // }
        }} />
      </View>

      <Button
        title="Verify PIN"
        onPress={handleVerifyPin}
        disabled={pin.length !== 6}
      />

      <View style={styles.logoutContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
          <CustomText style={styles.logoutText}>Forgot PIN? Log out</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterPin;
