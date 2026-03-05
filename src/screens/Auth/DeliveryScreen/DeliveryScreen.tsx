import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './DeliveryScreen.styles'
import { requestBackgroundPermission, requestForegroundPermissions } from 'common/components/PermissionServices'
import { startBackgroundJob, stopBackgroundJob } from 'common/components/FetchingLocation'

const DeliveryScreen = () => {
    const styles = useStyles();
    const [startTracking, setStartTracking] = useState(false);
    useEffect(() => {
        initDelivery();
    }, []);
    const initDelivery = async () => {
        const foregroundOk = await requestForegroundPermissions();
        if (!foregroundOk) {
            return;
        }
        const backgroundOk = await requestBackgroundPermission();
        if (!backgroundOk) {
            return;
        }
    };

    const toggleBackground = async () => {
        try {
            if (!startTracking) {
                await startBackgroundJob();
                setStartTracking(true);
            } else {
                await stopBackgroundJob();
                setStartTracking(false);
            }
        } catch (error) {
            console.log('Toggle error:', error);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleBackground}>
                <CustomText style={styles.buttonText}>
                    {startTracking ? 'Stop Background Task' : 'Start Background Task'}
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}

export default DeliveryScreen