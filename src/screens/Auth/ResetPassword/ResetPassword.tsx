import { View, TextInput, Keyboard } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from 'common/components/header';
import { Formik } from 'formik';
import Container from 'common/components/container';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Loader from 'common/components/loader';
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes';
import { ResetPasswordSchema } from 'utils/validationSchemas';
import useStyles from './ResetPassword.styles';
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';
import { resetPasswordAPI } from 'api/auth/authAPI';
import { ResetPasswordProps } from 'utils/constant';

interface Props {
  navigation: AppNavigationProp<'ResetPassword'>;
  route: AppRouteProp<'ResetPassword'>;
}

const ResetPassword: React.FC<Props> = ({ navigation, route }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { email, otp } = route?.params;
  const [loader, setLoader] = useState(false);
  const passRef = useRef<TextInput>(null);

  const handleReset = async (values: ResetPasswordProps) => {
    Keyboard.dismiss();
    try {
      const data = {
        email: email,
        otp: otp,
        password: values.password,
        password_confirmation: values.confirmPassword
      }
      setLoader(true);
      const response = await resetPasswordAPI(data);
      console.log(response)
      if (response?.success) {
        Toast.showWithGravity("Password reset successfully.", Toast.LONG, Toast.BOTTOM);
        navigation.goBack();
      }
    } catch (error: any) {
      Toast.showWithGravity(error?.message || "Something went wrong", Toast.LONG, Toast.BOTTOM);
      console.log("Error:-", error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <View style={styles.container}>
      {loader && <Loader isLoading={loader} />}
      <Header title={t("auth.reset_password_title")} onBackPress={() => navigation.goBack()} />
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => handleReset(values)}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
        }) => (
          <Container contentStyle={styles.subContainer}>
            <Input
              label={t("auth.new_password")}
              placeholder={t("auth.new_password_placeholder")}
              value={values.password}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => passRef.current?.focus()}
              returnKeyType="next"
              submitBehavior="submit"
            />
            <Input
              ref={passRef}
              label={t("auth.confirm_new_password")}
              placeholder={t("auth.confirm_new_password_placeholder")}
              value={values.confirmPassword}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              secureTextEntry={true}
              onChangeText={handleChange('confirmPassword')}
            />
            <Button onPress={() => handleSubmit()} title={t("action.submit")} />
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
