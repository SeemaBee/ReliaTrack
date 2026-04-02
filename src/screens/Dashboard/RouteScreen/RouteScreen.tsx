import { FlatList, Keyboard, ScrollView, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomText from 'common/components/text'
import useStyles from './RouteScreen.styles';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Header from 'common/components/header';
import JobCard from 'common/components/jobCard';
import ItemCard from 'common/components/itemCard';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Container from 'common/components/container';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

type Props = {
    navigation: AppNavigationProp<'RouteScreen'>;
};

const RouteScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const noteRef = useRef<TextInput>(null);
    const requestDetails = useSelector((state: RootState) => state.home.request);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const initialValues = {
        temperatureReading: '',
        note: '',
    };

    const handleRoute = () => {
        Keyboard.dismiss();
        navigation.navigate('StatusScreen');
    }
    const toggleItem = (id: number) => {
        setSelectedItems(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }
    return (
        <View style={styles.container}>
            <Header title={t("route.start_route")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
                <Container>
                    <JobCard item={requestDetails} />
                    <CustomText style={styles.title2}>{t("request.delivery_items")}</CustomText>
                    <FlatList
                        data={requestDetails?.items}
                        renderItem={({ item, index: i }) => (
                            <ItemCard
                                item={item}
                                index={i}
                                show
                                selected={selectedItems.includes(item.id)}
                                onPress={() => toggleItem(item.id)}
                            />
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
                        onSubmit={handleRoute}
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
                                <Button title={t("route.start_route")} onPress={handleSubmit} />
                            </>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
        </View>
    )
}

export default RouteScreen