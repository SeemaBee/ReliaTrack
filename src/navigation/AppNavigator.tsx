import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackParamList } from 'common/types/navigationTypes';
import SplashScreen from 'screens/Splash/Splash';
import LoginScreen from 'screens/Auth/Login/Login';
import HomeScreen from 'screens/Home/HomeScreen';
import BarcodeScan from 'screens/Auth/BarcodeScan/BarcodeScan';
import SignatureScreen from 'screens/Auth/SignatureScreen/SignatureScreen';
import DeliveryScreen from 'screens/Auth/DeliveryScreen/DeliveryScreen';
import ForgotPassword from 'screens/Auth/ForgotPassword/ForgotPassword';

const Stack = createNativeStackNavigator<StackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ orientation: 'portrait' }} />
        <Stack.Screen name="BarcodeScan" component={BarcodeScan} options={{ orientation: 'portrait' }} />
        <Stack.Screen name="SignatureScreen" component={SignatureScreen} options={{ orientation: 'landscape' }} />
        <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} options={{ orientation: 'portrait' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ orientation: 'portrait' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ orientation: 'portrait' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ orientation: 'portrait' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;