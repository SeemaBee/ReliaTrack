import { StyleSheet } from 'react-native';
import { Metrics } from 'theme/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics._16,
    justifyContent: 'center',
  },
  title: {
    fontSize: Metrics._28,
    fontWeight: 700,
    marginBottom: Metrics._20,
    textAlign: 'center',
  },
});

export default styles;
