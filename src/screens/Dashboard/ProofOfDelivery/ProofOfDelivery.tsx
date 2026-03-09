import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from 'common/components/text'
import { AppNavigationProp } from 'common/types/navigationTypes';
import useStyles from './ProofOfDelivery.styles';
import Header from 'common/components/header';
import Container from 'common/components/container';
import { Metrics } from 'theme/metrics';
import { useTheme } from 'common/helperFunctions';
import { Camera, ChevronRight, Scan } from 'lucide-react-native';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { SignatureIcon } from 'assets/svg';
import { useTranslation } from 'react-i18next';

type Props = {
    navigation: AppNavigationProp<'ProofOfDelivery'>;
};

const ProofOfDelivery: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();
    const [note, setNote] = useState('');
    return (
        <View style={styles.container}>
            <Header title={t("proof.title2")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
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
                    <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
                        <CustomText style={styles.actionLabel}>{t("proof.photo_of_seal")}</CustomText>
                        <Camera color={theme.grey6} size={Metrics._20} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
                        <CustomText style={styles.actionLabel}>{t("proof.barcode_scan")}</CustomText>
                        <Scan color={theme.grey6} size={Metrics._20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.deliveryProofContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.deliveryAction}>
                        <CustomText style={styles.deliveryLabel}>{t("proof.recipient_signature")}</CustomText>
                        <SignatureIcon />
                    </TouchableOpacity>
                    <CustomText style={styles.separatorTxt}>{t("proof.or")}</CustomText>
                    <TouchableOpacity activeOpacity={1} style={styles.deliveryAction}>
                        <CustomText style={styles.deliveryLabel}>{t("proof.drop_off_photo")}</CustomText>
                        <Camera color={theme.grey6} size={Metrics._20} />
                    </TouchableOpacity>
                </View>
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
                <Button title={t("action.submit")} onPress={() => navigation.navigate("RouteScreen")} />
            </Container>
        </View>
    )
}

export default ProofOfDelivery