import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontFamily, FontSizes } from 'theme/typography';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: Metrics._16,
    },
    headerStyle: {
      paddingHorizontal: 0,
      gap: Metrics._10,
      height: Metrics._50,
    },
    innerLabel: {
      fontSize: FontSizes._16,
    },
    itemDetailsView: {
      height: Metrics._50,
      backgroundColor: theme.grey5,
      borderRadius: Metrics._10,
      paddingHorizontal: Metrics._16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Metrics._12,
    },
    title2: {
      fontSize: FontSizes._20,
      fontFamily: FontFamily.interTightMedium,
      marginBottom: Metrics._10,
    },
    itemTxt: {
      color: theme.black14,
      marginBottom: Metrics._4,
    },
    rowBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemTitle: {
      fontSize: FontSizes._16,
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
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: Metrics._22,
      borderBottomWidth: Metrics._1,
      borderBottomColor: theme.black16,
      paddingBottom: Metrics._20,
    },
    proofAction: {
      height: Metrics._50,
      borderWidth: Metrics._1,
      borderColor: theme.border12,
      width: '48%',
      borderRadius: Metrics._10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Metrics._14,
    },
    actionLabel: {
      color: theme.black15,
    },
    flx: {
      flex: 1,
    },
    deliveryAction: {
      height: Metrics._50,
      borderWidth: Metrics._1,
      borderColor: theme.border12,
      borderRadius: Metrics._10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Metrics._16,
    },
    separatorTxt: {
      fontSize: FontSizes._16,
      fontFamily: FontFamily.interTightMedium,
      textAlign: 'center',
      marginVertical: Metrics._10,
    },
    deliveryLabel: {
      color: theme.black15,
      fontSize: FontSizes._16,
    },
    deliveryProofContainer: {
      marginBottom: Metrics._20,
    },
    error: {
      color: theme.error,
    },
    sealPhotoStyle: {
      height: Metrics._50,
      width: Metrics._100,
    },
  });
};

export default useStyles;
