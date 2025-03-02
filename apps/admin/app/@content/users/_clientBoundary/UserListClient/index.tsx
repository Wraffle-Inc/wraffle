'use client';

import UserListBoardContents from '../../_components/UserListBoardContents';
import userListQuery from '@/api/userList/query';
import ListBoardHeader from '@/app/_components/ListBoardHeader';
import Title from '@/app/_components/Title';
import LABEL from '@/app/config/labels';

const UserListClient = () => {
  const {data} = userListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <Title>회원관리</Title>
      <ListBoardHeader labels={LABEL.USER} isCheckBox={true} />
      <UserListBoardContents isCheckBox={true} contents={data} />
    </div>
  );
};

export default UserListClient;
