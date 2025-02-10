import type {
  GetNotificationListParams,
  GetNotificationListResponse,
} from '@/features/get-notification/api';
import {
  GET_NOTIFICATION_LIST_KEY,
  getNotificationListAPI,
} from '@/features/get-notification/api';
import type {BasicSuspenseInifniteQueryOptions} from '@/shared/context/query/type';

export const getNotificationInfiniteQueryOptions = ({
  params,
}: GetNotificationListParams): BasicSuspenseInifniteQueryOptions<GetNotificationListResponse> => ({
  queryKey: GET_NOTIFICATION_LIST_KEY(params),
  queryFn: ({pageParam}) =>
    getNotificationListAPI({
      ...params,
      cursor: pageParam as string | undefined,
    }),
  initialPageParam: params.cursor,
});
