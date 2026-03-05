import React, { useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { LogIn, Lock } from 'lucide-react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import { useTheme } from 'common/helperFunctions';
import Container from 'common/components/container';
import CustomText from 'common/components/text';
import { Input } from 'common/components/input';
import Button from 'common/components/button';
import { useTranslation } from 'react-i18next';
import { LoginSchema } from 'utils/validationSchemas';
import useStyles from './Login.styles';

interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useStyles();

  const passwordRef = useRef<TextInput>(null);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSignIn = () => {
    navigation.navigate('Home')
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
  };

  return (
    <Container contentStyle={styles.container}>
      <CustomText style={styles.title}>
        {t("auth.login")}
      </CustomText>
      <CustomText style={styles.tagLine}>{t("auth.login_tagLine")}</CustomText>
      <Formik
        initialValues={initialValues}
        // validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              label={t("auth.username")}
              placeholder={t("auth.username_placeholder")}
              leftIcon={<LogIn size={20} color={theme.textSecondary} />}
              onChangeText={handleChange('username')}
              value={values.username}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.username ? errors.username : undefined}
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
            <TouchableOpacity activeOpacity={1} style={styles.forgotBtn} onPress={() => navigation.navigate("ForgotPassword")}>
              <CustomText style={styles.forgotText}>{t("auth.forgot_password")}?</CustomText>
            </TouchableOpacity>
            <Button title={t("auth.btn_signin")} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;

