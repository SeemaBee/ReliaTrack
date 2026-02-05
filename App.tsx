import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { initLocationTracking } from './src/common/services/locationService';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [latest, setLatest] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
    timestamp?: string;
  } | null>(null);

  useEffect(() => {
    initLocationTracking();

    const sub = BackgroundGeolocation.onLocation(location => {
      const { latitude, longitude, accuracy } = location.coords;
      setLatest({
        latitude,
        longitude,
        accuracy,
        timestamp: new Date(location.timestamp).toISOString(),
      });
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relia Track</Text>
      <Text style={styles.subtitle}>Latest Location</Text>
      {latest ? (
        <>
          <Text>Latitude: {latest.latitude}</Text>
          <Text>Longitude: {latest.longitude}</Text>
          <Text>Accuracy: {latest.accuracy ?? 'n/a'}</Text>
          <Text>Timestamp: {latest.timestamp ?? 'n/a'}</Text>
        </>
      ) : (
        <Text>Waiting for location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default App;
