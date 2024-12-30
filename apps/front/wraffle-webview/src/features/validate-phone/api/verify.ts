import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

export const useVerifyCode = () => {
  const mutation = useMutation({
    mutationFn: async (query: VerifyCodeRequest) => {
      await apiClient.post<null, VerifyCodeRequest>('/phone-auth/verify', {
        body: query,
      });
    },
  });

  const verifyCode = (
    query: VerifyCodeRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return {verifyCode};
};
