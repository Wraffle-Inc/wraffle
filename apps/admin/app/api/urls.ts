const BASE_URL = 'http://localhost:8000/v1';

const API_URL = {
  USERS: {
    LIST: `${BASE_URL}/users`,
    DETAIL: `${BASE_URL}/users/:id`,
  },
};

export default API_URL;
