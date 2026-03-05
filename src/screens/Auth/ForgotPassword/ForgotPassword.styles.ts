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
    backBtn: {
      height: Metrics._40,
      width: Metrics._40,
      justifyContent: 'center',
      marginBottom: Metrics._10,
    },
  });
};

export default useStyles;
