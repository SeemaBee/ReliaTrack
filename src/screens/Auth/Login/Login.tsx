import React, { useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LogIn, Lock } from 'lucide-react-native';
import { AppNavigationProp } from 'common/types/navigationTypes';
import { useTheme } from 'common/helperFunctions';
import Container from 'common/components/container';
import styles from './Login.styles';
import CustomText from 'common/components/text';
import { Input } from 'common/components/input';
import Button from 'common/components/button';

interface LoginProps {
  navigation: AppNavigationProp<'Login'>;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
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
        Login
      </CustomText>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              label="Email"
              placeholder="Enter your email"
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
              label="Password"
              placeholder="Enter your password"
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
            <Button title="Sign In" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
