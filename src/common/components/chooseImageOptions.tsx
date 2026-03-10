import { useTheme } from "common/helperFunctions";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal"
import { LightTheme } from "theme/colors";
import { Metrics } from "theme/metrics";
import CustomText from "./text";
import { Camera, CircleX, Images, Trash2 } from "lucide-react-native";
import { FontFamily, FontSizes } from "theme/typography";

type Props = {
    label?: string;
    show: boolean;
    hideDelete?: boolean;
    onClose: () => void;
    onImages: () => void;
    onCamera: () => void;
    onDelete?: () => void;
}

const ChooseImageOptions = ({ label = 'Upload via', show, hideDelete, onClose, onCamera, onImages, onDelete }: Props) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    return (
        <ReactNativeModal
            isVisible={show}
            style={styles.modalStyle}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
        >
            <View style={styles.container}>
                <CustomText style={styles.label}>{label}</CustomText>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <CircleX size={Metrics._30} />
                </TouchableOpacity>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.rowBox} onPress={onCamera}>
                        <CustomText style={styles.actionTxt}>Take Photo</CustomText>
                        <Camera color={theme.white} size={Metrics._22} />
                    </TouchableOpacity>
                    <View style={styles.horizontalLine} />
                    <TouchableOpacity activeOpacity={0.8} style={styles.rowBox} onPress={onImages}>
                        <CustomText style={styles.actionTxt}>Choose Photo</CustomText>
                        <Images color={theme.white} size={Metrics._22} />
                    </TouchableOpacity>
                </View>
                {!hideDelete && <View style={styles.deleteContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.rowBox} onPress={onDelete}>
                        <CustomText style={styles.actionTxt}>Delete Photo</CustomText>
                        <Trash2 color={theme.white} size={Metrics._22} />
                    </TouchableOpacity>
                </View>}
            </View>
        </ReactNativeModal>
    )
}

export default ChooseImageOptions

const getStyles = (theme: typeof LightTheme) =>
    StyleSheet.create({
        modalStyle: {
            justifyContent: 'flex-end',
            margin: 0
        },
        container: {
            width: "100%",
            backgroundColor: theme.white,
            padding: Metrics._20,
            borderTopLeftRadius: Metrics._20,
            borderTopRightRadius: Metrics._20,
        },
        label: {
            fontSize: FontSizes._20,
            textAlign: 'center',
            fontFamily: FontFamily.interTightSemiBold
        },
        actionTxt: {
            color: theme.white
        },
        closeButton: {
            position: 'absolute',
            top: Metrics._20,
            right: Metrics._20
        },
        optionsContainer: {
            backgroundColor: theme.primary,
            borderRadius: Metrics._10,
            marginTop: Metrics._20,
            padding: Metrics._10
        },
        rowBox: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: Metrics._4
        },
        horizontalLine: {
            height: Metrics._1,
            width: "100%",
            backgroundColor: theme.grey1,
            marginVertical: Metrics._8
        },
        deleteContainer: {
            backgroundColor: theme.primary,
            borderRadius: Metrics._10,
            marginTop: Metrics._10,
            padding: Metrics._10,
            marginBottom: Metrics._15
        },
    })