'use cleint';

import userListQuery from '../../../../../api/userList/query';
import UserListHeader from '../../_components/UserListHeader';

const UserListClient = () => {
  const {data} = userListQuery();

  return (
    <div>
      <UserListHeader />
      {/* 클라이언트 데이터 페칭 정보 사용 */}
    </div>
  );
};

export default UserListClient;
