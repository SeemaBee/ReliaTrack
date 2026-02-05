import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

export type AppNavigationProp<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type AppRouteProp<T extends keyof StackParamList> =
  RouteProp<StackParamList, T>;