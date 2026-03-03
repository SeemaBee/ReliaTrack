import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SafeScreen from 'common/components/safeScreen';
import AppNavigator from 'navigation/AppNavigator';
import { useEffect, useState } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import Orientation from 'react-native-orientation-locker';
import CheckInternetConnection from 'common/components/checkInternetConnection';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';

function App() {
  const [showNoInternetPopup, setShowNoInternetPopup] = useState(false);
  useEffect(() => {
    Orientation.lockToPortrait();
    const checkConnection = addEventListener(state => {
      const isConnected = state.isConnected ?? true;
      setShowNoInternetPopup(!isConnected);
    });
    return () => checkConnection();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <StatusBar barStyle={'dark-content'} />
        <AppNavigator />
        {showNoInternetPopup ? <CheckInternetConnection /> : null}
      </SafeScreen>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
}

export default AppContent;
