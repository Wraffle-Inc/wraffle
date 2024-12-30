import apiClient from '@/shared/api/apiClient';
import {useMutation} from '@tanstack/react-query';

type ValidateRequest =
  | {email: string; nickname?: string}
  | {email?: string; nickname: string};

export const useValidateDuplication = () => {
  const mutation = useMutation({
    mutationFn: async (query: ValidateRequest) => {
      await apiClient.post<null, ValidateRequest>('/auth/valid-duplicate', {
        body: query,
      });
    },
  });

  const validateDuplication = (
    query: ValidateRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    return mutation.mutate(query, {onSuccess, onError});
  };

  return {
    validateDuplication,
  };
};
