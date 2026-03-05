import React, { useCallback, useEffect, useRef } from 'react'
import useStyles from './Signature.styles'
import Orientation from 'react-native-orientation-locker';
import CustomText from 'common/components/text';
import { Alert, TouchableOpacity, View } from 'react-native';
import SignatureCanvas, { SignatureViewRef } from 'react-native-signature-canvas';
import Button from 'common/components/button';
import { AppNavigationProp } from 'common/types/navigationTypes';
import { MoveLeft } from 'lucide-react-native';
import { Metrics } from 'theme/metrics';
import { useTheme } from 'common/helperFunctions';

interface SignatureProps {
    navigation: AppNavigationProp<'SignatureScreen'>;
}

const SignatureScreen: React.FC<SignatureProps> = ({ navigation }) => {
    const theme = useTheme();
    const styles = useStyles();
    const signatureRef = useRef<SignatureViewRef>(null);

    useEffect(() => {
        Orientation.lockToLandscape();
        return () => Orientation.lockToPortrait();
    }, []);

    const handleSignature = useCallback((signature: string) => {
        Alert.alert("Signature Captured", signature.substring(0, 50) + "...");
        console.log(signature);
        navigation.goBack();
    }, [navigation]);

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
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.closeContainer} onPress={() => navigation.goBack()}>
                    <MoveLeft size={Metrics._24} color={theme.background} />
                </TouchableOpacity>
                <CustomText style={styles.title}>
                    Please Sign below
                </CustomText>
            </View>
            <View style={styles.signatureContainer}>
                <SignatureCanvas
                    ref={signatureRef}
                    onOK={handleSignature}
                    onEmpty={() => Alert.alert("Empty", "Please provide a signature first.")}
                    descriptionText="Sign Here"
                    webStyle={webStyle}
                    autoClear={false}
                />
            </View>
            <View style={styles.actionContainer}>
                <Button title='Clear' onPress={handleClear} style={styles.actionStyle} />
                <Button title='Save' onPress={handleSave} style={styles.actionStyle} />
            </View>
        </View>
    )
}

export default SignatureScreen