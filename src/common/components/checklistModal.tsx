import { View, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
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
import { useTranslation } from 'react-i18next';
import { SafetyChecklistProps } from 'utils/constant';

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: SafetyChecklistProps) => void;
};

const ChecklistModal = ({ show, onClose, onSuccess }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
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
  const handleSubmit = () => {
    const checklistData: SafetyChecklistProps = {
      checklist_type: 'pre_duty',
      lights_functional: answers.lights === 'Yes',
      tire_pressure_checked: answers.tires === 'Yes',
      windshield_cleaned: answers.mirrors === 'Yes',
      vehicle_locked: answers.vehicle_lock === 'Yes',
      secure_phi_containers: answers.package_storage === 'Yes',
      id_badge_visible: answers.id_badge === 'Yes',
      biohazard_bags_available: answers.biohazard_kit === 'Yes',
      secure_transport_containers: answers.containers === 'Yes',
      gloves_available: answers.gloves === 'Yes',
      extra_leakproof_bags: answers.bags === 'Yes',
    }
    onSuccess(checklistData);
  }
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
          <Header title={t("checklist.title")} onBackPress={() => onClose()} style={styles.headerStyle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Car />
                <CustomText style={styles.title}>{t("checklist.title1")}</CustomText>
              </View>
              <CustomText style={styles.description}>{t("checklist.subTitle1")}</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q1")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("lights", "Yes")}>
                <View style={answers.lights === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("lights", "No")}>
                <View style={answers.lights === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q2")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("tires", "Yes")}>
                <View style={answers.tires === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("tires", "No")}>
                <View style={answers.tires === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q3")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("mirrors", "Yes")}>
                <View style={answers.mirrors === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("mirrors", "No")}>
                <View style={answers.mirrors === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Safety />
                <CustomText style={styles.title}>{t("checklist.title2")}</CustomText>
              </View>
              <CustomText style={styles.description}>{t("checklist.subTitle2")}</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q4")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("vehicle_lock", "Yes")}>
                <View style={answers.vehicle_lock === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("vehicle_lock", "No")}>
                <View style={answers.vehicle_lock === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q5")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("package_storage", "Yes")}>
                <View style={answers.package_storage === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("package_storage", "No")}>
                <View style={answers.package_storage === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q6")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("id_badge", "Yes")}>
                <View style={answers.id_badge === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("id_badge", "No")}>
                <View style={answers.id_badge === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.checkListContainer}>
              <View style={styles.row}>
                <Medical />
                <CustomText style={styles.title}>{t("checklist.title3")}</CustomText>
              </View>
              <CustomText style={styles.description}>{t("checklist.subTitle2")}</CustomText>
              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q7")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("biohazard_kit", "Yes")}>
                <View style={answers.biohazard_kit === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("biohazard_kit", "No")}>
                <View style={answers.biohazard_kit === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q8")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("containers", "Yes")}>
                <View style={answers.containers === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("containers", "No")}>
                <View style={answers.containers === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q9")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("gloves", "Yes")}>
                <View style={answers.gloves === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("gloves", "No")}>
                <View style={answers.gloves === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>

              <View style={styles.dotRow}>
                <View style={styles.dot} />
                <CustomText style={styles.label}>{t("checklist.q10")}</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("bags", "Yes")}>
                <View style={answers.bags === 'Yes' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.yes")}</CustomText>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.row2} onPress={() => handleSelect("bags", "No")}>
                <View style={answers.bags === 'No' ? styles.fillCircle : styles.emptyCircle} />
                <CustomText>{t("checklist.no")}</CustomText>
              </TouchableOpacity>
            </View>
            <Button title={t("action.submit")} onPress={handleSubmit} />
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
      paddingTop: Platform.OS === "android" ? Metrics._16 : Metrics._50,
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
      marginTop: Metrics._16,
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

