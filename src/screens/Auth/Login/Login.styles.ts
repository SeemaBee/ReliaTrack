import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { fontFamily, Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
    },
    title: {
      fontSize: Metrics._28,
      color: theme.text,
      fontFamily: fontFamily.InterTightMedium,
    },
    tagLine: {
      color: theme.grey,
    },
    forgotText: {
      color: theme.grey,
    },
    forgotBtn: {
      alignSelf: 'flex-end',
      marginBottom: Metrics._20,
    },
  });
};

export default useStyles;
