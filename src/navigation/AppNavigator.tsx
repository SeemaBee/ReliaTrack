import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackParamList } from 'common/types/navigationTypes';
import SplashScreen from 'screens/Splash/Splash';
import LoginScreen from 'screens/Auth/Login/Login';
import HomeScreen from 'screens/Home/HomeScreen';
import ForgotPassword from 'screens/Auth/ForgotPassword/ForgotPassword';
import OtpScreen from 'screens/Auth/OtpScreen/OtpScreen';
import ResetPassword from 'screens/Auth/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
