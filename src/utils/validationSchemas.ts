import * as Yup from 'yup';
import i18n from 'i18n';
import { passwordRegex } from './regex';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t('validation.email_invalid'))
    .required(i18n.t('validation.email_required')),

  password: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .required(i18n.t('validation.password_required')),
});

export const ForgotPasswordSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t('validation.email_invalid'))
    .required(i18n.t('validation.email_required')),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .matches(passwordRegex, i18n.t('validation.password_regex'))
    .required(i18n.t('validation.password_required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], i18n.t('validation.password_match'))
    .required(i18n.t('validation.confirm_password_required')),
});
