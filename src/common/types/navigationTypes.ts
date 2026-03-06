import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
  Splash: undefined;
  OnboardingNavigation: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  OtpScreen: { email: string };
  ResetPassword: { email: string };
  DashboardNavigation: undefined;
  Home: undefined;
  RequestScreen: undefined;
  PickupConfirmation: undefined;
  ProofOfPickup: undefined;
  RouteScreen: undefined;
  StatusScreen: undefined;
  ItemDetailsScreen: undefined;
  ProofOfDelivery: undefined;
};

export type AppNavigationProp<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type AppRouteProp<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;
