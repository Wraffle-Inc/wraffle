import type {
  CreateBody,
  CreateTag,
  TagList,
  TagQueryParams,
} from '../config/type';
import type {CursorPagination} from '@/entities/pagination/type';
import apiClient from '@/shared/api/apiClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const fetchTags = async ({itemsPerPage, uuid, prefix}: TagQueryParams) => {
  const response = await apiClient.get<{
    items: TagList[];
    pagination: CursorPagination;
  }>('/tags', {
    withAuth: true,
    params: {
      itemsPerPage: itemsPerPage,
      uuid: uuid,
      prefix: prefix,
    },
  });
  return response.data;
};

export const useTagQuery = ({itemsPerPage, uuid, prefix}: TagQueryParams) =>
  useQuery({
    queryKey: ['tags', itemsPerPage, uuid, prefix],
    queryFn: () => fetchTags({itemsPerPage, uuid, prefix}),
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
