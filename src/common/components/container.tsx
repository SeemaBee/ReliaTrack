import { useTheme } from 'common/helperFunctions';
import React from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { moderateScale } from 'react-native-size-matters';

type ContainerProps = {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};

const Container: React.FC<ContainerProps> = ({
  children,
  contentStyle,
}) => {
  const theme = useTheme();

  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={[styles.flx, { backgroundColor: theme.background }]}>
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.contentContainer, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          extraScrollHeight={moderateScale(100)}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flx: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Container;