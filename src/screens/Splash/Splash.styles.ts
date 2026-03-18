import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
    title: {
      fontSize: Metrics._28,
      fontWeight: 700,
      marginBottom: Metrics._16,
      color: theme.text,
    },
  });
};

export default useStyles;
