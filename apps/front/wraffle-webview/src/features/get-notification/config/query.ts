import type {GetNotificationListParams} from '@/features/get-notification/api';
import {
  GET_NOTIFICATION_LIST_KEY,
  getNotificationListAPI,
} from '@/features/get-notification/api';

export const getNotificationInfiniteQueryOptions = ({
  params,
}: GetNotificationListParams) => ({
  queryKey: GET_NOTIFICATION_LIST_KEY(params),
  queryFn: ({pageParam = params.cursorId}) =>
    getNotificationListAPI({...params, cursorId: pageParam}),
  initialPageParam: params.cursorId,
});
