import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: Metrics._16,
      backgroundColor: theme.background,
    },
    subContainer: {
      padding: Metrics._16,
    },
    headerStyle: {
      paddingHorizontal: 0,
      gap: Metrics._10,
      height: Metrics._50,
    },
    cancelBtn: {
      borderColor: theme.grey9,
      width: '48%',
    },
    doneBtn: {
      width: '48%',
    },
    greyTxt: {
      color: theme.grey10,
    },
    rowBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  });
};

export default useStyles;
