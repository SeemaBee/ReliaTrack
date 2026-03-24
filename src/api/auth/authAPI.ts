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

export const forgotPasswordAPI = async (email: string) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(
      ENDPOINTS.forgotPassword,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const VerifyOtpAPI = async (email: string, otp: string) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(
      ENDPOINTS.verifyOtp,
      { email, otp },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const resetPasswordAPI = async (data: {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(ENDPOINTS.resetPassword, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
