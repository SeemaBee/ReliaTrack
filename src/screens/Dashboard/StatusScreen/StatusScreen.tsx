import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
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

type Props = {
    navigation: AppNavigationProp<'StatusScreen'>;
};

const StatusScreen: React.FC<Props> = ({ navigation }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const styles = useStyles();
    const noteRef = useRef<TextInput>(null);
    const [showReason, setShowReason] = useState(false);
    const initialValues = {
        temperatureReading: '',
        note: '',
    };
    const handleDeliver = () => {
        navigation.navigate("ProofOfDelivery")
    }
    return (
        <View style={styles.container}>
            <Header title={t("route.status")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                <JobCard data={{}} />
                <TouchableOpacity activeOpacity={1} style={styles.itemDetailsView} onPress={() => navigation.navigate("ItemDetailsScreen")}>
                    <CustomText style={styles.innerLabel}>{t("proof.all_item_details")}</CustomText>
                    <ChevronRight color={theme.black1} size={Metrics._20} />
                </TouchableOpacity>
                <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
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
                <CustomText style={styles.title3}>{t("route.fill_in_the_details")}</CustomText>
                <Container>
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
                            </>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
            {
                showReason &&
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