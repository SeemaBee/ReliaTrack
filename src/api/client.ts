import axios from 'axios';
import { BASE_URL } from './routes';
import { LocalDB } from 'services/database';

const TIMEOUT = 10000;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await LocalDB.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error?.response?.status;
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timed out:', error.config?.url);
    } else if (status === 401) {
      console.warn('🔐 Unauthorized! Invalid token.');
    } else if (error.response) {
      console.log(
        `❌ API Error [${error.response.status}]:`,
        error.response.data,
      );
    } else {
      console.error('⚠️ Unknown API Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
