import { StyleSheet } from "react-native";
import { Metrics } from "theme/metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Metrics._28,
    fontWeight: 700,
    marginBottom: Metrics._16,
  },
});

export default styles;