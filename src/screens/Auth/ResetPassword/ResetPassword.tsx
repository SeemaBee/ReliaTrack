import { View, TextInput } from 'react-native';
import React, { useRef } from 'react';
import Header from 'common/components/header';
import { Formik } from 'formik';
import Container from 'common/components/container';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import Loader from 'common/components/loader';
import { AppNavigationProp, AppRouteProp } from 'common/types/navigationTypes';
import { ResetPasswordSchema } from 'utils/validationSchemas';
import useStyles from './ResetPassword.styles';
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: AppNavigationProp<'ResetPassword'>;
  route: AppRouteProp<'ResetPassword'>;
}

const ResetPassword: React.FC<Props> = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const passRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Header title={t("auth.reset_password_title")} onBackPress={() => { }} />
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={() => { }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          isSubmitting,
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
            {isSubmitting && <Loader isLoading={isSubmitting} />}
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
