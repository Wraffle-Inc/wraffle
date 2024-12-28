import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

interface RequestCodeRequest {
  phoneNumber: string;
}

export const useRequestCode = () => {
  const mutation = useMutation({
    mutationFn: async (query: RequestCodeRequest) => {
      await apiClient.post<null, RequestCodeRequest>('/phone-auth/request', {
        body: query,
      });
    },
  });

  const requestCode = (
    query: RequestCodeRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return requestCode;
};
