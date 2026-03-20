import { Metrics } from './../../../theme/metrics';
import { useTheme } from 'common/helperFunctions';
import { Platform, StyleSheet } from 'react-native';
import { LightTheme } from 'theme/colors';

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
    rowBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    jobStatusView: {
      alignItems: 'flex-start',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      marginTop: Metrics._8,
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
    bottomSpace: {
      height: Metrics._10,
    },
    verticalLine: {
      height: Metrics._24,
      width: Metrics._1,
      backgroundColor: theme.grey8,
      marginHorizontal: Metrics._10,
    },
    iconContainer: {
      height: Metrics._24,
      width: Metrics._24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuOption: {
      padding: Metrics._10,
    },
  });
};

export const optionsStyles = (theme: typeof LightTheme) => {
  return StyleSheet.create({
    optionsContainer: {
      backgroundColor: theme.white,
      padding: Metrics._5,
      borderRadius: Metrics._8,
      width: Metrics._150,
    },
  });
};

export default useStyles;
