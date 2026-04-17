import React, { useState } from 'react';
import { Image, Keyboard, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BadgeCheck, Camera, ChevronRight, CircleX, Scan } from 'lucide-react-native';
import CustomText from 'common/components/text';
import useStyles from './ProofOfPickup.styles';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Container from 'common/components/container';
import ChooseImageOptions from 'common/components/chooseImageOptions';
import { ImageFile, ItemErrors, ItemProof, PickupProps } from 'utils/constant';
import { handleOpenCamera, handleOpenGallery } from 'common/components/MediaOptions';
import { SignatureIcon } from 'assets/svg';
import { RootState } from 'redux/store';
import Toast from 'react-native-simple-toast';
import Loader from 'common/components/loader';
import { proofOfPickupAPI } from 'api/requests/requestsAPI';
import { useCurrentLocation } from 'common/components/useCurrentLocation';

type Props = {
  navigation: AppNavigationProp<'ProofOfPickup'>;
};

const ProofOfPickup: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const { getCurrentLocation } = useCurrentLocation();
  const [loader, setLoader] = useState(false);
  const requestDetails = useSelector((state: RootState) => state.home.request);
  const deliveryItems = requestDetails?.items || [];

  const [itemsProof, setItemsProof] = useState<Record<number, ItemProof>>(() => {
    return deliveryItems.reduce((acc, item) => {
      acc[item.id] = {
        sealImage: null,
        barcodeValue: "",
        signatureValue: "",
        note: "",
        errors: {}
      };
      return acc;
    }, {} as Record<number, ItemProof>);
  });

  const [showPicker, setShowPicker] = useState<{ show: boolean, activeId: number | null }>({
    show: false,
    activeId: null
  });

  const updateItemState = (id: number, updates: Partial<Omit<ItemProof, 'errors'>> & { errors?: ItemErrors }) => {
    setItemsProof(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const handleMediaSelection = (type: 'camera' | 'gallery') => {
    const id = showPicker.activeId;
    if (id === null) return;

    const callback = (file: ImageFile) => {
      updateItemState(id, {
        sealImage: file,
        errors: { ...itemsProof[id].errors, image: undefined }
      });
      setShowPicker({ show: false, activeId: null });
    };

    const onCancel = () => setShowPicker({ show: false, activeId: null });

    type === 'camera' ? handleOpenCamera(callback, onCancel) : handleOpenGallery(callback, onCancel);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    let hasError = false;
    const newProofs = { ...itemsProof };

    deliveryItems.forEach((item) => {
      const proof = newProofs[item.id];
      const errors: ItemErrors = {};

      if (!proof.sealImage) errors.image = "Required*";
      if (!proof.barcodeValue) errors.barcode = "Required*";
      if (!proof.signatureValue) errors.signature = "Required*";

      if (Object.keys(errors).length > 0) {
        newProofs[item.id] = { ...proof, errors };
        hasError = true;
      }
    });

    if (hasError) {
      setItemsProof(newProofs);
      return;
    }
    try {
      setLoader(true);
      const location = await getCurrentLocation();
      const payload: PickupProps = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        items: deliveryItems.map((item) => {
          const proof = itemsProof[item.id];

          return {
            item_id: item.id,
            barcode: proof.barcodeValue,
            recipient_name: "driver",
            signature_image: "string",
            photo_proof: proof.sealImage?.uri,
            notes: proof.note,
            scanned_at: new Date().toISOString(),
          };
        }),
      };
      const response = await proofOfPickupAPI(requestDetails?.id, payload);
      // console.log(response)
      if (response?.success) {
        const resetItems = { ...itemsProof };
        Object.keys(resetItems).forEach((key) => {
          const id = Number(key);
          resetItems[id] = {
            sealImage: null,
            barcodeValue: "",
            signatureValue: "",
            note: "",
            errors: {},
          };
        });
        setItemsProof(resetItems);
        Toast.showWithGravity(response?.message || "Pickup confirmed successfully", Toast.LONG, Toast.BOTTOM);
        navigation.navigate("RouteScreen");
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <Header title={t("proof.title1")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        <Container>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.itemDetailsView}
            onPress={() => navigation.navigate("ItemDetailsScreen")}
          >
            <CustomText style={styles.innerLabel}>{t("proof.all_item_details")}</CustomText>
            <ChevronRight color={theme.black1} size={Metrics._20} />
          </TouchableOpacity>

          <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>

          {deliveryItems.map((item, index) => {
            const proof = itemsProof[item.id];
            if (!proof) return null;
            return (
              <View key={item.id} style={styles.itemContainer}>
                <CustomText style={styles.itemTxt}>{t("request.item")} {index + 1}</CustomText>
                <View style={styles.rowBox}>
                  <CustomText style={styles.itemTitle}>{item.specimen_type}</CustomText>
                  <TouchableOpacity activeOpacity={1} style={styles.detailBox}>
                    <CustomText style={styles.detailText}>{t("home.view_more")}</CustomText>
                    <ChevronRight color={theme.black1} size={Metrics._16} />
                  </TouchableOpacity>
                </View>

                {!proof.sealImage ? (
                  <>
                    <TouchableOpacity activeOpacity={0.8} style={styles.proofAction} onPress={() => setShowPicker({ show: true, activeId: item.id })}>
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
                  activeOpacity={0.8}
                  style={styles.proofAction}
                  onPress={() => navigation.navigate('BarcodeScan', {
                    onScanSuccess: (val: string) => updateItemState(item.id, { barcodeValue: val, errors: { ...proof.errors, barcode: undefined } })
                  })}
                >
                  <CustomText style={styles.actionLabel}>
                    {proof.barcodeValue ? t("proof.barcode_scanned") : t("proof.barcode_scan")}
                  </CustomText>
                  {proof.barcodeValue ? <BadgeCheck color={theme.grey6} size={Metrics._20} /> : <Scan color={theme.grey6} size={Metrics._20} />}
                </TouchableOpacity>
                {proof.errors.barcode && <CustomText style={styles.error}>{proof.errors.barcode}</CustomText>}

                {!proof.signatureValue ? (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.proofAction}
                      onPress={() => navigation.navigate("SignatureScreen", {
                        onSignSuccess: (val: string) => updateItemState(item.id, { signatureValue: val, errors: { ...proof.errors, signature: undefined } })
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
            );
          })}
          <Button title={t("action.submit")} onPress={handleSubmit} style={styles.btnStyle} />
        </Container>
      </ScrollView>

      {showPicker.show && (
        <ChooseImageOptions
          show={showPicker.show}
          onClose={() => setShowPicker({ show: false, activeId: null })}
          onCamera={() => handleMediaSelection('camera')}
          onImages={() => handleMediaSelection('gallery')}
          hideDelete
        />
      )}
    </View>
  );
};

export default ProofOfPickup;