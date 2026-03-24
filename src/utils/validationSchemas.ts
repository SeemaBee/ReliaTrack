import * as Yup from 'yup';
import i18n from 'i18n';
import { nameRegex, passwordRegex, phoneRegex } from './regex';

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
    .required(i18n.t('validation.otp_required'))
    .matches(/^\d{6}$/, i18n.t('validation.otp_max')),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .matches(passwordRegex, i18n.t('validation.password_regex'))
    .required(i18n.t('validation.password_required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], i18n.t('validation.password_match'))
    .required(i18n.t('validation.confirm_password_required')),
});

export const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .required(i18n.t('validation.current_password_required')),
  new_password: Yup.string()
    .min(8, i18n.t('validation.password_min'))
    .matches(passwordRegex, i18n.t('validation.password_regex'))
    .required(i18n.t('validation.new_password_required'))
    .notOneOf([Yup.ref('current_password')], i18n.t('validation.not_same')),
  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref('new_password')], i18n.t('validation.password_match'))
    .required(i18n.t('validation.confirm_password_required')),
});

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegex, i18n.t('validation.valid_fullName'))
    .required(i18n.t('validation.fullName_required')),
  phone: Yup.string()
    .matches(phoneRegex, i18n.t('validation.valid_phone_number'))
    .required(i18n.t('validation.phone_number_required')),
  address: Yup.string().required(i18n.t('validation.address_required')),
  dob: Yup.string().required(i18n.t('validation.dob_required')),
});
