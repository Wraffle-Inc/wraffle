import {useMemo} from 'react';
import type {GetNotificationListParams} from '@/features/get-notification/api';
import {useGETNotificationListQuery} from '@/features/get-notification/api';

export const useHandleNotifications = ({params}: GetNotificationListParams) => {
  const {
    data,
    fetchNextPage: fetchNextNotification,
    hasNextPage: hasNextNotification,
    isFetchingNextPage: isFetchingNextNotification,
  } = useGETNotificationListQuery({params});

  const notificationData = useMemo(
    () => data.pages.flatMap(page => page.items),
    [data],
  );

  const onFetchNextNotifications = () => {
    if (hasNextNotification && !isFetchingNextNotification) {
      fetchNextNotification();
    }
  };

  return {
    notificationData,
    hasNextNotification,
    onFetchNextNotifications,
  };
};
