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
    },
    detailText: {
      fontSize: Metrics._14,
      color: theme.primary,
      borderBottomWidth: Metrics._1,
      borderColor: theme.primary,
    },
  });
};

export default useStyles;
