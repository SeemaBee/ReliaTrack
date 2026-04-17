import NetInfo from '@react-native-community/netinfo';
import apiClient from 'api/client';
import { ENDPOINTS } from 'api/routes';
import { PickupProps, StartDeliveryProps } from 'utils/constant';

export const startRouteAPI = async (id: number, data: StartDeliveryProps) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.newJobs}/${id}/start`;
    const response = await apiClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const proofOfDeliveryAPI = async (id: number, data: PickupProps) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.newJobs}/${id}/complete`;
    const response = await apiClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
