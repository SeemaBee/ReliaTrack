import { Delivery } from 'assets/png';
import { useTheme } from 'common/helperFunctions';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LightTheme } from 'theme/colors';
import { Metrics } from 'theme/metrics';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const theme = useTheme();
  const styles = createdStyles(theme);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      opacity.value = withTiming(1, { duration: 200 });

      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1200,
          easing: Easing.linear,
        }),
        -1,
      );

      scale.value = withRepeat(
        withTiming(1.05, {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      cancelAnimation(rotation);
      cancelAnimation(scale);
    }

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scale);
      cancelAnimation(opacity);
    };
  }, [isLoading]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isLoading) return null;

  return (
    <Animated.View style={[styles.overlay, containerStyle]}>
      <View style={styles.loaderContainer}>
        <Animated.View style={[styles.spinner, spinnerStyle]} />
        <Animated.View style={[styles.logoWrapper, logoStyle]}>
          <Image
            source={Delivery}
            style={styles.logo}
            resizeMode="contain"
            tintColor={theme.primary}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const createdStyles = (theme: typeof LightTheme) => {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: theme.black15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    loaderContainer: {
      width: Metrics._90,
      height: Metrics._90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoWrapper: {
      position: 'absolute',
      width: Metrics._60,
      height: Metrics._60,
      borderRadius: Metrics._40,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    logo: {
      width: Metrics._40,
      height: Metrics._40,
    },
    spinner: {
      width: Metrics._100,
      height: Metrics._100,
      borderRadius: Metrics._50,
      borderWidth: Metrics._4,
      borderColor: theme.white,
      borderTopColor: theme.primary,
    },
  });
}

export default Loader;