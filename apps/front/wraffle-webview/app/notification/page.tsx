import {Suspense} from 'react';
import {getNotificationInfiniteQueryOptions} from '@/features/get-notification/config';
import {PrefetchBoundary} from '@/shared/context/query/PrefetchBoundary';
import {Header} from '@/shared/ui';
import {NotificationList} from '@/widgets/notification-list/ui';

const NotificationPage = () => {
  return (
    <>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Header.Title className='text-center'>푸시 알림</Header.Title>
        </Header.Middle>
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <PrefetchBoundary
          prefetchOptions={getNotificationInfiniteQueryOptions({
            params: {itemsPerPage: 10},
          })}
        >
          <NotificationList />
        </PrefetchBoundary>
      </Suspense>
    </>
  );
};

export default NotificationPage;
