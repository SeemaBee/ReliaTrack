export const BASE_URL = 'http://172.16.123.108:8000/api/mobile/v1/';
export const IMAGE_URL = 'http://172.16.123.108:8000';

export const ENDPOINTS = {
  login: 'login',
  forgotPassword: 'password/send-otp',
  verifyOtp: 'password/verify-otp',
  resetPassword: 'password/reset-with-otp',
  safetyChecklist: 'safety-checklist',
  newJobs: 'deliveries',
  activeJobs: 'deliveries/my-active',
  completedJobs: 'deliveries/history',
  acceptRequest: 'job-requests',
  changePassword: 'change-password',
  profile: 'profile',
  logout: 'logout',
};
