import { useTheme } from "common/helperFunctions";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { LightTheme } from "theme/colors";
import { Metrics } from "theme/metrics";
import CustomText from "./text";
import { Check } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ItemsData } from "redux/features/dashboardSlice";

interface Props {
    onPress?: () => void;
    show?: boolean;
    item: ItemsData;
    index: number;
    selected?: boolean;
}

const ItemCard: React.FC<Props> = ({ onPress, show, item, index, selected }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = getStyles(theme);
    return (
        <View key={index} style={styles.container}>
            <View style={styles.row}>
                <View style={styles.itemBox}>
                    <CustomText style={styles.itemText}>{t("request.item")} {index + 1}</CustomText>
                </View>
                {show && <TouchableOpacity activeOpacity={1} style={[styles.checkBoxContainer, selected && styles.selectionStyle]} onPress={onPress}>
                    {selected && <Check size={Metrics._20} color={theme.white} />}
                </TouchableOpacity>}
            </View>
            <View style={styles.rowBox}>
                <CustomText style={styles.labelTxt}>{t("request.name")}</CustomText>
                <CustomText style={styles.labelValue}>{item?.specimen_type}</CustomText>
            </View>
            <View style={styles.rowBox}>
                <CustomText style={styles.labelTxt}>{t("request.specimen_type")}</CustomText>
                <CustomText style={styles.labelValue}>{item?.specimen_type}</CustomText>
            </View>
            <View style={styles.rowBox}>
                <CustomText style={styles.labelTxt}>{t("request.accession")}</CustomText>
                <CustomText style={styles.labelValue}>{item?.barcode}</CustomText>
            </View>
            <View style={styles.horizontalLine} />
            <CustomText style={styles.labelTxt}>{t("request.drop_off")}</CustomText>
            <CustomText style={styles.dropOffTxt}>1901 Thornridge Cir. Shiloh, Hawaii 81063..</CustomText>
        </View>
    )
}

const getStyles = (theme: typeof LightTheme) =>
    StyleSheet.create({
        container: {
            width: '100%',
            padding: Metrics._16,
            borderWidth: Metrics._1,
            borderColor: theme.border8,
            marginBottom: Metrics._20,
            borderRadius: Metrics._10,
            alignItems: 'flex-start',
        },
        itemBox: {
            paddingHorizontal: Metrics._12,
            paddingVertical: Metrics._6,
            backgroundColor: theme.lightSkyBlue,
            borderWidth: Metrics._1,
            borderColor: theme.border9,
            borderRadius: Metrics._8,
        },
        itemText: {
            fontSize: Metrics._16,
            color: theme.primary,
        },
        labelValue: {
            width: '50%',
            textAlign: 'right'
        },
        rowBox: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Metrics._6
        },
        labelTxt: {
            color: theme.black2,
        },
        horizontalLine: {
            width: "100%",
            height: Metrics._1,
            backgroundColor: theme.border2,
            marginVertical: Metrics._8
        },
        dropOffTxt: {
            marginTop: Metrics._4
        },
        checkBoxContainer: {
            height: Metrics._22,
            width: Metrics._22,
            borderWidth: Metrics._1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Metrics._4,
            borderColor: theme.border11
        },
        selectionStyle: {
            backgroundColor: theme.primary
        },
        row: {
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Metrics._10,
            justifyContent: 'space-between',
        }
    })

export default ItemCard;
