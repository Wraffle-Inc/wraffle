import API_URL from '../../api/urls';
import {HttpResponse, http} from 'msw';

const url = API_URL.USERS;

const mockUsers = http.get(url, () => {
  return HttpResponse.json({
    status: 200,
    code: '',
    data: {
      users: [
        {
          id: 1,
          name: '김하늘',
          createdAt: '2021-08-05T00:00:00.000Z',
          email: 'example.com',
          wraffleCount: 1,
        },
        {
          id: 2,
          name: '김지연',
          createdAt: '2021-08-05T00:00:00.000Z',
          email: 'example.com',
          wraffleCount: 5,
        },
      ],
    },
  });
});

export default mockUsers;
