import { captureException, setExtra } from '@sentry/browser';
import axios, { AxiosError } from 'axios';

export const AX = axios.create({
  baseURL: 'https://showtime.app-dich.com/api',
});

axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    setExtra('error', error);
    captureException(error);
    throw error;
  },
);
