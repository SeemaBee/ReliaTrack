import { View } from 'react-native'
import React from 'react'
import useStyles from './EditProfile.styles'
import Header from 'common/components/header'
import { useTranslation } from 'react-i18next'
import { AppNavigationProp } from 'common/types/navigationTypes'
import { Formik } from 'formik'
import Container from 'common/components/container'
import { Input } from 'common/components/input'

type Props = {
    navigation: AppNavigationProp<'EditProfile'>;
};

const EditProfile: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Header title={t("user_profile.edit_profile")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <Formik
                initialValues={{
                    full_name: '',
                    new_password: '',
                    confirm_password: ''
                }}
                // validationSchema={ResetPasswordSchema}
                onSubmit={() => { }}
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
                            label={t("auth.full_name")}
                            placeholder={t("auth.current_password_placeholder")}
                            value={values.full_name}
                            error={
                                touched.full_name && errors.full_name
                                    ? errors.full_name
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('full_name')}
                            // onSubmitEditing={() => newPassRef.current?.focus()}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                        <Input
                            label={t("auth.email")}
                            placeholder={t("auth.current_password_placeholder")}
                            value={values.full_name}
                            error={
                                touched.full_name && errors.full_name
                                    ? errors.full_name
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('full_name')}
                            // onSubmitEditing={() => newPassRef.current?.focus()}
                            returnKeyType="next"
                            submitBehavior="submit"
                        />
                    </Container>
                )}

            </Formik>
        </View>
    )
}

export default EditProfile