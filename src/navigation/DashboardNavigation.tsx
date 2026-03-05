import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from 'common/types/navigationTypes';
import HomeScreen from 'screens/Dashboard/Home/HomeScreen';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
