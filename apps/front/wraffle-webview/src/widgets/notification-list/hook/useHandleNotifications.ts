import {useRouter} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import type {GetNotificationListParams} from '@/features/get-notification/api';
import {
  useGETNotificationListQuery,
  usePATCHNotificationQuery,
} from '@/features/get-notification/api';
import {useQueryClient} from '@tanstack/react-query';

export const useHandleNotifications = ({params}: GetNotificationListParams) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage: fetchNextNotification,
    hasNextPage: hasNextNotification,
    isFetchingNextPage: isFetchingNextNotification,
  } = useGETNotificationListQuery({params});

  const {readNotification} = usePATCHNotificationQuery();

  const notificationData = useMemo(
    () => data.pages.flatMap(page => page.items),
    [data],
  );

  const onReadNotification = useCallback(
    (id: number) => {
      readNotification(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['GET_NOTIFICATION_LIST']});
          router.push(`/notification/${id}`);
        },
      });
    },
    [queryClient, readNotification, router],
  );

  const onFetchNextNotifications = useCallback(() => {
    if (hasNextNotification && !isFetchingNextNotification) {
      fetchNextNotification();
    }
  }, [fetchNextNotification, hasNextNotification, isFetchingNextNotification]);

  return {
    notificationData,
    hasNextNotification,
    onReadNotification,
    onFetchNextNotifications,
  };
};
