import {FetchClient} from './fetchClient';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

const apiClient = new FetchClient(API_BASE_URL || '');

export default apiClient;
