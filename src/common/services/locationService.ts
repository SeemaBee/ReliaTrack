import BackgroundGeolocation from 'react-native-background-geolocation';

export const initLocationTracking = () => {
  BackgroundGeolocation.ready({
    geolocation: {
      desiredAccuracy: BackgroundGeolocation.DesiredAccuracy.High,
      distanceFilter: 20,
      pausesLocationUpdatesAutomatically: false,
      locationAuthorizationRequest: 'Always',
    },

    app: {
      stopOnTerminate: false,
      startOnBoot: true, // restart after phone reboot
    },

    logger: {
      debug: false, // set true while testing
      logLevel: BackgroundGeolocation.LogLevel.Verbose,
    },

    // Server sync
    http: {
      url: 'https://your-api.com/location/update',
      method: BackgroundGeolocation.HttpMethod.Post,
      autoSync: true,
      headers: {
        Authorization: 'Bearer YOUR_TOKEN',
      },
      params: {
        role: 'courier',
      },
    },
  }).then(state => {
    if (!state.enabled) {
      BackgroundGeolocation.start();
    }
  });
};
