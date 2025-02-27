'use client';

import UserListClient from '../../_clientBoundary/UserListClient';
import withSuspense from '@/app/hoc/withSuspense';

const UserListSuspense = withSuspense(
  async () => {
    try {
      return (
        <div>
          <UserListClient />
        </div>
      );
    } catch (error) {
      return <div>Error</div>;
    }
  },
  {
    fallback: <div>Loading...</div>,
  },
);

export default UserListSuspense;
