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

type Props = {
    navigation: AppNavigationProp<'ProofOfDelivery'>;
};

const ProofOfDelivery: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const styles = useStyles();
    const [note, setNote] = useState('');
    return (
        <View style={styles.container}>
            <Header title="Required Proof of Delivery" onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <Container>
                <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
                    <CustomText style={styles.innerLabel}>All Item Details</CustomText>
                    <ChevronRight color={theme.black1} size={Metrics._20} />
                </TouchableOpacity>
                <CustomText style={styles.title2}>Delivery Items</CustomText>
                <CustomText style={styles.itemTxt}>Item 1</CustomText>
                <View style={styles.rowBox}>
                    <CustomText style={styles.itemTitle}>Blood</CustomText>
                    <TouchableOpacity activeOpacity={1} style={styles.detailBox}>
                        <CustomText style={styles.detailText}>
                            View More Detail{' '}
                        </CustomText>
                        <ChevronRight color={theme.black1} size={Metrics._16} />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
                        <CustomText style={styles.actionLabel}>Photo of Seal</CustomText>
                        <Camera color={theme.grey6} size={Metrics._20} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.proofAction}>
                        <CustomText style={styles.actionLabel}>Barcode Scan</CustomText>
                        <Scan color={theme.grey6} size={Metrics._20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.deliveryProofContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.deliveryAction}>
                    <CustomText style={styles.deliveryLabel}>Recipient Signature</CustomText>
                    <SignatureIcon />
                </TouchableOpacity>
                <CustomText style={styles.separatorTxt}>Or</CustomText>
                <TouchableOpacity activeOpacity={1} style={styles.deliveryAction}>
                    <CustomText style={styles.deliveryLabel}>Drop Off Photo</CustomText>
                    <Camera color={theme.grey6} size={Metrics._20} />
                </TouchableOpacity>
                </View>
                <Input
                    label={'Add note'}
                    onChangeText={(v) => setNote(v)}
                    value={note}
                    autoCapitalize="none"
                    returnKeyType="done"
                    multiline
                    numberOfLines={5}
                />
                <View style={styles.flx} />
                <Button title='Submit' onPress={() => navigation.navigate("RouteScreen")} />
            </Container>
        </View>
    )
}

export default ProofOfDelivery