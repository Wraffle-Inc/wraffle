const BASE_URL = 'http://localhost:8000/v1';

const API_URL = {
  USERS: {
    LIST: `${BASE_URL}/users`,
    DETAIL: `${BASE_URL}/users/:id`,
  },
  SETTLEMENTS: {
    LIST: `${BASE_URL}/settlements`,
    DETAIL: `${BASE_URL}/settlements/:id`,
  },
};

export default API_URL;
