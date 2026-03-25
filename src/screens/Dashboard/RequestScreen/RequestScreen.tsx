import { ScrollView, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './RequestScreen.styles'
import Header from 'common/components/header'
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes'
import JobCard from 'common/components/jobCard'
import ItemCard from 'common/components/itemCard'
import Button from 'common/components/button'
import { useTranslation } from 'react-i18next'
import Loader from 'common/components/loader'
import { deliveryDetailsAPI } from 'api/dashboard/dashboardAPI'

type Props = {
    navigation: AppNavigationProp<'RequestScreen'>;
    route: AppRouteProp<'RequestScreen'>;
};

const RequestScreen: React.FC<Props> = ({ navigation, route }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const { id } = route?.params;

    
    const getDeliverItemDetails = useCallback(async () => {
        try {
            const response = await deliveryDetailsAPI(id);
            console.log(response, "======>details");
            if (response?.success) {
                // setActiveRequests(response?.data || []);
            }
        } catch (error: any) {
            console.log("Error:-", error);
        } finally {
            setLoader(false);
        }
    },[id]);
    
    useEffect(() => {
        // getDeliverItemDetails();
    }, []);
    return (
        <View style={styles.container}>
            {loader && <Loader isLoading={loader} />}
            <Header
                title={t("request.requests")}
                onBackPress={() => navigation.goBack()}
                style={styles.headerStyle}
                showProfile
                onEditProfile={() => navigation.navigate("EditProfile")}
                onChangePassword={() => navigation.navigate("ChangePassword")}
            />
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

                <Button title={t("action.accept")} onPress={() => navigation.navigate("PickupConfirmation")} />
            </ScrollView>
        </View>
    )
}

export default RequestScreen