import { Alert, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useStyles from './SignatureScreen.styles'
import { AppNavigationProp } from 'common/types/navigationTypes'
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import Orientation from 'react-native-orientation-locker'
import Button from 'common/components/button'
import { useTranslation } from 'react-i18next';

type Props = {
    navigation: AppNavigationProp<'SignatureScreen'>;
    route: {
        params?: {
            onSignSuccess?: (value: string) => void;
        }
    }
};

const SignatureScreen: React.FC<Props> = ({ navigation, route }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const signatureRef = useRef<SignatureViewRef>(null);
    const [canvasKey, setCanvasKey] = useState(0);

    useEffect(() => {
        Orientation.lockToLandscape();

        const timer = setTimeout(() => {
            setCanvasKey(prev => prev + 1);
        }, 300);
        return () => {
            clearTimeout(timer);
            Orientation.lockToPortrait();
        }
    }, []);

    const handleSignature = useCallback((signature: string) => {
        route?.params?.onSignSuccess?.(signature);
        // Alert.alert("Signature Captured", signature.substring(0, 50) + "...");
        console.log(signature);
        navigation.goBack();
    }, [navigation, route]);

    const handleClear = () => {
        signatureRef.current?.clearSignature();
    };

    const handleSave = () => {
        signatureRef.current?.readSignature();
    };

    const webStyle = `
        .m-signature-pad--footer { display: none; margin: 0px; }
        body,html { width: 100%; height: 100%; }
    `;

    return (
        <View style={styles.container}>
            <SignatureCanvas
                key={canvasKey}
                ref={signatureRef}
                onOK={handleSignature}
                onEmpty={() => Alert.alert("Empty", "Please provide a signature first.")}
                descriptionText="Sign Here"
                webStyle={webStyle}
                autoClear={false}
            />
            <View style={styles.actionContainer}>
                <Button title={t("action.go_back")} onPress={() => navigation.goBack()} style={styles.actionStyle} />
                <Button title={t("action.clear")} onPress={handleClear} style={styles.actionStyle} />
                <Button title={t("action.save")} onPress={handleSave} style={styles.actionStyle} />
            </View>
        </View>
    )
}

export default SignatureScreen