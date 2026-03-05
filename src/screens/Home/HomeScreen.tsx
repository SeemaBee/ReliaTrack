import React, { useState } from "react";
import { Switch, View } from "react-native";
import { AppNavigationProp } from "common/types/navigationTypes";
import { useTheme } from "common/helperFunctions";
import CustomText from "common/components/text";
import useStyles from "./HomeScreen.styles";

type Props = {
  navigation: AppNavigationProp<"Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();
  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View
      style={styles.container}
    >
      <CustomText style={styles.jobLabel}>Job Status</CustomText>
      <View>
        <Switch
          trackColor={{ false: theme.grey2, true: theme.secondary }}
          thumbColor={isEnabled ? theme.white : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default HomeScreen;