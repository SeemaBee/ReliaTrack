import NetInfo from '@react-native-community/netinfo';
import apiClient from 'api/client';
import { ENDPOINTS } from 'api/routes';

export const loginAPI = async (data: {
  email: string;
  password: string;
  device_name: string;
  fcm_token: string;
}) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(ENDPOINTS.login, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
