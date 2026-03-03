import React, { useEffect } from 'react';
import { View } from 'react-native';
import { changeLanguage } from 'common/helperFunctions';
import CustomText from 'common/components/text';
import { AppNavigationProp } from 'common/types/navigationTypes';
import styles from './Splash.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from 'common/types/types';
import getStyles from './Splash.styles';

type Props = {
  navigation: AppNavigationProp<'Splash'>;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const styles = getStyles();
  const checkLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    if (lang && lang !== 'en') changeLanguage(lang as Language);
  };

  useEffect(() => {
    checkLanguage();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Relia Track</CustomText>
    </View>
  );
};

export default SplashScreen;
