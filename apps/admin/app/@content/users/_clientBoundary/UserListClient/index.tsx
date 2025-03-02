'use client';

import UserListBoardContents from '../../_components/UserListBoardContents';
import userListQuery from '@/api/userList/query';
import ListBoardHeader from '@/app/_components/ListBoardHeader';
import Title from '@/app/_components/Title';

const labels = ['이름', '가입일', '계정', '생성한 래플 수'];

const UserListClient = () => {
  const {data} = userListQuery();

  if (!data) return;

  return (
    <div className='w-full'>
      <Title>회원관리</Title>
      <ListBoardHeader labels={labels} isCheckBox={true} />
      <UserListBoardContents isCheckBox={true} contents={data} />
    </div>
  );
};

export default UserListClient;
