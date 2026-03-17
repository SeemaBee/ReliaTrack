import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import CustomText from 'common/components/text';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { useTranslation } from 'react-i18next';
import { LoginSchema } from 'utils/validationSchemas';
import useStyles from './Login.styles';
import { checkBiometricAvailability, triggerBiometricPrompt } from 'utils/biometrics';
import Loader from 'common/components/loader';
import { loginAPI } from 'api/auth/authAPI';

interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [loader, setLoader] = useState(false)
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const passwordRef = useRef<TextInput>(null);

  const checkBiometric = async () => {
    const { available, biometryType } =
      await checkBiometricAvailability();
    // console.log(available);
    // console.log(biometryType)

    setBiometricAvailable(available);
    if (biometryType) {
      setBiometricType(biometryType);
    }
  };
  useEffect(() => {
    checkBiometric();
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignIn = async (values: any) => {
    Keyboard.dismiss();
    try {
      setLoader(true);
      const data = {
        email: values.email,
        password: '',
        device_name: '',
        fcm_token: ''
      }
      const response = await loginAPI(data);
      console.log(response)
    } catch (error) {
      console.log("Error:-", error);
    } finally {
      setLoader(false)
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'DashboardNavigation' }],
    // });
  };

  const handleBiometricLogin = async () => {
    if (!biometricAvailable) {
      Alert.alert('Biometrics not available on this device');
      return;
    }

    const success = await triggerBiometricPrompt();

    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardNavigation' }],
      });
    } else {
      Alert.alert('Authentication failed or cancelled');
    }
  };

  return (
    <Container contentStyle={styles.container}>
      {loader && <Loader show={loader} />}
      <CustomText style={styles.title}>{t('auth.login')}</CustomText>
      <CustomText style={styles.subTitle}>{t('auth.subTitle')}</CustomText>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleSignIn(values)}
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
      <Button
        title={`Login with ${biometricType === null ? "biometrics" : biometricType}`}
        onPress={handleBiometricLogin}
        disabled={!biometricAvailable}
      />
    </Container>
  );
};

export default LoginScreen;
