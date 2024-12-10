import {FetchClient} from './fetchClient';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.API_BASE_URL
    : process.env.API_BASE_URL_DEV;

const apiClient = new FetchClient(baseUrl || '');

export default apiClient;
