interface UserList {
  status: number;
  code: string;
  data: {
    users: User[];
  };
}

interface User {
  id: number;
  name: string;
  createdAt: string;
  email: string;
  wraffleCount: number;
}

export default UserList;
