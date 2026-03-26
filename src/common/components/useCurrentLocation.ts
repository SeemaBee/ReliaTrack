import Geolocation from 'react-native-geolocation-service';
import { useCallback } from 'react';
import { Location } from 'utils/constant';

export const useCurrentLocation = () => {
  const getCurrentLocation = useCallback(async (): Promise<Location | null> => {
    try {
      //   const fg = await requestForegroundPermissions();
      //   if (!fg) return null;

      //   const bg = await requestBackgroundPermission();
      //   if (!bg) return null;
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          error => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
    } catch (error) {
      console.log('Location Error:', error);
      return null;
    }
  }, []);
  return { getCurrentLocation };
};
