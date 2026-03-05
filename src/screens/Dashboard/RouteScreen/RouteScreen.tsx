import { ScrollView, TextInput, View } from 'react-native'
import React, { useRef } from 'react'
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

type Props = {
    navigation: AppNavigationProp<'RouteScreen'>;
};

const RouteScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const noteRef = useRef<TextInput>(null);
    const initialValues = {
        temperatureReading: '',
        note: '',
    };
    const handleRoute = () => {

    }
    return (
        <View style={styles.container}>
            <Header title="Start Route" onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobCard data={{}} />
                <CustomText style={styles.title2}>Delivery Items</CustomText>
                <ItemCard show selected={true} />
                <ItemCard show />
                <CustomText style={styles.title2}>More Details</CustomText>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Urgency Level</CustomText>
                    <CustomText style={styles.detailsValue}>ASAP</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Temperature Requirement</CustomText>
                    <CustomText style={styles.detailsValue}>Ambient</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Vehicle Requirements</CustomText>
                    <CustomText style={styles.detailsValue}>Refrigerator</CustomText>
                </View>
                <View style={styles.detailsItemView}>
                    <CustomText style={styles.detailsLabel}>Number of containers or bags </CustomText>
                    <CustomText style={styles.detailsValue}>4</CustomText>
                </View>
                <CustomText style={styles.title3}>Please Fill in the Details Below</CustomText>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={}
                        onSubmit={handleRoute}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <Input
                                    label={'Temperature Reading'}
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
                                    label={'Add note'}
                                    onChangeText={handleChange('note')}
                                    value={values.note}
                                    autoCapitalize="none"
                                    returnKeyType="done"
                                    multiline
                                    numberOfLines={5}
                                    onSubmitEditing={() => handleSubmit()}
                                />
                                <Button title='Start Route' onPress={handleSubmit} variant='outline' />
                            </>
                        )}

                    </Formik>
                </Container>
            </ScrollView>
        </View>
    )
}

export default RouteScreen