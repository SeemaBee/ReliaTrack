import { Image, Keyboard, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './ProofOfPickup.styles';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import { Camera, ChevronRight, Scan } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Container from 'common/components/container';
import { useTranslation } from 'react-i18next';
import ChooseImageOptions from 'common/components/chooseImageOptions';
import { ImageFile } from 'utils/constant';
import { handleOpenCamera, handleOpenGallery } from 'common/components/MediaOptions';

type Props = {
  navigation: AppNavigationProp<'ProofOfPickup'>;
};

const ProofOfPickup: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = useStyles();
  const [show, setShow] = useState(false);
  const [sealImage, setSealImage] = useState<ImageFile | null>(null);
  const [note, setNote] = useState('');
  const [imageError, setImageError] = useState("");

  const openCamera = () => {
    handleOpenCamera(
      (file) => {
        setSealImage(file);
        setImageError("");
        setShow(false);
      },
      () => setShow(false)
    );
  }

  const openGallery = () => {
    handleOpenGallery(
      (file) => {
        setSealImage(file);
        setImageError("");
        setShow(false);
      },
      () => setShow(false)
    );
  }

  const deleteImage = () => {
    setSealImage(null);
    setShow(false);
  }

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!sealImage?.uri) {
      setImageError("Photo of seal required");
      return;
    }
    navigation.navigate("RouteScreen")
  }

  return (
    <View style={styles.container}>
      <Header title={t("proof.title1")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
      <Container>
        <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
          <CustomText style={styles.innerLabel}>{t("proof.all_item_details")}</CustomText>
          <ChevronRight color={theme.black1} size={Metrics._20} />
        </TouchableOpacity>
        <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
        <CustomText style={styles.itemTxt}>{t("request.item")} 1</CustomText>
        <View style={styles.rowBox}>
          <CustomText style={styles.itemTitle}>Blood</CustomText>
          <TouchableOpacity activeOpacity={1} style={styles.detailBox}>
            <CustomText style={styles.detailText}>
              {t("home.view_more")}{' '}
            </CustomText>
            <ChevronRight color={theme.black1} size={Metrics._16} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.proofAction} onPress={() => setShow(true)}>
            <CustomText style={styles.actionLabel}>{t("proof.photo_of_seal")}</CustomText>
            <Camera color={theme.grey6} size={Metrics._20} strokeWidth={Metrics._1} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.proofAction} onPress={() => navigation.navigate('BarcodeScan')}>
            <CustomText style={styles.actionLabel}>{t("proof.barcode_scan")}</CustomText>
            <Scan color={theme.grey6} size={Metrics._20} strokeWidth={Metrics._1} />
          </TouchableOpacity>
        </View>
        {sealImage && <Image src={sealImage?.uri} style={styles.sealPhotoStyle} />}
        {imageError !== "" && (
          <CustomText style={styles.error}>
            {imageError}
          </CustomText>
        )}
        <Input
          label={t("proof.add_note")}
          onChangeText={(v) => setNote(v)}
          value={note}
          autoCapitalize="none"
          returnKeyType="done"
          multiline
          numberOfLines={5}
        />
        <View style={styles.flx} />
        <Button title={t("action.submit")} onPress={() => handleSubmit()} />
      </Container>
      {show && <ChooseImageOptions
        show={show}
        onClose={() => setShow(false)}
        onCamera={openCamera}
        onImages={openGallery}
        onDelete={deleteImage}
        hideDelete={sealImage ? false : true}
      />}
    </View>
  )
}

export default ProofOfPickup