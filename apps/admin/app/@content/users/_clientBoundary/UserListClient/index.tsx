'use client';

import userListQuery from '@/api/userList/query';
import UserListHeader from '@/app/@content/users/_components/UserListHeader';
import ListBoardHeader from '@/app/_components/ListBoardHeader';

const UserListClient = () => {
  const {data} = userListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <UserListHeader />
      <ListBoardHeader
        labels={['이름', '가입일', '계정', '생성한 래플 수']}
        isCheckBox={true}
      />
    </div>
  );
};

export default UserListClient;
