import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LightTheme } from 'theme/colors';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import CustomText from './text';
import { MapIcon } from 'assets/svg';
import { Calendar, ChevronRight, Clock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  onPress?: () => void;
  data: any;
}

const JobCard: React.FC<Props> = ({ onPress, data }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <CustomText style={styles.itemText}>2 {t("home.items")}</CustomText>
      </View>
      <CustomText>{t("home.from")}</CustomText>
      <View style={styles.row}>
        <MapIcon />
        <CustomText numberOfLines={1} ellipsizeMode="tail">
          1901 Thornridge Cir. Shiloh, Hawaii, USA, 81063
        </CustomText>
      </View>
      <CustomText>{t("home.pickup")}</CustomText>
      <View style={styles.dateTimeBox}>
        <View style={styles.row}>
          <Calendar color={theme.black5} size={Metrics._14} />
          <CustomText style={styles.dateTimeText}>11/02/2026</CustomText>
        </View>
        <View style={styles.row}>
          <Clock color={theme.black5} size={Metrics._14} />
          <CustomText style={styles.dateTimeText}>10:30</CustomText>
        </View>
      </View>
      <CustomText>{t("home.delivery")}</CustomText>
      <View style={styles.dateTimeBox}>
        <View style={styles.row}>
          <Calendar color={theme.black5} size={Metrics._14} />
          <CustomText style={styles.dateTimeText}>11/02/2026</CustomText>
        </View>
        <View style={styles.row}>
          <Clock color={theme.black5} size={Metrics._14} />
          <CustomText style={styles.dateTimeText}>12:30</CustomText>
        </View>
      </View>
      <View style={styles.urgencyLevelBox}>
        <CustomText style={styles.urgencyTxt}>{t("request.urgency_level")}: </CustomText>
        <CustomText>ASAP</CustomText>
      </View>
      {onPress && (
        <View style={styles.detailContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.detailBox}
            onPress={onPress}
          >
            <CustomText style={styles.detailText}>{t("home.view_more")} </CustomText>
            <ChevronRight color={theme.black1} size={Metrics._16} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const getStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: Metrics._10,
      gap: Metrics._10,
      backgroundColor: theme.cardBackground,
      padding: Metrics._20,
      marginBottom: Metrics._20,
      alignItems: 'flex-start',
    },
    itemBox: {
      paddingHorizontal: Metrics._12,
      paddingVertical: Metrics._6,
      backgroundColor: theme.secondary,
      borderWidth: Metrics._1,
      borderColor: theme.borderSecondary,
      borderRadius: Metrics._8,
    },
    itemText: {
      fontSize: Metrics._18,
      color: theme.white,
    },
    row: {
      flexDirection: 'row',
      gap: Metrics._4,
      alignItems: 'center',
    },
    dateTimeBox: {
      flexDirection: 'row',
      width: '100%',
      gap: Metrics._14,
      borderBottomWidth: Metrics._1,
      borderColor: theme.border1,
      paddingBottom: Metrics._10,
    },
    urgencyLevelBox: {
      width: '100%',
      gap: Metrics._8,
    },
    urgencyTxt: {
      color: theme.red
    },
    dateTimeText: {
      fontSize: Metrics._16,
      color: theme.black5,
    },
    detailContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    detailBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      fontSize: Metrics._14,
      color: theme.primary,
      borderBottomWidth: Metrics._1,
      borderColor: theme.primary,
    },
  });

export default JobCard;
