import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'common/types/navigationTypes';
import EnterPin from 'screens/Auth/EnterPin/EnterPin';
import ForgotPassword from 'screens/Auth/ForgotPassword/ForgotPassword';
import LoginScreen from 'screens/Auth/Login/Login';
import OtpScreen from 'screens/Auth/OtpScreen/OtpScreen';
import ResetPassword from 'screens/Auth/ResetPassword/ResetPassword';
import SetPin from 'screens/Auth/SetPin/SetPin';

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
      <Stack.Screen name="SetPin" component={SetPin} />
      <Stack.Screen name="EnterPin" component={EnterPin} />
    </Stack.Navigator>
  );
};
