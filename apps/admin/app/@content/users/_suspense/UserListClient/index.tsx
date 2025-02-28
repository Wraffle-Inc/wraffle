import UserListClient from '../../_clientBoundary/UserListClient';
import ErrorPage from '@/app/_components/Error';
import LoadingPage from '@/app/_components/Loading';
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
      return <ErrorPage />;
    }
  },
  {
    fallback: <LoadingPage />,
  },
);

export default UserListSuspense;
