import {getNotificationInfiniteQueryOptions} from '../config';
import type {Notification} from '@/entities/notification';
import type {CursorPagination} from '@/entities/pagination';
import apiClient from '@/shared/api/apiClient';
import {useMutation, useSuspenseInfiniteQuery} from '@tanstack/react-query';

export interface GetNotificationListRequest {
  itemsPerPage?: number;
  cursor?: string;
}

export interface GetNotificationListResponse {
  items: Notification[];
  pagination: CursorPagination;
}

export interface GetNotificationListParams {
  params: GetNotificationListRequest;
}

export const getNotificationListAPI = async (
  params: GetNotificationListRequest,
) => {
  const query = Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [] as string[])
    .join('&');

  const response = await apiClient.get<GetNotificationListResponse>(
    `/push-notices/me?${query}`,
    {withAuth: true},
  );

  return response.data;
};

export const patchNotificationAPI = async (notificationId: number) => {
  await apiClient.patch(`/push-notices/${notificationId}`, {withAuth: true});
};

export const GET_NOTIFICATION_LIST_KEY = (
  params: GetNotificationListRequest,
) => ['GET_NOTIFICATION_LIST', params.cursor, params.itemsPerPage];

export const useGETNotificationListQuery = ({
  params,
}: GetNotificationListParams) => {
  return useSuspenseInfiniteQuery({
    ...getNotificationInfiniteQueryOptions({params}),
    getNextPageParam: (lastPage: GetNotificationListResponse) => {
      if (lastPage.pagination.hasNextData) {
        return lastPage.pagination.cursor;
      }
      return undefined;
    },
  });
};

export const usePATCHNotificationQuery = () => {
  const mutation = useMutation({
    mutationFn: patchNotificationAPI,
  });

  return {readNotification: mutation.mutate};
};
