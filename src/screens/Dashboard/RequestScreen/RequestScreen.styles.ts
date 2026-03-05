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
    title2: {
      fontSize: FontSizes._20,
      fontFamily: FontFamily.interTightMedium,
      marginBottom: Metrics._10,
    },
    flx: {
      flex: 1,
      width: '100%',
    },
    contentStyle: {
      flexGrow: 1,
      paddingVertical: Metrics._20,
    },
    detailsLabel: {
      color: theme.black2,
    },
    detailsValue: {
      fontSize: FontSizes._16,
      marginTop: Metrics._4,
    },
    detailsItemView: {
      borderBottomWidth: Metrics._1,
      borderBottomColor: theme.border10,
      paddingBottom: Metrics._8,
      marginBottom: Metrics._20,
    },
  });
};

export default useStyles;
