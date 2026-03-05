import React from 'react'
import CustomText from 'common/components/text'
import Container from 'common/components/container'
import useStyles from './ForgotPassword.styles'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import { Input } from 'common/components/input'
import Button from 'common/components/button'
import { ForgotPasswordSchema } from 'utils/validationSchemas'
import { MoveLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { AppNavigationProp } from 'common/types/navigationTypes'

interface ForgotProps {
    navigation: AppNavigationProp<'ForgotPassword'>;
}

const ForgotPassword: React.FC<ForgotProps> = ({ navigation }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    const initialValues = {
        username: '',
    };

    const handleSignIn = () => {
        // navigation.navigate('BarcodeScan')

    };

    return (
        <Container contentStyle={styles.container}>
            <TouchableOpacity activeOpacity={1} style={styles.backBtn} onPress={() => navigation.goBack()}>
                <MoveLeft />
            </TouchableOpacity>
            <CustomText style={styles.title}>
                {t("auth.forgot_password")}
            </CustomText>
            <CustomText style={styles.tagLine}>{t("auth.forgot_tagLine")}</CustomText>
            <Formik
                initialValues={initialValues}
                validationSchema={ForgotPasswordSchema}
                onSubmit={handleSignIn}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
                        <Input
                            label={t("auth.username")}
                            placeholder={t("auth.username_placeholder")}
                            // leftIcon={<LogIn size={20} color={theme.textSecondary} />}
                            onChangeText={handleChange('username')}
                            value={values.username}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={touched.username ? errors.username : undefined}
                            returnKeyType="next"
                            // onSubmitEditing={() => passwordRef?.current?.focus()}
                            submitBehavior={'submit'}
                        />
                        <Button title={t("auth.reset")} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </Container>
    )
}

export default ForgotPassword