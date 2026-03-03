import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const getStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: Metrics._28,
      marginBottom: Metrics._4,
    },
    subTitle: {
      fontSize: Metrics._14,
      color: theme.grey2,
    },
    forgotContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });
};

export default getStyles;
