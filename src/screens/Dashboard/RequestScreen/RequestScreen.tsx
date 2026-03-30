import { FlatList, ScrollView, View } from 'react-native'
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
import Toast from 'react-native-simple-toast';
import { acceptRequestAPI, deliveryDetailsAPI } from 'api/requests/requestsAPI'
import { RequestData, setRequestData } from 'redux/features/dashboardSlice'
import { useCurrentLocation } from 'common/components/useCurrentLocation'
import { requestBackgroundPermission, requestForegroundPermissions } from 'common/components/PermissionServices'
import { useDispatch } from 'react-redux'

type Props = {
    navigation: AppNavigationProp<'RequestScreen'>;
    route: AppRouteProp<'RequestScreen'>;
};

const RequestScreen: React.FC<Props> = ({ navigation, route }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { getCurrentLocation } = useCurrentLocation();
    const [loader, setLoader] = useState(false);
    const [requestDetails, setRequestDetails] = useState<RequestData | null>(null);
    const { id } = route?.params;

    useEffect(() => {
        initDelivery();
    }, []);
    const initDelivery = async () => {
        const foregroundOk = await requestForegroundPermissions();
        if (!foregroundOk) {
            return;
        }
        const backgroundOk = await requestBackgroundPermission();
        if (!backgroundOk) {
            return;
        }
    };

    const getDeliverItemDetails = useCallback(async () => {
        try {
            setLoader(true);
            const response = await deliveryDetailsAPI(id);
            // console.log(response, "======>details");
            if (response?.success) {
                setRequestDetails(response?.data);
                dispatch(setRequestData(response?.data));
            }
        } catch (error: any) {
            Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
            console.log("Error:-", error);
        } finally {
            setLoader(false);
        }
    }, [id]);

    useEffect(() => {
        getDeliverItemDetails();
    }, [getDeliverItemDetails]);

    const acceptJobRequest = async () => {
        navigation.navigate("PickupConfirmation");
        return
        try {
            setLoader(true);
            const location = await getCurrentLocation();
            if (!location) {
                Toast.showWithGravity("Location permission denied", Toast.LONG, Toast.BOTTOM);
                return;
            }
            const data = {
                latitude: location.latitude,
                longitude: location.longitude
            }
            console.log(data);
            const response = await acceptRequestAPI(id, data);
            console.log(response, "=======>AcceptRequest");
            if (response?.success) {
                navigation.navigate("PickupConfirmation");
            }
        } catch (error: any) {
            Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
            console.log("Error:-", error);
        } finally {
            setLoader(false);
        }
    }
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
                    <CustomText style={styles.detailsValue}>{requestDetails?.priority}</CustomText>
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
                <Button title={t("action.accept")} onPress={() => acceptJobRequest()} />
            </ScrollView>
        </View>
    )
}

export default RequestScreen