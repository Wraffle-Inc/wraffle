import type {RequestCodeRequest} from '../config/type';
import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

export const useRequestCode = () => {
  const mutation = useMutation({
    mutationFn: async (query: RequestCodeRequest) => {
      await apiClient.post<null, RequestCodeRequest>('/phone-auth/request', {
        body: query,
      });
    },
  });

  return {requestCode: mutation.mutate};
};
