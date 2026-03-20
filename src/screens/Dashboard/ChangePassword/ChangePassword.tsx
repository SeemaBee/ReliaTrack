import { TextInput, View } from 'react-native'
import React, { useRef } from 'react'
import useStyles from './ChangePassword.styles'
import { useTranslation } from 'react-i18next'
import Header from 'common/components/header'
import { AppNavigationProp } from 'common/types/navigationTypes'
import { Formik } from 'formik'
import Container from 'common/components/container'
import { Input } from 'common/components/input'
import Button from 'common/components/button'

type Props = {
    navigation: AppNavigationProp<'ChangePassword'>;
}

const ChangePassword: React.FC<Props> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const newPassRef = useRef<TextInput>(null);
    const confirmPassRef = useRef<TextInput>(null);
    return (
        <View style={styles.container}>
            <Header title={t("auth.change_password")} onBackPress={() => navigation.goBack()} style={styles.headerStyle} />
            <Formik
                initialValues={{ current_password: '', new_password: '', confirm_password: '' }}
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
                            label={t("auth.confirm_password")}
                            placeholder={t("auth.confirm_password_placeholder")}
                            value={values.confirm_password}
                            error={
                                touched.confirm_password && errors.confirm_password
                                    ? errors.confirm_password
                                    : undefined
                            }
                            secureTextEntry={true}
                            onChangeText={handleChange('confirm_password')}
                            submitBehavior="submit"
                        />
                        <Button onPress={() => handleSubmit()} title={t("action.submit")} />
                    </Container>
                )}

            </Formik>
        </View>
    )
}

export default ChangePassword