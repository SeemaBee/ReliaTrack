import NetInfo from '@react-native-community/netinfo';
import apiClient from 'api/client';
import { ENDPOINTS } from 'api/routes';
import { Location, PickupProps } from 'utils/constant';

export const deliveryDetailsAPI = async (id: number) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.newJobs}/${id}`;
    const response = await apiClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const acceptRequestAPI = async (id: number, data: Location) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.acceptRequest}/${id}/accept`;
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

export const pickupConfirmAPI = async () => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.pickupConfirmation}`;
    const response = await apiClient.post(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};

export const proofOfPickupAPI = async (id: number, data: PickupProps) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
    let url = `${ENDPOINTS.newJobs}/${id}/pickup`;
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
