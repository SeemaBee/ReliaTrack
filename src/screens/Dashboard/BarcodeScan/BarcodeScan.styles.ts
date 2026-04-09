import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const useStyles = () => {
  const theme = useTheme();
  const smallestDimension = Math.min(Metrics.deviceWidth, Metrics.deviceHeight);
  const SCAN_BAR_SIZE = smallestDimension * 0.9;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    blankContainer: {
      flex: 1,
      backgroundColor: theme.background,
      padding: Metrics._20,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    unfocusedContainer: {
      flex: 1,
      backgroundColor: theme.unfocusedArea,
    },
    middleRow: {
      flexDirection: 'row',
      height: SCAN_BAR_SIZE,
    },
    focusedContainer: {
      width: SCAN_BAR_SIZE,
      height: SCAN_BAR_SIZE,
      backgroundColor: theme.transparent,
      position: 'relative',
    },
    cornerTopLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: Metrics._20,
      height: Metrics._20,
      borderTopWidth: Metrics._4,
      borderLeftWidth: Metrics._4,
      borderColor: theme.white,
    },
    cornerTopRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: Metrics._20,
      height: Metrics._20,
      borderTopWidth: Metrics._4,
      borderRightWidth: Metrics._4,
      borderColor: theme.white,
    },
    cornerBottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: Metrics._20,
      height: Metrics._20,
      borderBottomWidth: Metrics._4,
      borderLeftWidth: Metrics._4,
      borderColor: theme.white,
    },
    cornerBottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: Metrics._20,
      height: Metrics._20,
      borderBottomWidth: Metrics._4,
      borderRightWidth: Metrics._4,
      borderColor: theme.white,
    },
    scanLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: Metrics._2,
      backgroundColor: theme.white,
      opacity: 0.8,
      borderRadius: 1,
    },
    iconContainer: {
      height: Metrics._40,
      width: Metrics._40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: Metrics._12,
      marginTop: Metrics._12,
    },
  });
};

export default useStyles;
