import { useTheme } from 'common/helperFunctions';
import React from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LightTheme } from 'theme/colors';
import { Metrics } from 'theme/metrics';

type ContainerProps = {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};

const Container: React.FC<ContainerProps> = ({ children, contentStyle }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.contentContainer, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={Metrics._100}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (theme: typeof LightTheme) => StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme.background,
  },
});

export default Container;
