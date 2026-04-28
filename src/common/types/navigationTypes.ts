import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
  Splash: undefined;
  OnboardingNavigation: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  OtpScreen: { email: string; tempOtp: string };
  ResetPassword: { email: string; otp: string };
  SetPin: undefined;
  EnterPin: undefined;
  DashboardNavigation: undefined;
  Home: undefined;
  RequestScreen: { id: number };
  PickupConfirmation: undefined;
  ProofOfPickup: undefined;
  RouteScreen: undefined;
  StatusScreen: undefined;
  ItemDetailsScreen: undefined;
  ProofOfDelivery: undefined;
  BarcodeScan: { onScanSuccess?: (value: string) => void };
  SignatureScreen: { onSignSuccess?: (value: string) => void };
  EditProfile: undefined;
  ChangePassword: undefined;
  NotificationsScreen: undefined;
};

export type AppNavigationProp<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type AppRouteProp<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;
