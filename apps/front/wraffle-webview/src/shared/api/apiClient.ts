import {FetchClient} from './fetchClient';

const apiClient = new FetchClient(process.env.API_BASE_URL || '');

export default apiClient;
