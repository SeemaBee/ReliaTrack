import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { changeLanguage } from 'common/helperFunctions';
import { AppNavigationProp } from 'common/types/navigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from 'common/types/types';
import useStyles from './Splash.styles';
import { useDispatch } from 'react-redux';
import { LocalDB } from 'services/database';
import { setToken, setUser } from 'redux/features/authSlice';
import {
  checkBiometricAvailability,
  triggerBiometricPrompt,
} from 'utils/biometrics';
import CustomText from 'common/components/text';
import { Logo } from 'assets/svg';

type Props = {
  navigation: AppNavigationProp<'Splash'>;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const checkLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    if (lang && lang !== 'en') changeLanguage(lang as Language);
  };

  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLoggedIn = useCallback(async () => {
    try {
      const data = await LocalDB.getMany(['authToken', 'userData']);
      const token = data?.authToken;
      const userData = data?.userData;
      // console.log(token);
      // console.log(userData)
      if (!token) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingNavigation' }],
        });
      }
      dispatch(setToken(token));
      const parsedUser = userData ? JSON.parse(userData) : null;
      if (parsedUser) dispatch(setUser(parsedUser));
      const { available } = await checkBiometricAvailability();
      if (!available) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardNavigation' }],
        });
      }
      const success = await triggerBiometricPrompt();
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardNavigation' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingNavigation' }],
        });
      }
    } catch (error) {
      console.error('Auth Check Error:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingNavigation' }],
      });
    }
  }, [navigation, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkLoggedIn();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [checkLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Logo />
        <View style={styles.underline} />
        <CustomText style={styles.subTitle}>
          Reliable Tracking. {'\n'}Secure Logistics.
        </CustomText>
      </View>
    </View>
  );
};

export default SplashScreen;
