'use client';

import userListQuery from '@/api/userList/query';
import UserListHeader from '@/app/@content/users/_components/UserListHeader';

const UserListClient = () => {
  const {data} = userListQuery();

  return (
    <div>
      <UserListHeader />
      {data?.data.users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};

export default UserListClient;
