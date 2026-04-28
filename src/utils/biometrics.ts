import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export const checkBiometricAvailability = async () => {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();
  return { available, biometryType };
};

export const triggerBiometricPrompt = async () => {
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate to login',
      cancelButtonText: 'Cancel',
    });
    console.log('success - ', success);
    return success;
  } catch (error) {
    console.log(error);
    return false;
  }
};
