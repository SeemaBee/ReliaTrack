import { FlatList, ScrollView, View } from 'react-native'
import React from 'react'
import CustomText from 'common/components/text'
import useStyles from './PickupConfirmation.styles'
import Header from 'common/components/header'
import { AppNavigationProp } from 'common/types/navigationTypes'
import JobCard from 'common/components/jobCard'
import ItemCard from 'common/components/itemCard'
import Button from 'common/components/button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

type Props = {
    navigation: AppNavigationProp<'PickupConfirmation'>;
};

const PickupConfirmation: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const requestDetails = useSelector((state: RootState) => state.home.request);
    return (
        <View style={styles.container}>
            <Header
                title={t("request.pickup_confirmation")}
                onBackPress={() => navigation.goBack()}
                style={styles.headerStyle}
                showProfile
                onNotification={() => navigation.navigate("NotificationsScreen")}
                onEditProfile={() => navigation.navigate("EditProfile")}
                onChangePassword={() => navigation.navigate("ChangePassword")}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard item={requestDetails} />
                <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
                <FlatList
                    data={requestDetails?.items}
                    renderItem={({ item, index: i }) => (
                        <ItemCard item={item} index={i} />
                    )}
                    scrollEnabled={false}
                    keyExtractor={(_, index) => index.toString()}
                />
                <CustomText style={styles.title2}>{t("request.more_details")}</CustomText>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.urgency_level")}</CustomText>
                    <CustomText style={[styles.detailsValue, styles.uppercaseTxt]}>{requestDetails?.priority}</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.temperature_requirement")}</CustomText>
                    <CustomText style={styles.detailsValue}>{requestDetails?.temperature_requirement || 'N/A'}</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.vehicle_requirements")}</CustomText>
                    <CustomText style={[styles.detailsValue, styles.capitalizeTxt]}>{requestDetails?.vehicle_requirements || 'N/A'}</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>{t("request.number_of_bags")}</CustomText>
                    <CustomText style={styles.detailsValue}>{requestDetails?.container_count}</CustomText>
                </View>
                <Button title={t("action.confirm_pickup")} onPress={() => navigation.navigate("ProofOfPickup")} />
            </ScrollView>
        </View>
    )
}

export default PickupConfirmation