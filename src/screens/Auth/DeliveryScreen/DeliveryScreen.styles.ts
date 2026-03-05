import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent:'center',
      alignItems:'center'
    },
    button: {
      height: Metrics._48,
      width: Metrics._224,
      backgroundColor: theme.accentBlue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Metrics._5,
    },
    buttonText: {
      color: theme.background,
      fontSize: Metrics._16,
      fontWeight: 'bold',
    },
  });
};

export default useStyles;
