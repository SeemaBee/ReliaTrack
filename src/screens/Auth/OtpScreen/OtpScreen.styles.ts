import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontSizes } from 'theme/typography';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    subContainer: {
      padding: Metrics._16,
    },
    title: {
      color: theme.black3,
      marginBottom: Metrics._24,
    },
    errorBox: {
      width: '100%',
      marginTop: Metrics._15,
      alignItems: 'flex-end',
    },
    error: {
      fontSize: FontSizes._10,
      color: theme.error,
    },
    resendBox: {
      flexDirection: 'row',
      marginVertical: Metrics._20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    resendText: {
      color: theme.black1,
    },
    linkText: {
      fontSize: FontSizes._16,
      color: theme.primary,
    },
  });
};

export default getStyles;
