import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';

let watchId: number | null = null;

const sleep = (time: number) =>
    new Promise(resolve => setTimeout(resolve, time));

const trackingTask = async (taskDataArguments: any) => {
    try {
        const { delay } = taskDataArguments?.parameters || { delay: 1000 };

        watchId = Geolocation.watchPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    console.log('Location:', latitude, longitude);
                } catch (err) {
                    console.log('Position handler error:', err);
                }
            },
            (error) => console.log('Location error:', error),
            {
                // enableHighAccuracy: true,
                // distanceFilter: 0,
                // interval: 10000,
                // fastestInterval: 5000,
                enableHighAccuracy: true,
                distanceFilter: 100,
                interval: 4000,
                fastestInterval: 4000,
                forceRequestLocation: true,
                showLocationDialog: true,
            }
        );

        while (BackgroundService.isRunning()) {
            await sleep(delay);
        }
    } catch (err) {
        console.log('Tracking task crash:', err);
    }
};

const options = {
    taskName: 'Delivery Tracking',
    taskTitle: 'Delivery in Progress',
    taskDesc: 'Tracking courier location',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#0A84FF',
    parameters: {
        delay: 1000,
    },
};

export const startBackgroundJob = async () => {
    if (BackgroundService.isRunning()) return;

    try {
        await BackgroundService.start(trackingTask, options);
        console.log('Background tracking started');
    } catch (e) {
        console.log('Error starting background service:', e);
    }
};

export const stopBackgroundJob = async () => {
    try {
        if (watchId !== null) {
            Geolocation.clearWatch(watchId);
            watchId = null;
        }

        await BackgroundService.stop();

        console.log('Background tracking stopped');
    } catch (e) {
        console.log('Error stopping background service:', e);
    }
};