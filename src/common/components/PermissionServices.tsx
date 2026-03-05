import { Alert, Platform } from 'react-native';
import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
    openSettings,
} from 'react-native-permissions';

const POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS' as any;

export const requestForegroundPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
        // Fine Location
        const fineStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        let fineGranted = fineStatus === RESULTS.GRANTED;

        if (!fineGranted) {
            const result = await request(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
            fineGranted = result === RESULTS.GRANTED;
        }

        if (!fineGranted) {
            Alert.alert(
                'Permission Required',
                'Location permission is required to start delivery.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => openSettings() },
                ]
            );
            return false;
        }

        // Android 13+ Notifications
        if (Platform.Version >= 33) {
            const notificationStatus = await request(POST_NOTIFICATIONS);

            if (notificationStatus !== RESULTS.GRANTED) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.log('Permission error:', error);
        return false;
    }
};

// BACKGROUND PERMISSIONS

export const requestBackgroundPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android' || Platform.Version < 29) {
        return true;
    }

    try {
        const backgroundStatus = await check(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        );

        if (backgroundStatus === RESULTS.GRANTED) {
            return true;
        }

        Alert.alert(
            'Allow Background Location',
            "To track delivery even when app is closed, please select 'Allow all the time' in next screen.",
            [{ text: 'Continue' }]
        );

        const result = await request(
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        );

        if (result !== RESULTS.GRANTED) {
            Alert.alert(
                'Background Permission Required',
                'Please enable "Allow all the time" from settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => openSettings() },
                ]
            );
            return false;
        }

        return true;
    } catch (error) {
        console.log('Background permission error:', error);
        return false;
    }
};