import { createAsyncStorage } from '@react-native-async-storage/async-storage';

export const LocalDB = createAsyncStorage('appDB');
export type LoginFormValues = {
  email: string;
  password: string;
  device_name: string;
  fcm_token: string;
};
export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};
