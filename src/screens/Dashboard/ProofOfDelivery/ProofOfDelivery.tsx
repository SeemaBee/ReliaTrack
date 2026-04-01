import { Image, Keyboard, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from 'common/components/text'
import { AppNavigationProp } from 'common/types/navigationTypes';
import useStyles from './ProofOfDelivery.styles';
import Header from 'common/components/header';
import Container from 'common/components/container';
import { Metrics } from 'theme/metrics';
import { useTheme } from 'common/helperFunctions';
import { BadgeCheck, Camera, ChevronRight, CircleX, Scan } from 'lucide-react-native';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { SignatureIcon } from 'assets/svg';
import { useTranslation } from 'react-i18next';
import { ImageFile } from 'utils/constant';
import ChooseImageOptions from 'common/components/chooseImageOptions';
import { handleOpenCamera, handleOpenGallery } from 'common/components/MediaOptions';

type Props = {
    navigation: AppNavigationProp<'ProofOfDelivery'>;
};

interface ItemProof {
    sealImage: ImageFile | null;
    barcodeValue: string;
    signatureValue: string;
    note: string;
    errors: {
        image?: string;
        barcode?: string;
        signature?: string;
    }
}

const ProofOfDelivery: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();
    const deliveryItems = [
        { id: 0, itemName: "Blood" },
        { id: 1, itemName: "Tissue" },
        { id: 2, itemName: "Insulin" },
    ];
    const [itemsProof, setItemsProof] = useState<Record<number, ItemProof>>(
        deliveryItems.reduce((acc, item) => ({
            ...acc,
            [item.id]: { sealImage: null, barcodeValue: "", signatureValue: "", note: "", errors: {} }
        }), {})
    );
    const [showPicker, setShowPicker] = useState<{ show: boolean, activeId: number | null }>({
        show: false,
        activeId: null
    });
    const updateItemState = (id: number, updates: Partial<ItemProof>) => {
        setItemsProof(prev => ({
            ...prev,
            [id]: { ...prev[id], ...updates }
        }));
    };

    const openCamera = () => {
        const id = showPicker.activeId;
        if (id === null) return;
        handleOpenCamera((file) => {
            updateItemState(id, { sealImage: file, errors: { ...itemsProof[id].errors, image: "" } });
            setShowPicker({ show: false, activeId: null });
        }, () => setShowPicker({ show: false, activeId: null }));
    };

    const openGallery = () => {
        const id = showPicker.activeId;
        if (id === null) return;
        handleOpenGallery((file) => {
            updateItemState(id, { sealImage: file, errors: { ...itemsProof[id].errors, image: "" } });
            setShowPicker({ show: false, activeId: null });
        }, () => setShowPicker({ show: false, activeId: null }));
    };

    const handleSubmit = () => {
        Keyboard.dismiss();
        let hasError = false;
        const newProofs = { ...itemsProof };

        deliveryItems.forEach((item) => {
            const proof = newProofs[item.id];
            const errors: any = {};
            if (!proof.sealImage) errors.image = "Required*";
            if (!proof.barcodeValue) errors.barcode = "Required*";
            if (!proof.signatureValue) errors.signature = "Required*";

            if (Object.keys(errors).length > 0) {
                newProofs[item.id].errors = errors;
                hasError = true;
            }
        });

        if (hasError) {
            setItemsProof(newProofs);
            return;
        }
        navigation.navigate("RouteScreen");
    }

    return (
        <View style={styles.container}>
            <Header title={t("proof.title2")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                <Container>
                    <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
                        <CustomText style={styles.innerLabel}>{t("proof.all_item_details")}</CustomText>
                        <ChevronRight color={theme.black1} size={Metrics._20} />
                    </TouchableOpacity>
                    <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
                    {deliveryItems.map((item, index) => {
                        const proof = itemsProof[item.id];
                        return (
                            <View key={item.id} style={styles.itemContainer}>
                                <CustomText style={styles.itemTxt}>{t("request.item")} {index + 1}</CustomText>
                                <View style={styles.rowBox}>
                                    <CustomText style={styles.itemTitle}>{item.itemName}</CustomText>
                                    <TouchableOpacity activeOpacity={1} style={styles.detailBox}>
                                        <CustomText style={styles.detailText}>
                                            {t("home.view_more")}{' '}
                                        </CustomText>
                                        <ChevronRight color={theme.black1} size={Metrics._16} />
                                    </TouchableOpacity>
                                </View>
                                {!proof.sealImage ? (
                                    <>
                                        <TouchableOpacity style={styles.proofAction} onPress={() => setShowPicker({ show: true, activeId: item.id })}>
                                            <CustomText style={styles.actionLabel}>{t("proof.photo_of_seal")}</CustomText>
                                            <Camera color={theme.grey6} size={Metrics._20} />
                                        </TouchableOpacity>
                                        {proof.errors.image && <CustomText style={styles.error}>{proof.errors.image}</CustomText>}
                                    </>
                                ) : (
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: proof.sealImage.uri }} style={styles.sealPhotoStyle} />
                                        <TouchableOpacity style={styles.crossContainer} onPress={() => updateItemState(item.id, { sealImage: null })}>
                                            <CircleX color={theme.grey6} size={Metrics._24} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <TouchableOpacity
                                    style={styles.proofAction}
                                    onPress={() => navigation.navigate('BarcodeScan', {
                                        onScanSuccess: (val: string) => updateItemState(item.id, { barcodeValue: val, errors: { ...proof.errors, barcode: "" } })
                                    })}
                                >
                                    <CustomText style={styles.actionLabel}>{proof.barcodeValue ? "Barcode Scanned" : t("proof.barcode_scan")}</CustomText>
                                    {proof.barcodeValue ? <BadgeCheck color={theme.grey6} size={Metrics._20} /> : <Scan color={theme.grey6} size={Metrics._20} />}
                                </TouchableOpacity>
                                {proof.errors.barcode && <CustomText style={styles.error}>{proof.errors.barcode}</CustomText>}
                                {!proof.signatureValue ? (
                                    <>
                                        <TouchableOpacity
                                            style={styles.proofAction}
                                            onPress={() => navigation.navigate("SignatureScreen", {
                                                onSignSuccess: (val: string) => updateItemState(item.id, { signatureValue: val, errors: { ...proof.errors, signature: "" } })
                                            })}
                                        >
                                            <CustomText style={styles.actionLabel}>{t("proof.recipient_signature")}</CustomText>
                                            <SignatureIcon />
                                        </TouchableOpacity>
                                        {proof.errors.signature && <CustomText style={styles.error}>{proof.errors.signature}</CustomText>}
                                    </>
                                ) : (
                                    <View style={styles.signContainer}>
                                        <Image source={{ uri: proof.signatureValue }} style={styles.sealPhotoStyle} />
                                        <TouchableOpacity style={styles.crossContainer} onPress={() => updateItemState(item.id, { signatureValue: "" })}>
                                            <CircleX color={theme.grey6} size={Metrics._24} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <Input
                                    label={t("proof.add_note")}
                                    onChangeText={(v) => updateItemState(item.id, { note: v })}
                                    value={proof.note}
                                    multiline
                                    outerStyle={styles.noteContainer}
                                    numberOfLines={3}
                                />

                            </View>
                        )
                    })}
                    <Button title={t("action.submit")} onPress={() => handleSubmit()} style={styles.btnStyle} />
                </Container>
            </ScrollView>
            {showPicker.show && (
                <ChooseImageOptions
                    show={showPicker.show}
                    onClose={() => setShowPicker({ show: false, activeId: null })}
                    onCamera={openCamera}
                    onImages={openGallery}
                    hideDelete={true}
                />
            )}
        </View>
    )
}

export default ProofOfDelivery