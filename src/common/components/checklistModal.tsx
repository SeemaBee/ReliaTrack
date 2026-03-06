import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import CustomText from './text';
import { Metrics } from 'theme/metrics';
import { FontFamily, FontSizes } from 'theme/typography';
import { X } from 'lucide-react-native';
import { Input } from './input';
import Button from './button';
import { LightTheme } from '../../theme/colors';
import { useTheme } from '../helperFunctions';

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const ChecklistModal = ({ show, onClose, onSuccess }: Props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ReactNativeModal
      isVisible={show}
      hasBackdrop={true}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <CustomText style={styles.title}>
              Pre-Duty Safety Checklist
            </CustomText>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onClose()}>
              <X />
            </TouchableOpacity>
          </View>
          <Input label="Cooler" />
          <Input label="Temp Check" />
          <Input label="PPE" />
          <Button title="Done" onPress={() => onSuccess()} />
        </View>
      </View>
    </ReactNativeModal>
  );
};

const getStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subContainer: {
      width: '90%',
      padding: Metrics._20,
      backgroundColor: theme.white,
      borderRadius: Metrics._12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Metrics._10,
    },
    title: {
      fontSize: FontSizes._18,
      fontFamily: FontFamily.interTightMedium,
    },
  });

export default ChecklistModal;
