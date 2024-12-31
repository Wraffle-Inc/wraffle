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

  return {verifyCode: mutation.mutate};
};
