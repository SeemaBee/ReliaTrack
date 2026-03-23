import { Keyboard, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useStyles from './ChangePassword.styles'
import { useTranslation } from 'react-i18next'
import Header from 'common/components/header'
import { AppNavigationProp } from 'common/types/navigationTypes'
import { Formik, FormikProps } from 'formik'
import Container from 'common/components/container'
import { Input } from 'common/components/input'
import Button from 'common/components/button'
import { ChangePasswordSchema } from 'utils/validationSchemas'
import Loader from 'common/components/loader'
import Toast from 'react-native-simple-toast';
import { changePasswordAPI } from 'api/userProfile/userProfile'
import { ChangePasswordProps } from 'utils/constant'

type Props = {
    navigation: AppNavigationProp<'ChangePassword'>;
}

const ChangePassword: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const newPassRef = useRef<TextInput>(null);
    const confirmPassRef = useRef<TextInput>(null);
    const formikRef = useRef<FormikProps<ChangePasswordProps> | null>(null);

    const handleChangePassword = async (values: ChangePasswordProps) => {
        Keyboard.dismiss();
        try {
            setLoader(true);
            const data = {
                current_password: values.current_password,
                new_password: values.new_password,
                new_password_confirmation: values.new_password_confirmation
            }
            const response = await changePasswordAPI(data);
            if (response?.success) {
                Toast.showWithGravity(response?.message || "Password changed successfully", Toast.LONG, Toast.BOTTOM);
                navigation.goBack();
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
            <Header title={t("auth.change_password")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <Formik<ChangePasswordProps>
                innerRef={formikRef}
                initialValues={{ current_password: '', new_password: '', new_password_confirmation: '' }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => handleChangePassword(values)}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleSubmit,
                    handleChange,
                }) => (
                    <Container>
                        <Input
                            label={t("auth.current_password")}
                            placeholder={t("auth.current_password_placeholder")}
                            value={values.current_password}
                            error={
                                touched.current_password && errors.current_password
                                    ? errors.current_password
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('current_password')}
                            onSubmitEditing={() => newPassRef.current?.focus()}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            ref={newPassRef}
                            label={t("auth.new_password")}
                            placeholder={t("auth.new_password_placeholder")}
                            value={values.new_password}
                            error={
                                touched.new_password && errors.new_password
                                    ? errors.new_password
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('new_password')}
                            onSubmitEditing={() => confirmPassRef.current?.focus()}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            ref={confirmPassRef}
                            label={t("auth.confirm_new_password")}
                            placeholder={t("auth.confirm_new_password_placeholder")}
                            value={values.new_password_confirmation}
                            error={
                                touched.new_password_confirmation && errors.new_password_confirmation
                                    ? errors.new_password_confirmation
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('new_password_confirmation')}
                            returnKeyType='done'
                        />
                        <View style={styles.rowBox}>
                            <Button onPress={() => navigation.goBack()} title={t("action.cancel")} variant='outline' style={styles.cancelBtn} textStyle={styles.greyTxt} />
                            <Button onPress={() => handleSubmit()} title={t("action.done")} style={styles.doneBtn} />
                        </View>
                    </Container>
                )}
            </Formik>
        </View>
    )
}

export default ChangePassword