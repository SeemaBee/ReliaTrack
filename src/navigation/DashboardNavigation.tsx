import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'common/types/navigationTypes';
import HomeScreen from 'screens/Dashboard/Home/HomeScreen';
import RequestScreen from 'screens/Dashboard/RequestScreen/RequestScreen';
import PickupConfirmation from 'screens/Dashboard/PickupConfirmation/PickupConfirmation';
import ProofOfPickup from 'screens/Dashboard/ProofOfPickup/ProofOfPickup';
import RouteScreen from 'screens/Dashboard/RouteScreen/RouteScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} />
      <Stack.Screen name="PickupConfirmation" component={PickupConfirmation} />
      <Stack.Screen name="ProofOfPickup" component={ProofOfPickup} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
    </Stack.Navigator>
  );
};
