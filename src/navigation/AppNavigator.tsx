import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackParamList } from 'common/types/navigationTypes';
import SplashScreen from 'screens/Splash/Splash';
import LoginScreen from 'screens/Auth/Login/Login';
import HomeScreen from 'screens/Dashboard/Home/HomeScreen';
import ForgotPassword from 'screens/Auth/ForgotPassword/ForgotPassword';
import OtpScreen from 'screens/Auth/OtpScreen/OtpScreen';
import ResetPassword from 'screens/Auth/ResetPassword/ResetPassword';
import OnboardingNavigation from './OnboardingNavigation';
import DashboardNavigation from './DashboardNavigation';

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="OnboardingNavigation"
          component={OnboardingNavigation}
        />
        <Stack.Screen
          name="DashboardNavigation"
          component={DashboardNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
