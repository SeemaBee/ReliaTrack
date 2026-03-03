import { View, StyleSheet } from 'react-native';
import React from 'react';
import { LightTheme } from 'theme/colors';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import CustomText from './text';
import { MapIcon } from 'assets/svg';
import { Calendar, ChevronRight, Clock } from 'lucide-react-native';

const JobCard = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.itemBox}>
        <CustomText style={styles.itemText}>2 Items</CustomText>
      </View>
      <CustomText>From</CustomText>
      <View style={styles.row}>
        <MapIcon />
        <CustomText numberOfLines={1} ellipsizeMode="tail">
          1901 Thornridge Cir. Shiloh, Hawaii, USA, 81063
        </CustomText>
      </View>
      <CustomText>Pickup</CustomText>
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
      <CustomText>Delivery</CustomText>
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
      <View style={styles.detailBox}>
        <CustomText style={styles.detailText}>
          View More Detail{' '}
          <ChevronRight color={theme.black5} size={Metrics._16} />
        </CustomText>
      </View>
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
    },
    dateTimeText: {
      fontSize: Metrics._16,
      color: theme.black5,
    },
    detailBox: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    detailText: {
      fontSize: Metrics._14,
      color: theme.primary,
      borderBottomWidth: Metrics._1,
      borderColor: theme.primary,
    },
  });

export default JobCard;
