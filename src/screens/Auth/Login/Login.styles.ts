import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontFamily, FontSizes } from 'theme/typography';

const getStyles = () => {
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
      fontFamily: FontFamily.interTight,
      fontWeight: '500',
    },
    subTitle: {
      fontSize: FontSizes._14,
      color: theme.grey2,
      fontFamily: FontFamily.interTight,
      marginBottom: Metrics._20,
    },
    forgotContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
    forgotText: {
      fontSize: FontSizes._14,
      color: theme.grey4,
    },
  });
};

export default getStyles;
