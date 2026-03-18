import NetInfo from '@react-native-community/netinfo';
import apiClient from 'api/client';
import { ENDPOINTS } from 'api/routes';
import { SafetyChecklistProps } from 'utils/constant';

export const safetyChecklistAPI = async (data: SafetyChecklistProps) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    const response = await apiClient.post(ENDPOINTS.safetyChecklist, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
