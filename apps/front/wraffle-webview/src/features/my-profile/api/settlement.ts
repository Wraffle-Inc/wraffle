import apiClient from '@/shared/api/apiClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';

interface PostSettlementRequest {
  requestSettlementPrice: number;
}

export const usePostSettlement = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: PostSettlementRequest) => {
      await apiClient.post('/settlements', {
        body: body,
        withAuth: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['/users/me']});
    },
  });

  const requestPostSettlement = async (
    body: PostSettlementRequest,
    {
      onSuccess,
      onError,
    }: {onSuccess: () => void; onError: (error: Error) => void},
  ) => {
    await mutation.mutateAsync(body, {onSuccess, onError});
  };

  return requestPostSettlement;
};
