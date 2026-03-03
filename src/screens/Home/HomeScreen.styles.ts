import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const getStyles = () => {
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
      flex: 1,
      flexGrow: 1,
      paddingVertical: Metrics._20,
    },
  });
};

export default getStyles;
