import { FlatList, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './StatusScreen.styles'
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import JobCard from 'common/components/jobCard';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from 'common/helperFunctions';
import { Metrics } from 'theme/metrics';
import ItemCard from 'common/components/itemCard';
import Container from 'common/components/container';
import { Formik } from 'formik';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import ReasonModal from 'common/components/ReasonModal';
import { useTranslation } from 'react-i18next';
import { requestBackgroundPermission, requestForegroundPermissions } from 'common/components/PermissionServices';
import { startBackgroundJob, stopBackgroundJob } from 'common/components/FetchingLocation';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type Props = {
    navigation: AppNavigationProp<'StatusScreen'>;
};

const StatusScreen: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();
    const noteRef = useRef<TextInput>(null);
    const requestDetails = useSelector((state: RootState) => state.home.request);
    const [showReason, setShowReason] = useState(false);
    const [startTracking, setStartTracking] = useState(false);
    const initialValues = {
        temperatureReading: '',
        note: '',
    };
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
    const toggleBackground = async () => {
        try {
            if (!startTracking) {
                await startBackgroundJob();
                setStartTracking(true);
            } else {
                await stopBackgroundJob();
                setStartTracking(false);
            }
        } catch (error: any) {
            console.log('Toggle error:', error);
        }
    };

    const handleDeliver = () => {
        navigation.navigate("ProofOfDelivery")
    }
    return (
        <View style={styles.container}>
            <Header title={t("route.status")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                <Container>
                    <JobCard item={requestDetails} />
                    <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
                        <CustomText style={styles.innerLabel}>{t("proof.all_item_details")}</CustomText>
                        <ChevronRight color={theme.black1} size={Metrics._20} />
                    </TouchableOpacity>
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
                        <CustomText style={styles.detailsValue}>{requestDetails?.temperature_requirement || 'N/A'}</CustomText>
                    </View>
                    <View style={styles.detailsItemView}>
                        <CustomText style={styles.detailsLabel}>{t("request.vehicle_requirements")}</CustomText>
                        <CustomText style={styles.detailsValue}>{requestDetails?.vehicle_requirements || 'N/A'}</CustomText>
                    </View>
                    <View style={styles.detailsItemView}>
                        <CustomText style={styles.detailsLabel}>{t("request.number_of_bags")}</CustomText>
                        <CustomText style={styles.detailsValue}>{requestDetails?.container_count}</CustomText>
                    </View>
                    <CustomText style={styles.title3}>{t("route.fill_in_the_details")}</CustomText>
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={}
                        onSubmit={handleDeliver}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <Input
                                    label={t("route.temperature_reading")}
                                    onChangeText={handleChange('temperatureReading')}
                                    value={values.temperatureReading}
                                    autoCapitalize="none"
                                    error={touched.temperatureReading ? errors.temperatureReading : undefined}
                                    returnKeyType="next"
                                    onSubmitEditing={() => noteRef?.current?.focus()}
                                    submitBehavior={'submit'}
                                />
                                <Input
                                    ref={noteRef}
                                    label={t("proof.add_note")}
                                    onChangeText={handleChange('note')}
                                    value={values.note}
                                    autoCapitalize="none"
                                    returnKeyType="done"
                                    multiline
                                    numberOfLines={5}
                                    onSubmitEditing={() => handleSubmit()}
                                />
                                <Button title={t("action.deliver")} onPress={handleSubmit} />
                                <Button title={t("action.not_deliver")} onPress={() => setShowReason(true)} variant='outline' />
                                <Button title={startTracking ? "Stop fetching location" : "Get background location"} onPress={() => toggleBackground()} variant='outline' />
                            </>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
            {showReason &&
                <ReasonModal
                    show={showReason}
                    onClose={() => {
                        setShowReason(false);
                    }}
                    onSuccess={() => setShowReason(false)}
                />
            }
        </View>
    )
}

export default StatusScreen