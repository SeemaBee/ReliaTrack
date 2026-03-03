import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from 'common/components/header';
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes';
import getStyles from './OtpScreen.styles';
import Container from 'common/components/container';
import { Formik, FormikHelpers } from 'formik';
import { VerifyOtpSchema } from 'utils/validationSchemas';
import OTPInput from 'common/components/otpInut';
import CustomText from 'common/components/text';
import Button from 'common/components/button';
import Loader from 'common/components/loader';

interface Props {
  navigation: AppNavigationProp<'OtpScreen'>;
  route: AppRouteProp<'OtpScreen'>;
}

type initialProp = {
  otp: string;
};

const OtpScreen = ({ navigation, route }: Props) => {
  const styles = getStyles();
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

  const handleResend = () => {};
  const handleOtpComplete = (
    values: initialProp,
    actions: FormikHelpers<initialProp>,
  ) => {
    actions.setSubmitting(false);
    navigation.navigate('ResetPassword', { email: email });
  };

  return (
    <View style={styles.container}>
      <Header title="Verify Otp" onBackPress={() => navigation.goBack()} />
      <Container contentStyle={styles.subContainer}>
        <CustomText style={styles.title}>
          We have sent the code to email
        </CustomText>
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
                    Didn’t receive the code?{' '}
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleResend()}
                  >
                    <CustomText style={styles.linkText}>Resend Code</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.resendBox}>
                  <CustomText style={styles.resendText}>
                    Resend code in {secondsLeft} Sec...
                  </CustomText>
                </View>
              )}
              <Button title="Verify OTP" onPress={handleSubmit} />
              {isSubmitting && <Loader show={isSubmitting} />}
            </>
          )}
        </Formik>
      </Container>
    </View>
  );
};

export default OtpScreen;
