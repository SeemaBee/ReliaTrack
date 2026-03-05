import { View } from 'react-native';
import React from 'react';
import Header from 'common/components/header';
import { AppNavigationProp } from 'common/types/navigationTypes';
import Container from 'common/components/container';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { Formik, FormikHelpers } from 'formik';
import { ForgotPasswordSchema } from 'utils/validationSchemas';
import { useTranslation } from 'react-i18next';
import useStyles from './ForgotPassword.styles';

interface Props {
  navigation: AppNavigationProp<'ForgotPassword'>;
}

type initialProps = {
  email: string;
};

const ForgotPassword = ({ navigation }: Props) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const handleSubmit = async (
    values: initialProps,
    actions: FormikHelpers<initialProps>,
  ) => {
    navigation.navigate('OtpScreen', { email: values.email });
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('forgot.title')}
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ values, handleSubmit, touched, errors, handleChange }) => (
          <Container contentStyle={styles.subContainer}>
            <Input
              label={t('auth.email')}
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
