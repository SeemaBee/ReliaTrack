import NetInfo from '@react-native-community/netinfo';

export const startRouteAPI = async () => {
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }
  try {
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
