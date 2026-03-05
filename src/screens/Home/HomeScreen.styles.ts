import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { fontFamily, Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding:Metrics._10
    },
    jobLabel: {
      color: theme.text,
      fontSize: Metrics._18,
      fontFamily: fontFamily.InterRegular,
    },
  });
};

export default useStyles;
