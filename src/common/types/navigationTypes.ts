import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
  Splash: undefined;
  OnboardingNavigation: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  OtpScreen: { email: string };
  ResetPassword: { email: string; otp: string };
  DashboardNavigation: undefined;
  Home: undefined;
  RequestScreen: { id: number };
  PickupConfirmation: undefined;
  ProofOfPickup: undefined;
  RouteScreen: undefined;
  StatusScreen: undefined;
  ItemDetailsScreen: undefined;
  ProofOfDelivery: undefined;
  BarcodeScan: undefined;
  SignatureScreen: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

export type AppNavigationProp<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type AppRouteProp<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;
