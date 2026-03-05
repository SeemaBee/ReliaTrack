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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primary,
      paddingHorizontal: Metrics._10,
      paddingVertical: Metrics._5,
    },
    title: {
      fontSize: Metrics._24,
      fontWeight: '700',
      color: theme.background,
      marginLeft: Metrics._10,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: Metrics._10,
      backgroundColor: '#f4f4f4',
    },
    actionStyle: {
      width: '45%',
    },
    signatureContainer: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    closeContainer: {
      height: Metrics._40,
      width: Metrics._40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
