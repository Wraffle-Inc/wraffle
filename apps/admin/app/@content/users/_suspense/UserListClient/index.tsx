import UserListClient from '../../_clientBoundary/UserListClient';
import {Suspense} from 'react';

const UserListSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserListClient />
    </Suspense>
  );
};

export default UserListSuspense;
