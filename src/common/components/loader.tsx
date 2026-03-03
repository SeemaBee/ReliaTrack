import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { useTheme } from 'common/helperFunctions';

type Props = {
  show: boolean;
};
const Loader = ({ show }: Props) => {
  const theme = useTheme();
  return (
    <ReactNativeModal
      isVisible={show}
      hasBackdrop={true}
      onBackdropPress={() => {}}
      onBackButtonPress={() => {}}
      style={{ margin: 0 }}
    >
      <View style={styles.view}>
        <ActivityIndicator size={'large'} color={theme.white} />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
