import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from 'common/components/header';
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import { Formik, FormikHelpers } from 'formik';
import { VerifyOtpSchema } from 'utils/validationSchemas';
import OTPInput from 'common/components/otpInut';
import CustomText from 'common/components/text';
import Button from 'common/components/button';
import Loader from 'common/components/loader';
import useStyles from './OtpScreen.styles';
import { useTranslation } from 'react-i18next';

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
  const { email } = route.params;

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

  const handleResend = () => { };
  const handleOtpComplete = (
    values: initialProp,
    actions: FormikHelpers<initialProp>,
  ) => {
    actions.setSubmitting(false);
    navigation.navigate('ResetPassword', { email: email });
  };

  return (
    <View style={styles.container}>
      <Header title={t("verifyOtp.title")} onBackPress={() => navigation.goBack()} />
      <Container contentStyle={styles.subContainer}>
        <CustomText style={styles.title}>{t("verifyOtp.subTitle")}</CustomText>
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={VerifyOtpSchema}
          onSubmit={handleOtpComplete}
        >
          {({ setFieldValue, handleSubmit, errors, touched, isSubmitting }) => (
            <>
              <OTPInput
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
                    onPress={() => handleResend()}
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
              {isSubmitting && <Loader isLoading={isSubmitting} />}
            </>
          )}
        </Formik>
      </Container>
    </View>
  );
};

export default OtpScreen;
