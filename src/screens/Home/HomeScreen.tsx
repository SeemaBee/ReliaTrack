import React, { useEffect } from "react";
import { View } from "react-native";
import styles from "./HomeScreen.styles";
import { AppNavigationProp } from "common/types/navigationTypes";
import { useTheme } from "common/helperFunctions";
import CustomText from "common/components/text";

type Props = {
  navigation: AppNavigationProp<"Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <CustomText
        style={[
          styles.title,
          { color: theme.text }
        ]}
      >
        Home Screen
      </CustomText>
    </View>
  );
};

export default HomeScreen;