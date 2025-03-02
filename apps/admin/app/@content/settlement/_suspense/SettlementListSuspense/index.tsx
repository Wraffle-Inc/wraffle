import SettlementListClient from '../../_clientBoundary/SettlementListClient';
import ErrorPage from '@/app/_components/Error';
import LoadingPage from '@/app/_components/Loading';
import withSuspense from '@/app/hoc/withSuspense';

const SettlementListSuspense = withSuspense(
  async () => {
    try {
      return (
        <div className='w-full'>
          <SettlementListClient />
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

export default SettlementListSuspense;
