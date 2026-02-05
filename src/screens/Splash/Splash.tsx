import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'common/helperFunctions';
import CustomText from 'common/components/text';
import { AppNavigationProp } from 'common/types/navigationTypes';
import styles from './Splash.styles';

type Props = {
  navigation: AppNavigationProp<'Splash'>;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomText style={[styles.title, { color: theme.text }]}>
        Splash Screen
      </CustomText>
    </View>
  );
};

export default SplashScreen;