import { useTheme } from "common/helperFunctions";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { LightTheme } from "theme/colors";
import { Metrics } from "theme/metrics";
import CustomText from "./text";
import { X } from "lucide-react-native";
import { FontFamily, FontSizes } from "theme/typography";
import { Input } from "./input";
import Button from "./button";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ReasonModal = ({ show, onClose, onSuccess }: Props) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = getStyles(theme);
    
    return (
        <ReactNativeModal
            isVisible={show}
            hasBackdrop={true}
            onBackdropPress={() => onClose()}
            onBackButtonPress={() => onClose()}
            style={styles.modalStyle}
        >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.row}>
                        <CustomText style={styles.title}>
                            {t("route.reason")}
                        </CustomText>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onClose()}>
                            <X />
                        </TouchableOpacity>
                    </View>
                    <Input
                        label={t("route.provide_reason")}
                        multiline
                        numberOfLines={5}
                    />
                    <Button title={t("action.submit")} onPress={() => onSuccess()} />
                </View>
            </View>
        </ReactNativeModal>
    )
}

const getStyles = (theme: typeof LightTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalStyle: {
            margin: 0
        },
        subContainer: {
            width: '90%',
            padding: Metrics._20,
            backgroundColor: theme.white,
            borderRadius: Metrics._12,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: Metrics._10,
        },
        title: {
            fontSize: FontSizes._18,
            fontFamily: FontFamily.interTightMedium,
        },
    })

export default ReasonModal