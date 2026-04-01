import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
