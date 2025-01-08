import {NotificationList} from './NotificationList';
import {getNotificationInfiniteQueryOptions} from '@/features/get-notification/config';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

export const PrefetchNotificationList = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    getNotificationInfiniteQueryOptions({params: {}}),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotificationList />
    </HydrationBoundary>
  );
};
