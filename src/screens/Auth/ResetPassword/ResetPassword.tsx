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

interface Props {
  navigation: AppNavigationProp<'ResetPassword'>;
  route: AppRouteProp<'ResetPassword'>;
}

const ResetPassword = () => {
  const styles = useStyles();
  const passRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Header title="Reset Password" onBackPress={() => { }} />
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
              label="New password"
              placeholder="Enter new password"
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
              label="Confirm new password"
              placeholder="Confirm new password"
              value={values.confirmPassword}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              secureTextEntry={true}
              onChangeText={handleChange('confirmPassword')}
            />
            <Button onPress={() => handleSubmit()} title="Submit" />
            {isSubmitting && <Loader show={isSubmitting} />}
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default ResetPassword;
