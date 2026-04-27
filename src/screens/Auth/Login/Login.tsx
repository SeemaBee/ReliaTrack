import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
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
import Toast from 'react-native-simple-toast';
import { LoginFormValues } from 'utils/constant';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from 'redux/features/authSlice';
import { LocalDB } from 'services/database';
interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const passwordRef = useRef<TextInput>(null);
  const formikRef = useRef<FormikProps<LoginFormValues> | null>(null);

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

  const handleSignIn = async (values: LoginFormValues) => {
    Keyboard.dismiss();
    try {
      setLoader(true);
      const data = {
        email: values.email,
        password: values.password,
        device_name: Platform.OS,
        fcm_token: '',
      }
      const response = await loginAPI(data);
      // console.log(response, "====>Response");
      if (response?.success) {
        const { token, user } = response?.data;
        Toast.showWithGravity(response?.message || "Login successful", Toast.LONG, Toast.BOTTOM);
        await LocalDB.setMany({ authToken: token, userData: JSON.stringify(user) });
        dispatch(setUser(user));
        dispatch(setToken(token));
        navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardNavigation' }],
        });
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!biometricAvailable) {
      Alert.alert('Biometrics not available on this device');
      return;
    }

    const success = await triggerBiometricPrompt();

    if (success) {
      try {
        const data = await LocalDB.getMany(["authToken", "userData"]);
        const token = data?.authToken;
        const userData = data?.userData;
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          dispatch(setUser(parsedUser));
          dispatch(setToken(token));
          navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardNavigation' }],
          });
        } else {
          Alert.alert("Error", "No saved session found. Please log in with email and password first.");
        }
      } catch (error) {
        console.log("Storage error:", error);
        Alert.alert('Authentication error');
      }
    } else {
      Alert.alert('Authentication failed or cancelled');
    }
  };

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <CustomText style={styles.title}>{t('auth.login')}</CustomText>
      <CustomText style={styles.subTitle}>{t('auth.subTitle')}</CustomText>
      <Formik<LoginFormValues>
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values) => handleSignIn(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Container>
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
            <Button
              title={`Use ${biometricType === null ? "biometrics" : biometricType}`}
              onPress={handleBiometricLogin}
              disabled={!biometricAvailable}
            />
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
