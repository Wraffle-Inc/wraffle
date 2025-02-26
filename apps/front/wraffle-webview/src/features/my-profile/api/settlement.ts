import apiClient from '@/shared/api/apiClient';
import {useMutation, useQueryClient} from '@tanstack/react-query';

interface PostSettlementRequest {
  requestSettlementPrice: number;
}

export const usePostSettlement = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: PostSettlementRequest) => {
      const response = await apiClient.post('/settlements', {
        body: params,
        withAuth: true,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['/users/me']});
    },
  });

  const requestPostSettlement = async (
    params: PostSettlementRequest,
    {onSuccess, onError}: {onSuccess: () => void; onError: () => void},
  ) => {
    await mutation.mutateAsync(params, {onSuccess, onError});
  };

  return requestPostSettlement;
};
