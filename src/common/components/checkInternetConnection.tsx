import { Animated, Platform, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { TriangleAlert } from 'lucide-react-native'
import { useTheme } from 'common/helperFunctions'
import { Metrics } from 'theme/metrics'
import CustomText from './text'

const CheckInternetConnection = () => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const slideAnim = useRef(new Animated.Value(-Metrics._130)).current;

    const startAnimation = useCallback(() => {
        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            speed: 10,
            bounciness: 5
        }).start();
    }, [slideAnim]);

    useEffect(() => {
        startAnimation();
    }, [startAnimation]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <TriangleAlert color={theme.background} size={Metrics._24} />
            <CustomText style={styles.label}>No internet connection</CustomText>
        </Animated.View>
    )
}

export default CheckInternetConnection

const createStyles = (theme: any) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            backgroundColor: theme.error,
            position: 'absolute',
            top: Platform.OS === 'ios' ? Metrics._35 : Metrics._30,
            flexDirection: 'row',
            alignItems: 'center',
            height: Metrics._60,
            paddingHorizontal: Metrics._20,
            zIndex: 5
        },
        label: {
            color: theme.primaryText,
            marginLeft: Metrics._10,
        }
    })
} 