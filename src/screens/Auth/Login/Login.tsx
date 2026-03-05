import React, { useRef } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import CustomText from 'common/components/text';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { useTranslation } from 'react-i18next';
import { LoginSchema } from 'utils/validationSchemas';
import getStyles from './Login.styles';

interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = getStyles();

  const passwordRef = useRef<TextInput>(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DashboardNavigation' }],
    });
  };

  return (
    <Container contentStyle={styles.container}>
      <CustomText style={styles.title}>{t('auth.login')}</CustomText>
      <CustomText style={styles.subTitle}>{t('auth.subTitle')}</CustomText>
      <Formik
        initialValues={initialValues}
        // validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              label={t('auth.email')}
              placeholder={t('auth.email_placeholder')}
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email ? errors.email : undefined}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              submitBehavior={'submit'}
            />
            <Input
              label={t('auth.password')}
              placeholder={t('auth.password_placeholder')}
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry
              autoCapitalize="none"
              error={touched.password ? errors.password : undefined}
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={() => handleSubmit()}
            />
            <View style={styles.forgotContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <CustomText style={styles.forgotText}>
                  {t('auth.forgotPassword')}
                </CustomText>
              </TouchableOpacity>
            </View>
            <Button title={t('auth.btn_signin')} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
