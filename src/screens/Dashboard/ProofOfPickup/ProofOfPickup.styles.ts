import { Metrics } from './../../../theme/metrics';
import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
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
    innerLabel: {
      fontSize: FontSizes._16,
    },
    title2: {
      fontSize: FontSizes._20,
      fontFamily: FontFamily.interTightMedium,
      marginBottom: Metrics._10,
    },
    itemTitle: {
      fontSize: FontSizes._16,
    },
    itemTxt: {
      color: theme.black14,
      marginBottom: Metrics._4,
    },
    detailBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Metrics._8,
    },
    detailText: {
      fontSize: Metrics._14,
      color: theme.primary,
      borderBottomWidth: Metrics._1,
      borderColor: theme.primary,
    },
    proofAction: {
      height: Metrics._50,
      borderWidth: Metrics._1,
      borderColor: theme.border12,
      borderRadius: Metrics._10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Metrics._14,
      marginTop: Metrics._20,
    },
    actionLabel: {
      color: theme.grey11,
    },
    error: {
      color: theme.error,
    },
    sealPhotoStyle: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    imageContainer: {
      height: Metrics._78,
      width: '100%',
      marginTop: Metrics._20,
    },
    signContainer: {
      height: Metrics._78,
      width: '100%',
      marginTop: Metrics._20,
    },
    noteContainer: {
      marginTop: Metrics._22,
    },
    crossContainer: {
      position: 'absolute',
      right: 0,
      top: -Metrics._10,
      zIndex: 2,
    },
    itemContainer: {
      marginBottom: Metrics._20,
      borderBottomWidth: Metrics._1,
      borderBottomColor: theme.grey1,
      paddingBottom: Metrics._20,
    },
    btnStyle: {
      marginVertical: Metrics._10,
    },
  });
};

export default useStyles;
