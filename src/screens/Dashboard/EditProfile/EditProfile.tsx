import { Keyboard, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useStyles from './EditProfile.styles'
import Header from 'common/components/header'
import { useTranslation } from 'react-i18next'
import { AppNavigationProp } from 'common/types/navigationTypes'
import { Formik, FormikProps } from 'formik'
import Container from 'common/components/container'
import { Input } from 'common/components/input'
import Button from 'common/components/button'
import DateOfBirthInput from 'common/components/dateOfBirth'
import { CalendarDays } from 'lucide-react-native'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { EditProfileSchema } from 'utils/validationSchemas'
import Loader from 'common/components/loader'
import Toast from 'react-native-simple-toast';
import { editProfileAPI } from 'api/userProfile/userProfile'
import { EditProfileProps } from 'utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { setUser } from 'redux/features/authSlice'
import { LocalDB } from 'services/database'

type Props = {
    navigation: AppNavigationProp<'EditProfile'>;
};

const EditProfile: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const driverDetails = useSelector((state: RootState) => state.auth.user);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const contactRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);
    const formikRef = useRef<FormikProps<EditProfileProps> | null>(null);

    const handleSave = async (values: EditProfileProps) => {
        Keyboard.dismiss();
        try {
            setLoader(true);
            const data = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
                dob: moment(values.dob).format("YYYY-MM-DD"),
                role: "driver"
            }
            console.log(data)
            const response = await editProfileAPI(data);
            if (response?.success) {
                dispatch(setUser(response?.data));
                await LocalDB.setItem("userData", JSON.stringify(response?.data));
                console.log(response)
                Toast.showWithGravity(response?.message || "Password changed successfully", Toast.LONG, Toast.BOTTOM);
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
            <Header title={t("user_profile.edit_profile")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <Formik<EditProfileProps>
                innerRef={formikRef}
                initialValues={{
                    name: driverDetails?.name,
                    email: driverDetails.email,
                    phone: driverDetails.phone,
                    address: driverDetails.address,
                    dob: driverDetails.dob,
                }}
                validationSchema={EditProfileSchema}
                onSubmit={(values) => handleSave(values)}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    setFieldTouched
                }) => (
                    <Container>
                        <Input
                            label={t("auth.full_name")}
                            placeholder={t("auth.fullName_placeholder")}
                            value={values.name}
                            error={
                                touched.name && errors.name
                                    ? errors.name
                                    : undefined
                            }
                            autoCapitalize='words'
                            onChangeText={handleChange('name')}
                            onSubmitEditing={() => contactRef.current?.focus()}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            label={t("auth.email")}
                            value={values.email}
                            error={
                                touched.email && errors.email
                                    ? errors.email
                                    : undefined
                            }
                            readOnly
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            ref={contactRef}
                            label={t("user_profile.contact_number")}
                            placeholder={t("user_profile.contact_number_placeholder")}
                            value={values.phone}
                            error={
                                touched.phone && errors.phone
                                    ? errors.phone
                                    : undefined
                            }
                            maxLength={10}
                            autoCapitalize='words'
                            onChangeText={handleChange('phone')}
                            onSubmitEditing={() => addressRef.current?.focus()}
                            keyboardType='phone-pad'
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            ref={addressRef}
                            label={t("user_profile.home_address")}
                            placeholder={t("user_profile.home_address_placeholder")}
                            value={values.address}
                            error={
                                touched.address && errors.address
                                    ? errors.address
                                    : undefined
                            }
                            autoCapitalize='words'
                            onChangeText={handleChange('address')}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <DateOfBirthInput
                            label={t('user_profile.dob')}
                            placeholder={t('user_profile.dob_placeholder')}
                            value={values.dob ? moment(values.dob).format("DD MMM YYYY") : "Select"}
                            rightIconName={CalendarDays}
                            onPress={() => setOpen(true)}
                            error={
                                touched.dob
                                    ? errors.dob
                                    : undefined
                            }
                        />
                        {open && <DatePicker
                            modal
                            open={open}
                            mode='date'
                            date={values.dob ? new Date(values.dob) : new Date()}
                            maximumDate={new Date()}
                            onConfirm={(selectedDate) => {
                                setOpen(false);
                                setFieldValue("dob", selectedDate);
                                setFieldTouched("dob", true, false);
                                setTimeout(() => {
                                    setFieldValue("dob", selectedDate, true);
                                }, 0);
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />}
                        <View style={styles.rowBox}>
                            <Button onPress={() => navigation.goBack()} title={t("action.cancel")} variant='outline' style={styles.cancelBtn} textStyle={styles.greyTxt} />
                            <Button onPress={() => handleSubmit()} title={t("action.save")} style={styles.doneBtn} />
                        </View>
                    </Container>
                )}
            </Formik>
        </View>
    )
}

export default EditProfile