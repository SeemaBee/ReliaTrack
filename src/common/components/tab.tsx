import CustomText from 'common/components/text';
import { useTheme } from 'common/helperFunctions';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LightTheme } from 'theme/colors';
import { Metrics } from 'theme/metrics';

interface Props {
  selected: boolean;
  handleClick: () => void;
  text: string;
}

const Tabs: React.FC<Props> = ({ selected, handleClick, text }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleClick}
      style={[styles.tab, selected && styles.selectedTab]}
    >
      <CustomText style={[styles.text, selected && styles.selectedText]}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

const getStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    tab: {
      width: '33%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Metrics._10,
      borderBottomWidth: Metrics._1,
      borderColor: theme.border1,
    },
    selectedTab: {
      borderColor: theme.primary,
    },
    text: {
      fontSize: Metrics._12,
    },
    selectedText: {
      color: theme.primary,
    },
  });

export default Tabs;
