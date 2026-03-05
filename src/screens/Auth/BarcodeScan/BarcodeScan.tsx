import { Alert, Animated, Easing, Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomText from 'common/components/text';
import { useTheme } from 'common/helperFunctions';
import useStyles from './Barcode.styles';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner
} from 'react-native-vision-camera';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Button from 'common/components/button';
import { Flashlight, FlashlightOff, X } from 'lucide-react-native';
import { Metrics } from 'theme/metrics';

interface BarcodeScanProps {
    navigation: AppNavigationProp<'BarcodeScan'>;
}

const BarcodeScan: React.FC<BarcodeScanProps> = ({ navigation }) => {
    const theme = useTheme();
    const styles = useStyles();
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const [isScanned, setIsScanned] = useState(false);
    const [torch, setTorch] = useState<'on' | 'off'>('off');
    const scanAnim = useRef(new Animated.Value(0)).current;

    const handleOpenSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await Linking.openSettings();
        }
    };
    const startAnimation = () => {
        Animated.loop(
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
        ).start();
    };

    useEffect(() => {
        startAnimation();
    }, []);


    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

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
                    Alert.alert("Scanned", code.value, [{ text: "OK", onPress: () => navigation.goBack() }]);
                }
            }
        }
    });

    const translateY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Metrics.deviceWidth * 0.9 - 6],
    });

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <CustomText style={{ color: theme.text }}>
                    Camera permission is required to scan barcode.
                </CustomText>
                <Button title={'Go to setting to enable camera permission of this app.'} onPress={handleOpenSettings} />
            </View>
        );
    }

    if (device == null) {
        return (
            <View style={styles.container}>
                <CustomText style={{ color: theme.text }}>No camera device found</CustomText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={!isScanned}
                codeScanner={codeScanner}
                torch={torch}

            />
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
    );
};

export default BarcodeScan;