import { View, Text } from 'react-native';
import React from 'react';
import getStyles from './ForgotPassword.styles';
import Header from 'common/components/header';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { Formik, FormikHelpers } from 'formik';
import { ForgotPasswordSchema } from 'utils/validationSchemas';

interface Props {
  navigation: AppNavigationProp<'ForgotPassword'>;
}

type initialProps = {
  email: string;
};

const ForgotPassword = ({ navigation }: Props) => {
  const styles = getStyles();

  const handleSubmit = async (
    values: initialProps,
    actions: FormikHelpers<initialProps>,
  ) => {
    navigation.navigate('OtpScreen', { email: values.email });
  };

  return (
    <View style={styles.container}>
      <Header title="Forgot Password" onBackPress={() => navigation.goBack()} />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ values, handleSubmit, touched, errors, handleChange }) => (
          <Container contentStyle={styles.subContainer}>
            <Input
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={values.email}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <Button title="Submit" onPress={() => handleSubmit()} />
          </Container>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
