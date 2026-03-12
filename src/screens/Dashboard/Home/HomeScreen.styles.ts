import { useTheme } from 'common/helperFunctions';
import { Platform, StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
      alignItems: 'flex-start',
      backgroundColor: theme.background,
    },
    title: {
      fontSize: Metrics._18,
      marginBottom: Platform.OS === 'android' ? 0 : Metrics._5,
    },
    title2: {
      fontSize: Metrics._22,
      marginTop: Metrics._28,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flx: {
      flex: 1,
      width: '100%',
    },
    contentStyle: {
      flexGrow: 1,
      paddingVertical: Metrics._20,
    },
    centeredContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
