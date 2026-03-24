import { Keyboard, View } from 'react-native';
import React, { useState } from 'react';
import Header from 'common/components/header';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { Formik } from 'formik';
import { ForgotPasswordSchema } from 'utils/validationSchemas';
import { useTranslation } from 'react-i18next';
import useStyles from './ForgotPassword.styles';
import Loader from 'common/components/loader';
import Toast from 'react-native-simple-toast';
import { forgotPasswordAPI } from 'api/auth/authAPI';

interface Props {
  navigation: AppNavigationProp<'ForgotPassword'>;
}

type initialProps = {
  email: string;
};

const ForgotPassword = ({ navigation }: Props) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);

  const handleForgot = async (values: initialProps, resetForm: any) => {
    Keyboard.dismiss();
    try {
      setLoader(true);
      const response = await forgotPasswordAPI(values.email);
      if (response?.success) {
        resetForm();
        Toast.showWithGravity(response?.message || "OTP sent to your email", Toast.LONG, Toast.BOTTOM);
        navigation.navigate('OtpScreen', { email: values.email });
      }
    } catch (error: any) {
      if (error?.message === "Validation error") {
        Toast.showWithGravity("Invalid email address", Toast.LONG, Toast.BOTTOM);
      } else {
        Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      }
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <Header
        title={t('forgot.title')}
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, { resetForm }) => handleForgot(values, resetForm)}
      >
        {({ values, handleSubmit, touched, errors, handleChange }) => (
          <Container contentStyle={styles.subContainer}>
            <Input
              label={t('auth.email')}
              placeholder={t('auth.email_placeholder')}
              keyboardType="email-address"
              value={values.email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <Button title={t("action.submit")} onPress={() => handleSubmit()} />
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
