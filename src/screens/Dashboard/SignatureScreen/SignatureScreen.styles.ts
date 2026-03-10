import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    actionStyle: {
      width: '30%',
    },
    actionContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: Metrics._10,
    },
  });
};

export default useStyles;
