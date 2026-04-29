import { useTheme } from 'common/helperFunctions';
import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';
import { FontFamily, FontSizes } from 'theme/typography';

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.lightSkyBlue2,
    },
    subContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    underline: {
      height: Metrics._1,
      width: Metrics._180,
      backgroundColor: theme.logoUnderline,
      marginVertical: Metrics._2,
    },
    subTitle: {
      textAlign: 'center',
      color: theme.black18,
      fontSize: FontSizes._12,
      fontFamily: FontFamily.interTightMedium,
    },
  });
};

export default useStyles;
