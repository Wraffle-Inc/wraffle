import API_URL from '../../api/urls';
import {HttpResponse, http} from 'msw';
import UserList from '@/app/api/userList/type';

const url = API_URL.USERS.LIST;

const mockUsers: UserList = {
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
};

const mockUserListHandler = http.get(url, () => {
  return HttpResponse.json(mockUsers);
});

export default mockUserListHandler;
