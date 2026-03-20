import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
      backgroundColor: theme.background,
    },
    subContainer: {
      padding: Metrics._16,
    },
    headerStyle: {
      paddingHorizontal: 0,
      gap: Metrics._10,
      height: Metrics._50,
    },
  });
};

export default useStyles;
