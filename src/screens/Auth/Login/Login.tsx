import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import { Formik } from 'formik';
import { LogIn, Lock } from 'lucide-react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import { useTheme } from 'common/helperFunctions';
import Container from 'common/components/container';
import styles from './Login.styles';
import CustomText from 'common/components/text';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { useTranslation } from 'react-i18next';
import { LoginSchema } from 'utils/validationSchemas';

interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const passwordRef = useRef<TextInput>(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <Container contentStyle={styles.container}>
      <CustomText style={[styles.title, { color: theme.text }]}>
        {t("auth.login")}
      </CustomText>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              label={t("auth.email")}
              placeholder={t("auth.email_placeholder")}
              leftIcon={<LogIn size={20} color={theme.textSecondary} />}
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
              label={t("auth.password")}
              placeholder={t("auth.password_placeholder")}
              secureToggle
              leftIcon={<Lock size={20} color={theme.textSecondary} />}
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry
              autoCapitalize="none"
              error={touched.password ? errors.password : undefined}
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button title={t("auth.btn_signin")} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;