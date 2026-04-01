import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'common/types/navigationTypes';
import HomeScreen from 'screens/Dashboard/Home/HomeScreen';
import RequestScreen from 'screens/Dashboard/RequestScreen/RequestScreen';
import PickupConfirmation from 'screens/Dashboard/PickupConfirmation/PickupConfirmation';
import ProofOfPickup from 'screens/Dashboard/ProofOfPickup/ProofOfPickup';
import RouteScreen from 'screens/Dashboard/RouteScreen/RouteScreen';
import StatusScreen from 'screens/Dashboard/StatusScreen/StatusScreen';
import ItemDetailsScreen from 'screens/Dashboard/ItemDetailsScreen/ItemDetailsScreen';
import ProofOfDelivery from 'screens/Dashboard/ProofOfDelivery/ProofOfDelivery';
import BarcodeScan from 'screens/Dashboard/BarcodeScan/BarcodeScan';
import SignatureScreen from 'screens/Dashboard/SignatureScreen/SignatureScreen';
import EditProfile from 'screens/Dashboard/EditProfile/EditProfile';
import ChangePassword from 'screens/Dashboard/ChangePassword/ChangePassword';
import NotificationsScreen from 'screens/Dashboard/NotificationsScreen/NotificationsScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} />
      <Stack.Screen name="PickupConfirmation" component={PickupConfirmation} />
      <Stack.Screen name="ProofOfPickup" component={ProofOfPickup} />
      <Stack.Screen name="BarcodeScan" component={BarcodeScan} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="StatusScreen" component={StatusScreen} />
      <Stack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen} />
      <Stack.Screen name="ProofOfDelivery" component={ProofOfDelivery} />
      <Stack.Screen name="SignatureScreen" component={SignatureScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};
