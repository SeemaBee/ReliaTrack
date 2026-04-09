import { Alert, Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomText from 'common/components/text'
import { useTheme } from 'common/helperFunctions'
import useStyles from './BarcodeScan.styles'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { AppNavigationProp } from 'common/types/navigationTypes'
import { Metrics } from 'theme/metrics'
import { Flashlight, FlashlightOff, X } from 'lucide-react-native'
import { useIsFocused } from '@react-navigation/native'

type Props = {
    navigation: AppNavigationProp<'BarcodeScan'>;
    route: {
        params?: {
            onScanSuccess?: (value: string) => void;
        }
    }
}

const BarcodeScan: React.FC<Props> = ({ navigation, route }) => {
    const theme = useTheme();
    const styles = useStyles();
    const isFocused = useIsFocused();
    const [isScanned, setIsScanned] = useState(false);
    const { hasPermission, requestPermission } = useCameraPermission();
    const [torch, setTorch] = useState<'on' | 'off'>('off');
    const device = useCameraDevice('back');
    const scanAnim = useRef(new Animated.Value(0)).current;

    // const handleOpenSettings = async () => {
    //     if (Platform.OS === 'ios') {
    //         await Linking.openURL('app-settings:');
    //     } else {
    //         await Linking.openSettings();
    //     }
    // };

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scanAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [scanAnim]);

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    const canShowCamera = hasPermission && device != null && isFocused;

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13', 'upc-a'],
        onCodeScanned: (codes, frame) => {
            if (isScanned || codes.length === 0) return;
            const code = codes[0];

            if (code.frame && code.value) {
                const centerX = (code.frame.x + code.frame.width / 2) / frame.width;
                const centerY = (code.frame.y + code.frame.height / 2) / frame.height;

                const inHorizontalRange = centerX > 0.2 && centerX < 0.8;
                const inVerticalRange = centerY > 0.3 && centerY < 0.7;

                if (inHorizontalRange && inVerticalRange) {
                    setIsScanned(true);
                    route?.params?.onScanSuccess?.(code.value);
                    Alert.alert("Scanned", code.value, [{ text: "OK", onPress: () => navigation.goBack() }]);
                }
            }
        }
    });

    const translateY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Metrics.deviceWidth * 0.9 - 6],
    });

    // if (!hasPermission) {
    //     return (
    //         <View style={styles.blankContainer}>
    //             <CustomText>Camera permission is required to scan barcode.</CustomText>
    //             <CustomText>Go to setting to enable camera permission of this app.</CustomText>
    //             <Button title={'Go to settings'} onPress={handleOpenSettings} />
    //         </View>
    //     );
    // }

    if (device == null) {
        return (
            <View style={styles.container}>
                <CustomText>No camera device found</CustomText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {canShowCamera && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={!isScanned}
                    codeScanner={codeScanner}
                    torch={torch}
                    onError={(error) => console.error("Camera error:", error)}
                />)}
            <View style={styles.overlay}>
                <View style={styles.unfocusedContainer} />
                <View style={styles.middleRow}>
                    <View style={styles.unfocusedContainer} />
                    <View style={styles.focusedContainer}>
                        <View style={styles.cornerTopLeft} />
                        <View style={styles.cornerTopRight} />
                        <View style={styles.cornerBottomLeft} />
                        <View style={styles.cornerBottomRight} />
                        <Animated.View
                            style={[
                                styles.scanLine,
                                {
                                    transform: [{ translateY }],
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.unfocusedContainer} />
                </View>
                <View style={styles.unfocusedContainer} />
            </View>
            <View style={styles.rowBox}>
                <TouchableOpacity activeOpacity={1} style={styles.iconContainer} onPress={() => navigation.goBack()}>
                    <X size={Metrics._24} color={theme.white} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => setTorch(t => t === 'off' ? 'on' : 'off')} style={styles.iconContainer}>
                    {torch === "off" ?
                        <Flashlight size={Metrics._26} color={theme.white} /> :
                        <FlashlightOff size={Metrics._26} color={theme.white} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BarcodeScan