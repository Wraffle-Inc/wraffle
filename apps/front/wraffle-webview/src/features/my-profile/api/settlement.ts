import {GET_USER_INFO_PATH} from './user';
import type {GetSettlementResultResponse} from '@/entities/settlement/type';
import apiClient from '@/shared/api/apiClient';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

interface MutationCallbacks {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

/**
 * 정산 요청 내역 조회하기
 */
export const GET_SETTLEMENTS_PATH = '/settlements';
export const useGetSettlements = () => {
  return useQuery({
    queryKey: [GET_SETTLEMENTS_PATH],
    queryFn: async () => {
      const response = await apiClient.get<GetSettlementResultResponse>(
        GET_SETTLEMENTS_PATH,
        {
          withAuth: true,
        },
      );

      return response.data;
    },
  });
};

interface PostSettlementRequest {
  requestSettlementPrice: number;
}

/**
 * 정산 요청하기
 */
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
      queryClient.invalidateQueries({queryKey: [GET_USER_INFO_PATH]});
      queryClient.invalidateQueries({queryKey: [GET_SETTLEMENTS_PATH]});
    },
  });

  const requestPostSettlement = async (
    body: PostSettlementRequest,
    {onSuccess, onError}: MutationCallbacks,
  ) => {
    await mutation.mutateAsync(body, {onSuccess, onError});
  };

  return requestPostSettlement;
};
