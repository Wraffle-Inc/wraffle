import type {
  CreateBody,
  CreateTag,
  TagList,
  TagQueryParams,
} from '../config/type';
import type {CursorPagination} from '@/entities/pagination/type';
import apiClient from '@/shared/api/apiClient';
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

const fetchTags = async ({itemsPerPage, cursor, prefix}: TagQueryParams) => {
  const response = await apiClient.get<{
    items: TagList[];
    pagination: CursorPagination;
  }>('/tags', {
    withAuth: true,
    params: {
      itemsPerPage: itemsPerPage,
      cursor: cursor,
      prefix: prefix,
    },
  });
  return response.data;
};

export const useTagQuery = (
  {itemsPerPage, prefix}: Omit<TagQueryParams, 'cursor'>,
  options?: {enabled?: boolean},
) =>
  useInfiniteQuery({
    queryKey: ['tags', itemsPerPage, prefix],
    queryFn: ({pageParam}) =>
      fetchTags({itemsPerPage, cursor: pageParam, prefix}),
    initialPageParam: '',
    getNextPageParam: lastPage => {
      if (lastPage.pagination.hasNextData) {
        return lastPage.pagination.cursor;
      }
      return undefined;
    },
    enabled: options?.enabled,
  });

const createTag = async (tag: string) => {
  const response = await apiClient.post<CreateTag, CreateBody>('/tags', {
    body: {name: tag},
    withAuth: true,
  });
  return response.data;
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag: string) => createTag(tag),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tags']});
    },
  });
};
