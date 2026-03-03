import * as Yup from 'yup';
import i18n from 'i18n';
import { passwordRegex } from './regex';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email_invalid'))
    .required(i18n.t('validation.email_required')),

  password: Yup.string().required(i18n.t('validation.password_required')),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email_invalid'))
    .required(i18n.t('validation.email_required')),
});

export const VerifyOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^\d{5}$/, 'OTP must be exactly 5 digits'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .matches(passwordRegex, i18n.t('validation.password_regex'))
    .required(i18n.t('validation.password_required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], i18n.t('validation.password_match'))
    .required(i18n.t('validation.confirm_password_required')),
});
