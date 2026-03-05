import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'common/types/navigationTypes';
import ForgotPassword from 'screens/Auth/ForgotPassword/ForgotPassword';
import LoginScreen from 'screens/Auth/Login/Login';
import OtpScreen from 'screens/Auth/OtpScreen/OtpScreen';
import ResetPassword from 'screens/Auth/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};
