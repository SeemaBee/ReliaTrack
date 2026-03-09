import { ScrollView, View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import useStyles from './PickupConfirmation.styles'
import Header from 'common/components/header'
import { AppNavigationProp } from 'common/types/navigationTypes'
import JobCard from 'common/components/jobCard'
import ItemCard from 'common/components/itemCard'
import Button from 'common/components/button'
import { useTranslation } from 'react-i18next'

type Props = {
    navigation: AppNavigationProp<'PickupConfirmation'>;
};

const PickupConfirmation: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Header title={t("request.pickup_confirmation")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard data={{}} />
                <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
                <ItemCard />
                <ItemCard />
                <CustomText style={styles.title2}>{t("request.more_details")}</CustomText>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.urgency_level")}</CustomText>
                    <CustomText style={styles.detailsValue}>ASAP</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.temperature_requirement")}</CustomText>
                    <CustomText style={styles.detailsValue}>Ambient</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.vehicle_requirements")}</CustomText>
                    <CustomText style={styles.detailsValue}>Refrigerator</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.number_of_bags")}</CustomText>
                    <CustomText style={styles.detailsValue}>4</CustomText>
                </View>
                <Button title={t("action.confirm_pickup")} onPress={() => navigation.navigate("ProofOfPickup")} />
            </ScrollView>
        </View>
    )
}

export default PickupConfirmation