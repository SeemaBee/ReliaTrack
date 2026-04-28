import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontFamily, FontSizes } from 'theme/typography';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: FontSizes._28,
      marginBottom: Metrics._4,
      fontFamily: FontFamily.interTightMedium,
    },
    subTitle: {
      fontSize: FontSizes._14,
      color: theme.grey2,
      marginBottom: Metrics._40,
    },
    otpContainer: {
      marginBottom: Metrics._40,
    },
    logoutContainer: {
      marginTop: Metrics._20,
      alignItems: 'center',
    },
    logoutText: {
      fontSize: FontSizes._14,
      color: theme.grey4,
    },
  });
};

export default useStyles;
