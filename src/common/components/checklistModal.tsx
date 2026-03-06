import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import CustomText from './text';
import { Metrics } from 'theme/metrics';
import { FontSizes } from 'theme/typography';
import Button from './button';
import { LightTheme } from '../../theme/colors';
import { useTheme } from '../helperFunctions';
import Header from './header';
import { Car, Medical, Safety } from 'assets/svg';

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const ChecklistModal = ({ show, onClose, onSuccess }: Props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [answers, setAnswers] = useState({
    lights: 'No',
    tires: 'No',
    mirrors: 'No',
    vehicle_lock: 'No',
    package_storage: 'No',
    id_badge: 'No',
    biohazard_kit: 'No',
    containers: 'No',
    gloves: 'No',
    bags: 'No',
  });
  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <ReactNativeModal
      isVisible={show}
      hasBackdrop={true}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      style={styles.modalStyle}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Header title="Pre-Duty Safety Checklist" onBackPress={() => onClose()} style={styles.headerStyle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Car />
                <CustomText style={styles.title}>Vehicle Safety & Readiness</CustomText>
              </View>
              <CustomText style={styles.description}>Perform a quick and thorough check to ensure the vehicle is roadworthy.</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are the headlights, tail lights, turn signals, and brake lights working properly?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("lights", "Yes")}>
                <View style={answers.lights === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("lights", "No")}>
                <View style={answers.lights === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are the tires properly inflated with no visible damage or excessive wear?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("tires", "Yes")}>
                <View style={answers.tires === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("tires", "No")}>
                <View style={answers.tires === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are all mirrors properly adjusted and the windshield clean and free of obstructions?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("mirrors", "Yes")}>
                <View style={answers.mirrors === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("mirrors", "No")}>
                <View style={answers.mirrors === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Safety />
                <CustomText style={styles.title}>HIPAA & Security Compliance</CustomText>
              </View>
              <CustomText style={styles.description}>These items are essential for protecting Protected Health Information (PHI) and maintaining liability coverage.</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Confirm that the vehicle will remain locked whenever PHI is present.</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("vehicle_lock", "Yes")}>
                <View style={answers.vehicle_lock === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("vehicle_lock", "No")}>
                <View style={answers.vehicle_lock === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are all medical packages and PHI containers stored in a secure, non-visible area (e.g., the trunk)?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("package_storage", "Yes")}>
                <View style={answers.package_storage === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("package_storage", "No")}>
                <View style={answers.package_storage === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are you carrying your ID badge?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("id_badge", "Yes")}>
                <View style={answers.id_badge === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("id_badge", "No")}>
                <View style={answers.id_badge === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>
            </View>


            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Medical />
                <CustomText style={styles.title}>Medical Equipment & Biohazard Safety</CustomText>
              </View>
              <CustomText style={styles.description}>These items are essential for protecting Protected Health Information (PHI) and maintaining liability coverage.</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Is a medical-grade biohazard spill kit present in the vehicle and easily accessible?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("biohazard_kit", "Yes")}>
                <View style={answers.biohazard_kit === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("biohazard_kit", "No")}>
                <View style={answers.biohazard_kit === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are the insulated transport containers clean and the temperature-monitoring devices (if required) functioning properly?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("containers", "Yes")}>
                <View style={answers.containers === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("containers", "No")}>
                <View style={answers.containers === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are disposable gloves, masks, and hand sanitizer available in the vehicle?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("gloves", "Yes")}>
                <View style={answers.gloves === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("gloves", "No")}>
                <View style={answers.gloves === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>Are extra leakproof bags and absorbent materials available for emergency repacking?</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("bags", "Yes")}>
                <View style={answers.bags === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>Yes</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("bags", "No")}>
                <View style={answers.bags === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>No</CustomText>
              </TouchableOpacity>
            </View>
            <Button title="Submit" onPress={() => onSuccess()} />
          </ScrollView>
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
    modalStyle: {
      margin: 0,
    },
    checkListContainer: {
      marginTop: Metrics._10,
      borderBottomWidth: Metrics._1,
      borderBottomColor: theme.border13,
      paddingBottom: Metrics._18,
      marginBottom: Metrics._16
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics._5
    },
    subContainer: {
      width: '100%',
      height: '100%',
      padding: Metrics._16,
      backgroundColor: theme.white,
    },
    headerStyle: {
      paddingHorizontal: 0,
      gap: Metrics._10,
      height: Metrics._50,
    },
    title: {
      fontSize: FontSizes._18,
      marginLeft: Metrics._6,
    },
    description: {
      color: theme.grey7,
    },
    dot: {
      height: Metrics._4,
      width: Metrics._4,
      borderRadius: Metrics._2,
      backgroundColor: theme.black8,
      top: Metrics._8
    },
    label: {
      color: theme.black8,
      marginLeft: Metrics._8
    },
    dotRow: {
      flexDirection: 'row',
      marginTop: Metrics._16
    },
    emptyCircle: {
      height: Metrics._22,
      width: Metrics._22,
      borderWidth: Metrics._1,
      borderRadius: Metrics._12,
      borderColor: theme.secondary,
      marginRight: Metrics._8
    },
    fillCircle: {
      height: Metrics._22,
      width: Metrics._22,
      borderWidth: Metrics._6,
      borderRadius: Metrics._12,
      borderColor: theme.secondary,
      marginRight: Metrics._8
    },
    row2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Metrics._10
    }
  });

export default ChecklistModal;

