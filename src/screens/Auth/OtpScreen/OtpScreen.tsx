import { View, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from 'common/components/header';
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import { Formik } from 'formik';
import { VerifyOtpSchema } from 'utils/validationSchemas';
import OTPInput from 'common/components/otpInut';
import CustomText from 'common/components/text';
import Button from 'common/components/button';
import Loader from 'common/components/loader';
import useStyles from './OtpScreen.styles';
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';
import { forgotPasswordAPI, VerifyOtpAPI } from 'api/auth/authAPI';
import { CommonActions } from '@react-navigation/native';

interface Props {
  navigation: AppNavigationProp<'OtpScreen'>;
  route: AppRouteProp<'OtpScreen'>;
}

type initialProp = {
  otp: string;
};

const OtpScreen = ({ navigation, route }: Props) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [loader, setLoader] = useState(false);
  const { email, tempOtp } = route.params;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = async (setFieldValue: (field: string, value: any) => void) => {
    try {
      const response = await forgotPasswordAPI(email);
      if (response?.success) {
        Toast.showWithGravity("OTP sent to your email", Toast.LONG, Toast.BOTTOM);
        setFieldValue('otp', response?.data?.dev_otp);
        setShowResend(false);
        setSecondsLeft(30);
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    }
  };
  const handleOtpComplete = async (values: initialProp, resetForm: any) => {
    Keyboard.dismiss();
    try {
      setLoader(true);
      const response = await VerifyOtpAPI(email, values.otp);
      if (response?.success) {
        Toast.showWithGravity(response?.message || "OTP verified successfully", Toast.LONG, Toast.BOTTOM);
        resetForm();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Login" },
              { name: "ResetPassword", params: { email: email, otp: values.otp } }
            ]
          })
        )
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <Header title={t("verifyOtp.title")} onBackPress={() => navigation.goBack()} />
      <Container contentStyle={styles.subContainer}>
        <CustomText style={styles.title}>{t("verifyOtp.subTitle")}</CustomText>
        <Formik
          initialValues={{ otp: tempOtp || '' }}
          enableReinitialize={true}
          validationSchema={VerifyOtpSchema}
          onSubmit={(values, { resetForm }) => handleOtpComplete(values, resetForm)}
        >
          {({ setFieldValue, handleSubmit, errors, touched, values }) => (
            <>
              <OTPInput
                values={values.otp}
                onChange={(text: string) => setFieldValue('otp', text)}
              />
              {touched.otp && errors.otp ? (
                <View style={styles.errorBox}>
                  <CustomText style={styles.error}>{errors.otp}</CustomText>
                </View>
              ) : null}
              {showResend ? (
                <View style={styles.resendBox}>
                  <CustomText style={styles.resendText}>
                    {t("verifyOtp.not_received_code")}{' '}
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleResend(setFieldValue)}
                  >
                    <CustomText style={styles.linkText}>{t("verifyOtp.resend_code")}</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.resendBox}>
                  <CustomText style={styles.resendText}>
                    {t("verifyOtp.resendTimer")} {secondsLeft} Sec...
                  </CustomText>
                </View>
              )}
              <Button title={t("action.verify")} onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </Container>
    </View>
  );
};

export default OtpScreen;
